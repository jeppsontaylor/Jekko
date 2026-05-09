import { Effect, Schema } from "effect"
import { zod } from "@/util/effect-zod"
import { withStatics } from "@/util/schema"

const DaemonAction = Schema.Literal("daemon")
const ArmAction = Schema.Literal("RUN_FOREVER")

export const ZyalSignal = Schema.Union([
  Schema.Literal("assistant_stop"),
  Schema.Literal("max_steps"),
  Schema.Literal("compaction"),
  Schema.Literal("permission_denied"),
  Schema.Literal("checkpoint_failed"),
  Schema.Literal("no_progress"),
  Schema.Literal("tool_calls_done"),
  Schema.Literal("structured_output"),
  Schema.Literal("error"),
  Schema.Literal("cancelled"),
])
export type ZyalSignal = Schema.Schema.Type<typeof ZyalSignal>

export const ZyalShellAssert = Schema.Struct({
  exit_code: Schema.optional(Schema.Number),
  stdout_contains: Schema.optional(Schema.Array(Schema.String)),
  stdout_regex: Schema.optional(Schema.Array(Schema.String)),
  json: Schema.optional(Schema.Record(Schema.String, Schema.Any)),
})

export type ZyalShellAssert = Schema.Schema.Type<typeof ZyalShellAssert>

export const ZyalShellCheck = Schema.Struct({
  command: Schema.String,
  timeout: Schema.optional(Schema.String),
  cwd: Schema.optional(Schema.String),
  assert: Schema.optional(ZyalShellAssert),
})

export type ZyalShellCheck = Schema.Schema.Type<typeof ZyalShellCheck>

export const ZyalGitCleanCheck = Schema.Struct({
  allow_untracked: Schema.optional(Schema.Boolean),
})

export type ZyalGitCleanCheck = Schema.Schema.Type<typeof ZyalGitCleanCheck>

export const ZyalStopCondition = Schema.Union([
  Schema.Struct({
    shell: ZyalShellCheck,
  }),
  Schema.Struct({
    git_clean: ZyalGitCleanCheck,
  }),
])
export type ZyalStopCondition = Schema.Schema.Type<typeof ZyalStopCondition>

export const ZyalJob = Schema.Struct({
  name: Schema.String,
  objective: Schema.String,
  risk: Schema.optional(Schema.Array(Schema.String)),
})

export type ZyalJob = Schema.Schema.Type<typeof ZyalJob>

export const ZyalLoopBreaker = Schema.Struct({
  max_consecutive_errors: Schema.optional(Schema.Number),
  on_trip: Schema.optional(Schema.Union([Schema.Literal("pause"), Schema.Literal("abort"), Schema.Literal("continue")])),
})

export type ZyalLoopBreaker = Schema.Schema.Type<typeof ZyalLoopBreaker>

export const ZyalLoop = Schema.Struct({
  policy: Schema.optional(Schema.Union([Schema.Literal("once"), Schema.Literal("bounded"), Schema.Literal("forever")])),
  sleep: Schema.optional(Schema.String),
  continue_on: Schema.optional(Schema.Array(ZyalSignal)),
  pause_on: Schema.optional(Schema.Array(ZyalSignal)),
  circuit_breaker: Schema.optional(ZyalLoopBreaker),
})

export type ZyalLoop = Schema.Schema.Type<typeof ZyalLoop>

export const ZyalStop = Schema.Struct({
  all: Schema.Array(ZyalStopCondition),
  any: Schema.optional(Schema.Array(ZyalStopCondition)),
})

export type ZyalStop = Schema.Schema.Type<typeof ZyalStop>

export const ZyalContext = Schema.Struct({
  strategy: Schema.optional(Schema.Union([Schema.Literal("soft"), Schema.Literal("hard"), Schema.Literal("hybrid")])),
  compact_every: Schema.optional(Schema.Number),
  hard_clear_every: Schema.optional(Schema.Number),
  preserve: Schema.optional(Schema.Array(Schema.String)),
})

export type ZyalContext = Schema.Schema.Type<typeof ZyalContext>

export const ZyalCheckpoint = Schema.Struct({
  when: Schema.optional(
    Schema.Union([Schema.Literal("after_verified_change"), Schema.Literal("on_error"), Schema.Literal("manual")]),
  ),
  noop_if_clean: Schema.optional(Schema.Boolean),
  verify: Schema.optional(Schema.Array(ZyalShellCheck)),
  git: Schema.optional(
    Schema.Struct({
      add: Schema.Array(Schema.String),
      commit_message: Schema.optional(Schema.String),
      push: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
    }),
  ),
})

export type ZyalCheckpoint = Schema.Schema.Type<typeof ZyalCheckpoint>

export const ZyalTasks = Schema.Struct({
  ledger: Schema.optional(Schema.Literal("sqlite")),
  discover: Schema.optional(Schema.Array(ZyalShellCheck)),
})

export type ZyalTasks = Schema.Schema.Type<typeof ZyalTasks>

export const ZyalIncubatorPassType = Schema.Union([
  Schema.Literal("scout"),
  Schema.Literal("idea"),
  Schema.Literal("strengthen"),
  Schema.Literal("critic"),
  Schema.Literal("synthesize"),
  Schema.Literal("prototype"),
  Schema.Literal("promotion_review"),
  Schema.Literal("compress"),
])
export type ZyalIncubatorPassType = Schema.Schema.Type<typeof ZyalIncubatorPassType>

export const ZyalIncubatorContextMode = Schema.Union([
  Schema.Literal("blind"),
  Schema.Literal("inherit"),
  Schema.Literal("strengthen"),
  Schema.Literal("critic"),
  Schema.Literal("pool"),
  Schema.Literal("promotion"),
  Schema.Literal("ledger_only"),
])
export type ZyalIncubatorContextMode = Schema.Schema.Type<typeof ZyalIncubatorContextMode>

export const ZyalIncubatorWriteScope = Schema.Union([
  Schema.Literal("scratch_only"),
  Schema.Literal("isolated_worktree"),
])
export type ZyalIncubatorWriteScope = Schema.Schema.Type<typeof ZyalIncubatorWriteScope>

export const ZyalIncubatorRouteCondition = Schema.Struct({
  repeated_attempts_gte: Schema.optional(Schema.Number),
  no_progress_iterations_gte: Schema.optional(Schema.Number),
  risk_score_gte: Schema.optional(Schema.Number),
  readiness_score_lt: Schema.optional(Schema.Number),
  touches_paths: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalIncubatorRouteCondition = Schema.Schema.Type<typeof ZyalIncubatorRouteCondition>

export const ZyalIncubatorRouteWhen = Schema.Struct({
  any: Schema.optional(Schema.Array(ZyalIncubatorRouteCondition)),
  all: Schema.optional(Schema.Array(ZyalIncubatorRouteCondition)),
})
export type ZyalIncubatorRouteWhen = Schema.Schema.Type<typeof ZyalIncubatorRouteWhen>

export const ZyalIncubatorCleanup = Schema.Struct({
  summarize_to_task_memory: Schema.optional(Schema.Boolean),
  archive_artifacts: Schema.optional(Schema.Boolean),
  delete_scratch: Schema.optional(Schema.Boolean),
  delete_unmerged_worktrees: Schema.optional(Schema.Boolean),
})
export type ZyalIncubatorCleanup = Schema.Schema.Type<typeof ZyalIncubatorCleanup>

export const ZyalIncubatorReadiness = Schema.Struct({
  promote_at: Schema.optional(Schema.Number),
  tests_identified_gte: Schema.optional(Schema.Number),
  scope_bounded_gte: Schema.optional(Schema.Number),
  plan_reviewed_gte: Schema.optional(Schema.Number),
  prototype_validated_gte: Schema.optional(Schema.Number),
  rollback_known_gte: Schema.optional(Schema.Number),
  affected_files_known_gte: Schema.optional(Schema.Number),
  critical_objections_resolved_gte: Schema.optional(Schema.Number),
  model_confidence_cap: Schema.optional(Schema.Number),
})
export type ZyalIncubatorReadiness = Schema.Schema.Type<typeof ZyalIncubatorReadiness>

export const ZyalIncubatorBudget = Schema.Struct({
  max_passes_per_task: Schema.Number,
  max_rounds_per_task: Schema.Number,
  max_active_tasks: Schema.optional(Schema.Number),
  max_parallel_idea_passes: Schema.optional(Schema.Number),
})
export type ZyalIncubatorBudget = Schema.Schema.Type<typeof ZyalIncubatorBudget>

export const ZyalIncubatorScratch = Schema.Struct({
  storage: Schema.optional(Schema.Literal("sqlite")),
  mirror: Schema.optional(Schema.Boolean),
  cleanup: Schema.optional(
    Schema.Union([
      Schema.Literal("summarize_and_archive"),
      Schema.Literal("archive"),
      Schema.Literal("keep"),
    ]),
  ),
})
export type ZyalIncubatorScratch = Schema.Schema.Type<typeof ZyalIncubatorScratch>

export const ZyalIncubatorPass = Schema.Struct({
  id: Schema.String,
  type: ZyalIncubatorPassType,
  context: ZyalIncubatorContextMode,
  reads: Schema.optional(Schema.Array(Schema.String)),
  writes: ZyalIncubatorWriteScope,
  count: Schema.optional(Schema.Number),
  agent: Schema.optional(Schema.String),
  mcp_profile: Schema.optional(Schema.String),
})
export type ZyalIncubatorPass = Schema.Schema.Type<typeof ZyalIncubatorPass>

export const ZyalIncubatorPromotion = Schema.Struct({
  promote_at: Schema.Number,
  require: Schema.optional(Schema.Array(Schema.String)),
  block_on: Schema.optional(
    Schema.Struct({
      unresolved_critical_objections_gte: Schema.optional(Schema.Number),
    }),
  ),
  on_promote: Schema.optional(Schema.Literal("move_to_ready_queue")),
  on_exhausted: Schema.optional(Schema.Union([Schema.Literal("park_with_summary"), Schema.Literal("block_with_summary")])),
})
export type ZyalIncubatorPromotion = Schema.Schema.Type<typeof ZyalIncubatorPromotion>

export const ZyalIncubator = Schema.Struct({
  enabled: Schema.Boolean,
  strategy: Schema.optional(Schema.Union([Schema.Literal("generate_pool_strengthen"), Schema.Literal("bounded_passes")])),
  route_when: Schema.optional(ZyalIncubatorRouteWhen),
  exclude_when: Schema.optional(ZyalIncubatorRouteWhen),
  budget: ZyalIncubatorBudget,
  scratch: Schema.optional(ZyalIncubatorScratch),
  cleanup: Schema.optional(ZyalIncubatorCleanup),
  readiness: Schema.optional(ZyalIncubatorReadiness),
  passes: Schema.Array(ZyalIncubatorPass),
  promotion: ZyalIncubatorPromotion,
})
export type ZyalIncubator = Schema.Schema.Type<typeof ZyalIncubator>

export const ZyalWorkerSpec = Schema.Struct({
  id: Schema.String,
  count: Schema.Number,
  agent: Schema.String,
  isolation: Schema.optional(Schema.Union([Schema.Literal("git_worktree"), Schema.Literal("same_session")])),
})

export type ZyalWorkerSpec = Schema.Schema.Type<typeof ZyalWorkerSpec>

export const ZyalAgents = Schema.Struct({
  supervisor: Schema.optional(Schema.Struct({ agent: Schema.String })),
  workers: Schema.optional(Schema.Array(ZyalWorkerSpec)),
})

export type ZyalAgents = Schema.Schema.Type<typeof ZyalAgents>

export const ZyalMcpProfile = Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  tools: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(Schema.Array(Schema.String)),
})

export type ZyalMcpProfile = Schema.Schema.Type<typeof ZyalMcpProfile>

export const ZyalMcp = Schema.Struct({
  profiles: Schema.optional(Schema.Record(Schema.String, ZyalMcpProfile)),
})

export type ZyalMcp = Schema.Schema.Type<typeof ZyalMcp>

export const ZyalPermissionMode = Schema.Struct({
  read: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  list: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  glob: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  grep: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  external_directory: Schema.optional(
    Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")]),
  ),
  shell: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  edit: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  git_commit: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  git_push: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  workers: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  mcp: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
})

export type ZyalPermissionMode = Schema.Schema.Type<typeof ZyalPermissionMode>

export const ZyalUi = Schema.Struct({
  theme: Schema.optional(Schema.String),
  banner: Schema.optional(Schema.String),
})

export type ZyalUi = Schema.Schema.Type<typeof ZyalUi>

// ─── On: Conditional Event Handlers ────────────────────────────────────────

export const ZyalOnAction = Schema.Union([
  Schema.Struct({ switch_agent: Schema.String }),
  Schema.Struct({ run: Schema.String }),
  Schema.Struct({ incubate_current_task: Schema.Literal(true) }),
  Schema.Struct({ checkpoint: Schema.Literal(true) }),
  Schema.Struct({ pause: Schema.Literal(true) }),
  Schema.Struct({ abort: Schema.Literal(true) }),
  Schema.Struct({ notify: Schema.String }),
  Schema.Struct({ set_context: Schema.Record(Schema.String, Schema.Unknown) }),
])
export type ZyalOnAction = Schema.Schema.Type<typeof ZyalOnAction>

export const ZyalOnHandler = Schema.Struct({
  signal: ZyalSignal,
  count_gte: Schema.optional(Schema.Number),
  message_contains: Schema.optional(Schema.String),
  if: Schema.optional(ZyalShellCheck),
  do: Schema.Array(ZyalOnAction),
})
export type ZyalOnHandler = Schema.Schema.Type<typeof ZyalOnHandler>

// ─── Fan-Out: Parallel Task Decomposition ──────────────────────────────────

export const ZyalFanOutSplit = Schema.Union([
  Schema.Struct({ shell: Schema.String }),
  Schema.Struct({ items: Schema.Array(Schema.String) }),
])
export type ZyalFanOutSplit = Schema.Schema.Type<typeof ZyalFanOutSplit>

export const ZyalFanOutReduceStrategy = Schema.Union([
  Schema.Literal("merge_all"),
  Schema.Literal("best_score"),
  Schema.Literal("vote"),
  Schema.Literal("custom_shell"),
])
export type ZyalFanOutReduceStrategy = Schema.Schema.Type<typeof ZyalFanOutReduceStrategy>

export const ZyalFanOutReduce = Schema.Struct({
  strategy: ZyalFanOutReduceStrategy,
  score_key: Schema.optional(Schema.String),
  command: Schema.optional(Schema.String),
})
export type ZyalFanOutReduce = Schema.Schema.Type<typeof ZyalFanOutReduce>

export const ZyalFanOut = Schema.Struct({
  strategy: Schema.optional(Schema.Union([
    Schema.Literal("map_reduce"),
    Schema.Literal("scatter_gather"),
  ])),
  split: ZyalFanOutSplit,
  worker: Schema.Struct({
    agent: Schema.optional(Schema.String),
    isolation: Schema.optional(Schema.Union([
      Schema.Literal("git_worktree"),
      Schema.Literal("same_session"),
    ])),
    timeout: Schema.optional(Schema.String),
    max_parallel: Schema.optional(Schema.Number),
  }),
  reduce: ZyalFanOutReduce,
  on_partial_failure: Schema.optional(Schema.Union([
    Schema.Literal("continue"),
    Schema.Literal("abort"),
    Schema.Literal("pause"),
  ])),
})
export type ZyalFanOut = Schema.Schema.Type<typeof ZyalFanOut>

// ─── Guardrails: Input/Output Validation Middleware ────────────────────────

export const ZyalGuardrailAction = Schema.Union([
  Schema.Literal("block"),
  Schema.Literal("retry"),
  Schema.Literal("pause"),
  Schema.Literal("abort"),
  Schema.Literal("warn"),
])
export type ZyalGuardrailAction = Schema.Schema.Type<typeof ZyalGuardrailAction>

export const ZyalPatternGuardrail = Schema.Struct({
  name: Schema.String,
  deny_patterns: Schema.Array(Schema.String),
  scope: Schema.optional(Schema.Union([
    Schema.Literal("tool_input"),
    Schema.Literal("tool_output"),
    Schema.Literal("file_diff"),
    Schema.Literal("commit_message"),
  ])),
  action: ZyalGuardrailAction,
})
export type ZyalPatternGuardrail = Schema.Schema.Type<typeof ZyalPatternGuardrail>

export const ZyalShellGuardrail = Schema.Struct({
  name: Schema.String,
  shell: Schema.String,
  assert: Schema.optional(ZyalShellAssert),
  on_fail: Schema.optional(ZyalGuardrailAction),
  max_retries: Schema.optional(Schema.Number),
})
export type ZyalShellGuardrail = Schema.Schema.Type<typeof ZyalShellGuardrail>

export const ZyalGuardrails = Schema.Struct({
  input: Schema.optional(Schema.Array(ZyalPatternGuardrail)),
  output: Schema.optional(Schema.Array(Schema.Union([ZyalPatternGuardrail, ZyalShellGuardrail]))),
  iteration: Schema.optional(Schema.Array(ZyalShellGuardrail)),
})
export type ZyalGuardrails = Schema.Schema.Type<typeof ZyalGuardrails>

// ─── Assertions: Structured Output Contracts ───────────────────────────────

export const ZyalAssertions = Schema.Struct({
  require_structured_output: Schema.optional(Schema.Boolean),
  schema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  on_invalid: Schema.optional(Schema.Union([
    Schema.Literal("retry"),
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("warn"),
  ])),
  max_retries: Schema.optional(Schema.Number),
})
export type ZyalAssertions = Schema.Schema.Type<typeof ZyalAssertions>

// ─── Retry: Per-Step Backoff Policies ──────────────────────────────────────

export const ZyalRetryBackoff = Schema.Union([
  Schema.Literal("none"),
  Schema.Literal("linear"),
  Schema.Literal("exponential"),
])
export type ZyalRetryBackoff = Schema.Schema.Type<typeof ZyalRetryBackoff>

export const ZyalRetryPolicy = Schema.Struct({
  max_attempts: Schema.optional(Schema.Number),
  backoff: Schema.optional(ZyalRetryBackoff),
  initial_delay: Schema.optional(Schema.String),
  max_delay: Schema.optional(Schema.String),
  jitter: Schema.optional(Schema.Boolean),
})
export type ZyalRetryPolicy = Schema.Schema.Type<typeof ZyalRetryPolicy>

export const ZyalRetry = Schema.Struct({
  default: Schema.optional(ZyalRetryPolicy),
  overrides: Schema.optional(Schema.Struct({
    shell_checks: Schema.optional(ZyalRetryPolicy),
    checkpoint: Schema.optional(ZyalRetryPolicy),
    worker_spawn: Schema.optional(ZyalRetryPolicy),
    stop_evaluation: Schema.optional(ZyalRetryPolicy),
  })),
})
export type ZyalRetry = Schema.Schema.Type<typeof ZyalRetry>

// ─── Hooks: Lifecycle Hooks ────────────────────────────────────────────────

export const ZyalHookStep = Schema.Struct({
  run: Schema.String,
  assert: Schema.optional(ZyalShellAssert),
  on_fail: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("warn"),
    Schema.Literal("block_promotion"),
    Schema.Literal("continue"),
  ])),
  timeout: Schema.optional(Schema.String),
})
export type ZyalHookStep = Schema.Schema.Type<typeof ZyalHookStep>

export const ZyalHooks = Schema.Struct({
  on_start: Schema.optional(Schema.Array(ZyalHookStep)),
  before_iteration: Schema.optional(Schema.Array(ZyalHookStep)),
  after_iteration: Schema.optional(Schema.Array(ZyalHookStep)),
  before_checkpoint: Schema.optional(Schema.Array(ZyalHookStep)),
  after_checkpoint: Schema.optional(Schema.Array(ZyalHookStep)),
  on_promote: Schema.optional(Schema.Array(ZyalHookStep)),
  on_exhaust: Schema.optional(Schema.Array(ZyalHookStep)),
  on_stop: Schema.optional(Schema.Array(ZyalHookStep)),
})
export type ZyalHooks = Schema.Schema.Type<typeof ZyalHooks>

// ─── Constraints: Runtime Invariants ───────────────────────────────────────

export const ZyalConstraintInvariant = Schema.Union([
  Schema.Literal("gte_baseline"),
  Schema.Literal("lte_baseline"),
  Schema.Literal("equals_baseline"),
  Schema.Literal("equals_zero"),
  Schema.Literal("non_zero"),
])
export type ZyalConstraintInvariant = Schema.Schema.Type<typeof ZyalConstraintInvariant>

export const ZyalConstraint = Schema.Struct({
  name: Schema.String,
  check: Schema.Struct({
    shell: Schema.String,
    timeout: Schema.optional(Schema.String),
  }),
  baseline: Schema.optional(Schema.Union([
    Schema.Literal("capture_on_start"),
    Schema.Literal("capture_on_checkpoint"),
  ])),
  invariant: ZyalConstraintInvariant,
  on_violation: Schema.optional(Schema.Union([
    Schema.Literal("abort"),
    Schema.Literal("pause"),
    Schema.Literal("block"),
    Schema.Literal("warn"),
    Schema.Literal("retry"),
  ])),
})
export type ZyalConstraint = Schema.Schema.Type<typeof ZyalConstraint>

// ─── Workflow: Durable Graph Execution ─────────────────────────────────────

export const ZyalWorkflowTransitionCondition = Schema.Struct({
  evidence_exists: Schema.optional(Schema.String),
  risk_score_gte: Schema.optional(Schema.Number),
  approval_granted: Schema.optional(Schema.String),
  all_checks_pass: Schema.optional(Schema.Boolean),
  checks_failed: Schema.optional(Schema.Boolean),
  constraint_violated: Schema.optional(Schema.Boolean),
  shell: Schema.optional(ZyalShellCheck),
})
export type ZyalWorkflowTransitionCondition = Schema.Schema.Type<typeof ZyalWorkflowTransitionCondition>

export const ZyalWorkflowTransition = Schema.Struct({
  to: Schema.String,
  when: ZyalWorkflowTransitionCondition,
})
export type ZyalWorkflowTransition = Schema.Schema.Type<typeof ZyalWorkflowTransition>

export const ZyalWorkflowState = Schema.Struct({
  agent: Schema.optional(Schema.String),
  writes: Schema.optional(Schema.Union([
    Schema.Literal("none"),
    Schema.Literal("scratch_only"),
    Schema.Literal("isolated_worktree"),
    Schema.Literal("working_tree"),
  ])),
  requires: Schema.optional(Schema.Array(Schema.String)),
  produces: Schema.optional(Schema.Array(Schema.String)),
  approval: Schema.optional(Schema.String),
  terminal: Schema.optional(Schema.Boolean),
  timeout: Schema.optional(Schema.String),
  hooks: Schema.optional(Schema.Struct({
    on_enter: Schema.optional(Schema.Array(ZyalHookStep)),
    on_exit: Schema.optional(Schema.Array(ZyalHookStep)),
  })),
  transitions: Schema.optional(Schema.Array(ZyalWorkflowTransition)),
})
export type ZyalWorkflowState = Schema.Schema.Type<typeof ZyalWorkflowState>

export const ZyalWorkflow = Schema.Struct({
  type: Schema.Union([
    Schema.Literal("state_machine"),
    Schema.Literal("dag"),
    Schema.Literal("pipeline"),
  ]),
  initial: Schema.String,
  states: Schema.Record(Schema.String, ZyalWorkflowState),
  on_stuck: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("incubate"),
  ])),
  max_total_time: Schema.optional(Schema.String),
})
export type ZyalWorkflow = Schema.Schema.Type<typeof ZyalWorkflow>

// ─── Memory: Governed Agent Memory ─────────────────────────────────────────

export const ZyalMemoryStore = Schema.Struct({
  scope: Schema.Union([
    Schema.Literal("task"),
    Schema.Literal("run"),
    Schema.Literal("global"),
    Schema.Literal("agent"),
  ]),
  retention: Schema.Union([
    Schema.Literal("until_promotion"),
    Schema.Literal("until_archive"),
    Schema.Literal("permanent"),
    Schema.Literal("session"),
  ]),
  max_entries: Schema.optional(Schema.Number),
  compression: Schema.optional(Schema.String),
  write_policy: Schema.optional(Schema.Union([
    Schema.Literal("append_only"),
    Schema.Literal("upsert"),
    Schema.Literal("overwrite"),
  ])),
  read_policy: Schema.optional(Schema.Union([
    Schema.Literal("inject_at_start"),
    Schema.Literal("on_demand"),
    Schema.Literal("search"),
  ])),
  searchable: Schema.optional(Schema.Boolean),
})
export type ZyalMemoryStore = Schema.Schema.Type<typeof ZyalMemoryStore>

export const ZyalMemoryRedaction = Schema.Struct({
  patterns: Schema.Array(Schema.String),
  action: Schema.Union([
    Schema.Literal("mask"),
    Schema.Literal("remove"),
    Schema.Literal("hash"),
  ]),
})
export type ZyalMemoryRedaction = Schema.Schema.Type<typeof ZyalMemoryRedaction>

export const ZyalMemory = Schema.Struct({
  stores: Schema.optional(Schema.Record(Schema.String, ZyalMemoryStore)),
  redaction: Schema.optional(ZyalMemoryRedaction),
  provenance: Schema.optional(Schema.Struct({
    track_source: Schema.optional(Schema.Boolean),
    hash_chain: Schema.optional(Schema.Boolean),
  })),
})
export type ZyalMemory = Schema.Schema.Type<typeof ZyalMemory>

// ─── Evidence: Typed Proof Bundles ─────────────────────────────────────────

export const ZyalEvidenceRequirement = Schema.Struct({
  type: Schema.String,
  must_pass: Schema.optional(Schema.Boolean),
  must_be_known: Schema.optional(Schema.Boolean),
  must_exist: Schema.optional(Schema.Boolean),
  max_increase: Schema.optional(Schema.Number),
})
export type ZyalEvidenceRequirement = Schema.Schema.Type<typeof ZyalEvidenceRequirement>

export const ZyalEvidence = Schema.Struct({
  require_before_promote: Schema.optional(Schema.Array(ZyalEvidenceRequirement)),
  bundle_format: Schema.optional(Schema.Union([
    Schema.Literal("json"),
    Schema.Literal("markdown"),
  ])),
  sign: Schema.optional(Schema.Union([
    Schema.Literal("sha256"),
    Schema.Literal("none"),
  ])),
  archive: Schema.optional(Schema.Boolean),
})
export type ZyalEvidence = Schema.Schema.Type<typeof ZyalEvidence>

// ─── Approvals: First-Class Human Decisions ────────────────────────────────

export const ZyalApprovalDecision = Schema.Union([
  Schema.Literal("approve"),
  Schema.Literal("reject"),
  Schema.Literal("edit"),
  Schema.Literal("escalate"),
])
export type ZyalApprovalDecision = Schema.Schema.Type<typeof ZyalApprovalDecision>

export const ZyalApprovalGate = Schema.Struct({
  required_role: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  on_timeout: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("escalate"),
  ])),
  decisions: Schema.optional(Schema.Array(ZyalApprovalDecision)),
  require_evidence: Schema.optional(Schema.Array(Schema.String)),
  auto_approve_if: Schema.optional(Schema.Struct({
    risk_score_lt: Schema.optional(Schema.Number),
    all_checks_pass: Schema.optional(Schema.Boolean),
  })),
})
export type ZyalApprovalGate = Schema.Schema.Type<typeof ZyalApprovalGate>

export const ZyalApprovalEscalation = Schema.Struct({
  chain: Schema.optional(Schema.Array(Schema.String)),
  auto_escalate_after: Schema.optional(Schema.String),
})
export type ZyalApprovalEscalation = Schema.Schema.Type<typeof ZyalApprovalEscalation>

export const ZyalApprovals = Schema.Struct({
  gates: Schema.optional(Schema.Record(Schema.String, ZyalApprovalGate)),
  escalation: Schema.optional(ZyalApprovalEscalation),
})
export type ZyalApprovals = Schema.Schema.Type<typeof ZyalApprovals>

// ─── Skills: Agent Skill Registry ──────────────────────────────────────────

export const ZyalSkillDefinition = Schema.Struct({
  description: Schema.optional(Schema.String),
  agent: Schema.optional(Schema.String),
  tools: Schema.optional(Schema.Array(Schema.String)),
  mcp_profile: Schema.optional(Schema.String),
  writes: Schema.optional(Schema.Union([
    Schema.Literal("none"),
    Schema.Literal("scratch_only"),
    Schema.Literal("isolated_worktree"),
    Schema.Literal("working_tree"),
  ])),
  trust: Schema.optional(Schema.Union([
    Schema.Literal("builtin"),
    Schema.Literal("verified"),
    Schema.Literal("community"),
    Schema.Literal("local"),
  ])),
  timeout: Schema.optional(Schema.String),
})
export type ZyalSkillDefinition = Schema.Schema.Type<typeof ZyalSkillDefinition>

export const ZyalSkills = Schema.Struct({
  registry: Schema.optional(Schema.Record(Schema.String, ZyalSkillDefinition)),
  allow_creation: Schema.optional(Schema.Boolean),
  max_skills: Schema.optional(Schema.Number),
})
export type ZyalSkills = Schema.Schema.Type<typeof ZyalSkills>

// ─── Sandbox: Execution Boundaries ─────────────────────────────────────────

export const ZyalSandboxPathRule = Schema.Struct({
  path: Schema.String,
  access: Schema.Union([
    Schema.Literal("read"),
    Schema.Literal("write"),
    Schema.Literal("deny"),
  ]),
})
export type ZyalSandboxPathRule = Schema.Schema.Type<typeof ZyalSandboxPathRule>

export const ZyalSandboxNetworkPolicy = Schema.Struct({
  outbound: Schema.optional(Schema.Union([
    Schema.Literal("allow"),
    Schema.Literal("deny"),
    Schema.Literal("allowlist"),
  ])),
  allowlist: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalSandboxNetworkPolicy = Schema.Schema.Type<typeof ZyalSandboxNetworkPolicy>

export const ZyalSandboxResources = Schema.Struct({
  max_file_size: Schema.optional(Schema.String),
  max_total_disk: Schema.optional(Schema.String),
  max_memory: Schema.optional(Schema.String),
  max_processes: Schema.optional(Schema.Number),
})
export type ZyalSandboxResources = Schema.Schema.Type<typeof ZyalSandboxResources>

export const ZyalSandbox = Schema.Struct({
  paths: Schema.optional(Schema.Array(ZyalSandboxPathRule)),
  network: Schema.optional(ZyalSandboxNetworkPolicy),
  resources: Schema.optional(ZyalSandboxResources),
  env_inherit: Schema.optional(Schema.Array(Schema.String)),
  env_deny: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalSandbox = Schema.Schema.Type<typeof ZyalSandbox>

// ─── Security: Trust Zones & Injection Defense ─────────────────────────────

export const ZyalSecurityTrustZone = Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  require_approval: Schema.optional(Schema.Boolean),
  max_risk_score: Schema.optional(Schema.Number),
})
export type ZyalSecurityTrustZone = Schema.Schema.Type<typeof ZyalSecurityTrustZone>

export const ZyalSecurityInjection = Schema.Struct({
  scan_inputs: Schema.optional(Schema.Boolean),
  scan_outputs: Schema.optional(Schema.Boolean),
  deny_patterns: Schema.optional(Schema.Array(Schema.String)),
  on_detect: Schema.optional(Schema.Union([
    Schema.Literal("abort"),
    Schema.Literal("pause"),
    Schema.Literal("warn"),
    Schema.Literal("strip"),
  ])),
})
export type ZyalSecurityInjection = Schema.Schema.Type<typeof ZyalSecurityInjection>

export const ZyalSecuritySecrets = Schema.Struct({
  allowed_env: Schema.optional(Schema.Array(Schema.String)),
  redact_from_logs: Schema.optional(Schema.Boolean),
  rotate_after: Schema.optional(Schema.String),
})
export type ZyalSecuritySecrets = Schema.Schema.Type<typeof ZyalSecuritySecrets>

export const ZyalSecurity = Schema.Struct({
  trust_zones: Schema.optional(Schema.Record(Schema.String, ZyalSecurityTrustZone)),
  injection: Schema.optional(ZyalSecurityInjection),
  secrets: Schema.optional(ZyalSecuritySecrets),
})
export type ZyalSecurity = Schema.Schema.Type<typeof ZyalSecurity>

// ─── Observability: Spans, Metrics & Cost Tracking ─────────────────────────

export const ZyalObservabilitySpan = Schema.Struct({
  emit: Schema.optional(Schema.Union([
    Schema.Literal("all"),
    Schema.Literal("errors_only"),
    Schema.Literal("none"),
  ])),
  include_tool_calls: Schema.optional(Schema.Boolean),
  include_model_calls: Schema.optional(Schema.Boolean),
})
export type ZyalObservabilitySpan = Schema.Schema.Type<typeof ZyalObservabilitySpan>

export const ZyalObservabilityMetric = Schema.Struct({
  name: Schema.String,
  type: Schema.Union([
    Schema.Literal("counter"),
    Schema.Literal("gauge"),
    Schema.Literal("histogram"),
  ]),
  source: Schema.String,
})
export type ZyalObservabilityMetric = Schema.Schema.Type<typeof ZyalObservabilityMetric>

export const ZyalObservabilityCost = Schema.Struct({
  budget: Schema.optional(Schema.Number),
  currency: Schema.optional(Schema.String),
  alert_at_percent: Schema.optional(Schema.Number),
  on_budget_exceeded: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("warn"),
  ])),
})
export type ZyalObservabilityCost = Schema.Schema.Type<typeof ZyalObservabilityCost>

export const ZyalObservabilityReport = Schema.Struct({
  format: Schema.optional(Schema.Union([
    Schema.Literal("json"),
    Schema.Literal("markdown"),
  ])),
  on_complete: Schema.optional(Schema.Boolean),
  on_checkpoint: Schema.optional(Schema.Boolean),
  include: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalObservabilityReport = Schema.Schema.Type<typeof ZyalObservabilityReport>

export const ZyalObservability = Schema.Struct({
  spans: Schema.optional(ZyalObservabilitySpan),
  metrics: Schema.optional(Schema.Array(ZyalObservabilityMetric)),
  cost: Schema.optional(ZyalObservabilityCost),
  report: Schema.optional(ZyalObservabilityReport),
})
export type ZyalObservability = Schema.Schema.Type<typeof ZyalObservability>

// ─── v2.1: Arming (origin-aware, hash-bound) ──────────────────────────────

export const ZyalArmingOrigin = Schema.Union([
  Schema.Literal("trusted_user_message"),
  Schema.Literal("signed_cli_input"),
  Schema.Literal("signed_api_request"),
  Schema.Literal("host_ui_button"),
])
export type ZyalArmingOrigin = Schema.Schema.Type<typeof ZyalArmingOrigin>

export const ZyalArmingPolicy = Schema.Struct({
  preview_hash_required: Schema.optional(Schema.Boolean),
  host_nonce_required: Schema.optional(Schema.Boolean),
  reject_inside_code_fence: Schema.optional(Schema.Boolean),
  reject_from: Schema.optional(Schema.Array(Schema.String)),
  accepted_origins: Schema.optional(Schema.Array(ZyalArmingOrigin)),
  preview_expires_after: Schema.optional(Schema.String),
  arm_token_single_use: Schema.optional(Schema.Boolean),
  bound_to: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalArmingPolicy = Schema.Schema.Type<typeof ZyalArmingPolicy>

// ─── v2.1: Capabilities (least-privilege leases) ──────────────────────────

export const ZyalCapabilityRule = Schema.Struct({
  id: Schema.String,
  tool: Schema.optional(Schema.String),
  paths: Schema.optional(Schema.Array(Schema.String)),
  command_regex: Schema.optional(Schema.String),
  decision: Schema.Union([Schema.Literal("allow"), Schema.Literal("ask"), Schema.Literal("deny")]),
  require_gate: Schema.optional(Schema.String),
  expires: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})
export type ZyalCapabilityRule = Schema.Schema.Type<typeof ZyalCapabilityRule>

export const ZyalCapabilities = Schema.Struct({
  default: Schema.optional(Schema.Union([Schema.Literal("deny"), Schema.Literal("ask"), Schema.Literal("allow")])),
  rules: Schema.optional(Schema.Array(ZyalCapabilityRule)),
  command_floor: Schema.optional(Schema.Struct({
    always_block: Schema.Array(Schema.String),
  })),
})
export type ZyalCapabilities = Schema.Schema.Type<typeof ZyalCapabilities>

// ─── v2.1: Quality / anti-vibe ────────────────────────────────────────────

export const ZyalQualityCheck = Schema.Struct({
  name: Schema.String,
  pattern: Schema.optional(Schema.String),
  shell: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.Union([
    Schema.Literal("file_diff"),
    Schema.Literal("commit_message"),
    Schema.Literal("tool_output"),
    Schema.Literal("memory_write"),
  ])),
  on_violation: Schema.Union([
    Schema.Literal("block_checkpoint"),
    Schema.Literal("block_promotion"),
    Schema.Literal("pause"),
    Schema.Literal("warn"),
    Schema.Literal("require_approval"),
  ]),
})
export type ZyalQualityCheck = Schema.Schema.Type<typeof ZyalQualityCheck>

export const ZyalQuality = Schema.Struct({
  anti_vibe: Schema.optional(Schema.Struct({
    enabled: Schema.optional(Schema.Boolean),
    fail_closed: Schema.optional(Schema.Boolean),
    block_test_deletion: Schema.optional(Schema.Boolean),
    block_assertion_weakening: Schema.optional(Schema.Boolean),
    block_silent_catch: Schema.optional(Schema.Boolean),
    block_fake_data_fallback: Schema.optional(Schema.Boolean),
    block_ts_ignore: Schema.optional(Schema.Boolean),
    require_root_cause_for_bugfix: Schema.optional(Schema.Boolean),
    require_failing_test_first_for_bugfix: Schema.optional(Schema.Boolean),
  })),
  diff_budget: Schema.optional(Schema.Struct({
    max_files_changed: Schema.optional(Schema.Number),
    max_added_lines: Schema.optional(Schema.Number),
    max_deleted_lines: Schema.optional(Schema.Number),
    on_violation: Schema.optional(Schema.Union([
      Schema.Literal("block_checkpoint"),
      Schema.Literal("require_approval"),
      Schema.Literal("warn"),
    ])),
  })),
  checks: Schema.optional(Schema.Array(ZyalQualityCheck)),
})
export type ZyalQuality = Schema.Schema.Type<typeof ZyalQuality>

// ─── v2.1: Experiments (hypothesis tournament) ────────────────────────────

export const ZyalExperimentLane = Schema.Struct({
  id: Schema.String,
  hypothesis: Schema.String,
  prompt_strategy: Schema.optional(Schema.String),
  agent: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  isolation: Schema.optional(Schema.Union([Schema.Literal("git_worktree"), Schema.Literal("same_session")])),
  timeout: Schema.optional(Schema.String),
  budget: Schema.optional(Schema.Struct({
    max_iterations: Schema.optional(Schema.Number),
    max_diff_lines: Schema.optional(Schema.Number),
    max_cost_usd: Schema.optional(Schema.Number),
  })),
})
export type ZyalExperimentLane = Schema.Schema.Type<typeof ZyalExperimentLane>

export const ZyalExperiments = Schema.Struct({
  strategy: Schema.optional(Schema.Union([
    Schema.Literal("disjoint_tournament"),
    Schema.Literal("parallel_distill_refine"),
    Schema.Literal("ablation"),
    Schema.Literal("portfolio_search"),
  ])),
  diversity: Schema.optional(Schema.Struct({
    require_distinct_plan: Schema.optional(Schema.Boolean),
    min_plan_distance: Schema.optional(Schema.Number),
    axes: Schema.optional(Schema.Array(Schema.String)),
  })),
  lanes: Schema.Array(ZyalExperimentLane),
  fork_from: Schema.optional(Schema.Union([
    Schema.Literal("last_green_checkpoint"),
    Schema.Literal("current_head"),
    Schema.Literal("origin_main"),
  ])),
  max_parallel: Schema.optional(Schema.Number),
  scoring: Schema.optional(Schema.Struct({
    weights: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
    command: Schema.optional(Schema.String),
    judge: Schema.optional(Schema.Struct({
      agent: Schema.String,
      blind: Schema.optional(Schema.Boolean),
      must_use_different_provider: Schema.optional(Schema.Boolean),
    })),
  })),
  reduce: Schema.optional(Schema.Struct({
    strategy: Schema.Union([
      Schema.Literal("best_verified_patch"),
      Schema.Literal("synthesize_best"),
      Schema.Literal("cherry_pick_minimal"),
      Schema.Literal("vote"),
    ]),
    require_final_verification: Schema.optional(Schema.Boolean),
  })),
  on_partial_failure: Schema.optional(Schema.Union([
    Schema.Literal("continue"),
    Schema.Literal("abort"),
    Schema.Literal("pause"),
  ])),
  preserve_failed_lanes_as_negative_memory: Schema.optional(Schema.Boolean),
})
export type ZyalExperiments = Schema.Schema.Type<typeof ZyalExperiments>

// ─── v2.1: Models (routing + redundancy + critic discipline) ────────────────

export const ZyalModelProfile = Schema.Struct({
  provider: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  temperature: Schema.optional(Schema.Number),
  reasoning: Schema.optional(Schema.Boolean),
  budget_usd: Schema.optional(Schema.Number),
})
export type ZyalModelProfile = Schema.Schema.Type<typeof ZyalModelProfile>

export const ZyalModels = Schema.Struct({
  profiles: Schema.optional(Schema.Record(Schema.String, ZyalModelProfile)),
  routes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  critic: Schema.optional(Schema.Struct({
    must_differ_from_builder: Schema.optional(Schema.Boolean),
    must_use_different_provider: Schema.optional(Schema.Boolean),
  })),
  redundancy: Schema.optional(Schema.Struct({
    on_rate_limit: Schema.optional(Schema.String),
    on_context_overflow: Schema.optional(Schema.String),
    chain: Schema.optional(Schema.Array(Schema.String)),
    cooldown: Schema.optional(Schema.String),
  })),
  confidence_cap: Schema.optional(Schema.Number),
})
export type ZyalModels = Schema.Schema.Type<typeof ZyalModels>

// ─── v2.1: Budgets (multi-scope, on_exhaust policy) ───────────────────────

export const ZyalBudgetScope = Schema.Struct({
  wall_clock: Schema.optional(Schema.String),
  iterations: Schema.optional(Schema.Number),
  tokens: Schema.optional(Schema.Number),
  cost_usd: Schema.optional(Schema.Number),
  tool_calls: Schema.optional(Schema.Number),
  diff_lines: Schema.optional(Schema.Number),
  on_exhaust: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("park"),
    Schema.Literal("abort"),
    Schema.Literal("renew_with_approval"),
  ])),
})
export type ZyalBudgetScope = Schema.Schema.Type<typeof ZyalBudgetScope>

export const ZyalBudgets = Schema.Struct({
  run: Schema.optional(ZyalBudgetScope),
  task: Schema.optional(ZyalBudgetScope),
  iteration: Schema.optional(ZyalBudgetScope),
  experiment_lane: Schema.optional(ZyalBudgetScope),
})
export type ZyalBudgets = Schema.Schema.Type<typeof ZyalBudgets>

// ─── v2.1: Triggers (manual/cron/github/ci/webhook) ───────────────────────

export const ZyalTrigger = Schema.Struct({
  id: Schema.String,
  kind: Schema.Union([
    Schema.Literal("manual"),
    Schema.Literal("cron"),
    Schema.Literal("github_issue"),
    Schema.Literal("github_pr_comment"),
    Schema.Literal("ci_failure"),
    Schema.Literal("webhook"),
    Schema.Literal("slack_command"),
  ]),
  schedule: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  idempotency_key_template: Schema.optional(Schema.String),
  max_runs_per_sha: Schema.optional(Schema.Number),
  allow_create_more_cron: Schema.optional(Schema.Boolean),
})
export type ZyalTrigger = Schema.Schema.Type<typeof ZyalTrigger>

export const ZyalTriggers = Schema.Struct({
  list: Schema.Array(ZyalTrigger),
  anti_recursion: Schema.optional(Schema.Boolean),
})
export type ZyalTriggers = Schema.Schema.Type<typeof ZyalTriggers>

// ─── v2.1: Rollback (first-class) ─────────────────────────────────────────

export const ZyalRollback = Schema.Struct({
  required_when: Schema.optional(Schema.Struct({
    touches_paths: Schema.optional(Schema.Array(Schema.String)),
    risk_score_gte: Schema.optional(Schema.Number),
  })),
  plan_required: Schema.optional(Schema.Boolean),
  verify_command: Schema.optional(Schema.String),
  on_failure_after_merge: Schema.optional(Schema.Union([
    Schema.Literal("revert_commit"),
    Schema.Literal("feature_flag_off"),
    Schema.Literal("migration_down"),
    Schema.Literal("manual"),
  ])),
})
export type ZyalRollback = Schema.Schema.Type<typeof ZyalRollback>

// ─── v2.1: Done definition (host-evaluated) ───────────────────────────────

export const ZyalDone = Schema.Struct({
  require: Schema.optional(Schema.Array(Schema.String)),
  forbid: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalDone = Schema.Schema.Type<typeof ZyalDone>

// ─── v2.1: Repo intelligence (indexes, scope, blast radius) ───────────────

export const ZyalRepoIntelligence = Schema.Struct({
  scale: Schema.optional(Schema.Union([
    Schema.Literal("small"),
    Schema.Literal("medium"),
    Schema.Literal("large"),
    Schema.Literal("billion_loc"),
  ])),
  indexes: Schema.optional(Schema.Array(Schema.String)),
  generated_zones: Schema.optional(Schema.Array(Schema.String)),
  scope_control: Schema.optional(Schema.Struct({
    require_scope_before_edit: Schema.optional(Schema.Boolean),
    max_initial_scope_files: Schema.optional(Schema.Number),
    expand_scope_requires_evidence: Schema.optional(Schema.Boolean),
  })),
  blast_radius: Schema.optional(Schema.Struct({
    compute_on: Schema.optional(Schema.Array(Schema.String)),
    pause_when_score_gte: Schema.optional(Schema.Number),
  })),
})
export type ZyalRepoIntelligence = Schema.Schema.Type<typeof ZyalRepoIntelligence>

// ─── v2.2: Fleet (single-session multi-worker orchestration, capped at 20) ─

export const ZYAL_FLEET_MAX_WORKERS = 20

export const ZyalFleetTelemetryHeaders = Schema.Record(Schema.String, Schema.String)

export const ZyalFleetJnoccio = Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  base_url: Schema.optional(Schema.String),
  metrics_ws: Schema.optional(Schema.String),
  spawn_on_demand: Schema.optional(Schema.Boolean),
  register_workers: Schema.optional(Schema.Boolean),
  heartbeat_path: Schema.optional(Schema.String),
  heartbeat_interval: Schema.optional(Schema.String),
  // Hard cap mirrors fleet.max_workers — keeps the spec consistent with the
  // jnoccio-fusion gateway's own `max_instances` invariant.
  max_instances: Schema.optional(
    Schema.Int.check(Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(20)),
  ),
})
export type ZyalFleetJnoccio = Schema.Schema.Type<typeof ZyalFleetJnoccio>

export const ZyalFleetTelemetry = Schema.Struct({
  publish_to: Schema.optional(Schema.Union([
    Schema.Literal("jnoccio"),
    Schema.Literal("opentelemetry"),
    Schema.Literal("none"),
  ])),
  headers: Schema.optional(ZyalFleetTelemetryHeaders),
})
export type ZyalFleetTelemetry = Schema.Schema.Type<typeof ZyalFleetTelemetry>

export const ZyalFleet = Schema.Struct({
  // Single-session multi-worker hard cap — must be an integer in [1, 20].
  // Schema-level enforcement rejects strings, non-integers, and out-of-range
  // values at decode time, before any semantic cross-block checks run.
  max_workers: Schema.Int.check(Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(20)),
  isolation: Schema.optional(Schema.Union([
    Schema.Literal("same_session"),
    Schema.Literal("git_worktree"),
    Schema.Literal("hybrid"),
  ])),
  jnoccio: Schema.optional(ZyalFleetJnoccio),
  telemetry: Schema.optional(ZyalFleetTelemetry),
})
export type ZyalFleet = Schema.Schema.Type<typeof ZyalFleet>

// ─── v2.3: Taint — origin-aware data-flow defence ─────────────────────────
//
// Closes the prompt-injection / data-origin gap that no other ZYAL block
// covers. Distinct from the preview-only `trust` block (which scopes
// repository paths into trust zones): `taint` is about flow control on
// inbound bytes — labelling every source of data the model might consume
// ─── Interaction ─────────────────────────────────────────────────────────────
// Declares whether a human is present during the run and how the runtime should
// behave when the agent is ambiguous or blocked. When `user: "none"`:
//   - The ZYAL runtime prepends `system_inject` into every agent turn's
//     <system-reminder> block so the model never forgets the no-ask rule.
//   - Any capability `decision: "ask"` is coerced to "allow" (if the path is
//     otherwise permitted) or "deny" (if forbidden) — never a blocking prompt.
//   - Jekyll suppresses its own interactive permission dialogs for the session.

export const ZyalInteractionUser = Schema.Union([
  Schema.Literal("none"),    // no human reads or responds; fully unattended
  Schema.Literal("async"),   // human may respond but is not watching live
  Schema.Literal("present"), // default — interactive session
])
export type ZyalInteractionUser = Schema.Schema.Type<typeof ZyalInteractionUser>

export const ZyalInteractionOnAmbiguity = Schema.Union([
  Schema.Literal("best_effort"), // agent picks the safest path and proceeds
  Schema.Literal("pause"),       // pause the loop; wait for human input
  Schema.Literal("skip"),        // skip the current unit of work and move on
])
export type ZyalInteractionOnAmbiguity = Schema.Schema.Type<typeof ZyalInteractionOnAmbiguity>

export const ZyalInteractionOnBlocked = Schema.Union([
  Schema.Literal("skip_and_next"), // mark blocked; claim next pending task
  Schema.Literal("pause"),         // pause loop; wait for human to unblock
  Schema.Literal("fail"),          // hard-fail the current iteration
])
export type ZyalInteractionOnBlocked = Schema.Schema.Type<typeof ZyalInteractionOnBlocked>

export const ZyalInteraction = Schema.Struct({
  // Whether a human is available to answer questions during this run.
  user: Schema.optional(ZyalInteractionUser),
  // What to do when the agent faces an ambiguous decision.
  on_ambiguity: Schema.optional(ZyalInteractionOnAmbiguity),
  // What to do when the agent is blocked on the current task.
  on_blocked: Schema.optional(ZyalInteractionOnBlocked),
  // Text injected verbatim into every agent turn's <system-reminder> block.
  // Use to enforce tool-call hygiene, schema rules, or no-ask discipline.
  // Only injected when `user` is "none" or "async".
  system_inject: Schema.optional(Schema.String),
})
export type ZyalInteraction = Schema.Schema.Type<typeof ZyalInteraction>

// (web pages, tool output, MCP resources, repo files, the assistant's own
// output) and forbidding tainted content from triggering high-privilege
// actions (arm, approve, grant capability, write procedural memory, exec
// shell) without explicit human review or a signed sanitiser.

export const ZyalTaintRank = Schema.Union([
  Schema.Literal("high"),
  Schema.Literal("medium"),
  Schema.Literal("untrusted"),
  Schema.Literal("untrusted_for_arming"),
  Schema.Literal("hostile"),
])
export type ZyalTaintRank = Schema.Schema.Type<typeof ZyalTaintRank>

export const ZyalTaintLabel = Schema.Struct({
  rank: ZyalTaintRank,
  notes: Schema.optional(Schema.String),
})
export type ZyalTaintLabel = Schema.Schema.Type<typeof ZyalTaintLabel>

export const ZyalTaintForbidAction = Schema.Union([
  Schema.Literal("arm"),
  Schema.Literal("approve"),
  Schema.Literal("grant_capability"),
  Schema.Literal("write_memory_procedural"),
  Schema.Literal("write_memory_semantic"),
  Schema.Literal("exec_shell"),
  Schema.Literal("install_skill"),
  Schema.Literal("modify_objective"),
  Schema.Literal("expose_secret"),
])
export type ZyalTaintForbidAction = Schema.Schema.Type<typeof ZyalTaintForbidAction>

export const ZyalTaintForbidRule = Schema.Struct({
  from: Schema.Array(Schema.String),
  cannot: Schema.Array(ZyalTaintForbidAction),
  unless: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalTaintForbidRule = Schema.Schema.Type<typeof ZyalTaintForbidRule>

export const ZyalTaintInjectionAction = Schema.Union([
  Schema.Literal("strip"),
  Schema.Literal("quote"),
  Schema.Literal("block"),
  Schema.Literal("pause"),
])
export type ZyalTaintInjectionAction = Schema.Schema.Type<typeof ZyalTaintInjectionAction>

export const ZyalTaintPromptInjection = Schema.Struct({
  detect_patterns: Schema.Array(Schema.String),
  on_detect: ZyalTaintInjectionAction,
  scan_sources: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalTaintPromptInjection = Schema.Schema.Type<typeof ZyalTaintPromptInjection>

export const ZyalTaint = Schema.Struct({
  default_label: Schema.optional(Schema.String),
  labels: Schema.Record(Schema.String, ZyalTaintLabel),
  forbid: Schema.optional(Schema.Array(ZyalTaintForbidRule)),
  prompt_injection: Schema.optional(ZyalTaintPromptInjection),
})
export type ZyalTaint = Schema.Schema.Type<typeof ZyalTaint>

// ─── Preview-only control plane blocks ────────────────────────────────────

export const ZyalInteropProtocol = Schema.Struct({
  name: Schema.String,
  target: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
})
export type ZyalInteropProtocol = Schema.Schema.Type<typeof ZyalInteropProtocol>

export const ZyalInterop = Schema.Struct({
  protocols: Schema.optional(Schema.Array(ZyalInteropProtocol)),
  adapters: Schema.optional(Schema.Array(Schema.String)),
  compile_to: Schema.optional(Schema.Array(Schema.String)),
  notes: Schema.optional(Schema.String),
})
export type ZyalInterop = Schema.Schema.Type<typeof ZyalInterop>

export const ZyalRuntimeResources = Schema.Struct({
  cpu: Schema.optional(Schema.String),
  memory: Schema.optional(Schema.String),
  disk: Schema.optional(Schema.String),
  processes: Schema.optional(Schema.Number),
})
export type ZyalRuntimeResources = Schema.Schema.Type<typeof ZyalRuntimeResources>

export const ZyalRuntime = Schema.Struct({
  mode: Schema.optional(Schema.Union([Schema.Literal("preview"), Schema.Literal("host_enforced")])),
  image: Schema.optional(Schema.String),
  workspace: Schema.optional(Schema.String),
  network: Schema.optional(Schema.Union([Schema.Literal("allow"), Schema.Literal("deny"), Schema.Literal("allowlist")])),
  env: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(ZyalRuntimeResources),
})
export type ZyalRuntime = Schema.Schema.Type<typeof ZyalRuntime>

export const ZyalCapabilityNegotiation = Schema.Struct({
  host: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Array(Schema.String)),
  optional: Schema.optional(Schema.Array(Schema.String)),
  fail_closed: Schema.optional(Schema.Boolean),
  degrade_to: Schema.optional(Schema.String),
})
export type ZyalCapabilityNegotiation = Schema.Schema.Type<typeof ZyalCapabilityNegotiation>

export const ZyalMemoryKernelStore = Schema.Struct({
  scope: Schema.String,
  retention: Schema.String,
  searchable: Schema.optional(Schema.Boolean),
})
export type ZyalMemoryKernelStore = Schema.Schema.Type<typeof ZyalMemoryKernelStore>

export const ZyalMemoryKernelRedaction = Schema.Struct({
  patterns: Schema.Array(Schema.String),
  action: Schema.Union([
    Schema.Literal("mask"),
    Schema.Literal("remove"),
    Schema.Literal("hash"),
  ]),
})
export type ZyalMemoryKernelRedaction = Schema.Schema.Type<typeof ZyalMemoryKernelRedaction>

export const ZyalMemoryKernel = Schema.Struct({
  stores: Schema.optional(Schema.Record(Schema.String, ZyalMemoryKernelStore)),
  redaction: Schema.optional(ZyalMemoryKernelRedaction),
  provenance: Schema.optional(Schema.Struct({
    track_source: Schema.optional(Schema.Boolean),
    hash_chain: Schema.optional(Schema.Boolean),
  })),
})
export type ZyalMemoryKernel = Schema.Schema.Type<typeof ZyalMemoryKernel>

export const ZyalEvidenceGraphNode = Schema.Struct({
  type: Schema.String,
  required: Schema.optional(Schema.Boolean),
})
export type ZyalEvidenceGraphNode = Schema.Schema.Type<typeof ZyalEvidenceGraphNode>

export const ZyalEvidenceGraphEdge = Schema.Struct({
  from: Schema.String,
  to: Schema.String,
  kind: Schema.optional(Schema.String),
})
export type ZyalEvidenceGraphEdge = Schema.Schema.Type<typeof ZyalEvidenceGraphEdge>

export const ZyalEvidenceGraph = Schema.Struct({
  nodes: Schema.optional(Schema.Record(Schema.String, ZyalEvidenceGraphNode)),
  edges: Schema.optional(Schema.Array(ZyalEvidenceGraphEdge)),
  merge_witness: Schema.optional(Schema.String),
})
export type ZyalEvidenceGraph = Schema.Schema.Type<typeof ZyalEvidenceGraph>

export const ZyalTrustZonePolicy = Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  taint: Schema.optional(Schema.Union([
    Schema.Literal("clean"),
    Schema.Literal("tainted"),
    Schema.Literal("quarantined"),
  ])),
  require_approval: Schema.optional(Schema.Boolean),
})
export type ZyalTrustZonePolicy = Schema.Schema.Type<typeof ZyalTrustZonePolicy>

export const ZyalTrustPolicy = Schema.Struct({
  zones: Schema.optional(Schema.Record(Schema.String, ZyalTrustZonePolicy)),
  on_taint: Schema.optional(Schema.Union([
    Schema.Literal("abort"),
    Schema.Literal("pause"),
    Schema.Literal("warn"),
  ])),
  notes: Schema.optional(Schema.String),
})
export type ZyalTrustPolicy = Schema.Schema.Type<typeof ZyalTrustPolicy>

export const ZyalRequirements = Schema.Struct({
  must: Schema.optional(Schema.Array(Schema.String)),
  should: Schema.optional(Schema.Array(Schema.String)),
  avoid: Schema.optional(Schema.Array(Schema.String)),
})
export type ZyalRequirements = Schema.Schema.Type<typeof ZyalRequirements>

export const ZyalEvaluationMetric = Schema.Struct({
  name: Schema.String,
  command: Schema.optional(Schema.String),
  threshold: Schema.optional(Schema.Number),
})
export type ZyalEvaluationMetric = Schema.Schema.Type<typeof ZyalEvaluationMetric>

export const ZyalEvaluation = Schema.Struct({
  metrics: Schema.optional(Schema.Array(ZyalEvaluationMetric)),
  compare: Schema.optional(Schema.String),
})
export type ZyalEvaluation = Schema.Schema.Type<typeof ZyalEvaluation>

export const ZyalRelease = Schema.Struct({
  channel: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  gates: Schema.optional(Schema.Array(Schema.String)),
  notes: Schema.optional(Schema.String),
})
export type ZyalRelease = Schema.Schema.Type<typeof ZyalRelease>

export const ZyalRole = Schema.Struct({
  id: Schema.String,
  agent: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
})
export type ZyalRole = Schema.Schema.Type<typeof ZyalRole>

export const ZyalRoles = Schema.Struct({
  list: Schema.optional(Schema.Array(ZyalRole)),
})
export type ZyalRoles = Schema.Schema.Type<typeof ZyalRoles>

export const ZyalChannel = Schema.Struct({
  id: Schema.String,
  kind: Schema.optional(Schema.String),
  route: Schema.optional(Schema.String),
  approval: Schema.optional(Schema.String),
})
export type ZyalChannel = Schema.Schema.Type<typeof ZyalChannel>

export const ZyalChannels = Schema.Struct({
  list: Schema.optional(Schema.Array(ZyalChannel)),
})
export type ZyalChannels = Schema.Schema.Type<typeof ZyalChannels>

export const ZyalImportSource = Schema.Struct({
  source: Schema.String,
  optional: Schema.optional(Schema.Boolean),
  pin: Schema.optional(Schema.String),
})
export type ZyalImportSource = Schema.Schema.Type<typeof ZyalImportSource>

export const ZyalImports = Schema.Struct({
  list: Schema.optional(Schema.Array(ZyalImportSource)),
})
export type ZyalImports = Schema.Schema.Type<typeof ZyalImports>

export const ZyalReasoningPrivacy = Schema.Struct({
  store_reasoning: Schema.optional(Schema.Boolean),
  redact_chain_of_thought: Schema.optional(Schema.Boolean),
  summaries_only: Schema.optional(Schema.Boolean),
})
export type ZyalReasoningPrivacy = Schema.Schema.Type<typeof ZyalReasoningPrivacy>

export const ZyalUnsupportedFeaturePolicy = Schema.Struct({
  required: Schema.optional(Schema.Array(Schema.String)),
  optional: Schema.optional(Schema.Array(Schema.String)),
  fail_closed: Schema.optional(Schema.Boolean),
  on_missing: Schema.optional(Schema.Union([
    Schema.Literal("reject"),
    Schema.Literal("warn"),
    Schema.Literal("degrade"),
  ])),
})
export type ZyalUnsupportedFeaturePolicy = Schema.Schema.Type<typeof ZyalUnsupportedFeaturePolicy>

// ─── Core Types ────────────────────────────────────────────────────────────

export const ZyalArm = Schema.Struct({
  action: ArmAction,
  id: Schema.String,
})

export type ZyalArm = Schema.Schema.Type<typeof ZyalArm>

export const ZyalSpec = Schema.Struct({
  version: Schema.Literal("v1"),
  intent: DaemonAction,
  confirm: ArmAction,
  id: Schema.String,
  job: ZyalJob,
  loop: Schema.optional(ZyalLoop),
  stop: ZyalStop,
  context: Schema.optional(ZyalContext),
  checkpoint: Schema.optional(ZyalCheckpoint),
  tasks: Schema.optional(ZyalTasks),
  incubator: Schema.optional(ZyalIncubator),
  agents: Schema.optional(ZyalAgents),
  mcp: Schema.optional(ZyalMcp),
  permissions: Schema.optional(ZyalPermissionMode),
  ui: Schema.optional(ZyalUi),
  on: Schema.optional(Schema.Array(ZyalOnHandler)),
  fan_out: Schema.optional(ZyalFanOut),
  guardrails: Schema.optional(ZyalGuardrails),
  assertions: Schema.optional(ZyalAssertions),
  retry: Schema.optional(ZyalRetry),
  hooks: Schema.optional(ZyalHooks),
  constraints: Schema.optional(Schema.Array(ZyalConstraint)),
  // v2 blocks
  workflow: Schema.optional(ZyalWorkflow),
  memory: Schema.optional(ZyalMemory),
  evidence: Schema.optional(ZyalEvidence),
  approvals: Schema.optional(ZyalApprovals),
  // v2 wave 2 blocks
  skills: Schema.optional(ZyalSkills),
  sandbox: Schema.optional(ZyalSandbox),
  security: Schema.optional(ZyalSecurity),
  observability: Schema.optional(ZyalObservability),
  // v2.1 power blocks
  arming: Schema.optional(ZyalArmingPolicy),
  capabilities: Schema.optional(ZyalCapabilities),
  quality: Schema.optional(ZyalQuality),
  experiments: Schema.optional(ZyalExperiments),
  models: Schema.optional(ZyalModels),
  budgets: Schema.optional(ZyalBudgets),
  triggers: Schema.optional(ZyalTriggers),
  rollback: Schema.optional(ZyalRollback),
  done: Schema.optional(ZyalDone),
  repo_intelligence: Schema.optional(ZyalRepoIntelligence),
  // v2.2 fleet
  fleet: Schema.optional(ZyalFleet),
  // v2.3 taint — origin-aware data-flow defence
  taint: Schema.optional(ZyalTaint),
  // v2.3 interaction — unattended-run control and per-turn system injection
  interaction: Schema.optional(ZyalInteraction),
  // preview-only control plane blocks
  interop: Schema.optional(ZyalInterop),
  runtime: Schema.optional(ZyalRuntime),
  capability_negotiation: Schema.optional(ZyalCapabilityNegotiation),
  memory_kernel: Schema.optional(ZyalMemoryKernel),
  evidence_graph: Schema.optional(ZyalEvidenceGraph),
  trust: Schema.optional(ZyalTrustPolicy),
  requirements: Schema.optional(ZyalRequirements),
  evaluation: Schema.optional(ZyalEvaluation),
  release: Schema.optional(ZyalRelease),
  roles: Schema.optional(ZyalRoles),
  channels: Schema.optional(ZyalChannels),
  imports: Schema.optional(ZyalImports),
  reasoning_privacy: Schema.optional(ZyalReasoningPrivacy),
  unsupported_feature_policy: Schema.optional(ZyalUnsupportedFeaturePolicy),
})

export type ZyalSpec = Schema.Schema.Type<typeof ZyalSpec>

export const ZyalScriptSchema = ZyalSpec.pipe(withStatics((schema) => ({ zod: zod(schema) })))
export type ZyalScript = Schema.Schema.Type<typeof ZyalScriptSchema>

export const ZyalParseMeta = Schema.Struct({
  openedId: Schema.String,
  armed: Schema.Boolean,
})
export type ZyalParseMeta = Schema.Schema.Type<typeof ZyalParseMeta>

export const ZyalPreview = Schema.Struct({
  id: Schema.String,
  armed: Schema.Boolean,
  objective: Schema.String,
  loop_policy: Schema.optional(Schema.String),
  stop_checks: Schema.Array(Schema.String),
  checkpoint_checks: Schema.Array(Schema.String),
  worker_count: Schema.Number,
  permissions: Schema.Array(Schema.String),
  risks: Schema.Array(Schema.String),
  incubator_enabled: Schema.Boolean,
  incubator_passes: Schema.Array(Schema.String),
  incubator_budget: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  promotion_threshold: Schema.optional(Schema.Number),
  routing_summary: Schema.optional(Schema.String),
  exclusion_summary: Schema.optional(Schema.String),
  cleanup_summary: Schema.optional(Schema.String),
  readiness_summary: Schema.optional(Schema.String),
  incubator_risks: Schema.Array(Schema.String),
  // v1.1 capabilities
  on_handler_count: Schema.Number,
  fan_out_enabled: Schema.Boolean,
  fan_out_summary: Schema.optional(Schema.String),
  guardrail_count: Schema.Number,
  guardrails_summary: Schema.optional(Schema.String),
  assertions_enabled: Schema.Boolean,
  retry_enabled: Schema.Boolean,
  hook_count: Schema.Number,
  hooks_summary: Schema.optional(Schema.String),
  constraint_count: Schema.Number,
  constraints_summary: Schema.optional(Schema.String),
  // v2 capabilities
  workflow_enabled: Schema.Boolean,
  workflow_summary: Schema.optional(Schema.String),
  memory_store_count: Schema.Number,
  memory_summary: Schema.optional(Schema.String),
  evidence_enabled: Schema.Boolean,
  evidence_summary: Schema.optional(Schema.String),
  approval_gate_count: Schema.Number,
  approvals_summary: Schema.optional(Schema.String),
  // v2 wave 2 capabilities
  skills_count: Schema.Number,
  skills_summary: Schema.optional(Schema.String),
  sandbox_enabled: Schema.Boolean,
  sandbox_summary: Schema.optional(Schema.String),
  security_enabled: Schema.Boolean,
  security_summary: Schema.optional(Schema.String),
  observability_enabled: Schema.Boolean,
  observability_summary: Schema.optional(Schema.String),
  // v2.1 power blocks
  arming_enabled: Schema.Boolean,
  arming_summary: Schema.optional(Schema.String),
  capabilities_rule_count: Schema.Number,
  capabilities_summary: Schema.optional(Schema.String),
  quality_enabled: Schema.Boolean,
  quality_summary: Schema.optional(Schema.String),
  experiments_enabled: Schema.Boolean,
  experiments_summary: Schema.optional(Schema.String),
  models_enabled: Schema.Boolean,
  models_summary: Schema.optional(Schema.String),
  budgets_enabled: Schema.Boolean,
  budgets_summary: Schema.optional(Schema.String),
  triggers_count: Schema.Number,
  triggers_summary: Schema.optional(Schema.String),
  rollback_enabled: Schema.Boolean,
  rollback_summary: Schema.optional(Schema.String),
  done_enabled: Schema.Boolean,
  done_summary: Schema.optional(Schema.String),
  repo_intel_enabled: Schema.Boolean,
  repo_intel_summary: Schema.optional(Schema.String),
  // v2.2 fleet
  fleet_enabled: Schema.Boolean,
  fleet_max_workers: Schema.Number,
  fleet_summary: Schema.optional(Schema.String),
  // v2.3 taint
  taint_enabled: Schema.Boolean,
  taint_label_count: Schema.Number,
  taint_forbid_count: Schema.Number,
  taint_summary: Schema.optional(Schema.String),
  // preview-only control plane blocks
  interop_enabled: Schema.Boolean,
  interop_summary: Schema.optional(Schema.String),
  runtime_enabled: Schema.Boolean,
  runtime_summary: Schema.optional(Schema.String),
  capability_negotiation_enabled: Schema.Boolean,
  capability_negotiation_summary: Schema.optional(Schema.String),
  memory_kernel_enabled: Schema.Boolean,
  memory_kernel_summary: Schema.optional(Schema.String),
  evidence_graph_enabled: Schema.Boolean,
  evidence_graph_summary: Schema.optional(Schema.String),
  trust_enabled: Schema.Boolean,
  trust_summary: Schema.optional(Schema.String),
  requirements_enabled: Schema.Boolean,
  requirements_summary: Schema.optional(Schema.String),
  evaluation_enabled: Schema.Boolean,
  evaluation_summary: Schema.optional(Schema.String),
  release_enabled: Schema.Boolean,
  release_summary: Schema.optional(Schema.String),
  roles_count: Schema.Number,
  roles_summary: Schema.optional(Schema.String),
  channels_count: Schema.Number,
  channels_summary: Schema.optional(Schema.String),
  imports_count: Schema.Number,
  imports_summary: Schema.optional(Schema.String),
  reasoning_privacy_enabled: Schema.Boolean,
  reasoning_privacy_summary: Schema.optional(Schema.String),
  unsupported_feature_policy_enabled: Schema.Boolean,
  unsupported_feature_policy_summary: Schema.optional(Schema.String),
})

export type ZyalPreview = Schema.Schema.Type<typeof ZyalPreview>

export type ZyalParsed = {
  readonly spec: ZyalScript
  readonly arm: ZyalArm | undefined
  readonly specHash: string
  readonly preview: ZyalPreview
}

export function assertZyalTopLevelKeys(input: Record<string, unknown>) {
  const allowed = new Set([
    "version",
    "intent",
    "confirm",
    "id",
    "job",
    "loop",
    "stop",
    "context",
    "checkpoint",
    "tasks",
    "incubator",
    "agents",
    "mcp",
    "permissions",
    "ui",
    "on",
    "fan_out",
    "guardrails",
    "assertions",
    "retry",
    "hooks",
    "constraints",
    // v2
    "workflow",
    "memory",
    "evidence",
    "approvals",
    // v2 wave 2
    "skills",
    "sandbox",
    "security",
    "observability",
    // v2.1 power blocks
    "arming",
    "capabilities",
    "quality",
    "experiments",
    "models",
    "budgets",
    "triggers",
    "rollback",
    "done",
    "repo_intelligence",
  // v2.2
  "fleet",
    // v2.3
    "taint",
    "interaction",
    // preview-only control plane blocks
    "interop",
    "runtime",
    "capability_negotiation",
    "memory_kernel",
    "evidence_graph",
    "trust",
    "requirements",
    "evaluation",
    "release",
    "roles",
    "channels",
    "imports",
    "reasoning_privacy",
    "unsupported_feature_policy",
  ])
  for (const key of Object.keys(input)) {
    if (!allowed.has(key)) {
      throw new Error(`Unknown ZYAL top-level key: ${key}`)
    }
  }
}

export function buildZyalPreview(input: { spec: ZyalScript; arm?: ZyalArm }): ZyalPreview {
  const stopChecks = input.spec.stop.all.map(describeCondition)
  const checkpointChecks = input.spec.checkpoint?.verify?.map(describeShellCheck) ?? []
  const workers = input.spec.agents?.workers ?? []
  const perms = input.spec.permissions
    ? Object.entries(input.spec.permissions)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}:${value}`)
    : []
  const risks = [
    ...(input.spec.loop?.policy === "forever" ? ["loop:forever"] : []),
    ...(input.spec.permissions?.shell === "allow" ? ["shell:allow"] : []),
    ...(input.spec.permissions?.git_push === "allow" ? ["git_push:allow"] : []),
    ...(workers.some((worker) => (worker.count ?? 0) > 1) ? ["worker_fanout"] : []),
    ...(input.spec.incubator?.enabled ? ["incubator:enabled"] : []),
  ]
  const incubator = input.spec.incubator
  const ideaFanout = incubator?.passes
    .filter((pass) => pass.type === "idea")
    .reduce((sum, pass) => sum + (pass.count ?? 1), 0) ?? 0
  const incubatorRisks = incubator?.enabled
    ? [
        ...(incubator.passes.some((pass) => pass.writes === "isolated_worktree") ? ["prototype:isolated_worktree"] : []),
        ...(ideaFanout > 1 ? [`idea_fanout:${ideaFanout}`] : []),
        ...(incubator.budget.max_passes_per_task > 5 ? [`pass_budget:${incubator.budget.max_passes_per_task}`] : []),
        ...(incubator.budget.max_rounds_per_task > 1 ? [`round_budget:${incubator.budget.max_rounds_per_task}`] : []),
      ]
    : []
  const summarizeCleanup = incubator?.cleanup
    ? Object.entries(incubator.cleanup)
        .filter(([, value]) => value === true)
        .map(([key]) => key)
        .join(", ") || "(none)"
    : undefined
  const summarizeReadiness = incubator?.readiness
    ? Object.entries(incubator.readiness)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}:${value}`)
        .join(" ")
    : undefined
  return {
    id: input.spec.id,
    armed: input.arm !== undefined,
    objective: input.spec.job.objective,
    loop_policy: input.spec.loop?.policy,
    stop_checks: stopChecks,
    checkpoint_checks: checkpointChecks,
    worker_count: workers.reduce((sum: number, worker) => sum + worker.count, 0),
    permissions: perms,
    risks,
    incubator_enabled: incubator?.enabled === true,
    incubator_passes: incubator?.passes.map((pass) => `${pass.id}:${pass.type}:${pass.writes}`) ?? [],
    incubator_budget: incubator
      ? {
          max_passes_per_task: incubator.budget.max_passes_per_task,
          max_rounds_per_task: incubator.budget.max_rounds_per_task,
          max_active_tasks: incubator.budget.max_active_tasks ?? 1,
          max_parallel_idea_passes: incubator.budget.max_parallel_idea_passes ?? 1,
        }
      : undefined,
    promotion_threshold: incubator?.promotion.promote_at,
    routing_summary: incubator?.route_when
      ? describeRouteWhen(incubator.route_when)
      : incubator?.enabled
        ? "runtime default hard-task routing"
        : undefined,
    exclusion_summary: incubator?.exclude_when ? describeRouteWhen(incubator.exclude_when) : undefined,
    cleanup_summary: summarizeCleanup,
    readiness_summary: summarizeReadiness,
    incubator_risks: incubatorRisks,
    // v1.1 capabilities
    on_handler_count: input.spec.on?.length ?? 0,
    fan_out_enabled: input.spec.fan_out !== undefined,
    fan_out_summary: input.spec.fan_out
      ? `${input.spec.fan_out.strategy ?? "map_reduce"} → ${input.spec.fan_out.reduce.strategy} (max_parallel:${input.spec.fan_out.worker.max_parallel ?? 1})`
      : undefined,
    guardrail_count: (input.spec.guardrails?.input?.length ?? 0) + (input.spec.guardrails?.output?.length ?? 0) + (input.spec.guardrails?.iteration?.length ?? 0),
    guardrails_summary: input.spec.guardrails
      ? `input:${input.spec.guardrails.input?.length ?? 0} output:${input.spec.guardrails.output?.length ?? 0} iteration:${input.spec.guardrails.iteration?.length ?? 0}`
      : undefined,
    assertions_enabled: input.spec.assertions?.require_structured_output === true,
    retry_enabled: input.spec.retry !== undefined,
    hook_count: input.spec.hooks
      ? Object.values(input.spec.hooks).reduce((sum, arr) => sum + (arr?.length ?? 0), 0)
      : 0,
    hooks_summary: input.spec.hooks
      ? Object.entries(input.spec.hooks)
          .filter(([, arr]) => arr && arr.length > 0)
          .map(([key, arr]) => `${key}:${arr!.length}`)
          .join(" ")
      : undefined,
    constraint_count: input.spec.constraints?.length ?? 0,
    constraints_summary: input.spec.constraints?.length
      ? input.spec.constraints.map((c) => `${c.name}:${c.invariant}`).join(", ")
      : undefined,
    // v2 capabilities
    workflow_enabled: input.spec.workflow !== undefined,
    workflow_summary: input.spec.workflow
      ? `${input.spec.workflow.type} initial:${input.spec.workflow.initial} states:${Object.keys(input.spec.workflow.states).length}`
      : undefined,
    memory_store_count: input.spec.memory?.stores ? Object.keys(input.spec.memory.stores).length : 0,
    memory_summary: input.spec.memory?.stores
      ? Object.entries(input.spec.memory.stores).map(([k, v]) => `${k}:${v.scope}`).join(", ")
      : undefined,
    evidence_enabled: (input.spec.evidence?.require_before_promote?.length ?? 0) > 0,
    evidence_summary: input.spec.evidence?.require_before_promote
      ? input.spec.evidence.require_before_promote.map((r) => r.type).join(", ")
      : undefined,
    approval_gate_count: input.spec.approvals?.gates ? Object.keys(input.spec.approvals.gates).length : 0,
    approvals_summary: input.spec.approvals?.gates
      ? Object.entries(input.spec.approvals.gates).map(([k, v]) => `${k}${v.required_role ? `:${v.required_role}` : ""}`).join(", ")
      : undefined,
    // v2 wave 2 capabilities
    skills_count: input.spec.skills?.registry ? Object.keys(input.spec.skills.registry).length : 0,
    skills_summary: input.spec.skills?.registry
      ? Object.entries(input.spec.skills.registry).map(([k, v]) => `${k}${v.trust ? `:${v.trust}` : ""}`).join(", ")
      : undefined,
    sandbox_enabled: input.spec.sandbox !== undefined,
    sandbox_summary: input.spec.sandbox
      ? [
          input.spec.sandbox.paths?.length ? `paths:${input.spec.sandbox.paths.length}` : null,
          input.spec.sandbox.network?.outbound ? `net:${input.spec.sandbox.network.outbound}` : null,
          input.spec.sandbox.resources ? "resources:limited" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    security_enabled: input.spec.security !== undefined,
    security_summary: input.spec.security
      ? [
          input.spec.security.trust_zones ? `zones:${Object.keys(input.spec.security.trust_zones).length}` : null,
          input.spec.security.injection?.scan_inputs ? "scan:input" : null,
          input.spec.security.injection?.scan_outputs ? "scan:output" : null,
          input.spec.security.secrets ? "secrets:managed" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    observability_enabled: input.spec.observability !== undefined,
    observability_summary: input.spec.observability
      ? [
          input.spec.observability.spans ? `spans:${input.spec.observability.spans.emit ?? "all"}` : null,
          input.spec.observability.metrics?.length ? `metrics:${input.spec.observability.metrics.length}` : null,
          input.spec.observability.cost?.budget ? `budget:$${input.spec.observability.cost.budget}` : null,
          input.spec.observability.report ? "report:enabled" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    // v2.1 power blocks
    arming_enabled: input.spec.arming !== undefined,
    arming_summary: input.spec.arming
      ? [
          input.spec.arming.preview_hash_required ? "hash" : null,
          input.spec.arming.host_nonce_required ? "nonce" : null,
          input.spec.arming.accepted_origins?.length ? `origins:${input.spec.arming.accepted_origins.length}` : null,
          input.spec.arming.arm_token_single_use ? "single_use" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    capabilities_rule_count: input.spec.capabilities?.rules?.length ?? 0,
    capabilities_summary: input.spec.capabilities
      ? [
          `default:${input.spec.capabilities.default ?? "deny"}`,
          input.spec.capabilities.rules?.length ? `rules:${input.spec.capabilities.rules.length}` : null,
          input.spec.capabilities.command_floor ? `floor:${input.spec.capabilities.command_floor.always_block.length}` : null,
        ].filter(Boolean).join(" ")
      : undefined,
    quality_enabled: input.spec.quality !== undefined,
    quality_summary: input.spec.quality
      ? [
          input.spec.quality.anti_vibe?.enabled ? "anti_vibe" : null,
          input.spec.quality.diff_budget ? "diff_budget" : null,
          input.spec.quality.checks?.length ? `checks:${input.spec.quality.checks.length}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    experiments_enabled: input.spec.experiments !== undefined,
    experiments_summary: input.spec.experiments
      ? `${input.spec.experiments.strategy ?? "disjoint_tournament"} lanes:${input.spec.experiments.lanes.length}${input.spec.experiments.reduce ? ` → ${input.spec.experiments.reduce.strategy}` : ""}`
      : undefined,
    models_enabled: input.spec.models !== undefined,
    models_summary: input.spec.models
      ? [
          input.spec.models.profiles ? `profiles:${Object.keys(input.spec.models.profiles).length}` : null,
          input.spec.models.routes ? `routes:${Object.keys(input.spec.models.routes).length}` : null,
          input.spec.models.critic?.must_differ_from_builder ? "critic_distinct" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    budgets_enabled: input.spec.budgets !== undefined,
    budgets_summary: input.spec.budgets
      ? Object.entries(input.spec.budgets)
          .filter(([, v]) => v !== undefined)
          .map(([k]) => k)
          .join(",")
      : undefined,
    triggers_count: input.spec.triggers?.list.length ?? 0,
    triggers_summary: input.spec.triggers?.list.length
      ? input.spec.triggers.list.map((t) => `${t.id}:${t.kind}`).join(", ")
      : undefined,
    rollback_enabled: input.spec.rollback !== undefined,
    rollback_summary: input.spec.rollback
      ? [
          input.spec.rollback.plan_required ? "plan_required" : null,
          input.spec.rollback.verify_command ? "verify" : null,
          input.spec.rollback.on_failure_after_merge ? `on_fail:${input.spec.rollback.on_failure_after_merge}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    done_enabled: input.spec.done !== undefined,
    done_summary: input.spec.done
      ? [
          input.spec.done.require?.length ? `require:${input.spec.done.require.length}` : null,
          input.spec.done.forbid?.length ? `forbid:${input.spec.done.forbid.length}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    repo_intel_enabled: input.spec.repo_intelligence !== undefined,
    repo_intel_summary: input.spec.repo_intelligence
      ? [
          input.spec.repo_intelligence.scale ? `scale:${input.spec.repo_intelligence.scale}` : null,
          input.spec.repo_intelligence.indexes?.length ? `indexes:${input.spec.repo_intelligence.indexes.length}` : null,
          input.spec.repo_intelligence.scope_control?.require_scope_before_edit ? "scoped" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    fleet_enabled: input.spec.fleet !== undefined,
    fleet_max_workers: input.spec.fleet?.max_workers ?? 0,
    fleet_summary: input.spec.fleet
      ? [
          `max:${input.spec.fleet.max_workers}`,
          input.spec.fleet.isolation ? `iso:${input.spec.fleet.isolation}` : null,
          input.spec.fleet.jnoccio?.enabled ? "jnoccio:on" : null,
          input.spec.fleet.telemetry?.publish_to ? `telem:${input.spec.fleet.telemetry.publish_to}` : null,
        ].filter(Boolean).join(" ")
      : undefined,
    // v2.3 taint
    taint_enabled: input.spec.taint !== undefined,
    taint_label_count: input.spec.taint ? Object.keys(input.spec.taint.labels).length : 0,
    taint_forbid_count: input.spec.taint?.forbid?.length ?? 0,
    taint_summary: input.spec.taint
      ? [
          `labels:${Object.keys(input.spec.taint.labels).length}`,
          (input.spec.taint.forbid?.length ?? 0) > 0 ? `forbid:${input.spec.taint.forbid?.length}` : null,
          input.spec.taint.prompt_injection
            ? `injection:${input.spec.taint.prompt_injection.on_detect}`
            : null,
        ].filter(Boolean).join(" ")
      : undefined,
    // preview-only control plane blocks
    interop_enabled: input.spec.interop !== undefined,
    interop_summary: input.spec.interop
      ? [
          input.spec.interop.protocols?.length ? `protocols:${input.spec.interop.protocols.length}` : null,
          input.spec.interop.adapters?.length ? `adapters:${input.spec.interop.adapters.length}` : null,
          input.spec.interop.compile_to?.length ? `compile_to:${input.spec.interop.compile_to.length}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    runtime_enabled: input.spec.runtime !== undefined,
    runtime_summary: input.spec.runtime
      ? [
          `mode:${input.spec.runtime.mode ?? "preview"}`,
          input.spec.runtime.image ? `image:${input.spec.runtime.image}` : null,
          input.spec.runtime.workspace ? `workspace:${input.spec.runtime.workspace}` : null,
          input.spec.runtime.network ? `network:${input.spec.runtime.network}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    capability_negotiation_enabled: input.spec.capability_negotiation !== undefined,
    capability_negotiation_summary: input.spec.capability_negotiation
      ? [
          input.spec.capability_negotiation.host ? `host:${input.spec.capability_negotiation.host}` : null,
          input.spec.capability_negotiation.required?.length ? `required:${input.spec.capability_negotiation.required.length}` : null,
          input.spec.capability_negotiation.optional?.length ? `optional:${input.spec.capability_negotiation.optional.length}` : null,
          input.spec.capability_negotiation.fail_closed ? "fail_closed" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    memory_kernel_enabled: input.spec.memory_kernel !== undefined,
    memory_kernel_summary: input.spec.memory_kernel
      ? [
          input.spec.memory_kernel.stores ? `stores:${Object.keys(input.spec.memory_kernel.stores).length}` : null,
          input.spec.memory_kernel.redaction ? "redaction" : null,
          input.spec.memory_kernel.provenance?.track_source ? "provenance" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    evidence_graph_enabled: input.spec.evidence_graph !== undefined,
    evidence_graph_summary: input.spec.evidence_graph
      ? [
          input.spec.evidence_graph.nodes ? `nodes:${Object.keys(input.spec.evidence_graph.nodes).length}` : null,
          input.spec.evidence_graph.edges?.length ? `edges:${input.spec.evidence_graph.edges.length}` : null,
          input.spec.evidence_graph.merge_witness ? "merge_witness" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    trust_enabled: input.spec.trust !== undefined,
    trust_summary: input.spec.trust
      ? [
          input.spec.trust.zones ? `zones:${Object.keys(input.spec.trust.zones).length}` : null,
          input.spec.trust.on_taint ? `on_taint:${input.spec.trust.on_taint}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    requirements_enabled: input.spec.requirements !== undefined,
    requirements_summary: input.spec.requirements
      ? [
          input.spec.requirements.must?.length ? `must:${input.spec.requirements.must.length}` : null,
          input.spec.requirements.should?.length ? `should:${input.spec.requirements.should.length}` : null,
          input.spec.requirements.avoid?.length ? `avoid:${input.spec.requirements.avoid.length}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    evaluation_enabled: input.spec.evaluation !== undefined,
    evaluation_summary: input.spec.evaluation
      ? [
          input.spec.evaluation.metrics?.length ? `metrics:${input.spec.evaluation.metrics.length}` : null,
          input.spec.evaluation.compare ? `compare:${input.spec.evaluation.compare}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    release_enabled: input.spec.release !== undefined,
    release_summary: input.spec.release
      ? [
          input.spec.release.channel ? `channel:${input.spec.release.channel}` : null,
          input.spec.release.version ? `version:${input.spec.release.version}` : null,
          input.spec.release.gates?.length ? `gates:${input.spec.release.gates.length}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    roles_count: input.spec.roles?.list?.length ?? 0,
    roles_summary: input.spec.roles?.list?.length
      ? input.spec.roles.list.map((role) => role.id).join(", ")
      : undefined,
    channels_count: input.spec.channels?.list?.length ?? 0,
    channels_summary: input.spec.channels?.list?.length
      ? input.spec.channels.list.map((channel) => `${channel.id}${channel.kind ? `:${channel.kind}` : ""}`).join(", ")
      : undefined,
    imports_count: input.spec.imports?.list?.length ?? 0,
    imports_summary: input.spec.imports?.list?.length
      ? input.spec.imports.list.map((item) => item.source).join(", ")
      : undefined,
    reasoning_privacy_enabled: input.spec.reasoning_privacy !== undefined,
    reasoning_privacy_summary: input.spec.reasoning_privacy
      ? [
          input.spec.reasoning_privacy.store_reasoning ? "store_reasoning" : null,
          input.spec.reasoning_privacy.redact_chain_of_thought ? "redact_chain_of_thought" : null,
          input.spec.reasoning_privacy.summaries_only ? "summaries_only" : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
    unsupported_feature_policy_enabled: input.spec.unsupported_feature_policy !== undefined,
    unsupported_feature_policy_summary: input.spec.unsupported_feature_policy
      ? [
          input.spec.unsupported_feature_policy.required?.length ? `required:${input.spec.unsupported_feature_policy.required.length}` : null,
          input.spec.unsupported_feature_policy.optional?.length ? `optional:${input.spec.unsupported_feature_policy.optional.length}` : null,
          input.spec.unsupported_feature_policy.fail_closed ? "fail_closed" : null,
          input.spec.unsupported_feature_policy.on_missing ? `on_missing:${input.spec.unsupported_feature_policy.on_missing}` : null,
        ].filter(Boolean).join(" ") || "configured"
      : undefined,
  }
}

function describeCondition(condition: ZyalStopCondition) {
  if ("shell" in condition) return `shell:${condition.shell.command}`
  return `git_clean${condition.git_clean.allow_untracked ? ":allow_untracked" : ""}`
}

function describeShellCheck(check: ZyalShellCheck) {
  return check.command
}

function describeRouteWhen(route: ZyalIncubatorRouteWhen) {
  const any = route.any?.length ?? 0
  const all = route.all?.length ?? 0
  return [`any:${any}`, `all:${all}`].join(" ")
}

export function schemaToEffectError(message: string) {
  return new Error(message)
}
