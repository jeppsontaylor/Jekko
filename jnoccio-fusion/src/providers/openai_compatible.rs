use crate::limits::{
    ErrorKind, classify_status, parse_reset_headers, parse_retry_after, retry_after_from_body,
};
use crate::openai::{
    ChatChoiceMessage, ChatCompletionRequest, ChatUsage, ToolCall, sanitize_messages,
};
use axum::http::{HeaderMap, HeaderValue, StatusCode};
use reqwest::header::{AUTHORIZATION, CONTENT_TYPE};
use serde::Deserialize;
use serde_json::{Map, Value, json};
use std::fmt;
use std::time::Duration;

#[derive(Clone, Debug)]
pub struct ProviderError {
    pub provider: String,
    pub api_style: String,
    pub endpoint: String,
    pub status_code: Option<u16>,
    pub status_text: Option<String>,
    pub headers: HeaderMap,
    pub body: String,
    pub kind: ErrorKind,
    pub retry_after: Option<Duration>,
}

impl ProviderError {
    pub fn transport(
        provider: &str,
        api_style: &str,
        endpoint: &str,
        error: &reqwest::Error,
    ) -> Self {
        let kind = if error.is_timeout() {
            ErrorKind::Timeout
        } else {
            ErrorKind::ServerError
        };
        Self {
            provider: provider.to_string(),
            api_style: api_style.to_string(),
            endpoint: endpoint.to_string(),
            status_code: None,
            status_text: Some(error.to_string()),
            headers: HeaderMap::new(),
            body: error.to_string(),
            kind,
            retry_after: None,
        }
    }

    pub fn read_failure(
        provider: &str,
        api_style: &str,
        endpoint: &str,
        status: StatusCode,
        headers: HeaderMap,
        error: &reqwest::Error,
    ) -> Self {
        let kind = if error.is_timeout() {
            ErrorKind::Timeout
        } else {
            ErrorKind::InvalidResponse
        };
        Self {
            provider: provider.to_string(),
            api_style: api_style.to_string(),
            endpoint: endpoint.to_string(),
            status_code: Some(status.as_u16()),
            status_text: status.canonical_reason().map(str::to_string),
            headers,
            body: error.to_string(),
            kind,
            retry_after: None,
        }
    }

    pub fn response(
        provider: &str,
        api_style: &str,
        endpoint: &str,
        status: StatusCode,
        headers: HeaderMap,
        body: String,
    ) -> Self {
        let retry_after = parse_retry_after(&headers)
            .or_else(|| parse_reset_headers(&headers))
            .or_else(|| retry_after_from_body(&body));
        let kind = classify_status(status, &body);
        Self {
            provider: provider.to_string(),
            api_style: api_style.to_string(),
            endpoint: endpoint.to_string(),
            status_code: Some(status.as_u16()),
            status_text: status.canonical_reason().map(str::to_string),
            headers,
            body,
            kind,
            retry_after,
        }
    }

    pub fn parse_failure(
        provider: &str,
        api_style: &str,
        endpoint: &str,
        status: StatusCode,
        headers: HeaderMap,
        body: String,
        error: &dyn fmt::Display,
    ) -> Self {
        Self {
            provider: provider.to_string(),
            api_style: api_style.to_string(),
            endpoint: endpoint.to_string(),
            status_code: Some(status.as_u16()),
            status_text: Some(format!("invalid json: {error}")),
            headers,
            body,
            kind: ErrorKind::InvalidResponse,
            retry_after: None,
        }
    }

    pub fn summary(&self) -> String {
        let status = self
            .status_code
            .map(|code| code.to_string())
            .unwrap_or_else(|| "transport".to_string());
        format!(
            "{} {} {} {} {:?}",
            self.provider, self.api_style, self.endpoint, status, self.kind
        )
    }
}

impl fmt::Display for ProviderError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} ({:?})", self.summary(), self.kind)
    }
}

#[derive(Clone)]
pub struct OpenAICompatibleClient {
    client: reqwest::Client,
    base_url: String,
    api_key: String,
    provider: String,
    api_style: String,
}

#[derive(Clone, Debug)]
pub struct UpstreamCompletion {
    pub message: ChatChoiceMessage,
    pub usage: Option<ChatUsage>,
    pub finish_reason: Option<String>,
    pub raw: Value,
}

impl UpstreamCompletion {
    pub fn into_response(self, model: &str) -> crate::openai::ChatCompletionResponse {
        let reasoning = self.message.reasoning_text.clone();
        let finish_reason = self
            .finish_reason
            .clone()
            .or_else(|| Some("stop".to_string()));
        let usage = self.usage.clone();
        crate::openai::build_response(model, self.message, finish_reason, usage, reasoning)
    }
}

impl OpenAICompatibleClient {
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
            "/chat/completions",
            &self.api_key,
            &self.provider,
            &self.api_style,
            body,
        )
        .await?;
        parse_chat_completion(
            response,
            &self.provider,
            &self.api_style,
            "/chat/completions",
        )
        .await
    }
}

pub async fn send_json(
    client: &reqwest::Client,
    base_url: &str,
    endpoint: &str,
    api_key: &str,
    provider: &str,
    api_style: &str,
    body: Value,
) -> Result<reqwest::Response, ProviderError> {
    client
        .post(format!("{base_url}{endpoint}"))
        .header(AUTHORIZATION, format!("Bearer {api_key}"))
        .header(CONTENT_TYPE, HeaderValue::from_static("application/json"))
        .json(&body)
        .send()
        .await
        .map_err(|err| ProviderError::transport(provider, api_style, endpoint, &err))
}

pub async fn parse_chat_completion(
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
    parse_completion(raw).map_err(|err| {
        ProviderError::parse_failure(provider, api_style, endpoint, status, headers, text, &err)
    })
}

#[derive(Debug, Deserialize)]
struct CompletionEnvelope {
    choices: Vec<CompletionChoice>,
    usage: Option<ChatUsage>,
    #[serde(flatten)]
    _extra: Map<String, Value>,
}

#[derive(Debug, Deserialize)]
struct CompletionChoice {
    message: CompletionMessage,
    finish_reason: Option<String>,
    #[serde(flatten)]
    _extra: Map<String, Value>,
}

#[derive(Debug, Deserialize)]
struct CompletionMessage {
    role: Option<String>,
    content: Option<String>,
    reasoning_text: Option<String>,
    reasoning_content: Option<String>,
    reasoning_opaque: Option<String>,
    tool_calls: Option<Vec<CompletionToolCall>>,
    #[serde(flatten)]
    _extra: Map<String, Value>,
}

#[derive(Debug, Deserialize)]
struct CompletionToolCall {
    id: Option<String>,
    #[serde(rename = "type")]
    kind: Option<String>,
    function: CompletionToolCallFunction,
    #[serde(flatten)]
    _extra: Map<String, Value>,
}

#[derive(Debug, Deserialize)]
struct CompletionToolCallFunction {
    name: String,
    arguments: String,
    #[serde(flatten)]
    _extra: Map<String, Value>,
}

fn parse_completion(raw: Value) -> Result<UpstreamCompletion, anyhow::Error> {
    let envelope: CompletionEnvelope = serde_json::from_value(raw.clone())?;
    let choice = envelope
        .choices
        .into_iter()
        .next()
        .ok_or_else(|| anyhow::anyhow!("upstream response contained no choices"))?;
    let tools = choice
        .message
        .tool_calls
        .unwrap_or_default()
        .into_iter()
        .map(|call| ToolCall {
            id: call.id.unwrap_or_else(|| uuid::Uuid::new_v4().to_string()),
            kind: call.kind.unwrap_or_else(|| "function".to_string()),
            function: crate::openai::ToolCallFunction {
                name: call.function.name,
                arguments: call.function.arguments,
            },
        })
        .collect::<Vec<_>>();
    let reasoning = choice
        .message
        .reasoning_text
        .or(choice.message.reasoning_content)
        .or_else(|| choice.message.reasoning_opaque.clone());
    Ok(UpstreamCompletion {
        message: ChatChoiceMessage {
            role: choice
                .message
                .role
                .unwrap_or_else(|| "assistant".to_string()),
            content: choice.message.content,
            tool_calls: if tools.is_empty() { None } else { Some(tools) },
            reasoning_text: reasoning.clone(),
            reasoning_content: reasoning,
            reasoning_opaque: choice.message.reasoning_opaque,
            extra: choice.message._extra,
        },
        usage: envelope.usage,
        finish_reason: choice.finish_reason,
        raw,
    })
}

pub fn build_body(
    request: &ChatCompletionRequest,
    model: &str,
    stream: bool,
    tools: Option<Value>,
    messages: Vec<Value>,
    completion_tokens_param: Option<&str>,
    api_style: &str,
) -> Value {
    let messages = sanitize_messages(messages);
    let has_tools = tools.as_ref().map(has_tools).unwrap_or(false);
    if api_style == "openai_responses" {
        return crate::providers::responses::build_body(
            request,
            model,
            stream,
            tools,
            messages,
            completion_tokens_param,
        );
    }

    let mut body = json!({
      "model": model,
      "messages": messages,
      "stream": stream,
    });
    if let Some(map) = body.as_object_mut() {
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

fn has_tools(value: &Value) -> bool {
    match value {
        Value::Array(items) => !items.is_empty(),
        Value::Object(map) => !map.is_empty(),
        Value::Null => false,
        _ => true,
    }
}
