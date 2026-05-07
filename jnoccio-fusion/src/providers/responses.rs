use crate::openai::{
    ChatChoiceMessage, ChatCompletionRequest, ChatUsage, ToolCall, sanitize_messages,
};
use crate::providers::openai_compatible::{ProviderError, UpstreamCompletion, send_json};
use serde_json::{Map, Value, json};

pub fn build_body(
    request: &ChatCompletionRequest,
    model: &str,
    stream: bool,
    tools: Option<Value>,
    messages: Vec<Value>,
    completion_tokens_param: Option<&str>,
) -> Value {
    let (instructions, input) = split_messages(sanitize_messages(messages));
    let has_tools = tools.as_ref().map(has_tools).unwrap_or(false);
    let mut body = json!({
      "model": model,
      "input": input,
      "stream": stream,
    });
    if let Some(map) = body.as_object_mut() {
        if let Some(value) = instructions {
            map.insert("instructions".to_string(), Value::String(value));
        }
        if let Some(value) = request.temperature {
            map.insert("temperature".to_string(), json!(value));
        }
        if let Some(value) = request.top_p {
            map.insert("top_p".to_string(), json!(value));
        }
        if let Some(value) = request.max_completion_tokens.or(request.max_tokens) {
            let key = completion_tokens_param.unwrap_or("max_tokens");
            map.insert(key.to_string(), json!(value));
        }
        if has_tools && let Some(value) = tools {
            map.insert("tools".to_string(), value);
        }
        if has_tools && let Some(value) = &request.tool_choice {
            map.insert("tool_choice".to_string(), value.clone());
        }
        if let Some(value) = &request.reasoning_effort {
            map.insert("reasoning_effort".to_string(), value.clone());
        }
        if let Some(value) = &request.response_format {
            map.insert("response_format".to_string(), value.clone());
        }
        if stream && let Some(value) = &request.stream_options {
            map.insert("stream_options".to_string(), value.clone());
        }
    }
    body
}

pub struct ResponsesClient {
    client: reqwest::Client,
    base_url: String,
    api_key: String,
    provider: String,
    api_style: String,
}

fn has_tools(value: &Value) -> bool {
    match value {
        Value::Array(items) => !items.is_empty(),
        Value::Object(map) => !map.is_empty(),
        Value::Null => false,
        _ => true,
    }
}

impl ResponsesClient {
    pub fn new(
        client: reqwest::Client,
        base_url: String,
        api_key: String,
        provider: String,
        api_style: String,
    ) -> Self {
        Self {
            client,
            base_url: base_url.trim_end_matches('/').to_string(),
            api_key,
            provider,
            api_style,
        }
    }

    pub async fn complete(
        &self,
        _request: &ChatCompletionRequest,
        body: Value,
    ) -> Result<UpstreamCompletion, ProviderError> {
        let response = send_json(
            &self.client,
            &self.base_url,
            "/responses",
            &self.api_key,
            &self.provider,
            &self.api_style,
            body,
        )
        .await?;
        parse_completion(response, &self.provider, &self.api_style, "/responses").await
    }
}

fn split_messages(messages: Vec<Value>) -> (Option<String>, Vec<Value>) {
    let mut instructions = Vec::new();
    let input = messages
        .into_iter()
        .filter_map(|message| {
            let role = message
                .get("role")
                .and_then(Value::as_str)
                .unwrap_or("user");
            let content = message.get("content").cloned().unwrap_or(Value::Null);
            if role == "system" || role == "developer" {
                if let Some(text) = content.as_str().filter(|text| !text.trim().is_empty()) {
                    instructions.push(text.to_string());
                }
                return None;
            }
            let mut item = Map::new();
            item.insert("type".to_string(), Value::String("message".to_string()));
            item.insert("role".to_string(), Value::String(role.to_string()));
            item.insert("content".to_string(), content);
            Some(Value::Object(item))
        })
        .collect::<Vec<_>>();
    let instructions = if instructions.is_empty() {
        None
    } else {
        Some(instructions.join("\n"))
    };
    (instructions, input)
}

pub async fn parse_completion(
    response: reqwest::Response,
    provider: &str,
    api_style: &str,
    endpoint: &str,
) -> Result<UpstreamCompletion, ProviderError> {
    let status = response.status();
    let headers = response.headers().clone();
    let text = response.text().await.map_err(|err| {
        ProviderError::read_failure(provider, api_style, endpoint, status, headers.clone(), &err)
    })?;
    if !status.is_success() {
        return Err(ProviderError::response(
            provider, api_style, endpoint, status, headers, text,
        ));
    }
    let raw: Value = serde_json::from_str(&text).map_err(|err| {
        ProviderError::parse_failure(
            provider,
            api_style,
            endpoint,
            status,
            headers.clone(),
            text.clone(),
            &err,
        )
    })?;
    Ok(parse_raw_completion(raw))
}

pub fn parse_raw_completion(raw: Value) -> UpstreamCompletion {
    let text = extract_output_text(&raw).unwrap_or_default();
    let usage = raw
        .get("usage")
        .cloned()
        .and_then(|value| serde_json::from_value::<ChatUsage>(value).ok());
    UpstreamCompletion {
        message: ChatChoiceMessage {
            role: "assistant".to_string(),
            content: if text.is_empty() { None } else { Some(text) },
            tool_calls: extract_tool_calls(&raw),
            reasoning_text: extract_reasoning(&raw),
            reasoning_content: extract_reasoning(&raw),
            reasoning_opaque: None,
            extra: Map::new(),
        },
        usage,
        finish_reason: raw.get("status").and_then(Value::as_str).map(|value| {
            if value == "incomplete" {
                "length".to_string()
            } else {
                "stop".to_string()
            }
        }),
        raw,
    }
}

fn extract_output_text(raw: &Value) -> Option<String> {
    if let Some(text) = raw.get("output_text").and_then(Value::as_str) {
        return Some(text.to_string());
    }
    let mut parts = Vec::new();
    let output = raw.get("output")?.as_array()?;
    for item in output {
        if item.get("type").and_then(Value::as_str) != Some("message") {
            continue;
        }
        if let Some(content) = item.get("content").and_then(Value::as_array) {
            for part in content {
                match part.get("type").and_then(Value::as_str) {
                    Some("output_text") => {
                        if let Some(text) = part.get("text").and_then(Value::as_str) {
                            parts.push(text.to_string());
                        }
                    }
                    Some("text") => {
                        if let Some(text) = part.get("text").and_then(Value::as_str) {
                            parts.push(text.to_string());
                        } else if let Some(text) = part.as_str() {
                            parts.push(text.to_string());
                        }
                    }
                    _ => {}
                }
            }
        }
    }
    if parts.is_empty() {
        return None;
    }
    Some(parts.join(""))
}

fn extract_reasoning(raw: &Value) -> Option<String> {
    raw.get("reasoning")
        .and_then(Value::as_object)
        .and_then(|reasoning| reasoning.get("summary"))
        .and_then(Value::as_str)
        .map(str::to_string)
}

fn extract_tool_calls(raw: &Value) -> Option<Vec<ToolCall>> {
    let output = raw.get("output")?.as_array()?;
    let mut calls = Vec::new();
    for item in output {
        if item.get("type").and_then(Value::as_str) != Some("message") {
            continue;
        }
        let Some(tool_calls) = item.get("tool_calls").and_then(Value::as_array) else {
            continue;
        };
        for call in tool_calls {
            let function = call.get("function").and_then(Value::as_object)?;
            let name = function.get("name").and_then(Value::as_str)?.to_string();
            let arguments = function
                .get("arguments")
                .and_then(Value::as_str)
                .unwrap_or_default()
                .to_string();
            calls.push(ToolCall {
                id: call
                    .get("id")
                    .and_then(Value::as_str)
                    .map(str::to_string)
                    .unwrap_or_else(|| uuid::Uuid::new_v4().to_string()),
                kind: call
                    .get("type")
                    .and_then(Value::as_str)
                    .unwrap_or("function")
                    .to_string(),
                function: crate::openai::ToolCallFunction { name, arguments },
            });
        }
    }
    if calls.is_empty() { None } else { Some(calls) }
}
