use anyhow::{Context, Result};
use jnoccio_fusion::config::load_app_config;
use jnoccio_fusion::failure_log::{build_failure_log_entry, write_failure_log};
use jnoccio_fusion::openai::ChatCompletionRequest;
use jnoccio_fusion::providers;
use jnoccio_fusion::telemetry;
use serde::Serialize;
use serde_json::{Map, json};
use std::fs;
use std::path::PathBuf;
use std::time::Instant;

#[derive(Serialize)]
struct ProbeRun {
    started_at: String,
    finished_at: String,
    config: String,
    env_file: Option<String>,
    receipts_dir: String,
    registry_models: usize,
    records: Vec<ProbeRecord>,
}

#[derive(Serialize)]
struct ProbeRecord {
    visible_id: String,
    provider: String,
    status: String,
    readiness: String,
    elapsed_ms: Option<u64>,
    missing_env: Vec<String>,
    error: Option<String>,
}

#[tokio::main]
async fn main() -> Result<()> {
    telemetry::init();
    let (config_path, env_path) = parse_args(std::env::args().skip(1).collect());
    let config = load_app_config(&config_path, env_path.as_deref())?;
    let models = jnoccio_fusion::config::resolve_models(&config)?;
    let started_at = chrono::Utc::now();
    let run_dir = config
        .receipts_dir
        .join("probes")
        .join(started_at.format("%Y%m%dT%H%M%SZ").to_string());
    fs::create_dir_all(&run_dir).with_context(|| format!("create {}", run_dir.display()))?;

    let http = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(120))
        .build()
        .context("build http client")?;

    let mut records = Vec::with_capacity(models.len());
    for model in models {
        let readiness = model.readiness_status().to_string();
        if !model.is_ready() {
            let mut missing_env = model.base_url_missing_keys.clone();
            if !model.key_present {
                missing_env.insert(0, model.entry.env.api_key.clone());
            }
            records.push(ProbeRecord {
                visible_id: model.visible_id.clone(),
                provider: model.entry.provider.clone(),
                status: "skipped".to_string(),
                readiness,
                elapsed_ms: None,
                missing_env,
                error: None,
            });
            continue;
        }

        let request = ChatCompletionRequest {
            model: model.entry.model.clone(),
            messages: vec![json!({
                "role": "user",
                "content": "Return the single word ok."
            })],
            stream: Some(false),
            temperature: Some(0.0),
            top_p: None,
            max_tokens: Some(1),
            max_completion_tokens: None,
            tools: None,
            tool_choice: None,
            reasoning_effort: None,
            response_format: None,
            stream_options: None,
            extra: Map::new(),
        };
        let body = jnoccio_fusion::providers::openai_compatible::build_body(
            &request,
            &model.entry.model,
            false,
            None,
            request.messages.clone(),
            model.entry.api.completion_tokens_param.as_deref(),
            &model.entry.api.style,
        );
        let client = providers::client(
            http.clone(),
            &model.entry.api.style,
            model.base_url.clone(),
            model.api_key.clone().unwrap_or_default(),
            model.entry.provider.clone(),
        );
        let started = Instant::now();
        match client.complete(&request, body).await {
            Ok(_) => records.push(ProbeRecord {
                visible_id: model.visible_id.clone(),
                provider: model.entry.provider.clone(),
                status: "ok".to_string(),
                readiness,
                elapsed_ms: Some(started.elapsed().as_millis() as u64),
                missing_env: model.base_url_missing_keys.clone(),
                error: None,
            }),
            Err(err) => {
                let request_id = uuid::Uuid::new_v4().to_string();
                let failure = build_failure_log_entry(
                    &request_id,
                    "probe",
                    &model.visible_id,
                    &model.entry.model,
                    &model.entry.api.style,
                    &model.base_url,
                    &err,
                    started.elapsed().as_millis() as u64,
                    std::time::Duration::from_secs(0),
                    request.messages.len(),
                    0,
                    request.stream.unwrap_or(false),
                );
                let _ = write_failure_log(
                    &config.receipts_dir,
                    &model.visible_id,
                    &request_id,
                    "probe",
                    &err,
                    failure,
                );
                records.push(ProbeRecord {
                    visible_id: model.visible_id.clone(),
                    provider: model.entry.provider.clone(),
                    status: "error".to_string(),
                    readiness,
                    elapsed_ms: Some(started.elapsed().as_millis() as u64),
                    missing_env: model.base_url_missing_keys.clone(),
                    error: Some(err.to_string()),
                });
            }
        }
    }

    let finished_at = chrono::Utc::now();
    let run = ProbeRun {
        started_at: started_at.to_rfc3339(),
        finished_at: finished_at.to_rfc3339(),
        config: config_path.display().to_string(),
        env_file: env_path.as_ref().map(|path| path.display().to_string()),
        receipts_dir: run_dir.display().to_string(),
        registry_models: records.len(),
        records,
    };

    let manifest_path = run_dir.join("manifest.json");
    fs::write(
        &manifest_path,
        serde_json::to_vec_pretty(&run).context("serialize probe manifest")?,
    )
    .with_context(|| format!("write {}", manifest_path.display()))?;

    for record in &run.records {
        let path = run_dir.join(format!("{}.json", sanitize_path(&record.visible_id)));
        fs::write(
            &path,
            serde_json::to_vec_pretty(record).context("serialize probe record")?,
        )
        .with_context(|| format!("write {}", path.display()))?;
    }

    println!(
        "{}",
        serde_json::to_string_pretty(&run).context("render probe run")?
    );
    Ok(())
}

fn parse_args(args: Vec<String>) -> (PathBuf, Option<PathBuf>) {
    let mut config = PathBuf::from("config/server.json");
    let mut env_file = None;
    let mut iter = args.into_iter();
    while let Some(arg) = iter.next() {
        match arg.as_str() {
            "--config" => {
                if let Some(value) = iter.next() {
                    config = PathBuf::from(value);
                }
            }
            "--env-file" => {
                if let Some(value) = iter.next() {
                    env_file = Some(PathBuf::from(value));
                }
            }
            "--help" | "-h" => {
                println!("provider_probe --config <path> --env-file <path>");
                std::process::exit(0);
            }
            _ => {}
        }
    }
    (config, env_file)
}

fn sanitize_path(value: &str) -> String {
    value
        .chars()
        .map(|ch| match ch {
            '/' | '\\' | ':' | ' ' => '_',
            _ => ch,
        })
        .collect()
}
