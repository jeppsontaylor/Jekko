use anyhow::{Context, Result, anyhow, bail};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::{Path, PathBuf};
use std::str::FromStr;

pub const MAX_RUNTIME_WORKER_THREADS: usize = 10;
pub const MAX_MANAGED_INSTANCES: usize = 10;
pub const DEFAULT_SPAWN_BATCH_LIMIT: usize = 5;

#[derive(Clone, Debug, Deserialize)]
pub struct ServerConfig {
    pub bind: Option<String>,
    pub database: Option<String>,
    pub env_file: Option<String>,
    pub models_file: Option<String>,
    pub receipts_dir: Option<String>,
    pub model: Option<String>,
    pub provider: Option<String>,
    pub routing: Option<ServerRoutingConfig>,
    pub runtime: Option<ServerRuntimeConfig>,
    pub scaling: Option<ServerScalingConfig>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ServerRoutingConfig {
    pub fusion_sample_rate: Option<f64>,
    pub fast_backup_count: Option<usize>,
    pub event_retention_rows: Option<usize>,
    pub minute_bucket_retention_days: Option<u64>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ServerRuntimeConfig {
    pub worker_threads: Option<usize>,
    pub spawned_worker_threads: Option<usize>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ServerScalingConfig {
    pub max_instances: Option<usize>,
    pub spawn_batch_limit: Option<usize>,
}

#[derive(Clone, Debug)]
pub struct RoutingDefaults {
    pub fusion_sample_rate: f64,
    pub fast_backup_count: usize,
    pub event_retention_rows: usize,
    pub minute_bucket_retention_days: u64,
}

#[derive(Clone, Debug)]
pub struct RuntimeSettings {
    pub worker_threads: usize,
    pub spawned_worker_threads: usize,
}

#[derive(Clone, Debug)]
pub struct ScalingSettings {
    pub max_instances: usize,
    pub spawn_batch_limit: usize,
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum InstanceRole {
    Main,
    Spawned,
}

impl InstanceRole {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Main => "main",
            Self::Spawned => "spawned",
        }
    }
}

impl FromStr for InstanceRole {
    type Err = anyhow::Error;

    fn from_str(value: &str) -> Result<Self> {
        match value {
            "main" => Ok(Self::Main),
            "spawned" => Ok(Self::Spawned),
            _ => bail!("invalid instance role {value:?}; expected main or spawned"),
        }
    }
}

#[derive(Clone, Debug, Deserialize)]
pub struct Registry {
    pub schema_version: u64,
    pub models: Vec<ModelEntry>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelEntry {
    pub id: String,
    pub provider: String,
    pub model: String,
    pub display_name: String,
    pub api: ModelApi,
    pub env: ModelEnv,
    pub signup_url: String,
    pub limits: ModelLimits,
    pub context_window: u64,
    pub max_output_tokens: u64,
    pub capabilities: ModelCapabilities,
    pub score: ModelScore,
    pub routing: ModelRouting,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelApi {
    pub style: String,
    pub base_url: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub completion_tokens_param: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelEnv {
    pub api_key: String,
}

#[derive(Clone, Debug)]
pub struct EnvResolution {
    pub value: String,
    pub missing_keys: Vec<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelLimits {
    pub rpm: Option<u64>,
    pub rpd: Option<u64>,
    pub rpd_after_10_usd_credits: Option<u64>,
    pub source_url: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelCapabilities {
    pub streaming: bool,
    pub tools: bool,
    pub reasoning: bool,
    pub openai_compatible: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelScore {
    pub power: u64,
    pub free_quota: u64,
    pub reliability: u64,
    pub integration: u64,
    pub latency: u64,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ModelRouting {
    pub enabled: bool,
    pub roles: Vec<String>,
    pub exploration_floor: f64,
    pub cooldown_seconds: u64,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub disabled_reason: Option<String>,
}

#[derive(Clone, Debug)]
pub struct ResolvedModel {
    pub entry: ModelEntry,
    pub visible_id: String,
    pub api_key: Option<String>,
    pub key_present: bool,
    pub base_url: String,
    pub base_url_missing_keys: Vec<String>,
}

impl ResolvedModel {
    pub fn readiness_status(&self) -> &'static str {
        if !self.key_present {
            return "missing_key";
        }
        if !self.base_url_missing_keys.is_empty() || self.base_url.trim().is_empty() {
            return "incomplete_env";
        }
        "ready"
    }

    pub fn is_ready(&self) -> bool {
        self.readiness_status() == "ready"
    }
}

#[derive(Clone, Debug)]
pub struct AppConfig {
    pub config_path: PathBuf,
    pub env_path: PathBuf,
    pub root: PathBuf,
    pub server: ServerConfig,
    pub registry: Registry,
    pub env: HashMap<String, String>,
    pub bind: String,
    pub database: PathBuf,
    pub receipts_dir: PathBuf,
    pub visible_model_id: String,
    pub provider_id: String,
    pub routing: RoutingDefaults,
    pub runtime: RuntimeSettings,
    pub scaling: ScalingSettings,
    pub instance_role: InstanceRole,
    pub worker_threads: usize,
}

pub fn load_app_config(
    config_path: impl AsRef<Path>,
    env_override: Option<&Path>,
) -> Result<AppConfig> {
    let config_path = canonicalize_fallback(config_path.as_ref())?;
    let root = config_path
        .parent()
        .and_then(Path::parent)
        .map(Path::to_path_buf)
        .ok_or_else(|| anyhow!("config path must be nested under a directory"))?;
    let text = fs::read_to_string(&config_path)
        .with_context(|| format!("read {}", config_path.display()))?;
    let server: ServerConfig =
        serde_json::from_str(&text).with_context(|| format!("parse {}", config_path.display()))?;
    let env_path = env_override
        .map(Path::to_path_buf)
        .or_else(|| server.env_file.as_ref().map(PathBuf::from))
        .unwrap_or_else(|| root.join(".env.jnoccio"));
    let env_path = if env_path.is_absolute() {
        env_path
    } else {
        root.join(env_path)
    };
    let mut env = std::env::vars().collect::<HashMap<_, _>>();
    if env_path.exists() {
        env.extend(parse_env_file(
            &fs::read_to_string(&env_path)
                .with_context(|| format!("read {}", env_path.display()))?,
        ));
    }

    let models_path = server
        .models_file
        .as_ref()
        .map(PathBuf::from)
        .unwrap_or_else(|| root.join("models.json"));
    let models_path = if models_path.is_absolute() {
        models_path
    } else {
        root.join(models_path)
    };
    let registry_text = fs::read_to_string(&models_path)
        .with_context(|| format!("read {}", models_path.display()))?;
    let registry: Registry = serde_json::from_str(&registry_text)
        .with_context(|| format!("parse {}", models_path.display()))?;
    validate_registry(&registry)?;

    let visible_model_id = server
        .model
        .clone()
        .unwrap_or_else(|| "jnoccio/jnoccio-fusion".to_string());
    let provider_id = server
        .provider
        .clone()
        .unwrap_or_else(|| "jnoccio".to_string());
    let bind = server
        .bind
        .clone()
        .unwrap_or_else(|| "127.0.0.1:4317".to_string());
    let database = resolve_relative(
        &root,
        server.database.as_deref().unwrap_or("state/jnoccio.sqlite"),
    );
    let receipts_dir =
        resolve_relative(&root, server.receipts_dir.as_deref().unwrap_or("receipts"));
    let routing = RoutingDefaults::from_config(server.routing.as_ref());
    let runtime = RuntimeSettings::from_config(server.runtime.as_ref())?;
    let scaling = ScalingSettings::from_config(server.scaling.as_ref())?;
    let worker_threads = runtime.worker_threads;

    Ok(AppConfig {
        config_path,
        env_path,
        root,
        server,
        registry,
        env,
        bind,
        database,
        receipts_dir,
        visible_model_id,
        provider_id,
        routing,
        runtime,
        scaling,
        instance_role: InstanceRole::Main,
        worker_threads,
    })
}

impl RoutingDefaults {
    pub fn from_config(config: Option<&ServerRoutingConfig>) -> Self {
        Self {
            fusion_sample_rate: config
                .and_then(|config| config.fusion_sample_rate)
                .unwrap_or(0.10)
                .clamp(0.0, 1.0),
            fast_backup_count: config
                .and_then(|config| config.fast_backup_count)
                .unwrap_or(2),
            event_retention_rows: config
                .and_then(|config| config.event_retention_rows)
                .unwrap_or(50_000),
            minute_bucket_retention_days: config
                .and_then(|config| config.minute_bucket_retention_days)
                .unwrap_or(30),
        }
    }
}

impl RuntimeSettings {
    pub fn from_config(config: Option<&ServerRuntimeConfig>) -> Result<Self> {
        let worker_threads = match config.and_then(|config| config.worker_threads) {
            Some(0) => bail!("runtime.worker_threads must be at least 1"),
            Some(value) => value.min(MAX_RUNTIME_WORKER_THREADS),
            None => default_worker_threads(),
        };
        let spawned_worker_threads = match config.and_then(|config| config.spawned_worker_threads) {
            Some(0) => bail!("runtime.spawned_worker_threads must be at least 1"),
            Some(value) => value.min(MAX_RUNTIME_WORKER_THREADS),
            None => 2,
        };
        Ok(Self {
            worker_threads,
            spawned_worker_threads,
        })
    }

    pub fn worker_threads_for_role(&self, role: InstanceRole) -> usize {
        match role {
            InstanceRole::Main => self.worker_threads,
            InstanceRole::Spawned => self.spawned_worker_threads,
        }
    }
}

impl ScalingSettings {
    pub fn from_config(config: Option<&ServerScalingConfig>) -> Result<Self> {
        let max_instances = match config.and_then(|config| config.max_instances) {
            Some(0) => bail!("scaling.max_instances must be at least 1"),
            Some(value) => value.min(MAX_MANAGED_INSTANCES),
            None => MAX_MANAGED_INSTANCES,
        };
        let spawn_batch_limit = match config.and_then(|config| config.spawn_batch_limit) {
            Some(0) => bail!("scaling.spawn_batch_limit must be at least 1"),
            Some(value) => value.min(MAX_MANAGED_INSTANCES),
            None => DEFAULT_SPAWN_BATCH_LIMIT,
        };
        Ok(Self {
            max_instances,
            spawn_batch_limit,
        })
    }
}

pub fn resolve_models(config: &AppConfig) -> Result<Vec<ResolvedModel>> {
    config
        .registry
        .models
        .iter()
        .map(|entry| {
            let api_key = config
                .env
                .get(&entry.env.api_key)
                .cloned()
                .filter(|value| !value.trim().is_empty());
            let key_present = api_key.is_some();
            let base_url = substitute_env_report(&entry.api.base_url, &config.env);
            Ok(ResolvedModel {
                visible_id: format!("{}/{}", entry.provider, entry.id),
                entry: entry.clone(),
                api_key,
                key_present,
                base_url: base_url.value,
                base_url_missing_keys: base_url.missing_keys,
            })
        })
        .collect()
}

fn validate_registry(registry: &Registry) -> Result<()> {
    if registry.schema_version != 1 {
        bail!(
            "unsupported models schema version {}",
            registry.schema_version
        )
    }
    if registry.models.is_empty() {
        bail!("registry has no models")
    }
    let mut ids = HashMap::new();
    for model in &registry.models {
        if model.id.trim().is_empty() {
            bail!("registry contains model with empty id")
        }
        if model.provider.trim().is_empty() {
            bail!("registry contains model {} with empty provider", model.id)
        }
        if model.model.trim().is_empty() {
            bail!(
                "registry contains model {} with empty upstream model id",
                model.id
            )
        }
        if ids.insert(model.id.clone(), true).is_some() {
            bail!("registry contains duplicate model id {}", model.id)
        }
    }
    Ok(())
}

fn resolve_relative(root: &Path, value: &str) -> PathBuf {
    let path = PathBuf::from(value);
    if path.is_absolute() {
        return path;
    }
    root.join(path)
}

fn canonicalize_fallback(path: &Path) -> Result<PathBuf> {
    if path.is_absolute() {
        return Ok(path.to_path_buf());
    }
    Ok(std::env::current_dir()?.join(path))
}

fn parse_env_file(text: &str) -> HashMap<String, String> {
    text.lines()
        .filter_map(|line| {
            let line = line.trim();
            if line.is_empty() || line.starts_with('#') {
                return None;
            }
            let line = line.strip_prefix("export ").unwrap_or(line);
            let (key, value) = line.split_once('=')?;
            let key = key.trim();
            if key.is_empty() {
                return None;
            }
            let value = strip_quotes(value.trim());
            Some((key.to_string(), value))
        })
        .collect()
}

fn strip_quotes(value: &str) -> String {
    if value.len() >= 2 {
        let bytes = value.as_bytes();
        if (bytes.first() == Some(&b'"') && bytes.last() == Some(&b'"'))
            || (bytes.first() == Some(&b'\'') && bytes.last() == Some(&b'\''))
        {
            return value[1..value.len() - 1].to_string();
        }
    }
    value.to_string()
}

pub fn substitute_env(input: &str, env: &HashMap<String, String>) -> String {
    substitute_env_report(input, env).value
}

pub fn substitute_env_report(input: &str, env: &HashMap<String, String>) -> EnvResolution {
    let mut out = String::with_capacity(input.len());
    let mut missing_keys = Vec::new();
    let mut chars = input.chars().peekable();
    while let Some(ch) = chars.next() {
        if ch != '$' {
            out.push(ch);
            continue;
        }
        if chars.peek() == Some(&'{') {
            let _ = chars.next();
            let mut key = String::new();
            for next in chars.by_ref() {
                if next == '}' {
                    break;
                }
                key.push(next);
            }
            if let Some(value) = env.get(&key).filter(|value| !value.trim().is_empty()) {
                out.push_str(value);
            } else {
                push_missing_key(&mut missing_keys, &key);
            }
            continue;
        }
        let mut key = String::new();
        while let Some(next) = chars.peek().copied() {
            if next.is_ascii_alphanumeric() || next == '_' {
                key.push(next);
                let _ = chars.next();
            } else {
                break;
            }
        }
        if key.is_empty() {
            out.push('$');
            continue;
        }
        if let Some(value) = env.get(&key).filter(|value| !value.trim().is_empty()) {
            out.push_str(value);
        } else {
            push_missing_key(&mut missing_keys, &key);
        }
    }
    EnvResolution {
        value: out,
        missing_keys,
    }
}

fn push_missing_key(missing_keys: &mut Vec<String>, key: &str) {
    if missing_keys.iter().any(|missing| missing == key) {
        return;
    }
    missing_keys.push(key.to_string());
}

fn default_worker_threads() -> usize {
    let available = std::thread::available_parallelism()
        .map(|threads| threads.get())
        .unwrap_or(2);
    if available == 1 {
        1
    } else {
        available.clamp(2, MAX_RUNTIME_WORKER_THREADS)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn substitutes_env_variables() {
        let mut env = HashMap::new();
        env.insert("FOO".to_string(), "bar".to_string());
        assert_eq!(substitute_env("x-${FOO}-y", &env), "x-bar-y");
    }

    #[test]
    fn reports_missing_env_variables() {
        let env = HashMap::new();
        let resolution = substitute_env_report("x-${FOO}-y-$BAR", &env);
        assert_eq!(resolution.value, "x--y-");
        assert_eq!(
            resolution.missing_keys,
            vec!["FOO".to_string(), "BAR".to_string()]
        );
    }

    #[test]
    fn parses_env_file() {
        let env = parse_env_file("A=1\n# comment\nexport B='two'\n");
        assert_eq!(env.get("A").map(String::as_str), Some("1"));
        assert_eq!(env.get("B").map(String::as_str), Some("two"));
    }

    #[test]
    fn runtime_and_scaling_defaults_are_bounded() {
        let runtime = RuntimeSettings::from_config(None).unwrap();
        assert_eq!(runtime.worker_threads, default_worker_threads());
        assert_eq!(runtime.spawned_worker_threads, 2);
        assert!((1..=MAX_RUNTIME_WORKER_THREADS).contains(&runtime.worker_threads));
        assert!((1..=MAX_RUNTIME_WORKER_THREADS).contains(&runtime.spawned_worker_threads));

        let scaling = ScalingSettings::from_config(None).unwrap();
        assert_eq!(scaling.max_instances, MAX_MANAGED_INSTANCES);
        assert_eq!(scaling.spawn_batch_limit, DEFAULT_SPAWN_BATCH_LIMIT);
    }

    #[test]
    fn runtime_and_scaling_reject_zero_values() {
        assert!(
            RuntimeSettings::from_config(Some(&ServerRuntimeConfig {
                worker_threads: Some(0),
                spawned_worker_threads: None,
            }))
            .is_err()
        );
        assert!(
            RuntimeSettings::from_config(Some(&ServerRuntimeConfig {
                worker_threads: None,
                spawned_worker_threads: Some(0),
            }))
            .is_err()
        );
        assert!(
            ScalingSettings::from_config(Some(&ServerScalingConfig {
                max_instances: Some(0),
                spawn_batch_limit: None,
            }))
            .is_err()
        );
        assert!(
            ScalingSettings::from_config(Some(&ServerScalingConfig {
                max_instances: None,
                spawn_batch_limit: Some(0),
            }))
            .is_err()
        );
    }

    #[test]
    fn runtime_and_scaling_clamp_values_above_hard_cap() {
        let runtime = RuntimeSettings::from_config(Some(&ServerRuntimeConfig {
            worker_threads: Some(64),
            spawned_worker_threads: Some(64),
        }))
        .unwrap();
        assert_eq!(runtime.worker_threads, MAX_RUNTIME_WORKER_THREADS);
        assert_eq!(runtime.spawned_worker_threads, MAX_RUNTIME_WORKER_THREADS);

        let scaling = ScalingSettings::from_config(Some(&ServerScalingConfig {
            max_instances: Some(64),
            spawn_batch_limit: Some(64),
        }))
        .unwrap();
        assert_eq!(scaling.max_instances, MAX_MANAGED_INSTANCES);
        assert_eq!(scaling.spawn_batch_limit, MAX_MANAGED_INSTANCES);
    }

    #[test]
    fn readiness_status_marks_incomplete_env() {
        let entry: ModelEntry = serde_json::from_value(json!({
            "id": "test",
            "provider": "cloudflare",
            "model": "@cf/test/model",
            "display_name": "Test",
            "api": {
                "style": "cloudflare_openai",
                "base_url": "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1"
            },
            "env": {
                "api_key": "CLOUDFLARE_API_TOKEN"
            },
            "signup_url": "https://example.com",
            "limits": {
                "rpm": null,
                "rpd": null,
                "rpd_after_10_usd_credits": null,
                "source_url": null
            },
            "context_window": 1024,
            "max_output_tokens": 128,
            "capabilities": {
                "streaming": true,
                "tools": true,
                "reasoning": false,
                "openai_compatible": true
            },
            "score": {
                "power": 1,
                "free_quota": 1,
                "reliability": 1,
                "integration": 1,
                "latency": 1
            },
            "routing": {
                "enabled": true,
                "roles": ["draft"],
                "exploration_floor": 0.1,
                "cooldown_seconds": 1,
                "disabled_reason": null
            }
        }))
        .unwrap();
        let model = ResolvedModel {
            entry,
            visible_id: "cloudflare/test".to_string(),
            api_key: Some("token".to_string()),
            key_present: true,
            base_url: "https://api.cloudflare.com/client/v4/accounts//ai/v1".to_string(),
            base_url_missing_keys: vec!["CLOUDFLARE_ACCOUNT_ID".to_string()],
        };

        assert_eq!(model.readiness_status(), "incomplete_env");
        assert!(!model.is_ready());
    }

    #[test]
    fn parses_disabled_reason() {
        let entry: ModelEntry = serde_json::from_value(json!({
            "id": "test",
            "provider": "cloudflare",
            "model": "@cf/test/model",
            "display_name": "Test",
            "api": {
                "style": "cloudflare_openai",
                "base_url": "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1"
            },
            "env": {
                "api_key": "CLOUDFLARE_API_TOKEN"
            },
            "signup_url": "https://example.com",
            "limits": {
                "rpm": null,
                "rpd": null,
                "rpd_after_10_usd_credits": null,
                "source_url": null
            },
            "context_window": 1024,
            "max_output_tokens": 128,
            "capabilities": {
                "streaming": true,
                "tools": true,
                "reasoning": false,
                "openai_compatible": true
            },
            "score": {
                "power": 1,
                "free_quota": 1,
                "reliability": 1,
                "integration": 1,
                "latency": 1
            },
            "routing": {
                "enabled": false,
                "roles": ["draft"],
                "exploration_floor": 0.1,
                "cooldown_seconds": 1,
                "disabled_reason": "billing required"
            }
        }))
        .unwrap();

        assert_eq!(
            entry.routing.disabled_reason.as_deref(),
            Some("billing required")
        );
    }
}
