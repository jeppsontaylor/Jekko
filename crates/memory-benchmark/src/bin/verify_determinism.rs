//! Verify that benchmark JSON is byte-identical across repeated runs.

use std::env;

use memory_benchmark::runner::{run_candidate, DEFAULT_REFERENCE_CANDIDATES};

fn main() {
    let mut single: Option<String> = None;
    let args: Vec<String> = env::args().collect();
    let mut i = 1;
    while i < args.len() {
        match args[i].as_str() {
            "--candidate" => {
                single = args.get(i + 1).cloned();
                i += 2;
            }
            _ => i += 1,
        }
    }

    let candidates: Vec<&str> = match single.as_deref() {
        Some(candidate) => vec![candidate],
        None => DEFAULT_REFERENCE_CANDIDATES.to_vec(),
    };

    let mut ok = true;
    for candidate in candidates {
        let first = run_candidate(candidate).unwrap_or_else(|error| {
            eprintln!("verify_determinism: {}: {}", candidate, error);
            std::process::exit(2);
        });
        let second = run_candidate(candidate).unwrap_or_else(|error| {
            eprintln!("verify_determinism: {}: {}", candidate, error);
            std::process::exit(2);
        });

        if first.json == second.json {
            eprintln!(
                "verify_determinism: OK candidate={} bytes={}",
                candidate,
                first.json.len()
            );
        } else {
            eprintln!(
                "verify_determinism: MISMATCH candidate={} ({} vs {} bytes)",
                candidate,
                first.json.len(),
                second.json.len()
            );
            ok = false;
        }
    }

    std::process::exit(if ok { 0 } else { 1 });
}
