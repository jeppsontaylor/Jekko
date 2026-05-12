//! Shared deterministic runner for the benchmark binaries.
//!
//! Usage:
//!     bench --candidate <name> [--out <path>] [--json]
//!
//! Reference candidates:
//!   baseline | reference_context_pack | reference_evidence_ledger |
//!   reference_claim_skeptic
//!
//! Always deterministic. Two invocations with identical input produce
//! byte-identical output (FNV-1a-hashed in `verify_determinism`).

use std::collections::BTreeMap;
use std::env;
use std::fs;
use std::process;

use crate::adapters::{
    baseline, reference_claim_skeptic, reference_context_pack, reference_evidence_ledger,
};
use crate::json::{self, Json};
use crate::memory_api::axes_to_json;
use crate::runner_support::{accumulate, average, run_fixture, weighted_fraction};
use crate::{AxisScores, MemorySystem};

pub const DEFAULT_REFERENCE_CANDIDATES: &[&str] = &[
    "baseline",
    "reference_context_pack",
    "reference_evidence_ledger",
    "reference_claim_skeptic",
];

pub struct CandidateReport {
    pub name: String,
    pub total: f32,
    pub fixtures_run: u32,
    pub fixtures_passed: u32,
    pub json: String,
}

fn parse_args() -> (String, Option<String>) {
    let mut candidate = String::new();
    let mut out: Option<String> = None;
    let args: Vec<String> = env::args().collect();
    let mut i = 1;
    while i < args.len() {
        match args[i].as_str() {
            "--candidate" => {
                candidate = match args.get(i + 1) {
                    Some(value) => value.clone(),
                    None => String::new(),
                };
                i += 2;
            }
            "--out" => {
                out = args.get(i + 1).cloned();
                i += 2;
            }
            "--json" => {
                i += 1;
            }
            "--help" | "-h" => {
                eprintln!(
                    "bench --candidate <name> [--out <path>] [--json]\n  candidate in {{baseline, reference_context_pack, reference_evidence_ledger, reference_claim_skeptic, \
                     ledger_first, hybrid_index, temporal_graph, compression_first, skeptic_dataset}}"
                );
                process::exit(0);
            }
            _ => {
                i += 1;
            }
        }
    }
    if candidate.is_empty() {
        eprintln!("bench: --candidate <name> is required");
        process::exit(2);
    }
    (candidate, out)
}

fn boxed_adapter(name: &str) -> Result<Box<dyn MemorySystem>, String> {
    match name {
        "baseline" => Ok(Box::new(baseline::Adapter::default())),
        "reference_context_pack" => Ok(Box::new(reference_context_pack::Adapter::default())),
        "reference_evidence_ledger" => Ok(Box::new(reference_evidence_ledger::Adapter::default())),
        "reference_claim_skeptic" => Ok(Box::new(reference_claim_skeptic::Adapter::default())),
        // Other candidate names still map to the baseline adapter while their
        // dedicated implementations remain in progress.
        "exec" | "ledger_first" | "hybrid_index" | "temporal_graph" | "compression_first"
        | "skeptic_dataset" => Ok(Box::new(baseline::Adapter::default())),
        other => Err(format!("unknown candidate {:?}", other)),
    }
}

pub fn run_cli() {
    let (candidate, out_path) = parse_args();
    let report = match run_candidate(&candidate) {
        Ok(report) => report,
        Err(e) => {
            eprintln!("{}", e);
            process::exit(2);
        }
    };

    if let Some(p) = out_path {
        if let Some(parent) = std::path::Path::new(&p).parent() {
            let _ = fs::create_dir_all(parent);
        }
        if let Err(e) = fs::write(&p, &report.json) {
            eprintln!("bench: write {} failed: {}", p, e);
            process::exit(3);
        }
        eprintln!(
            "bench: candidate={} total={:.2} fixtures={}/{} -> {}",
            report.name, report.total, report.fixtures_passed, report.fixtures_run, p
        );
    } else {
        println!("{}", report.json);
    }
}

pub fn run_candidate(candidate: &str) -> Result<CandidateReport, String> {
    let mut adapter = boxed_adapter(candidate)?;
    let fixtures = crate::fixture::all();

    let mut axis_totals = AxisScores::default();
    let mut axis_counts = AxisScores::default();
    let mut fixtures_run = 0u32;
    let mut fixtures_passed = 0u32;
    let mut fixture_records: Vec<Json> = Vec::with_capacity(fixtures.len());

    for f in fixtures {
        fixtures_run += 1;
        let mut record = BTreeMap::new();
        record.insert("id".to_string(), Json::Int(f.id as i64));
        record.insert("block".to_string(), Json::Str(f.block.name().to_string()));
        record.insert("domain".to_string(), Json::Str(f.domain.name().to_string()));

        let result = run_fixture(adapter.as_mut(), f);

        let axes = if let Some(r) = result {
            (f.grade)(&r, &f.expected)
        } else {
            // Ingest-only fixtures: no query → no axis is exercised here.
            // All axes marked NaN so they're excluded from averaging.
            AxisScores {
                correctness: f32::NAN,
                provenance: f32::NAN,
                bitemporal_recall: f32::NAN,
                contradiction: f32::NAN,
                math_science: f32::NAN,
                english_discourse_coreference: f32::NAN,
                privacy_redaction: f32::NAN,
                procedural_skill: f32::NAN,
                feedback_adaptation: f32::NAN,
                determinism_rebuild: f32::NAN,
            }
        };

        // Compute weighted score for this fixture (ignoring NaN axes).
        let weighted = weighted_fraction(&axes);
        if weighted >= 0.50 {
            fixtures_passed += 1;
        }

        record.insert("axes".to_string(), axes_to_json(&axes));
        record.insert("weighted".to_string(), Json::Float(weighted as f64));
        fixture_records.push(Json::Object(record));

        accumulate(&mut axis_totals, &mut axis_counts, &axes);
    }

    let avg = average(&axis_totals, &axis_counts);
    // Total: weighted sum of axis averages, normalized to a 100-point scale.
    // Only axes that had ≥ 1 contributing fixture count toward the
    // weight-normalizer. This makes the total faithful to what the fixture
    // set actually exercised, not the rubric's theoretical maximum.
    let w = AxisScores::WEIGHTS;
    let pairs = [
        (avg.correctness, w.correctness, axis_counts.correctness),
        (avg.provenance, w.provenance, axis_counts.provenance),
        (
            avg.bitemporal_recall,
            w.bitemporal_recall,
            axis_counts.bitemporal_recall,
        ),
        (
            avg.contradiction,
            w.contradiction,
            axis_counts.contradiction,
        ),
        (avg.math_science, w.math_science, axis_counts.math_science),
        (
            avg.english_discourse_coreference,
            w.english_discourse_coreference,
            axis_counts.english_discourse_coreference,
        ),
        (
            avg.privacy_redaction,
            w.privacy_redaction,
            axis_counts.privacy_redaction,
        ),
        (
            avg.procedural_skill,
            w.procedural_skill,
            axis_counts.procedural_skill,
        ),
        (
            avg.feedback_adaptation,
            w.feedback_adaptation,
            axis_counts.feedback_adaptation,
        ),
        (
            avg.determinism_rebuild,
            w.determinism_rebuild,
            axis_counts.determinism_rebuild,
        ),
    ];
    let mut sum = 0.0_f32;
    let mut wsum = 0.0_f32;
    for (v, weight, c) in pairs {
        if c > 0.0 {
            sum += v * weight;
            wsum += weight;
        }
    }
    let total = if wsum > 0.0 { sum / wsum * 100.0 } else { 0.0 };

    let mut top = BTreeMap::new();
    top.insert("name".to_string(), Json::Str(candidate.to_string()));
    top.insert("total".to_string(), Json::Float(total as f64));
    top.insert("axes".to_string(), axes_to_json(&avg));
    top.insert("fixtures_run".to_string(), Json::Int(fixtures_run as i64));
    top.insert(
        "fixtures_passed".to_string(),
        Json::Int(fixtures_passed as i64),
    );
    top.insert("fixtures".to_string(), Json::Array(fixture_records));
    let s = Json::Object(top).to_string();

    Ok(CandidateReport {
        name: candidate.to_string(),
        total,
        fixtures_run,
        fixtures_passed,
        json: s,
    })
}

// Anchor the `json` re-export so callers retain the symbol path.
#[allow(dead_code)]
fn _anchor(_: json::Json) {}
