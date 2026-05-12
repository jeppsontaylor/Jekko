//! `population_report` — merge baseline + exec scores + population ledger into
//! a final markdown report + comparison matrix.

use std::collections::BTreeMap;
use std::env;
use std::fs;
use std::io::Write;
use std::path::Path;

use memory_benchmark::json::{self, Json};

fn main() {
    let args: Vec<String> = env::args().collect();
    let mut population: Option<String> = None;
    let mut baseline_path: Option<String> = None;
    let mut exec_path: Option<String> = None;
    let mut out: Option<String> = None;
    let mut markdown: Option<String> = None;
    let mut comparison: Option<String> = None;
    let mut triangulation: Option<String> = None;
    let mut curriculum: Option<String> = None;

    let mut i = 1;
    while i < args.len() {
        match args[i].as_str() {
            "--population" => {
                population = args.get(i + 1).cloned();
                i += 2;
            }
            "--baseline" => {
                baseline_path = args.get(i + 1).cloned();
                i += 2;
            }
            "--exec" => {
                exec_path = args.get(i + 1).cloned();
                i += 2;
            }
            "--out" => {
                out = args.get(i + 1).cloned();
                i += 2;
            }
            "--markdown" => {
                markdown = args.get(i + 1).cloned();
                i += 2;
            }
            "--comparison" => {
                comparison = args.get(i + 1).cloned();
                i += 2;
            }
            "--triangulation" => {
                triangulation = args.get(i + 1).cloned();
                i += 2;
            }
            "--curriculum" => {
                curriculum = args.get(i + 1).cloned();
                i += 2;
            }
            _ => i += 1,
        }
    }

    if markdown.is_none() && out.as_deref().is_some_and(|path| path.ends_with(".md")) {
        markdown = out.take();
    }
    if baseline_path.is_none() && Path::new("target/memory-benchmark/baseline-score.json").exists()
    {
        baseline_path = Some("target/memory-benchmark/baseline-score.json".to_string());
    }
    if exec_path.is_none() && Path::new("target/memory-benchmark/exec-score.json").exists() {
        exec_path = Some("target/memory-benchmark/exec-score.json".to_string());
    }

    let baseline = read_score(&baseline_path);
    let exec = read_score(&exec_path);
    let population_count = read_population(&population);

    let mut top = BTreeMap::new();
    top.insert("kind".to_string(), Json::Str("final-score".to_string()));
    top.insert(
        "baseline".to_string(),
        match &baseline {
            Some(v) => v.clone(),
            None => Json::Null,
        },
    );
    top.insert(
        "exec".to_string(),
        match &exec {
            Some(v) => v.clone(),
            None => Json::Null,
        },
    );
    top.insert(
        "population_entries".to_string(),
        Json::Int(population_count as i64),
    );

    let json_str = Json::Object(top).to_string();
    write_file(&out, &json_str);

    // Comparison matrix.
    if let Some(p) = &comparison {
        let matrix = build_matrix(&baseline, &exec);
        write_file(&Some(p.clone()), &matrix.to_string());
    }

    // Triangulation seed.
    if let Some(p) = &triangulation {
        let t = json::obj(&[
            ("kind", Json::Str("triangulation".to_string())),
            (
                "note",
                Json::Str("populated when prompt-score is available".to_string()),
            ),
        ]);
        write_file(&Some(p.clone()), &t.to_string());
    }

    // Curriculum proposals (empty unless the harness detects ≥ 0.85 axis scores).
    if let Some(p) = &curriculum {
        let body = json::obj(&[
            ("kind", Json::Str("curriculum-proposals".to_string())),
            ("proposals", Json::Array(vec![])),
        ]);
        write_file(&Some(p.clone()), &body.to_string());
    }

    if let Some(p) = &markdown {
        let mut md = String::from("# Memory Benchmark Final Report\n\n");
        if let Some(b) = &baseline {
            md.push_str(&format!("## Baseline\n\n```\n{}\n```\n\n", b.to_string()));
        }
        if let Some(e) = &exec {
            md.push_str(&format!("## Exec\n\n```\n{}\n```\n\n", e.to_string()));
        }
        md.push_str(&format!(
            "## Population\n\nLedger entries: {}\n",
            population_count
        ));
        write_file(&Some(p.clone()), &md);
    }

    eprintln!(
        "population_report: baseline={} exec={} population_entries={}",
        baseline.is_some(),
        exec.is_some(),
        population_count
    );
}

fn read_score(p: &Option<String>) -> Option<Json> {
    let p = p.as_ref()?;
    let s = fs::read_to_string(p).ok()?;
    json::parse(&s).ok()
}

fn read_population(p: &Option<String>) -> usize {
    let Some(p) = p.as_ref() else {
        return 0;
    };
    let Ok(s) = fs::read_to_string(p) else {
        return 0;
    };
    s.lines().filter(|l| !l.trim().is_empty()).count()
}

fn build_matrix(baseline: &Option<Json>, exec: &Option<Json>) -> Json {
    let mut rows: Vec<Json> = Vec::new();
    if let Some(b) = baseline {
        if let Json::Object(m) = b {
            if let (Some(Json::Str(name)), Some(Json::Float(total))) =
                (m.get("name"), m.get("total"))
            {
                rows.push(json::obj(&[
                    ("name", Json::Str(name.clone())),
                    ("source", Json::Str("baseline".to_string())),
                    ("total", Json::Float(*total)),
                ]));
            }
        }
    }
    if let Some(e) = exec {
        if let Json::Object(m) = e {
            if let (Some(Json::Str(name)), Some(Json::Float(total))) =
                (m.get("name"), m.get("total"))
            {
                rows.push(json::obj(&[
                    ("name", Json::Str(name.clone())),
                    ("source", Json::Str("exec".to_string())),
                    ("total", Json::Float(*total)),
                ]));
            }
        }
    }
    json::obj(&[
        ("kind", Json::Str("comparison-matrix".to_string())),
        ("rows", Json::Array(rows)),
    ])
}

fn write_file(path: &Option<String>, content: &str) {
    if let Some(p) = path {
        if let Some(parent) = std::path::Path::new(p).parent() {
            let _ = fs::create_dir_all(parent);
        }
        let mut f = match fs::File::create(p) {
            Ok(f) => f,
            Err(e) => {
                eprintln!("population_report: write {}: {}", p, e);
                return;
            }
        };
        let _ = f.write_all(content.as_bytes());
    }
}
