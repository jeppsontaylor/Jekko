use crate::fusion::{DashboardMessage, Gateway, GatewayError};
use crate::mcp;
use crate::openai::{
    ChatChoiceDelta, ChatCompletionRequest, build_chunk, error_response, sse_data, sse_done,
};
use axum::Json;
use axum::body::Body;
use axum::extract::State;
use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::http::{HeaderValue, StatusCode, header};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use bytes::Bytes;
use futures::{SinkExt, StreamExt};
use serde_json::json;
use std::convert::Infallible;
use std::sync::Arc;
use tokio::time::{Duration, interval};
use tokio_stream::iter;
use tower_http::services::{ServeDir, ServeFile};

pub fn router(gateway: Arc<Gateway>) -> axum::Router {
    let dashboard_dist = gateway.config.root.join("web/dist");
    axum::Router::new()
        .route("/health", get(health))
        .route("/v1/models", get(models))
        .route("/v1/jnoccio/status", get(status))
        .route("/v1/jnoccio/metrics", get(metrics))
        .route("/v1/jnoccio/metrics/ws", get(metrics_ws))
        .route("/v1/chat/completions", post(chat))
        .route("/mcp", get(mcp_get).post(mcp_post))
        .nest_service(
            "/dashboard",
            ServeDir::new(&dashboard_dist)
                .not_found_service(ServeFile::new(dashboard_dist.join("index.html"))),
        )
        .with_state(gateway)
}

async fn health(State(gateway): State<Arc<Gateway>>) -> Json<serde_json::Value> {
    Json(json!(gateway.health()))
}

async fn models(State(gateway): State<Arc<Gateway>>) -> Json<serde_json::Value> {
    Json(gateway.model_list())
}

async fn status(State(gateway): State<Arc<Gateway>>) -> Json<serde_json::Value> {
    Json(gateway.status())
}

async fn metrics(State(gateway): State<Arc<Gateway>>) -> Response {
    match gateway.dashboard_snapshot() {
        Ok(snapshot) => Json(snapshot).into_response(),
        Err(err) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": err.to_string() })),
        )
            .into_response(),
    }
}

async fn metrics_ws(State(gateway): State<Arc<Gateway>>, ws: WebSocketUpgrade) -> Response {
    ws.on_upgrade(move |socket| dashboard_socket(socket, gateway))
}

async fn dashboard_socket(socket: WebSocket, gateway: Arc<Gateway>) {
    let (mut sender, mut receiver) = socket.split();
    if let Ok(snapshot) = gateway.dashboard_snapshot()
        && sender
            .send(Message::Text(
                serde_json::to_string(&DashboardMessage::Snapshot { snapshot })
                    .expect("dashboard snapshot serializes")
                    .into(),
            ))
            .await
            .is_err()
    {
        return;
    }

    let mut updates = gateway.subscribe();
    let mut heartbeat = interval(Duration::from_secs(15));
    loop {
        tokio::select! {
            item = updates.recv() => {
                match item {
                    Ok(message) => {
                        if sender
                            .send(Message::Text(serde_json::to_string(&message).expect("dashboard message serializes").into()))
                            .await
                            .is_err() {
                            return;
                        }
                    }
                    Err(tokio::sync::broadcast::error::RecvError::Lagged(_)) => {
                        if let Ok(snapshot) = gateway.dashboard_snapshot()
                            && sender
                                .send(Message::Text(serde_json::to_string(&DashboardMessage::Snapshot { snapshot }).expect("dashboard snapshot serializes").into()))
                                .await
                                .is_err() {
                            return;
                        }
                    }
                    Err(tokio::sync::broadcast::error::RecvError::Closed) => return,
                }
            }
            _ = heartbeat.tick() => {
                if sender
                    .send(Message::Text(serde_json::to_string(&Gateway::heartbeat_message()).expect("heartbeat serializes").into()))
                    .await
                    .is_err() {
                    return;
                }
            }
            received = receiver.next() => {
                if received.is_none() {
                    return;
                }
            }
        }
    }
}

async fn chat(
    State(gateway): State<Arc<Gateway>>,
    Json(request): Json<ChatCompletionRequest>,
) -> Response {
    match gateway.complete(request.clone()).await {
        Ok(result) => {
            if request.stream.unwrap_or(false) {
                stream_response(&result)
            } else {
                Json(result.response).into_response()
            }
        }
        Err(err) => error_response_for(err),
    }
}

async fn mcp_get() -> Response {
    (
        StatusCode::METHOD_NOT_ALLOWED,
        [(header::ALLOW, HeaderValue::from_static("POST"))],
        Json(json!({
            "error": {
                "message": "MCP Streamable HTTP GET is not enabled on this server",
                "type": "method_not_allowed",
                "code": "method_not_allowed"
            }
        })),
    )
        .into_response()
}

async fn mcp_post(
    State(gateway): State<Arc<Gateway>>,
    Json(body): Json<serde_json::Value>,
) -> Response {
    mcp::handle_http(gateway, body).await
}

fn stream_response(result: &crate::fusion::GatewayResult) -> Response {
    let stream = iter(
        stream_events(result)
            .into_iter()
            .map(|event| Ok::<_, Infallible>(Bytes::from(event))),
    );
    Response::builder()
        .status(StatusCode::OK)
        .header(
            header::CONTENT_TYPE,
            HeaderValue::from_static("text/event-stream; charset=utf-8"),
        )
        .header(header::CACHE_CONTROL, HeaderValue::from_static("no-cache"))
        .body(Body::from_stream(stream))
        .expect("sse response")
}

fn stream_events(result: &crate::fusion::GatewayResult) -> Vec<String> {
    let mut parts = Vec::new();
    let choice = &result.response.choices[0];
    let content = choice.message.content.clone().unwrap_or_default();
    let tool_calls = choice.message.tool_calls.clone();
    let pieces = chunk_text(&content, 160);
    for (index, piece) in pieces.into_iter().enumerate() {
        let delta = ChatChoiceDelta {
            role: if index == 0 {
                Some("assistant".to_string())
            } else {
                None
            },
            content: Some(piece),
            reasoning_text: None,
            reasoning_content: None,
            reasoning_opaque: None,
            tool_calls: None,
            extra: Default::default(),
        };
        parts.push(sse_data(&build_chunk(
            &result.response.model,
            delta,
            None,
            None,
        )));
    }

    if let Some(tool_calls) = tool_calls {
        let delta = ChatChoiceDelta {
            role: if content.is_empty() {
                Some("assistant".to_string())
            } else {
                None
            },
            content: None,
            reasoning_text: None,
            reasoning_content: None,
            reasoning_opaque: None,
            tool_calls: Some(
                tool_calls
                    .into_iter()
                    .enumerate()
                    .map(|(index, call)| crate::openai::ToolCallDelta {
                        index: index as u64,
                        id: Some(call.id),
                        r#type: Some(call.kind),
                        function: crate::openai::ToolCallFunctionDelta {
                            name: Some(call.function.name),
                            arguments: Some(call.function.arguments),
                            extra: Default::default(),
                        },
                        extra: Default::default(),
                    })
                    .collect(),
            ),
            extra: Default::default(),
        };
        parts.push(sse_data(&build_chunk(
            &result.response.model,
            delta,
            choice.finish_reason.clone(),
            result.response.usage.clone(),
        )));
    } else {
        let delta = ChatChoiceDelta {
            role: if content.is_empty() {
                Some("assistant".to_string())
            } else {
                None
            },
            content: None,
            reasoning_text: None,
            reasoning_content: None,
            reasoning_opaque: None,
            tool_calls: None,
            extra: Default::default(),
        };
        parts.push(sse_data(&build_chunk(
            &result.response.model,
            delta,
            choice.finish_reason.clone(),
            result.response.usage.clone(),
        )));
    }
    parts.push(sse_done());
    parts
}

fn error_response_for(err: GatewayError) -> Response {
    (
        err.status_code(),
        Json(json!(error_response(err.to_string(), err.kind(), None))),
    )
        .into_response()
}

fn chunk_text(text: &str, size: usize) -> Vec<String> {
    if text.is_empty() {
        return Vec::new();
    }
    let mut out = Vec::new();
    let mut current = String::new();
    for ch in text.chars() {
        current.push(ch);
        if current.chars().count() >= size {
            out.push(current);
            current = String::new();
        }
    }
    if !current.is_empty() {
        out.push(current);
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::openai::{ChatChoiceMessage, ChatCompletionChoice, ChatCompletionResponse};
    use serde_json::Map;

    #[test]
    fn error_response_uses_gateway_status_code() {
        let response = error_response_for(GatewayError::NoAvailableModels);
        assert_eq!(response.status(), StatusCode::SERVICE_UNAVAILABLE);
    }

    #[test]
    fn stream_events_do_not_expose_internal_receipts_as_reasoning() {
        let result = crate::fusion::GatewayResult {
            response: ChatCompletionResponse {
                id: "chatcmpl-test".to_string(),
                kind: "chat.completion".to_string(),
                created: 1,
                model: "jnoccio/jnoccio-fusion".to_string(),
                choices: vec![ChatCompletionChoice {
                    index: 0,
                    message: ChatChoiceMessage {
                        role: "assistant".to_string(),
                        content: Some("hello".to_string()),
                        tool_calls: None,
                        reasoning_text: None,
                        reasoning_content: None,
                        reasoning_opaque: None,
                        extra: Map::new(),
                    },
                    finish_reason: Some("stop".to_string()),
                    extra: Map::new(),
                }],
                usage: None,
                extra: Map::new(),
            },
            receipts: vec![
                "request_id=secret".to_string(),
                "draft_models=a,b".to_string(),
                "provider failure".to_string(),
            ],
            winner_model_id: "provider/model".to_string(),
            confidence: 0.9,
        };

        let text = stream_events(&result).join("");
        assert!(text.contains("\"content\":\"hello\""));
        assert!(!text.contains("request_id=secret"));
        assert!(!text.contains("draft_models"));
        assert!(!text.contains("provider failure"));
        assert!(!text.contains("reasoning_content"));
    }
}
