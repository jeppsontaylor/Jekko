use crate::fusion::Gateway;
use crate::metrics::DashboardSnapshot;
use crate::openai::{ChatCompletionRequest, ChatCompletionResponse};
use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Deserialize;
use serde_json::{Map, Value, json};
use std::collections::HashMap;
use std::path::PathBuf;
use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};
use tokio::time::{Duration, sleep};

#[derive(Clone)]
pub struct McpState {
    instances: Arc<Mutex<HashMap<String, ManagedInstance>>>,
    http: reqwest::Client,
}

struct ManagedInstance {
    id: String,
    bind: String,
    pid: u32,
    started_at: String,
    child: Child,
}

#[derive(Clone, Debug, serde::Serialize)]
struct InstanceView {
    id: String,
    bind: String,
    pid: u32,
    started_at: String,
    role: String,
    database: String,
}

#[derive(Deserialize)]
struct JsonRpcRequest {
    #[serde(default, rename = "jsonrpc")]
    _jsonrpc: Option<String>,
    #[serde(default)]
    id: Option<Value>,
    method: String,
    #[serde(default)]
    params: Option<Value>,
}

impl McpState {
    pub fn new() -> Self {
        Self {
            instances: Arc::new(Mutex::new(HashMap::new())),
            http: reqwest::Client::new(),
        }
    }

    pub async fn handle_http(self: Arc<Self>, gateway: Arc<Gateway>, body: Value) -> Response {
        match self.dispatch(gateway, body).await {
            HttpReply::Json(value) => Json(value).into_response(),
            HttpReply::Accepted => StatusCode::ACCEPTED.into_response(),
        }
    }

    async fn dispatch(self: &Arc<Self>, gateway: Arc<Gateway>, body: Value) -> HttpReply {
        match body {
            Value::Array(items) => {
                let mut replies = Vec::new();
                for item in items {
                    if let Some(reply) = self.dispatch_one(gateway.clone(), item).await {
                        replies.push(reply);
                    }
                }
                if replies.is_empty() {
                    HttpReply::Accepted
                } else {
                    HttpReply::Json(Value::Array(replies))
                }
            }
            value => match self.dispatch_one(gateway, value).await {
                Some(reply) => HttpReply::Json(reply),
                None => HttpReply::Accepted,
            },
        }
    }

    async fn dispatch_one(self: &Arc<Self>, gateway: Arc<Gateway>, value: Value) -> Option<Value> {
        let request = match serde_json::from_value::<JsonRpcRequest>(value) {
            Ok(request) => request,
            Err(err) => {
                return Some(error_value(
                    None,
                    -32600,
                    "invalid request",
                    Some(json!({ "error": err.to_string() })),
                ));
            }
        };

        if request.id.is_none() && request.method != "notifications/initialized" {
            return self
                .dispatch_notification(gateway, request.method, request.params)
                .await;
        }

        let response = match self
            .dispatch_request(gateway, &request.method, request.params)
            .await
        {
            Ok(result) => result,
            Err(err) => {
                return Some(error_value(request.id, err.code, &err.message, err.data));
            }
        };

        request.id.map(|id| {
            json!({
                "jsonrpc": "2.0",
                "id": id,
                "result": response,
            })
        })
    }

    async fn dispatch_notification(
        self: &Arc<Self>,
        gateway: Arc<Gateway>,
        method: String,
        params: Option<Value>,
    ) -> Option<Value> {
        let _ = self.dispatch_request(gateway, &method, params).await;
        None
    }

    async fn dispatch_request(
        self: &Arc<Self>,
        gateway: Arc<Gateway>,
        method: &str,
        params: Option<Value>,
    ) -> Result<Value, RpcError> {
        match method {
            "initialize" => Ok(self.initialize(params)),
            "ping" => Ok(json!({})),
            "tools/list" => Ok(json!({ "tools": tools_list() })),
            "tools/call" => self.call_tool(gateway, params).await,
            "resources/list" => Ok(json!({ "resources": resources_list(), "nextCursor": null })),
            "resources/read" => self.read_resource(gateway, params),
            "prompts/list" => Ok(json!({ "prompts": prompts_list() })),
            "prompts/get" => self.get_prompt(params),
            "notifications/initialized" => Ok(json!({})),
            "completion/complete" => Err(RpcError::method_not_found(
                "completion/complete is not implemented",
            )),
            _ => Err(RpcError::method_not_found(format!(
                "unknown method: {method}"
            ))),
        }
    }

    fn initialize(&self, params: Option<Value>) -> Value {
        let protocol_version = params
            .as_ref()
            .and_then(|value| value.get("protocolVersion"))
            .and_then(Value::as_str)
            .unwrap_or("2025-11-25");
        json!({
            "protocolVersion": protocol_version,
            "serverInfo": {
                "name": "jnoccio",
                "version": env!("CARGO_PKG_VERSION"),
            },
            "capabilities": {
                "tools": { "listChanged": false },
                "resources": { "listChanged": false, "subscribe": false },
                "prompts": { "listChanged": false }
            }
        })
    }

    fn read_resource(
        &self,
        gateway: Arc<Gateway>,
        params: Option<Value>,
    ) -> Result<Value, RpcError> {
        let params = params.ok_or_else(|| RpcError::invalid_params("missing params"))?;
        let uri = params
            .get("uri")
            .and_then(Value::as_str)
            .ok_or_else(|| RpcError::invalid_params("missing uri"))?;
        Ok(json!({
            "contents": [self.resource_contents(gateway, uri)?]
        }))
    }

    fn get_prompt(&self, params: Option<Value>) -> Result<Value, RpcError> {
        let params = params.ok_or_else(|| RpcError::invalid_params("missing params"))?;
        let name = params
            .get("name")
            .and_then(Value::as_str)
            .ok_or_else(|| RpcError::invalid_params("missing name"))?;
        if name != "jnoccio_delegate_work" {
            return Err(RpcError::method_not_found(format!(
                "unknown prompt: {name}"
            )));
        }
        Ok(json!({
            "description": "Compact prompt template for focused delegation to Jnoccio.",
            "messages": self.delegate_prompt_messages(params.get("arguments")),
        }))
    }

    async fn call_tool(
        self: &Arc<Self>,
        gateway: Arc<Gateway>,
        params: Option<Value>,
    ) -> Result<Value, RpcError> {
        let params = params.ok_or_else(|| RpcError::invalid_params("missing params"))?;
        let name = params
            .get("name")
            .and_then(Value::as_str)
            .ok_or_else(|| RpcError::invalid_params("missing name"))?;
        let arguments = params
            .get("arguments")
            .cloned()
            .unwrap_or(Value::Object(Map::new()));
        match name {
            "jnoccio_status" => Ok(tool_result(self.status_snapshot(&gateway), false)),
            "jnoccio_metrics" => Ok(tool_result(self.metrics_snapshot(&gateway), false)),
            "jnoccio_instances" => Ok(tool_result(
                json!({
                    "instances": self.instances_view(&gateway)
                }),
                false,
            )),
            "jnoccio_spawn_instance" => {
                let spawned = self.spawn_instance(&gateway, arguments).await?;
                Ok(tool_result(
                    json!({
                        "instance": spawned
                    }),
                    false,
                ))
            }
            "jnoccio_stop_instance" => {
                let stopped = self.stop_instance(arguments)?;
                Ok(tool_result(
                    json!({
                        "stopped": stopped
                    }),
                    false,
                ))
            }
            "jnoccio_chat" => self.chat_tool(&gateway, arguments).await,
            "jnoccio_delegate" => self.delegate_tool(&gateway, arguments).await,
            _ => Err(RpcError::method_not_found(format!("unknown tool: {name}"))),
        }
    }

    async fn chat_tool(&self, gateway: &Arc<Gateway>, arguments: Value) -> Result<Value, RpcError> {
        let prompt = argument_string(&arguments, "prompt")?;
        let max_tokens = argument_u64(&arguments, "max_tokens")
            .unwrap_or(1024)
            .min(4096);
        let temperature = argument_f64(&arguments, "temperature");
        let request = ChatCompletionRequest {
            model: gateway.config.visible_model_id.clone(),
            messages: vec![json!({
                "role": "user",
                "content": trim_prompt(&prompt, 12_000)
            })],
            stream: Some(false),
            temperature,
            top_p: None,
            max_tokens: Some(max_tokens),
            max_completion_tokens: None,
            tools: None,
            tool_choice: None,
            reasoning_effort: None,
            response_format: None,
            stream_options: None,
            extra: Map::new(),
        };
        self.complete_request(gateway, request).await
    }

    async fn delegate_tool(
        &self,
        gateway: &Arc<Gateway>,
        arguments: Value,
    ) -> Result<Value, RpcError> {
        let task = argument_string(&arguments, "task")?;
        let context = argument_string(&arguments, "context").unwrap_or_default();
        let expected_output = argument_string(&arguments, "expected_output").unwrap_or_default();
        let max_tokens = argument_u64(&arguments, "max_tokens")
            .unwrap_or(1024)
            .min(4096);
        let prompt = delegate_prompt(&task, &context, &expected_output);
        let request = ChatCompletionRequest {
            model: gateway.config.visible_model_id.clone(),
            messages: vec![
                json!({
                    "role": "system",
                    "content": "Perform the requested subtask directly. Return only the useful answer, keep it compact, and do not mention internal routing or hidden state."
                }),
                json!({
                    "role": "user",
                    "content": trim_prompt(&prompt, 12_000)
                }),
            ],
            stream: Some(false),
            temperature: Some(0.2),
            top_p: None,
            max_tokens: Some(max_tokens),
            max_completion_tokens: None,
            tools: None,
            tool_choice: None,
            reasoning_effort: None,
            response_format: None,
            stream_options: None,
            extra: Map::new(),
        };
        self.complete_request(gateway, request).await
    }

    async fn complete_request(
        &self,
        gateway: &Arc<Gateway>,
        request: ChatCompletionRequest,
    ) -> Result<Value, RpcError> {
        match gateway.complete(request).await {
            Ok(result) => Ok(tool_result(
                json!({
                    "answer": response_answer(&result.response),
                    "route": route_summary(&result.response),
                }),
                false,
            )),
            Err(err) => Ok(tool_result(
                json!({
                    "error": err.to_string(),
                    "kind": err.kind(),
                }),
                true,
            )),
        }
    }

    fn status_snapshot(&self, gateway: &Gateway) -> Value {
        let health = gateway.health();
        let snapshot = gateway.dashboard_snapshot().ok();
        json!({
            "health": health,
            "model_count": health.available_models,
            "keyed_models": health.keyed_models,
            "capacity": snapshot.map(|snapshot| serde_json::to_value(snapshot.capacity).unwrap_or(json!(null))),
            "visible_model": gateway.config.visible_model_id,
            "provider": gateway.config.provider_id,
            "bind": gateway.config.bind,
            "database": gateway.config.database,
            "receipts_dir": gateway.config.receipts_dir,
        })
    }

    fn metrics_snapshot(&self, gateway: &Gateway) -> Value {
        match gateway.dashboard_snapshot() {
            Ok(snapshot) => compact_metrics(snapshot),
            Err(err) => json!({
                "error": err.to_string(),
            }),
        }
    }

    fn instances_view(&self, gateway: &Gateway) -> Vec<InstanceView> {
        let mut views = vec![InstanceView {
            id: "main".to_string(),
            bind: gateway.config.bind.clone(),
            pid: std::process::id(),
            started_at: chrono::Utc::now().to_rfc3339(),
            role: "main".to_string(),
            database: gateway.config.database.display().to_string(),
        }];
        let mut lock = self.instances.lock().expect("instance map poisoned");
        lock.retain(|_, instance| instance.child.try_wait().ok().flatten().is_none());
        views.extend(lock.values().map(|instance| InstanceView {
            id: instance.id.clone(),
            bind: instance.bind.clone(),
            pid: instance.pid,
            started_at: instance.started_at.clone(),
            role: "spawned".to_string(),
            database: gateway.config.database.display().to_string(),
        }));
        views
    }

    async fn spawn_instance(&self, gateway: &Gateway, arguments: Value) -> Result<Value, RpcError> {
        let requested_bind = argument_string(&arguments, "bind").ok();
        let requested_port = argument_u64(&arguments, "port");
        let bind = choose_bind(requested_bind, requested_port)?;
        let started_at = chrono::Utc::now().to_rfc3339();
        let child = spawn_gateway_process(gateway, &bind)
            .map_err(|err| RpcError::internal(format!("failed to spawn child instance: {err}")))?;
        let pid = child.id();
        let instance_id = format!("spawn-{}", uuid::Uuid::new_v4());
        let mut managed = ManagedInstance {
            id: instance_id.clone(),
            bind: bind.clone(),
            pid,
            started_at: started_at.clone(),
            child,
        };
        if !wait_for_health(&self.http, &bind, gateway).await {
            let _ = managed.child.kill();
            let _ = managed.child.wait();
            return Err(RpcError::internal(format!(
                "child server on {bind} did not become healthy"
            )));
        }
        self.instances
            .lock()
            .expect("instance map poisoned")
            .insert(instance_id.clone(), managed);
        Ok(json!({
            "id": instance_id,
            "bind": bind,
            "pid": pid,
            "started_at": started_at,
            "database": gateway.config.database.display().to_string(),
            "role": "spawned"
        }))
    }

    fn stop_instance(&self, arguments: Value) -> Result<Value, RpcError> {
        let instance_id = argument_string(&arguments, "instance_id")?;
        let mut instances = self.instances.lock().expect("instance map poisoned");
        let Some(mut managed) = instances.remove(&instance_id) else {
            return Err(RpcError::invalid_params(format!(
                "unknown instance_id: {instance_id}"
            )));
        };
        managed
            .child
            .kill()
            .map_err(|err| RpcError::internal(format!("failed to stop instance: {err}")))?;
        let _ = managed.child.wait();
        Ok(json!({
            "id": managed.id,
            "bind": managed.bind,
            "pid": managed.pid,
            "stopped": true
        }))
    }

    fn resource_contents(&self, gateway: Arc<Gateway>, uri: &str) -> Result<Value, RpcError> {
        match uri {
            "jnoccio://status" => Ok(text_resource(
                uri,
                "application/json",
                self.status_snapshot(&gateway),
            )),
            "jnoccio://models" => Ok(text_resource(
                uri,
                "application/json",
                gateway.status()["models"].clone(),
            )),
            "jnoccio://capacity" => match gateway.dashboard_snapshot() {
                Ok(snapshot) => Ok(text_resource(
                    uri,
                    "application/json",
                    json!(snapshot.capacity),
                )),
                Err(err) => Ok(text_resource(
                    uri,
                    "application/json",
                    json!({ "error": err.to_string() }),
                )),
            },
            "jnoccio://agent-instructions" => Ok(json!({
                "uri": uri,
                "mimeType": "text/plain",
                "text": agent_instructions(),
            })),
            _ => Err(RpcError::invalid_params(format!(
                "unknown resource uri: {uri}"
            ))),
        }
    }

    fn delegate_prompt_messages(&self, arguments: Option<&Value>) -> Value {
        let arguments = arguments
            .cloned()
            .unwrap_or_else(|| Value::Object(Map::new()));
        let task = argument_string(&arguments, "task").unwrap_or_else(|_| "".to_string());
        let context = argument_string(&arguments, "context").unwrap_or_default();
        let expected_output = argument_string(&arguments, "expected_output").unwrap_or_default();
        let max_tokens = argument_u64(&arguments, "max_tokens").unwrap_or(1024);
        json!([
            {
                "role": "system",
                "content": "Perform the requested subtask directly. Return a compact handoff without commentary about internal routing."
            },
            {
                "role": "user",
                "content": delegate_prompt(&task, &context, &expected_output) + &format!("\n\nMax output tokens: {max_tokens}")
            }
        ])
    }
}

#[derive(Debug)]
enum HttpReply {
    Json(Value),
    Accepted,
}

#[derive(Debug)]
struct RpcError {
    code: i64,
    message: String,
    data: Option<Value>,
}

impl RpcError {
    fn invalid_params(message: impl Into<String>) -> Self {
        Self {
            code: -32602,
            message: message.into(),
            data: None,
        }
    }

    fn method_not_found(message: impl Into<String>) -> Self {
        Self {
            code: -32601,
            message: message.into(),
            data: None,
        }
    }

    fn internal(message: impl Into<String>) -> Self {
        Self {
            code: -32603,
            message: message.into(),
            data: None,
        }
    }
}

impl Default for McpState {
    fn default() -> Self {
        Self::new()
    }
}

pub async fn handle_http(gateway: Arc<Gateway>, body: Value) -> Response {
    let state = gateway.mcp.clone();
    state.handle_http(gateway, body).await
}

fn error_value(id: Option<Value>, code: i64, message: &str, data: Option<Value>) -> Value {
    json!({
        "jsonrpc": "2.0",
        "id": id.unwrap_or(Value::Null),
        "error": {
            "code": code,
            "message": message,
            "data": data,
        }
    })
}

fn tool_result(structured: Value, is_error: bool) -> Value {
    let text = if structured.is_string() {
        structured.as_str().unwrap_or_default().to_string()
    } else {
        serde_json::to_string_pretty(&structured).unwrap_or_else(|_| structured.to_string())
    };
    json!({
        "content": [
            {
                "type": "text",
                "text": text
            }
        ],
        "structuredContent": structured,
        "isError": is_error,
    })
}

fn tools_list() -> Vec<Value> {
    vec![
        tool_descriptor(
            "jnoccio_status",
            "Compact health, model count, and capacity summary for the local Jnoccio gateway.",
            json!({
                "type": "object",
                "properties": {},
                "additionalProperties": false
            }),
        ),
        tool_descriptor(
            "jnoccio_metrics",
            "Compact metrics and capacity snapshot for the local Jnoccio gateway.",
            json!({
                "type": "object",
                "properties": {},
                "additionalProperties": false
            }),
        ),
        tool_descriptor(
            "jnoccio_chat",
            "Send a bounded prompt to jnoccio/jnoccio-fusion and return the answer plus route metadata.",
            json!({
                "type": "object",
                "properties": {
                    "prompt": { "type": "string", "minLength": 1 },
                    "max_tokens": { "type": "integer", "minimum": 1, "maximum": 4096 },
                    "temperature": { "type": "number", "minimum": 0, "maximum": 2 }
                },
                "required": ["prompt"],
                "additionalProperties": false
            }),
        ),
        tool_descriptor(
            "jnoccio_delegate",
            "Purpose-built offload tool for focused subwork with compact handoff output.",
            json!({
                "type": "object",
                "properties": {
                    "task": { "type": "string", "minLength": 1 },
                    "context": { "type": "string" },
                    "expected_output": { "type": "string" },
                    "max_tokens": { "type": "integer", "minimum": 1, "maximum": 4096 }
                },
                "required": ["task"],
                "additionalProperties": false
            }),
        ),
        tool_descriptor(
            "jnoccio_instances",
            "List local Jnoccio-managed instances.",
            json!({
                "type": "object",
                "properties": {},
                "additionalProperties": false
            }),
        ),
        tool_descriptor(
            "jnoccio_spawn_instance",
            "Start an extra local Jnoccio instance on an available localhost port.",
            json!({
                "type": "object",
                "properties": {
                    "bind": { "type": "string" },
                    "port": { "type": "integer", "minimum": 1024, "maximum": 65535 }
                },
                "additionalProperties": false
            }),
        ),
        tool_descriptor(
            "jnoccio_stop_instance",
            "Stop a Jnoccio instance that was started by the MCP launcher or main gateway.",
            json!({
                "type": "object",
                "properties": {
                    "instance_id": { "type": "string", "minLength": 1 }
                },
                "required": ["instance_id"],
                "additionalProperties": false
            }),
        ),
    ]
}

fn tool_descriptor(name: &str, description: &str, input_schema: Value) -> Value {
    json!({
        "name": name,
        "description": description,
        "inputSchema": input_schema,
    })
}

fn resources_list() -> Vec<Value> {
    vec![
        resource_descriptor(
            "jnoccio://status",
            "jnoccio status",
            "Compact health and capacity state for the local Jnoccio gateway.",
        ),
        resource_descriptor(
            "jnoccio://models",
            "jnoccio models",
            "Model inventory and readiness status for the local Jnoccio gateway.",
        ),
        resource_descriptor(
            "jnoccio://capacity",
            "jnoccio capacity",
            "Capacity summary for the local Jnoccio gateway.",
        ),
        resource_descriptor(
            "jnoccio://agent-instructions",
            "jnoccio agent instructions",
            "Guidance for using the Jnoccio MCP tools directly.",
        ),
    ]
}

fn resource_descriptor(uri: &str, name: &str, description: &str) -> Value {
    json!({
        "uri": uri,
        "name": name,
        "description": description,
        "mimeType": "application/json"
    })
}

fn prompts_list() -> Vec<Value> {
    vec![json!({
        "name": "jnoccio_delegate_work",
        "description": "Prompt template for focused Jnoccio delegation.",
        "arguments": [
            { "name": "task", "description": "The focused task to perform.", "required": true },
            { "name": "context", "description": "Relevant context and constraints.", "required": false },
            { "name": "expected_output", "description": "What the caller expects back.", "required": false },
            { "name": "max_tokens", "description": "Maximum output tokens for the delegated answer.", "required": false }
        ]
    })]
}

fn text_resource(uri: &str, mime_type: &str, text: Value) -> Value {
    json!({
        "uri": uri,
        "mimeType": mime_type,
        "text": serde_json::to_string_pretty(&text).unwrap_or_else(|_| text.to_string()),
    })
}

fn agent_instructions() -> String {
    [
        "Use jnoccio_delegate for isolated planning, review, and summarization.",
        "Keep prompts compact and self-contained.",
        "Do not send secrets, API keys, or full logs.",
        "Use jnoccio_status before heavy delegation when capacity matters.",
        "Use jnoccio_spawn_instance only when the main instance is down or saturated.",
        "Prefer direct Jnoccio MCP rather than routing through another client.",
    ]
    .join("\n")
}

fn delegate_prompt(task: &str, context: &str, expected_output: &str) -> String {
    let mut out = String::from("Task:\n");
    out.push_str(task.trim());
    if !context.trim().is_empty() {
        out.push_str("\n\nContext:\n");
        out.push_str(context.trim());
    }
    if !expected_output.trim().is_empty() {
        out.push_str("\n\nExpected output:\n");
        out.push_str(expected_output.trim());
    }
    out
}

fn trim_prompt(prompt: &str, max_chars: usize) -> String {
    prompt.chars().take(max_chars).collect()
}

fn response_answer(response: &ChatCompletionResponse) -> String {
    response
        .choices
        .first()
        .and_then(|choice| choice.message.content.clone())
        .unwrap_or_default()
}

fn route_summary(response: &ChatCompletionResponse) -> Value {
    response
        .extra
        .get("jnoccio")
        .and_then(Value::as_object)
        .map(|object| {
            json!({
                "request_id": object.get("request_id"),
                "route_mode": object.get("route_mode"),
                "sampled": object.get("sampled"),
                "complexity_tier": object.get("complexity_tier"),
                "primary_model_id": object.get("primary_model_id"),
                "backup_model_ids": object.get("backup_model_ids"),
                "fusion_model_id": object.get("fusion_model_id"),
                "winner_model_id": object.get("winner_model_id"),
                "confidence": object.get("confidence"),
            })
        })
        .unwrap_or_else(|| json!({}))
}

fn compact_metrics(snapshot: DashboardSnapshot) -> Value {
    json!({
        "totals": snapshot.totals,
        "capacity": snapshot.capacity,
        "models": snapshot
            .models
            .into_iter()
            .map(|model| {
                json!({
                    "id": model.id,
                    "status": model.status,
                    "call_count": model.call_count,
                    "success_count": model.success_count,
                    "failure_count": model.failure_count,
                    "win_count": model.win_count,
                    "hourly_used": model.hourly_used,
                    "hourly_capacity": model.hourly_capacity,
                    "avg_latency_ms": model.avg_latency_ms,
                    "last_latency_ms": model.last_latency_ms,
                    "last_error_kind": model.last_error_kind,
                })
            })
            .collect::<Vec<_>>(),
    })
}

fn argument_string(arguments: &Value, key: &str) -> Result<String, RpcError> {
    arguments
        .get(key)
        .and_then(Value::as_str)
        .map(|value| value.to_string())
        .ok_or_else(|| RpcError::invalid_params(format!("missing {key}")))
}

fn argument_u64(arguments: &Value, key: &str) -> Option<u64> {
    arguments.get(key).and_then(Value::as_u64)
}

fn argument_f64(arguments: &Value, key: &str) -> Option<f64> {
    arguments.get(key).and_then(Value::as_f64)
}

fn choose_bind(
    requested_bind: Option<String>,
    requested_port: Option<u64>,
) -> Result<String, RpcError> {
    if let Some(bind) = requested_bind {
        return Ok(bind);
    }
    let start = requested_port.unwrap_or(4318);
    let port = (start..start + 200)
        .find(|port| port_available(*port as u16))
        .ok_or_else(|| RpcError::internal("no available localhost ports in range 4318-4517"))?;
    Ok(format!("127.0.0.1:{port}"))
}

fn port_available(port: u16) -> bool {
    std::net::TcpListener::bind(("127.0.0.1", port)).is_ok()
}

fn spawn_gateway_process(gateway: &Gateway, bind: &str) -> Result<Child, String> {
    let binary = main_binary_path(gateway)?;
    let mut command = Command::new(binary);
    command
        .arg("--config")
        .arg(&gateway.config.config_path)
        .arg("--env-file")
        .arg(&gateway.config.env_path)
        .arg("--bind")
        .arg(bind)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::inherit());
    command.spawn().map_err(|err| err.to_string())
}

fn main_binary_path(gateway: &Gateway) -> Result<PathBuf, String> {
    if let Ok(path) = std::env::var("JNOCCIO_FUSION_BINARY") {
        return Ok(PathBuf::from(path));
    }
    let current = std::env::current_exe().map_err(|err| err.to_string())?;
    if current.file_name().and_then(|name| name.to_str()) == Some("jnoccio-fusion") {
        return Ok(current);
    }
    if let Some(parent) = current.parent().and_then(|path| path.parent()) {
        let candidate = parent.join("jnoccio-fusion");
        if candidate.exists() {
            return Ok(candidate);
        }
    }
    let candidate = gateway.config.root.join("target/debug/jnoccio-fusion");
    if candidate.exists() {
        return Ok(candidate);
    }
    Ok(current.with_file_name("jnoccio-fusion"))
}

async fn wait_for_health(client: &reqwest::Client, bind: &str, gateway: &Gateway) -> bool {
    let expected = gateway.config.provider_id.clone();
    let url = format!("http://{bind}/health");
    for _ in 0..80 {
        if let Ok(response) = client.get(&url).send().await
            && let Ok(health) = response.json::<Value>().await
            && health.get("provider").and_then(Value::as_str) == Some(expected.as_str())
        {
            return true;
        }
        sleep(Duration::from_millis(250)).await;
    }
    false
}
