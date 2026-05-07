use crate::limits::{ParsedLimitSignal, parse_limit_signal};
use crate::providers::openai_compatible::ProviderError;
use anyhow::{Context, Result};
use serde::Serialize;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::Duration;

#[derive(Clone, Debug, Serialize)]
pub struct FailureLogEntry {
    pub request_id: String,
    pub phase: String,
    pub provider: String,
    pub visible_id: String,
    pub upstream_model: String,
    pub api_style: String,
    pub base_url: String,
    pub status_code: Option<u16>,
    pub status_text: Option<String>,
    pub error_kind: String,
    pub latency_ms: u64,
    pub cooldown_seconds: u64,
    pub retry_after_seconds: Option<u64>,
    pub response_headers: Vec<HeaderLine>,
    pub upstream_error_body: String,
    pub parsed_limit_signal: Option<ParsedLimitSignal>,
    pub request_message_count: usize,
    pub request_tool_count: usize,
    pub request_stream: bool,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct HeaderLine {
    pub name: String,
    pub value: String,
}

pub fn write_failure_log(
    receipts_dir: &Path,
    visible_id: &str,
    request_id: &str,
    phase: &str,
    error: &ProviderError,
    entry: FailureLogEntry,
) -> Result<PathBuf> {
    let dir = receipts_dir
        .join("failures")
        .join(&error.provider)
        .join(sanitize_component(visible_id));
    fs::create_dir_all(&dir).with_context(|| format!("create {}", dir.display()))?;
    let path = dir.join(format!(
        "{}_{}_{}.json",
        entry.created_at,
        sanitize_component(request_id),
        sanitize_component(phase)
    ));
    let path = with_unique_suffix(&path);
    fs::write(
        &path,
        serde_json::to_vec_pretty(&entry).context("serialize failure log")?,
    )
    .with_context(|| format!("write {}", path.display()))?;
    rotate_failure_logs(&dir)?;
    Ok(path)
}

fn rotate_failure_logs(dir: &Path) -> Result<()> {
    let mut files = fs::read_dir(dir)
        .with_context(|| format!("read {}", dir.display()))?
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .filter(|path| path.extension().and_then(|ext| ext.to_str()) == Some("json"))
        .collect::<Vec<_>>();
    files.sort();
    if files.len() <= 20 {
        return Ok(());
    }
    let remove_count = files.len() - 20;
    for path in files.into_iter().take(remove_count) {
        let _ = fs::remove_file(&path);
    }
    Ok(())
}

fn with_unique_suffix(path: &Path) -> PathBuf {
    if !path.exists() {
        return path.to_path_buf();
    }
    let stem = path
        .file_stem()
        .and_then(|value| value.to_str())
        .unwrap_or("failure");
    let ext = path.extension().and_then(|value| value.to_str());
    for index in 1..1000 {
        let candidate = path.with_file_name(match ext {
            Some(ext) => format!("{stem}-{index}.{ext}"),
            None => format!("{stem}-{index}"),
        });
        if !candidate.exists() {
            return candidate;
        }
    }
    path.to_path_buf()
}

#[allow(clippy::too_many_arguments)]
pub fn build_failure_log_entry(
    request_id: &str,
    phase: &str,
    visible_id: &str,
    upstream_model: &str,
    api_style: &str,
    base_url: &str,
    error: &ProviderError,
    latency_ms: u64,
    cooldown: Duration,
    message_count: usize,
    tool_count: usize,
    stream: bool,
) -> FailureLogEntry {
    FailureLogEntry {
        request_id: request_id.to_string(),
        phase: phase.to_string(),
        provider: error.provider.clone(),
        visible_id: visible_id.to_string(),
        upstream_model: upstream_model.to_string(),
        api_style: api_style.to_string(),
        base_url: base_url.to_string(),
        status_code: error.status_code,
        status_text: error.status_text.clone(),
        error_kind: format!("{:?}", error.kind),
        latency_ms,
        cooldown_seconds: cooldown.as_secs(),
        retry_after_seconds: error.retry_after.map(|value| value.as_secs()),
        response_headers: sanitize_headers(&error.headers),
        parsed_limit_signal: parse_limit_signal(&error.body),
        upstream_error_body: sanitize_body(&error.body),
        request_message_count: message_count,
        request_tool_count: tool_count,
        request_stream: stream,
        created_at: chrono::Utc::now().format("%Y%m%dT%H%M%SZ").to_string(),
    }
}

fn sanitize_headers(headers: &reqwest::header::HeaderMap) -> Vec<HeaderLine> {
    headers
        .iter()
        .filter_map(|(name, value)| {
            let lower = name.as_str().to_ascii_lowercase();
            if lower.contains("authorization")
                || lower.contains("cookie")
                || lower.contains("token")
                || lower.contains("api-key")
                || lower.contains("set-cookie")
            {
                return None;
            }
            Some(HeaderLine {
                name: lower,
                value: value
                    .to_str()
                    .ok()
                    .map(sanitize_value)
                    .unwrap_or_else(|| "<non-utf8>".to_string()),
            })
        })
        .collect()
}

fn sanitize_body(body: &str) -> String {
    let mut redacted = Vec::new();
    let mut redact_next = false;
    for token in body.replace('\r', " ").split_whitespace() {
        if redact_next {
            redacted.push("[redacted]".to_string());
            redact_next = false;
            continue;
        }
        if token.eq_ignore_ascii_case("bearer") {
            redacted.push("[redacted]".to_string());
            redact_next = true;
            continue;
        }
        if token.starts_with("sk-") || token.starts_with("ghp_") || token.starts_with("rk-") {
            redacted.push("[redacted]".to_string());
            continue;
        }
        redacted.push(token.to_string());
    }
    sanitize_value(&redacted.join(" "))
}

fn sanitize_value(value: &str) -> String {
    value.chars().take(2000).collect()
}

fn sanitize_component(value: &str) -> String {
    value
        .chars()
        .map(|ch| match ch {
            '/' | '\\' | ':' | ' ' => '_',
            _ => ch,
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::limits::ErrorKind;
    use crate::providers::openai_compatible::ProviderError;
    use axum::http::HeaderMap;

    fn error(body: &str) -> ProviderError {
        let mut headers = HeaderMap::new();
        headers.insert("content-type", "application/json".parse().unwrap());
        ProviderError {
            provider: "kilo".to_string(),
            api_style: "openai_responses".to_string(),
            endpoint: "/responses".to_string(),
            status_code: Some(429),
            status_text: Some("Too Many Requests".to_string()),
            headers,
            body: body.to_string(),
            kind: ErrorKind::RateLimited,
            retry_after: Some(Duration::from_secs(17)),
        }
    }

    #[test]
    fn sanitizes_body() {
        let entry = build_failure_log_entry(
            "request-1",
            "probe",
            "provider/model",
            "upstream",
            "openai_responses",
            "https://example.com",
            &error("Bearer sk-secret\nhello world"),
            12,
            Duration::from_secs(17),
            1,
            0,
            false,
        );
        assert!(!entry.upstream_error_body.contains("sk-secret"));
        assert!(!entry.upstream_error_body.contains("Bearer "));
    }

    #[test]
    fn rotates_to_twenty_files() {
        let dir = tempfile::tempdir().unwrap();
        for index in 0..25 {
            let entry = build_failure_log_entry(
                &format!("request-{index}"),
                "probe",
                "provider/model",
                "upstream",
                "openai_responses",
                "https://example.com",
                &error("quota"),
                12,
                Duration::from_secs(17),
                1,
                0,
                false,
            );
            let request_id = entry.request_id.clone();
            let phase = entry.phase.clone();
            let _ = write_failure_log(
                dir.path(),
                "provider/model",
                &request_id,
                &phase,
                &error("quota"),
                entry,
            )
            .unwrap();
        }
        let count = fs::read_dir(
            dir.path()
                .join("failures")
                .join("kilo")
                .join("provider_model"),
        )
        .unwrap()
        .count();
        assert_eq!(count, 20);
    }
}
