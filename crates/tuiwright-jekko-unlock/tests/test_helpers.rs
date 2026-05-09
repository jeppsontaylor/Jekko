use std::path::PathBuf;
use std::time::Duration;

use anyhow::{Context, Result};
use tempfile::TempDir;
use tuiwright::Page;

const SCREEN_COLS: u16 = 200;
const SCREEN_ROWS: u16 = 60;
const ARTIFACT_DIR: &str = "target/tuiwright-jekko";

pub fn repo_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .ancestors()
        .nth(2)
        .expect("repo root above crates/<name>")
        .to_path_buf()
}

pub fn jekko_bin() -> Option<PathBuf> {
    let bin = std::env::var("JEKKO_BIN").ok()?;
    let path = PathBuf::from(bin);
    if !path.exists() {
        eprintln!("JEKKO_BIN points to a missing file: {path:?}");
        return None;
    }
    Some(path)
}

pub fn ensure_artifact_dir() -> Result<PathBuf> {
    let dir = repo_root().join(ARTIFACT_DIR);
    std::fs::create_dir_all(&dir).with_context(|| format!("create {dir:?}"))?;
    Ok(dir)
}

pub fn prepare_workspace(subdir: &str, readme_content: &str) -> Result<(TempDir, PathBuf, PathBuf, PathBuf, PathBuf, PathBuf)> {
    let parent = TempDir::new().context("tempdir")?;
    let project = parent.path().join(subdir);
    std::fs::create_dir_all(&project)?;
    std::fs::write(project.join("README.md"), readme_content)?;
    let xdg = parent.path().join("xdg");
    let xdg_data = xdg.join("data");
    let xdg_cache = xdg.join("cache");
    let xdg_config = xdg.join("config");
    let xdg_state = xdg.join("state");
    for dir in [&xdg_data, &xdg_cache, &xdg_config, &xdg_state] {
        std::fs::create_dir_all(dir)?;
    }
    Ok((parent, project, xdg_data, xdg_cache, xdg_config, xdg_state))
}

pub fn spawn_jekko(parent: &TempDir, jekko: &PathBuf) -> Result<Page> {
    let project = parent.path().join("project");
    let xdg = parent.path().join("xdg");
    let mut cfg = tuiwright::SpawnConfig::new(jekko.to_string_lossy().as_ref())
        .arg("--pure")
        .arg(project.to_string_lossy().as_ref())
        .cwd(&project)
        .size(SCREEN_COLS, SCREEN_ROWS)
        .env("TERM", "xterm-256color")
        .env("COLORTERM", "truecolor")
        .env("HOME", parent.path().to_string_lossy().as_ref())
        .env("JEKKO_DISABLE_AUTOUPDATE", "1")
        .env("JEKKO_DISABLE_LSP_DOWNLOAD", "1")
        .env("JEKKO_DISABLE_MODELS_FETCH", "1")
        .env("JEKKO_DISABLE_PRUNE", "1")
        .env("XDG_DATA_HOME", xdg.join("data").to_string_lossy().as_ref())
        .env("XDG_CACHE_HOME", xdg.join("cache").to_string_lossy().as_ref())
        .env("XDG_CONFIG_HOME", xdg.join("config").to_string_lossy().as_ref())
        .env("XDG_STATE_HOME", xdg.join("state").to_string_lossy().as_ref())
        .timeout(Duration::from_secs(60));
    for (k, v) in std::env::vars() {
        if matches!(k.as_str(), "USER" | "LOGNAME" | "PATH" | "SHELL" | "LANG" | "LC_ALL" | "LC_CTYPE") {
            cfg = cfg.env(k, v);
        }
    }
    Page::spawn(cfg).context("spawn jekko TUI")
}
