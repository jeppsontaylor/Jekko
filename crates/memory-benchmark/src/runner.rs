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
use crate::fixture::{Fixture, Setup, SetupEvent};
use crate::json::{self, Json};
use crate::memory_api::axes_to_json;
use crate::{
    AxisScores, ClaimModality, Event, EventKind, Feedback, MemorySystem, Outcome, PrivacyClass,
    Query, RecallResult, Source, TemporalLens,
};

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

fn privacy_of(s: &str) -> PrivacyClass {
    match s {
        "Public" => PrivacyClass::Public,
        "Internal" => PrivacyClass::Internal,
        "Confidential" => PrivacyClass::Confidential,
        "Secret" => PrivacyClass::Secret,
        "Vault" => PrivacyClass::Vault,
        _ => PrivacyClass::Internal,
    }
}

fn kind_of(s: &str) -> EventKind {
    match s {
        "Claim" => EventKind::Claim,
        "Observation" => EventKind::Observation,
        "Equation" => EventKind::Equation,
        "Theorem" => EventKind::Theorem,
        "Skill" => EventKind::Skill,
        "Resource" => EventKind::Resource,
        "Dataset" => EventKind::Dataset,
        "Experiment" => EventKind::Experiment,
        "Hypothesis" => EventKind::Hypothesis,
        "Counterexample" => EventKind::Counterexample,
        "Lesson" => EventKind::Lesson,
        "Question" => EventKind::Question,
        "VaultCanary" => EventKind::VaultCanary,
        "SchemaMigration" => EventKind::SchemaMigration,
        _ => EventKind::Claim,
    }
}

fn modality_of(s: &str) -> Option<ClaimModality> {
    Some(match s {
        "Observed" => ClaimModality::Observed,
        "AssertedBySource" => ClaimModality::AssertedBySource,
        "InferredByAgent" => ClaimModality::InferredByAgent,
        "HumanApproved" => ClaimModality::HumanApproved,
        "FormallyVerified" => ClaimModality::FormallyVerified,
        _ => return None,
    })
}

fn outcome_of(s: &str) -> Outcome {
    match s {
        "TaskSuccess" => Outcome::TaskSuccess,
        "TaskFailure" => Outcome::TaskFailure,
        "Verified" => Outcome::Verified,
        "Falsified" => Outcome::Falsified,
        _ => Outcome::Ignored,
    }
}

fn setup_event_to_event(se: &SetupEvent) -> Event {
    Event {
        id: se.id.to_string(),
        kind: kind_of(se.kind),
        subject: se.subject.to_string(),
        body: se.body.to_string(),
        sources: vec![Source {
            uri: se.source_uri.to_string(),
            citation: se.source_citation.to_string(),
            quality: se.source_quality,
        }],
        valid_from: se.valid_from.map(|s| s.to_string()),
        valid_to: se.valid_to.map(|s| s.to_string()),
        tx_time: se.tx_time.to_string(),
        event_time: None,
        observation_time: None,
        review_time: None,
        policy_time: None,
        dependencies: vec![],
        supersedes: vec![],
        contradicts: vec![],
        derived_from: vec![],
        namespace: None,
        privacy_class: privacy_of(se.privacy),
        claim_modality: se.claim_modality.and_then(modality_of),
        tags: se.tags.iter().map(|s| s.to_string()).collect(),
    }
}

fn build_query(f: &Fixture) -> Option<Query> {
    f.query_text.map(|t| Query {
        text: t.to_string(),
        intent: f.query_intent,
        mentions: f.query_mentions.iter().map(|s| s.to_string()).collect(),
        token_budget: 4096,
    })
}

fn run_fixture(adapter: &mut dyn MemorySystem, f: &Fixture) -> Option<RecallResult> {
    // Setup phase.
    match &f.setup {
        Setup::NoSetup => {}
        Setup::Observe(events) => {
            for se in *events {
                let e = setup_event_to_event(se);
                let _ = adapter.observe(&e);
            }
        }
        Setup::Feedback {
            outcome_kind,
            used_event_ids,
            reason,
        } => {
            let fb = Feedback {
                outcome: outcome_of(outcome_kind),
                used: used_event_ids.iter().map(|s| s.to_string()).collect(),
                reason: Some(reason.to_string()),
            };
            let _ = adapter.feedback("pack-fixture", &fb);
        }
        Setup::Rebuild => {
            let _ = adapter.rebuild();
        }
        Setup::Forget { memory_id, reason } => {
            let _ = adapter.forget(memory_id, reason);
        }
    }
    // Query phase.
    let q = build_query(f)?;
    let result = match f.lens {
        TemporalLens::Current => adapter.recall(&q),
        TemporalLens::At => adapter.recall_at(&q, f.world_time.unwrap_or("")),
        TemporalLens::AsOf => adapter.recall_as_of(&q, f.tx_time.unwrap_or("")),
        TemporalLens::AtAsOf => adapter.recall_at(&q, f.world_time.unwrap_or("")),
        TemporalLens::NoQuery => return None,
    };
    Some(result)
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

fn add_if_active(total: &mut f32, count: &mut f32, value: f32) {
    if !value.is_nan() {
        *total += value;
        *count += 1.0;
    }
}

fn accumulate(totals: &mut AxisScores, counts: &mut AxisScores, a: &AxisScores) {
    add_if_active(
        &mut totals.correctness,
        &mut counts.correctness,
        a.correctness,
    );
    add_if_active(&mut totals.provenance, &mut counts.provenance, a.provenance);
    add_if_active(
        &mut totals.bitemporal_recall,
        &mut counts.bitemporal_recall,
        a.bitemporal_recall,
    );
    add_if_active(
        &mut totals.contradiction,
        &mut counts.contradiction,
        a.contradiction,
    );
    add_if_active(
        &mut totals.math_science,
        &mut counts.math_science,
        a.math_science,
    );
    add_if_active(
        &mut totals.english_discourse_coreference,
        &mut counts.english_discourse_coreference,
        a.english_discourse_coreference,
    );
    add_if_active(
        &mut totals.privacy_redaction,
        &mut counts.privacy_redaction,
        a.privacy_redaction,
    );
    add_if_active(
        &mut totals.procedural_skill,
        &mut counts.procedural_skill,
        a.procedural_skill,
    );
    add_if_active(
        &mut totals.feedback_adaptation,
        &mut counts.feedback_adaptation,
        a.feedback_adaptation,
    );
    add_if_active(
        &mut totals.determinism_rebuild,
        &mut counts.determinism_rebuild,
        a.determinism_rebuild,
    );
}

/// Compute a single fixture's weighted-score fraction (0.0–1.0). NaN axes are
/// excluded; only the axes the fixture exercises contribute.
fn weighted_fraction(a: &AxisScores) -> f32 {
    let w = AxisScores::WEIGHTS;
    let mut sum = 0.0_f32;
    let mut wsum = 0.0_f32;
    let pairs = [
        (a.correctness, w.correctness),
        (a.provenance, w.provenance),
        (a.bitemporal_recall, w.bitemporal_recall),
        (a.contradiction, w.contradiction),
        (a.math_science, w.math_science),
        (
            a.english_discourse_coreference,
            w.english_discourse_coreference,
        ),
        (a.privacy_redaction, w.privacy_redaction),
        (a.procedural_skill, w.procedural_skill),
        (a.feedback_adaptation, w.feedback_adaptation),
        (a.determinism_rebuild, w.determinism_rebuild),
    ];
    for (v, weight) in pairs {
        if !v.is_nan() {
            sum += v * weight;
            wsum += weight;
        }
    }
    if wsum > 0.0 {
        sum / wsum
    } else {
        // Ingest-only fixture (no axes exercised). Treat as neutral.
        0.5
    }
}

fn average(t: &AxisScores, c: &AxisScores) -> AxisScores {
    let safe = |a: f32, b: f32| if b > 0.0 { a / b } else { 0.0 };
    AxisScores {
        correctness: safe(t.correctness, c.correctness),
        provenance: safe(t.provenance, c.provenance),
        bitemporal_recall: safe(t.bitemporal_recall, c.bitemporal_recall),
        contradiction: safe(t.contradiction, c.contradiction),
        math_science: safe(t.math_science, c.math_science),
        english_discourse_coreference: safe(
            t.english_discourse_coreference,
            c.english_discourse_coreference,
        ),
        privacy_redaction: safe(t.privacy_redaction, c.privacy_redaction),
        procedural_skill: safe(t.procedural_skill, c.procedural_skill),
        feedback_adaptation: safe(t.feedback_adaptation, c.feedback_adaptation),
        determinism_rebuild: safe(t.determinism_rebuild, c.determinism_rebuild),
    }
}

// Anchor the `json` re-export so callers retain the symbol path.
#[allow(dead_code)]
fn _anchor(_: json::Json) {}
