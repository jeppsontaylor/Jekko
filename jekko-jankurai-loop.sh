#!/usr/bin/env bash
set -euo pipefail

# ZYAL/jankurai loop runs are headless. Tell the Jekko permission gate to
# auto-allow read-like permissions everywhere on the filesystem. Non-read
# permission asks must be explicitly allowed by rules or they fail without
# waiting for a human prompt.
export ZYAL_RUN="${ZYAL_RUN:-1}"
export JEKKO_AUTO_ALLOW_READS="${JEKKO_AUTO_ALLOW_READS:-1}"

PROMPT_FILE="${PROMPT_FILE:-./prompt.md}"
REPO_DIR="${REPO_DIR:-$PWD}"
LOG_DIR="${LOG_DIR:-$HOME/.jekko-loop-runs}"
SLEEP_SECONDS="${SLEEP_SECONDS:-5}"
MAX_RUNS="${MAX_RUNS:-0}" # 0 = forever
MODEL="${MODEL:-jnoccio/jnoccio-fusion}"
VARIANT="${VARIANT:-}"
AGENT="${AGENT:-}"
JEKKO_BIN="${JEKKO_BIN:-jekko}"
JSON_EVENTS="${JSON_EVENTS:-0}"
AUTO_UNLOCK="${AUTO_UNLOCK:-1}"
REQUIRE_UNLOCK="${REQUIRE_UNLOCK:-1}"
STOP_ON_FAILURE="${STOP_ON_FAILURE:-0}"
SKIP_PERMISSIONS="${SKIP_PERMISSIONS:-0}"
LOOP_COLOR="${LOOP_COLOR:-auto}"

fatal() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

resolve_path() {
  local path="$1"
  if [[ -d "$path" ]]; then
    (cd "$path" && pwd -P)
    return
  fi

  local dir="${path%/*}"
  local base="${path##*/}"
  if [[ "$dir" == "$path" ]]; then
    dir="."
  fi

  (cd "$dir" && printf '%s/%s\n' "$(pwd -P)" "$base")
}

expand_home() {
  local path="$1"
  if [[ "$path" == "~" ]]; then
    printf '%s\n' "$HOME"
    return
  fi
  if [[ "$path" == "~/"* ]]; then
    printf '%s/%s\n' "$HOME" "${path#~/}"
    return
  fi
  printf '%s\n' "$path"
}

json_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\r/\\r/g'
}

write_command_file() {
  local file="$1"
  shift

  printf '%q ' "$@" > "$file"
  printf '\n' >> "$file"
}

command -v "$JEKKO_BIN" >/dev/null 2>&1 || fatal "jekko CLI not found on PATH. Install or build it first."
[[ -f "$PROMPT_FILE" ]] || fatal "prompt file not found: $PROMPT_FILE"
[[ -d "$REPO_DIR" ]] || fatal "repo dir not found: $REPO_DIR"

case "$MAX_RUNS" in
  ''|*[!0-9]*) fatal "MAX_RUNS must be a non-negative integer" ;;
esac

case "$SLEEP_SECONDS" in
  ''|*[!0-9]*) fatal "SLEEP_SECONDS must be a non-negative integer" ;;
esac

case "$JSON_EVENTS" in
  0|1) ;;
  *) fatal "JSON_EVENTS must be 0 or 1" ;;
esac

case "$AUTO_UNLOCK" in
  0|1) ;;
  *) fatal "AUTO_UNLOCK must be 0 or 1" ;;
esac

case "$REQUIRE_UNLOCK" in
  0|1) ;;
  *) fatal "REQUIRE_UNLOCK must be 0 or 1" ;;
esac

case "$STOP_ON_FAILURE" in
  0|1) ;;
  *) fatal "STOP_ON_FAILURE must be 0 or 1" ;;
esac

case "$SKIP_PERMISSIONS" in
  0|1) ;;
  *) fatal "SKIP_PERMISSIONS must be 0 or 1" ;;
esac

case "$LOOP_COLOR" in
  auto|always|never) ;;
  *) fatal "LOOP_COLOR must be auto, always, or never" ;;
esac

PROMPT_FILE="$(resolve_path "$PROMPT_FILE")"
REPO_DIR="$(resolve_path "$REPO_DIR")"
mkdir -p "$LOG_DIR"
LOG_DIR="$(resolve_path "$LOG_DIR")"

palette=(196 202 208 214 201 45)
palette_len="${#palette[@]}"
palette_offset=$((RANDOM % palette_len))

if [[ -n "${NO_COLOR:-}" || "$LOOP_COLOR" == "never" ]]; then
  color_enabled=0
elif [[ "$LOOP_COLOR" == "always" || -t 1 ]]; then
  color_enabled=1
else
  color_enabled=0
fi

trap 'echo; echo "Stopping jekko loop."; exit 130' INT TERM

paint() {
  local color="$1"
  shift
  if [[ "$color_enabled" == "1" ]]; then
    printf '\033[38;5;%sm%s\033[0m' "$color" "$*"
  else
    printf '%s' "$*"
  fi
}

separator() {
  local char="${1:-=}"
  printf '%*s' 60 '' | tr ' ' "$char"
}

run_color() {
  local run="$1"
  local index=$(( (palette_offset + run - 1) % palette_len ))
  printf '%s\n' "${palette[$index]}"
}

write_env_file() {
  local file="$1"
  local unlock_secret_path_set=0
  local unlock_secret_file_present=0

  if [[ -n "${JNOCCIO_UNLOCK_SECRET_PATH:-}" ]]; then
    unlock_secret_path_set=1
    if [[ -f "$(expand_home "$JNOCCIO_UNLOCK_SECRET_PATH")" ]]; then
      unlock_secret_file_present=1
    fi
  fi

  {
    echo "PROMPT_FILE=$PROMPT_FILE"
    echo "REPO_DIR=$REPO_DIR"
    echo "LOG_DIR=$LOG_DIR"
    echo "SLEEP_SECONDS=$SLEEP_SECONDS"
    echo "MAX_RUNS=$MAX_RUNS"
    echo "MODEL=$MODEL"
    echo "VARIANT=$VARIANT"
    echo "AGENT=$AGENT"
    echo "JEKKO_BIN=$JEKKO_BIN"
    echo "ZYAL_RUN=$ZYAL_RUN"
    echo "JEKKO_AUTO_ALLOW_READS=$JEKKO_AUTO_ALLOW_READS"
    echo "JSON_EVENTS=$JSON_EVENTS"
    echo "AUTO_UNLOCK=$AUTO_UNLOCK"
    echo "REQUIRE_UNLOCK=$REQUIRE_UNLOCK"
    echo "STOP_ON_FAILURE=$STOP_ON_FAILURE"
    echo "SKIP_PERMISSIONS=$SKIP_PERMISSIONS"
    echo "LOOP_COLOR=$LOOP_COLOR"
    echo "NO_COLOR=${NO_COLOR:-}"
    echo "JNOCCIO_UNLOCK_SECRET_PATH_SET=$unlock_secret_path_set"
    echo "JNOCCIO_UNLOCK_SECRET_FILE_PRESENT=$unlock_secret_file_present"
  } > "$file"
}

write_metadata_file() {
  local file="$1"
  local run_number="$2"
  local stamp="$3"
  local unlock_ran="$4"
  local unlock_status="${5:-null}"
  local run_started="$6"
  local run_status="${7:-null}"

  cat > "$file" <<EOF
{
  "run_number": $run_number,
  "stamp": "$(json_escape "$stamp")",
  "prompt_file": "$(json_escape "$PROMPT_FILE")",
  "repo_dir": "$(json_escape "$REPO_DIR")",
  "log_dir": "$(json_escape "$LOG_DIR")",
  "model": "$(json_escape "$MODEL")",
  "variant": "$(json_escape "$VARIANT")",
  "agent": "$(json_escape "$AGENT")",
  "jekko_bin": "$(json_escape "$JEKKO_BIN")",
  "json_events": $([[ "$JSON_EVENTS" == "1" ]] && echo true || echo false),
  "auto_unlock": $([[ "$AUTO_UNLOCK" == "1" ]] && echo true || echo false),
  "require_unlock": $([[ "$REQUIRE_UNLOCK" == "1" ]] && echo true || echo false),
  "stop_on_failure": $([[ "$STOP_ON_FAILURE" == "1" ]] && echo true || echo false),
  "skip_permissions": $([[ "$SKIP_PERMISSIONS" == "1" ]] && echo true || echo false),
  "loop_color": "$(json_escape "$LOOP_COLOR")",
  "no_color": $([[ -n "${NO_COLOR:-}" ]] && echo true || echo false),
  "unlock_ran": $unlock_ran,
  "unlock_status": $unlock_status,
  "run_started": $run_started,
  "run_status": $run_status
}
EOF
}

run_number=0

while true; do
  run_number=$((run_number + 1))

  if [[ "$MAX_RUNS" != "0" && "$run_number" -gt "$MAX_RUNS" ]]; then
    echo "Reached MAX_RUNS=$MAX_RUNS. Exiting."
    exit 0
  fi

  stamp="$(date -u +"%Y%m%dT%H%M%SZ")"
  run_dir="$LOG_DIR/run-${run_number}-${stamp}"
  mkdir -p "$run_dir"

  prompt_copy="$run_dir/prompt.md"
  env_file="$run_dir/env.txt"
  command_file="$run_dir/command.txt"
  status_file="$run_dir/status.txt"
  stdout_file="$run_dir/stdout.txt"
  stderr_file="$run_dir/stderr.txt"
  final_file="$run_dir/final-message.md"
  metadata_file="$run_dir/metadata.json"

  cp "$PROMPT_FILE" "$prompt_copy"
  : > "$final_file"
  write_env_file "$env_file"

  run_cmd=(
    "$JEKKO_BIN"
    run
    --dir "$REPO_DIR"
    --model "$MODEL"
    --title "Jankurai loop run #$run_number"
    --output-last-message "$final_file"
  )

  if [[ "$JSON_EVENTS" == "1" ]]; then
    run_cmd+=(--format json)
  fi
  if [[ -n "$VARIANT" ]]; then
    run_cmd+=(--variant "$VARIANT")
  fi
  if [[ -n "$AGENT" ]]; then
    run_cmd+=(--agent "$AGENT")
  fi
  if [[ "$SKIP_PERMISSIONS" == "1" ]]; then
    run_cmd+=(--dangerously-skip-permissions)
  fi

  write_command_file "$command_file" "${run_cmd[@]}"

  unlock_ran=0
  unlock_status=null
  if [[ "$AUTO_UNLOCK" == "1" && "$MODEL" == jnoccio/* ]]; then
    unlock_ran=1
    unlock_stdout="$run_dir/unlock-stdout.json"
    unlock_stderr="$run_dir/unlock-stderr.txt"
    unlock_status_file="$run_dir/unlock-status.txt"
    unlock_command_file="$run_dir/unlock-command.txt"
    unlock_cmd=(
      "$JEKKO_BIN"
      providers
      unlock
      jnoccio
      --repo "$REPO_DIR"
      --json
    )

    write_command_file "$unlock_command_file" "${unlock_cmd[@]}"

    set +e
    "${unlock_cmd[@]}" > "$unlock_stdout" 2> "$unlock_stderr"
    unlock_status=$?
    set -e
    printf '%s\n' "$unlock_status" > "$unlock_status_file"

    if [[ "$unlock_status" -ne 0 ]]; then
      echo "Jnoccio unlock failed with exit code $unlock_status."
      write_metadata_file "$metadata_file" "$run_number" "$stamp" true "$unlock_status" false null
      printf '%s\n' "$unlock_status" > "$status_file"
      if [[ "$REQUIRE_UNLOCK" == "1" ]]; then
        exit "$unlock_status"
      fi
    fi
  fi

  echo
  echo "$(paint "$(run_color "$run_number")" "$(separator "=")")"
  echo "$(paint "$(run_color "$run_number")" "Jekko run #$run_number")"
  echo "$(paint "$(run_color "$run_number")" "Prompt: $PROMPT_FILE")"
  echo "$(paint "$(run_color "$run_number")" "Repo:   $REPO_DIR")"
  echo "$(paint "$(run_color "$run_number")" "Model:  $MODEL${VARIANT:+ ($VARIANT)}")"
  echo "$(paint "$(run_color "$run_number")" "Logs:   $run_dir")"
  echo "$(paint "$(run_color "$run_number")" "$(separator "=")")"

  set +e
  "${run_cmd[@]}" < "$prompt_copy" > "$stdout_file" 2> "$stderr_file"
  status=$?
  set -e

  printf '%s\n' "$status" > "$status_file"
  write_metadata_file "$metadata_file" "$run_number" "$stamp" "$([[ "$unlock_ran" == "1" ]] && echo true || echo false)" "$unlock_status" true "$status"
  echo "Jekko exit code: $status"

  if [[ -s "$final_file" ]]; then
    echo
    echo "Final message:"
    echo "$(separator "-")"
    cat "$final_file"
    echo
    echo "$(separator "-")"
  elif [[ -s "$stdout_file" ]]; then
    echo
    echo "Stdout:"
    echo "$(separator "-")"
    cat "$stdout_file"
    echo
    echo "$(separator "-")"
  fi

  if [[ "$status" -ne 0 ]]; then
    echo "Jekko failed. Last stderr:"
    tail -n 80 "$stderr_file" || true
    if [[ "$STOP_ON_FAILURE" == "1" ]]; then
      echo "STOP_ON_FAILURE=1; exiting."
      exit "$status"
    fi
  fi

  if [[ "$MAX_RUNS" == "0" || "$run_number" -lt "$MAX_RUNS" ]]; then
    echo "Sleeping ${SLEEP_SECONDS}s before next fresh Jekko session..."
    sleep "$SLEEP_SECONDS"
  fi
done
