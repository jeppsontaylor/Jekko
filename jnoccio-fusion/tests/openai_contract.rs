use axum::http::StatusCode;
use jnoccio_fusion::config::substitute_env;
use jnoccio_fusion::limits::{ErrorKind, classify_status, parse_limit_signal};
use jnoccio_fusion::openai::{
    ChatChoiceDelta, ChatChoiceMessage, ChatCompletionRequest, build_chunk, build_response,
    clamp_output_tokens, sanitize_messages, sse_data, sse_done,
};
use jnoccio_fusion::providers::openai_compatible::build_body;
use jnoccio_fusion::providers::responses::parse_raw_completion;
use serde_json::Map;
use std::collections::HashMap;

#[test]
fn response_merges_reasoning_fields() {
    let response = build_response(
        "jnoccio/jnoccio-fusion",
        ChatChoiceMessage {
            role: "assistant".to_string(),
            content: Some("answer".to_string()),
            tool_calls: None,
            reasoning_text: None,
            reasoning_content: None,
            reasoning_opaque: None,
            extra: Map::new(),
        },
        Some("stop".to_string()),
        None,
        Some("receipt line".to_string()),
    );

    assert_eq!(
        response.choices[0].message.reasoning_text.as_deref(),
        Some("receipt line")
    );
    assert_eq!(
        response.choices[0].message.reasoning_content.as_deref(),
        Some("receipt line")
    );
}

#[test]
fn stream_chunk_contains_reasoning_fields() {
    let chunk = build_chunk(
        "jnoccio/jnoccio-fusion",
        ChatChoiceDelta {
            role: Some("assistant".to_string()),
            content: None,
            reasoning_text: Some("phase receipt".to_string()),
            reasoning_content: Some("phase receipt".to_string()),
            reasoning_opaque: None,
            tool_calls: None,
            extra: Map::new(),
        },
        None,
        None,
    );

    let text = serde_json::to_string(&chunk).unwrap();
    assert!(text.contains("\"reasoning_text\":\"phase receipt\""));
    assert!(text.contains("\"reasoning_content\":\"phase receipt\""));
    assert!(sse_data(&chunk).starts_with("data: {"));
    assert_eq!(sse_done(), "data: [DONE]\n\n");
}

#[test]
fn env_substitution_works() {
    let mut env = HashMap::new();
    env.insert("CLOUDFLARE_ACCOUNT_ID".to_string(), "abc123".to_string());
    assert_eq!(
        substitute_env(
            "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1",
            &env
        ),
        "https://api.cloudflare.com/client/v4/accounts/abc123/ai/v1"
    );
}

#[test]
fn mistral_uses_max_tokens() {
    let request = ChatCompletionRequest {
        model: "mistral-codestral-latest".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(false),
        temperature: None,
        top_p: None,
        max_tokens: None,
        max_completion_tokens: Some(1),
        tools: None,
        tool_choice: None,
        reasoning_effort: None,
        response_format: None,
        stream_options: None,
        extra: Map::new(),
    };

    let body = build_body(
        &request,
        "codestral-latest",
        false,
        None,
        request.messages.clone(),
        None,
        "openai_chat",
    );
    let text = serde_json::to_string(&body).unwrap();
    assert!(text.contains("\"max_tokens\":1"));
    assert!(!text.contains("\"max_completion_tokens\":1"));
}

#[test]
fn configured_provider_uses_max_tokens() {
    let request = ChatCompletionRequest {
        model: "glm-4.7-flash".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(false),
        temperature: None,
        top_p: None,
        max_tokens: None,
        max_completion_tokens: Some(1),
        tools: None,
        tool_choice: None,
        reasoning_effort: None,
        response_format: None,
        stream_options: None,
        extra: Map::new(),
    };

    let body = build_body(
        &request,
        "glm-4.7-flash",
        false,
        None,
        request.messages.clone(),
        Some("max_tokens"),
        "openai_chat",
    );
    let text = serde_json::to_string(&body).unwrap();
    assert!(text.contains("\"max_tokens\":1"));
    assert!(!text.contains("\"max_completion_tokens\":1"));
}

#[test]
fn openai_gateway_defaults_to_max_tokens() {
    let request = ChatCompletionRequest {
        model: "openrouter/free".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(false),
        temperature: None,
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

    let body = build_body(
        &request,
        "openrouter/free",
        false,
        None,
        request.messages.clone(),
        None,
        "openai_chat",
    );
    let text = serde_json::to_string(&body).unwrap();
    assert!(text.contains("\"max_tokens\":1"));
    assert!(!text.contains("\"max_completion_tokens\":1"));
}

#[test]
fn message_sanitizer_removes_reasoning_and_preserves_tool_fields() {
    let messages = sanitize_messages(vec![
        serde_json::json!({
            "role": "assistant",
            "content": "answer",
            "reasoning_content": "private",
            "reasoning_text": "private",
            "provider_extra": true,
            "tool_calls": [{
                "id": "call_1",
                "type": "function",
                "extra": "drop",
                "function": {
                    "name": "lookup",
                    "arguments": {"city": "Denver"},
                    "extra": "drop"
                }
            }]
        }),
        serde_json::json!({
            "role": "tool",
            "tool_call_id": "call_1",
            "content": "ok",
            "reasoning_opaque": "private"
        }),
    ]);

    let text = serde_json::to_string(&messages).unwrap();
    assert!(!text.contains("reasoning_content"));
    assert!(!text.contains("reasoning_text"));
    assert!(!text.contains("reasoning_opaque"));
    assert!(!text.contains("provider_extra"));
    assert!(text.contains("\"tool_call_id\":\"call_1\""));
    assert!(text.contains("\"arguments\":\"{\\\"city\\\":\\\"Denver\\\"}\""));
}

#[test]
fn body_omits_stream_options_when_upstream_is_non_streaming() {
    let request = ChatCompletionRequest {
        model: "openrouter/free".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(true),
        temperature: None,
        top_p: None,
        max_tokens: Some(1),
        max_completion_tokens: None,
        tools: None,
        tool_choice: None,
        reasoning_effort: None,
        response_format: None,
        stream_options: Some(serde_json::json!({"include_usage": true})),
        extra: Map::new(),
    };

    let body = build_body(
        &request,
        "openrouter/free",
        false,
        None,
        request.messages.clone(),
        None,
        "openai_chat",
    );
    assert!(body.get("stream_options").is_none());
}

#[test]
fn body_omits_tool_choice_without_forwarded_tools() {
    let request = ChatCompletionRequest {
        model: "openrouter/free".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(false),
        temperature: None,
        top_p: None,
        max_tokens: Some(1),
        max_completion_tokens: None,
        tools: Some(serde_json::json!([])),
        tool_choice: Some(serde_json::json!("auto")),
        reasoning_effort: None,
        response_format: None,
        stream_options: None,
        extra: Map::new(),
    };

    let body = build_body(
        &request,
        "openrouter/free",
        false,
        None,
        request.messages.clone(),
        None,
        "openai_chat",
    );
    assert!(body.get("tool_choice").is_none());
    assert!(body.get("tools").is_none());
}

#[test]
fn body_does_not_forward_unknown_extra_fields() {
    let mut extra = Map::new();
    extra.insert("provider_knob".to_string(), serde_json::json!(true));
    let request = ChatCompletionRequest {
        model: "openrouter/free".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(false),
        temperature: None,
        top_p: None,
        max_tokens: Some(1),
        max_completion_tokens: None,
        tools: None,
        tool_choice: None,
        reasoning_effort: None,
        response_format: None,
        stream_options: None,
        extra,
    };

    let body = build_body(
        &request,
        "openrouter/free",
        false,
        None,
        request.messages.clone(),
        None,
        "openai_chat",
    );
    assert!(body.get("provider_knob").is_none());
}

#[test]
fn output_tokens_are_clamped_to_registry_cap() {
    let request = ChatCompletionRequest {
        model: "groq-llama-4-scout".to_string(),
        messages: vec![serde_json::json!({"role": "user", "content": "hi"})],
        stream: Some(false),
        temperature: None,
        top_p: None,
        max_tokens: Some(32768),
        max_completion_tokens: Some(16384),
        tools: None,
        tool_choice: None,
        reasoning_effort: None,
        response_format: None,
        stream_options: None,
        extra: Map::new(),
    };

    let request = clamp_output_tokens(&request, 8192);
    assert_eq!(request.max_tokens, Some(8192));
    assert_eq!(request.max_completion_tokens, Some(8192));
}

#[test]
fn responses_parser_handles_output_text() {
    let response = serde_json::json!({
        "id": "resp_123",
        "object": "response",
        "created_at": 1,
        "status": "completed",
        "output_text": "hello from responses",
        "usage": {
            "prompt_tokens": 1,
            "completion_tokens": 2,
            "total_tokens": 3
        }
    });

    let parsed = parse_raw_completion(response);
    assert_eq!(
        parsed.message.content.as_deref(),
        Some("hello from responses")
    );
}

#[test]
fn cloudflare_413_context_limit_is_context_overflow() {
    assert_eq!(
        classify_status(
            StatusCode::PAYLOAD_TOO_LARGE,
            "messages resulted in 67328 tokens, context window limit (32768)"
        ),
        ErrorKind::ContextOverflow
    );
    let signal =
        parse_limit_signal("messages resulted in 67328 tokens, context window limit (32768)")
            .unwrap();
    assert_eq!(signal.learned_context_window, Some(32_768));
    assert_eq!(signal.message_tokens, Some(67_328));
}
