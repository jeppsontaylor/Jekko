use anyhow::Result;
use std::path::PathBuf;
use std::sync::Arc;

use jnoccio_fusion::{config::load_app_config, fusion::Gateway, router, telemetry};

#[tokio::main]
async fn main() -> Result<()> {
    let (config_path, env_path, bind_override) = parse_args(std::env::args().skip(1).collect());
    telemetry::init();
    let mut config = load_app_config(config_path, env_path.as_deref())?;
    if let Some(bind) = bind_override {
        config.bind = bind.clone();
        config.server.bind = Some(bind);
    }
    let gateway = Arc::new(Gateway::new(config)?);
    let listener = tokio::net::TcpListener::bind(&gateway.config.bind).await?;
    tracing::info!(bind = %gateway.config.bind, database = %gateway.config.database.display(), "jnoccio fusion gateway starting");
    axum::serve(listener, router::router(gateway))
        .with_graceful_shutdown(async {
            let _ = tokio::signal::ctrl_c().await;
        })
        .await?;
    Ok(())
}

fn parse_args(args: Vec<String>) -> (PathBuf, Option<PathBuf>, Option<String>) {
    let mut config = PathBuf::from("config/server.json");
    let mut env_file = None;
    let mut bind = None;
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
            "--bind" => {
                if let Some(value) = iter.next() {
                    bind = Some(value);
                }
            }
            "--help" | "-h" => {
                println!("jnoccio-fusion --config <path> --env-file <path> --bind <addr>");
                std::process::exit(0);
            }
            _ => {}
        }
    }
    (config, env_file, bind)
}
