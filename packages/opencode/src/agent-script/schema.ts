import { Effect, Schema } from "effect"
import { zod } from "@/util/effect-zod"
import { withStatics } from "@/util/schema"

const DaemonAction = Schema.Literal("daemon")
const ArmAction = Schema.Literal("RUN_FOREVER")

export const OcalSignal = Schema.Union([
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
export type OcalSignal = Schema.Schema.Type<typeof OcalSignal>

export const OcalShellAssert = Schema.Struct({
  exit_code: Schema.optional(Schema.Number),
  stdout_contains: Schema.optional(Schema.Array(Schema.String)),
  stdout_regex: Schema.optional(Schema.Array(Schema.String)),
  json: Schema.optional(Schema.Record(Schema.String, Schema.Any)),
})

export type OcalShellAssert = Schema.Schema.Type<typeof OcalShellAssert>

export const OcalShellCheck = Schema.Struct({
  command: Schema.String,
  timeout: Schema.optional(Schema.String),
  cwd: Schema.optional(Schema.String),
  assert: Schema.optional(OcalShellAssert),
})

export type OcalShellCheck = Schema.Schema.Type<typeof OcalShellCheck>

export const OcalGitCleanCheck = Schema.Struct({
  allow_untracked: Schema.optional(Schema.Boolean),
})

export type OcalGitCleanCheck = Schema.Schema.Type<typeof OcalGitCleanCheck>

export const OcalStopCondition = Schema.Union([
  Schema.Struct({
    shell: OcalShellCheck,
  }),
  Schema.Struct({
    git_clean: OcalGitCleanCheck,
  }),
])
export type OcalStopCondition = Schema.Schema.Type<typeof OcalStopCondition>

export const OcalJob = Schema.Struct({
  name: Schema.String,
  objective: Schema.String,
  risk: Schema.optional(Schema.Array(Schema.String)),
})

export type OcalJob = Schema.Schema.Type<typeof OcalJob>

export const OcalLoopBreaker = Schema.Struct({
  max_consecutive_errors: Schema.optional(Schema.Number),
  on_trip: Schema.optional(Schema.Union([Schema.Literal("pause"), Schema.Literal("abort")])),
})

export type OcalLoopBreaker = Schema.Schema.Type<typeof OcalLoopBreaker>

export const OcalLoop = Schema.Struct({
  policy: Schema.optional(Schema.Union([Schema.Literal("once"), Schema.Literal("bounded"), Schema.Literal("forever")])),
  sleep: Schema.optional(Schema.String),
  continue_on: Schema.optional(Schema.Array(OcalSignal)),
  pause_on: Schema.optional(Schema.Array(OcalSignal)),
  circuit_breaker: Schema.optional(OcalLoopBreaker),
})

export type OcalLoop = Schema.Schema.Type<typeof OcalLoop>

export const OcalStop = Schema.Struct({
  all: Schema.Array(OcalStopCondition),
  any: Schema.optional(Schema.Array(OcalStopCondition)),
})

export type OcalStop = Schema.Schema.Type<typeof OcalStop>

export const OcalContext = Schema.Struct({
  strategy: Schema.optional(Schema.Union([Schema.Literal("soft"), Schema.Literal("hard"), Schema.Literal("hybrid")])),
  compact_every: Schema.optional(Schema.Number),
  hard_clear_every: Schema.optional(Schema.Number),
  preserve: Schema.optional(Schema.Array(Schema.String)),
})

export type OcalContext = Schema.Schema.Type<typeof OcalContext>

export const OcalCheckpoint = Schema.Struct({
  when: Schema.optional(
    Schema.Union([Schema.Literal("after_verified_change"), Schema.Literal("on_error"), Schema.Literal("manual")]),
  ),
  noop_if_clean: Schema.optional(Schema.Boolean),
  verify: Schema.optional(Schema.Array(OcalShellCheck)),
  git: Schema.optional(
    Schema.Struct({
      add: Schema.Array(Schema.String),
      commit_message: Schema.optional(Schema.String),
      push: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
    }),
  ),
})

export type OcalCheckpoint = Schema.Schema.Type<typeof OcalCheckpoint>

export const OcalTasks = Schema.Struct({
  ledger: Schema.optional(Schema.Literal("sqlite")),
  discover: Schema.optional(Schema.Array(OcalShellCheck)),
})

export type OcalTasks = Schema.Schema.Type<typeof OcalTasks>

export const OcalIncubatorPassType = Schema.Union([
  Schema.Literal("scout"),
  Schema.Literal("idea"),
  Schema.Literal("strengthen"),
  Schema.Literal("critic"),
  Schema.Literal("synthesize"),
  Schema.Literal("prototype"),
  Schema.Literal("promotion_review"),
  Schema.Literal("compress"),
])
export type OcalIncubatorPassType = Schema.Schema.Type<typeof OcalIncubatorPassType>

export const OcalIncubatorContextMode = Schema.Union([
  Schema.Literal("blind"),
  Schema.Literal("inherit"),
  Schema.Literal("strengthen"),
  Schema.Literal("critic"),
  Schema.Literal("pool"),
  Schema.Literal("promotion"),
  Schema.Literal("ledger_only"),
])
export type OcalIncubatorContextMode = Schema.Schema.Type<typeof OcalIncubatorContextMode>

export const OcalIncubatorWriteScope = Schema.Union([
  Schema.Literal("scratch_only"),
  Schema.Literal("isolated_worktree"),
])
export type OcalIncubatorWriteScope = Schema.Schema.Type<typeof OcalIncubatorWriteScope>

export const OcalIncubatorRouteCondition = Schema.Struct({
  repeated_attempts_gte: Schema.optional(Schema.Number),
  no_progress_iterations_gte: Schema.optional(Schema.Number),
  risk_score_gte: Schema.optional(Schema.Number),
  readiness_score_lt: Schema.optional(Schema.Number),
  touches_paths: Schema.optional(Schema.Array(Schema.String)),
})
export type OcalIncubatorRouteCondition = Schema.Schema.Type<typeof OcalIncubatorRouteCondition>

export const OcalIncubatorRouteWhen = Schema.Struct({
  any: Schema.optional(Schema.Array(OcalIncubatorRouteCondition)),
  all: Schema.optional(Schema.Array(OcalIncubatorRouteCondition)),
})
export type OcalIncubatorRouteWhen = Schema.Schema.Type<typeof OcalIncubatorRouteWhen>

export const OcalIncubatorCleanup = Schema.Struct({
  summarize_to_task_memory: Schema.optional(Schema.Boolean),
  archive_artifacts: Schema.optional(Schema.Boolean),
  delete_scratch: Schema.optional(Schema.Boolean),
  delete_unmerged_worktrees: Schema.optional(Schema.Boolean),
})
export type OcalIncubatorCleanup = Schema.Schema.Type<typeof OcalIncubatorCleanup>

export const OcalIncubatorReadiness = Schema.Struct({
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
export type OcalIncubatorReadiness = Schema.Schema.Type<typeof OcalIncubatorReadiness>

export const OcalIncubatorBudget = Schema.Struct({
  max_passes_per_task: Schema.Number,
  max_rounds_per_task: Schema.Number,
  max_active_tasks: Schema.optional(Schema.Number),
  max_parallel_idea_passes: Schema.optional(Schema.Number),
})
export type OcalIncubatorBudget = Schema.Schema.Type<typeof OcalIncubatorBudget>

export const OcalIncubatorScratch = Schema.Struct({
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
export type OcalIncubatorScratch = Schema.Schema.Type<typeof OcalIncubatorScratch>

export const OcalIncubatorPass = Schema.Struct({
  id: Schema.String,
  type: OcalIncubatorPassType,
  context: OcalIncubatorContextMode,
  reads: Schema.optional(Schema.Array(Schema.String)),
  writes: OcalIncubatorWriteScope,
  count: Schema.optional(Schema.Number),
  agent: Schema.optional(Schema.String),
  mcp_profile: Schema.optional(Schema.String),
})
export type OcalIncubatorPass = Schema.Schema.Type<typeof OcalIncubatorPass>

export const OcalIncubatorPromotion = Schema.Struct({
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
export type OcalIncubatorPromotion = Schema.Schema.Type<typeof OcalIncubatorPromotion>

export const OcalIncubator = Schema.Struct({
  enabled: Schema.Boolean,
  strategy: Schema.optional(Schema.Union([Schema.Literal("generate_pool_strengthen"), Schema.Literal("bounded_passes")])),
  route_when: Schema.optional(OcalIncubatorRouteWhen),
  exclude_when: Schema.optional(OcalIncubatorRouteWhen),
  budget: OcalIncubatorBudget,
  scratch: Schema.optional(OcalIncubatorScratch),
  cleanup: Schema.optional(OcalIncubatorCleanup),
  readiness: Schema.optional(OcalIncubatorReadiness),
  passes: Schema.Array(OcalIncubatorPass),
  promotion: OcalIncubatorPromotion,
})
export type OcalIncubator = Schema.Schema.Type<typeof OcalIncubator>

export const OcalWorkerSpec = Schema.Struct({
  id: Schema.String,
  count: Schema.Number,
  agent: Schema.String,
  isolation: Schema.optional(Schema.Union([Schema.Literal("git_worktree"), Schema.Literal("same_session")])),
})

export type OcalWorkerSpec = Schema.Schema.Type<typeof OcalWorkerSpec>

export const OcalAgents = Schema.Struct({
  supervisor: Schema.optional(Schema.Struct({ agent: Schema.String })),
  workers: Schema.optional(Schema.Array(OcalWorkerSpec)),
})

export type OcalAgents = Schema.Schema.Type<typeof OcalAgents>

export const OcalMcpProfile = Schema.Struct({
  servers: Schema.optional(Schema.Array(Schema.String)),
  tools: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(Schema.Array(Schema.String)),
})

export type OcalMcpProfile = Schema.Schema.Type<typeof OcalMcpProfile>

export const OcalMcp = Schema.Struct({
  profiles: Schema.optional(Schema.Record(Schema.String, OcalMcpProfile)),
})

export type OcalMcp = Schema.Schema.Type<typeof OcalMcp>

export const OcalPermissionMode = Schema.Struct({
  shell: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  edit: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  git_commit: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  git_push: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  workers: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
  mcp: Schema.optional(Schema.Union([Schema.Literal("ask"), Schema.Literal("allow"), Schema.Literal("deny")])),
})

export type OcalPermissionMode = Schema.Schema.Type<typeof OcalPermissionMode>

export const OcalUi = Schema.Struct({
  theme: Schema.optional(Schema.String),
  banner: Schema.optional(Schema.String),
})

export type OcalUi = Schema.Schema.Type<typeof OcalUi>

// ─── On: Conditional Event Handlers ────────────────────────────────────────

export const OcalOnAction = Schema.Union([
  Schema.Struct({ switch_agent: Schema.String }),
  Schema.Struct({ run: Schema.String }),
  Schema.Struct({ incubate_current_task: Schema.Literal(true) }),
  Schema.Struct({ checkpoint: Schema.Literal(true) }),
  Schema.Struct({ pause: Schema.Literal(true) }),
  Schema.Struct({ abort: Schema.Literal(true) }),
  Schema.Struct({ notify: Schema.String }),
  Schema.Struct({ set_context: Schema.Record(Schema.String, Schema.Unknown) }),
])
export type OcalOnAction = Schema.Schema.Type<typeof OcalOnAction>

export const OcalOnHandler = Schema.Struct({
  signal: OcalSignal,
  count_gte: Schema.optional(Schema.Number),
  message_contains: Schema.optional(Schema.String),
  if: Schema.optional(OcalShellCheck),
  do: Schema.Array(OcalOnAction),
})
export type OcalOnHandler = Schema.Schema.Type<typeof OcalOnHandler>

// ─── Fan-Out: Parallel Task Decomposition ──────────────────────────────────

export const OcalFanOutSplit = Schema.Union([
  Schema.Struct({ shell: Schema.String }),
  Schema.Struct({ items: Schema.Array(Schema.String) }),
])
export type OcalFanOutSplit = Schema.Schema.Type<typeof OcalFanOutSplit>

export const OcalFanOutReduceStrategy = Schema.Union([
  Schema.Literal("merge_all"),
  Schema.Literal("best_score"),
  Schema.Literal("vote"),
  Schema.Literal("custom_shell"),
])
export type OcalFanOutReduceStrategy = Schema.Schema.Type<typeof OcalFanOutReduceStrategy>

export const OcalFanOutReduce = Schema.Struct({
  strategy: OcalFanOutReduceStrategy,
  score_key: Schema.optional(Schema.String),
  command: Schema.optional(Schema.String),
})
export type OcalFanOutReduce = Schema.Schema.Type<typeof OcalFanOutReduce>

export const OcalFanOut = Schema.Struct({
  strategy: Schema.optional(Schema.Union([
    Schema.Literal("map_reduce"),
    Schema.Literal("scatter_gather"),
  ])),
  split: OcalFanOutSplit,
  worker: Schema.Struct({
    agent: Schema.optional(Schema.String),
    isolation: Schema.optional(Schema.Union([
      Schema.Literal("git_worktree"),
      Schema.Literal("same_session"),
    ])),
    timeout: Schema.optional(Schema.String),
    max_parallel: Schema.optional(Schema.Number),
  }),
  reduce: OcalFanOutReduce,
  on_partial_failure: Schema.optional(Schema.Union([
    Schema.Literal("continue"),
    Schema.Literal("abort"),
    Schema.Literal("pause"),
  ])),
})
export type OcalFanOut = Schema.Schema.Type<typeof OcalFanOut>

// ─── Guardrails: Input/Output Validation Middleware ────────────────────────

export const OcalGuardrailAction = Schema.Union([
  Schema.Literal("block"),
  Schema.Literal("retry"),
  Schema.Literal("pause"),
  Schema.Literal("abort"),
  Schema.Literal("warn"),
])
export type OcalGuardrailAction = Schema.Schema.Type<typeof OcalGuardrailAction>

export const OcalPatternGuardrail = Schema.Struct({
  name: Schema.String,
  deny_patterns: Schema.Array(Schema.String),
  scope: Schema.optional(Schema.Union([
    Schema.Literal("tool_input"),
    Schema.Literal("tool_output"),
    Schema.Literal("file_diff"),
    Schema.Literal("commit_message"),
  ])),
  action: OcalGuardrailAction,
})
export type OcalPatternGuardrail = Schema.Schema.Type<typeof OcalPatternGuardrail>

export const OcalShellGuardrail = Schema.Struct({
  name: Schema.String,
  shell: Schema.String,
  assert: Schema.optional(OcalShellAssert),
  on_fail: Schema.optional(OcalGuardrailAction),
  max_retries: Schema.optional(Schema.Number),
})
export type OcalShellGuardrail = Schema.Schema.Type<typeof OcalShellGuardrail>

export const OcalGuardrails = Schema.Struct({
  input: Schema.optional(Schema.Array(OcalPatternGuardrail)),
  output: Schema.optional(Schema.Array(Schema.Union([OcalPatternGuardrail, OcalShellGuardrail]))),
  iteration: Schema.optional(Schema.Array(OcalShellGuardrail)),
})
export type OcalGuardrails = Schema.Schema.Type<typeof OcalGuardrails>

// ─── Assertions: Structured Output Contracts ───────────────────────────────

export const OcalAssertions = Schema.Struct({
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
export type OcalAssertions = Schema.Schema.Type<typeof OcalAssertions>

// ─── Retry: Per-Step Backoff Policies ──────────────────────────────────────

export const OcalRetryBackoff = Schema.Union([
  Schema.Literal("none"),
  Schema.Literal("linear"),
  Schema.Literal("exponential"),
])
export type OcalRetryBackoff = Schema.Schema.Type<typeof OcalRetryBackoff>

export const OcalRetryPolicy = Schema.Struct({
  max_attempts: Schema.optional(Schema.Number),
  backoff: Schema.optional(OcalRetryBackoff),
  initial_delay: Schema.optional(Schema.String),
  max_delay: Schema.optional(Schema.String),
  jitter: Schema.optional(Schema.Boolean),
})
export type OcalRetryPolicy = Schema.Schema.Type<typeof OcalRetryPolicy>

export const OcalRetry = Schema.Struct({
  default: Schema.optional(OcalRetryPolicy),
  overrides: Schema.optional(Schema.Struct({
    shell_checks: Schema.optional(OcalRetryPolicy),
    checkpoint: Schema.optional(OcalRetryPolicy),
    worker_spawn: Schema.optional(OcalRetryPolicy),
    stop_evaluation: Schema.optional(OcalRetryPolicy),
  })),
})
export type OcalRetry = Schema.Schema.Type<typeof OcalRetry>

// ─── Hooks: Lifecycle Hooks ────────────────────────────────────────────────

export const OcalHookStep = Schema.Struct({
  run: Schema.String,
  assert: Schema.optional(OcalShellAssert),
  on_fail: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("warn"),
    Schema.Literal("block_promotion"),
    Schema.Literal("continue"),
  ])),
  timeout: Schema.optional(Schema.String),
})
export type OcalHookStep = Schema.Schema.Type<typeof OcalHookStep>

export const OcalHooks = Schema.Struct({
  on_start: Schema.optional(Schema.Array(OcalHookStep)),
  before_iteration: Schema.optional(Schema.Array(OcalHookStep)),
  after_iteration: Schema.optional(Schema.Array(OcalHookStep)),
  before_checkpoint: Schema.optional(Schema.Array(OcalHookStep)),
  after_checkpoint: Schema.optional(Schema.Array(OcalHookStep)),
  on_promote: Schema.optional(Schema.Array(OcalHookStep)),
  on_exhaust: Schema.optional(Schema.Array(OcalHookStep)),
  on_stop: Schema.optional(Schema.Array(OcalHookStep)),
})
export type OcalHooks = Schema.Schema.Type<typeof OcalHooks>

// ─── Constraints: Runtime Invariants ───────────────────────────────────────

export const OcalConstraintInvariant = Schema.Union([
  Schema.Literal("gte_baseline"),
  Schema.Literal("lte_baseline"),
  Schema.Literal("equals_baseline"),
  Schema.Literal("equals_zero"),
  Schema.Literal("non_zero"),
])
export type OcalConstraintInvariant = Schema.Schema.Type<typeof OcalConstraintInvariant>

export const OcalConstraint = Schema.Struct({
  name: Schema.String,
  check: Schema.Struct({
    shell: Schema.String,
    timeout: Schema.optional(Schema.String),
  }),
  baseline: Schema.optional(Schema.Union([
    Schema.Literal("capture_on_start"),
    Schema.Literal("capture_on_checkpoint"),
  ])),
  invariant: OcalConstraintInvariant,
  on_violation: Schema.optional(Schema.Union([
    Schema.Literal("abort"),
    Schema.Literal("pause"),
    Schema.Literal("block"),
    Schema.Literal("warn"),
    Schema.Literal("retry"),
  ])),
})
export type OcalConstraint = Schema.Schema.Type<typeof OcalConstraint>

// ─── Workflow: Durable Graph Execution ─────────────────────────────────────

export const OcalWorkflowTransitionCondition = Schema.Struct({
  evidence_exists: Schema.optional(Schema.String),
  risk_score_gte: Schema.optional(Schema.Number),
  approval_granted: Schema.optional(Schema.String),
  all_checks_pass: Schema.optional(Schema.Boolean),
  checks_failed: Schema.optional(Schema.Boolean),
  constraint_violated: Schema.optional(Schema.Boolean),
  shell: Schema.optional(OcalShellCheck),
})
export type OcalWorkflowTransitionCondition = Schema.Schema.Type<typeof OcalWorkflowTransitionCondition>

export const OcalWorkflowTransition = Schema.Struct({
  to: Schema.String,
  when: OcalWorkflowTransitionCondition,
})
export type OcalWorkflowTransition = Schema.Schema.Type<typeof OcalWorkflowTransition>

export const OcalWorkflowState = Schema.Struct({
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
    on_enter: Schema.optional(Schema.Array(OcalHookStep)),
    on_exit: Schema.optional(Schema.Array(OcalHookStep)),
  })),
  transitions: Schema.optional(Schema.Array(OcalWorkflowTransition)),
})
export type OcalWorkflowState = Schema.Schema.Type<typeof OcalWorkflowState>

export const OcalWorkflow = Schema.Struct({
  type: Schema.Union([
    Schema.Literal("state_machine"),
    Schema.Literal("dag"),
    Schema.Literal("pipeline"),
  ]),
  initial: Schema.String,
  states: Schema.Record(Schema.String, OcalWorkflowState),
  on_stuck: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("incubate"),
  ])),
  max_total_time: Schema.optional(Schema.String),
})
export type OcalWorkflow = Schema.Schema.Type<typeof OcalWorkflow>

// ─── Memory: Governed Agent Memory ─────────────────────────────────────────

export const OcalMemoryStore = Schema.Struct({
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
export type OcalMemoryStore = Schema.Schema.Type<typeof OcalMemoryStore>

export const OcalMemoryRedaction = Schema.Struct({
  patterns: Schema.Array(Schema.String),
  action: Schema.Union([
    Schema.Literal("mask"),
    Schema.Literal("remove"),
    Schema.Literal("hash"),
  ]),
})
export type OcalMemoryRedaction = Schema.Schema.Type<typeof OcalMemoryRedaction>

export const OcalMemory = Schema.Struct({
  stores: Schema.optional(Schema.Record(Schema.String, OcalMemoryStore)),
  redaction: Schema.optional(OcalMemoryRedaction),
  provenance: Schema.optional(Schema.Struct({
    track_source: Schema.optional(Schema.Boolean),
    hash_chain: Schema.optional(Schema.Boolean),
  })),
})
export type OcalMemory = Schema.Schema.Type<typeof OcalMemory>

// ─── Evidence: Typed Proof Bundles ─────────────────────────────────────────

export const OcalEvidenceRequirement = Schema.Struct({
  type: Schema.String,
  must_pass: Schema.optional(Schema.Boolean),
  must_be_known: Schema.optional(Schema.Boolean),
  must_exist: Schema.optional(Schema.Boolean),
  max_increase: Schema.optional(Schema.Number),
})
export type OcalEvidenceRequirement = Schema.Schema.Type<typeof OcalEvidenceRequirement>

export const OcalEvidence = Schema.Struct({
  require_before_promote: Schema.optional(Schema.Array(OcalEvidenceRequirement)),
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
export type OcalEvidence = Schema.Schema.Type<typeof OcalEvidence>

// ─── Approvals: First-Class Human Decisions ────────────────────────────────

export const OcalApprovalDecision = Schema.Union([
  Schema.Literal("approve"),
  Schema.Literal("reject"),
  Schema.Literal("edit"),
  Schema.Literal("escalate"),
])
export type OcalApprovalDecision = Schema.Schema.Type<typeof OcalApprovalDecision>

export const OcalApprovalGate = Schema.Struct({
  required_role: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  on_timeout: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("escalate"),
  ])),
  decisions: Schema.optional(Schema.Array(OcalApprovalDecision)),
  require_evidence: Schema.optional(Schema.Array(Schema.String)),
  auto_approve_if: Schema.optional(Schema.Struct({
    risk_score_lt: Schema.optional(Schema.Number),
    all_checks_pass: Schema.optional(Schema.Boolean),
  })),
})
export type OcalApprovalGate = Schema.Schema.Type<typeof OcalApprovalGate>

export const OcalApprovalEscalation = Schema.Struct({
  chain: Schema.optional(Schema.Array(Schema.String)),
  auto_escalate_after: Schema.optional(Schema.String),
})
export type OcalApprovalEscalation = Schema.Schema.Type<typeof OcalApprovalEscalation>

export const OcalApprovals = Schema.Struct({
  gates: Schema.optional(Schema.Record(Schema.String, OcalApprovalGate)),
  escalation: Schema.optional(OcalApprovalEscalation),
})
export type OcalApprovals = Schema.Schema.Type<typeof OcalApprovals>

// ─── Core Types ────────────────────────────────────────────────────────────

export const OcalArm = Schema.Struct({
  action: ArmAction,
  id: Schema.String,
})

export type OcalArm = Schema.Schema.Type<typeof OcalArm>

export const OcalSpec = Schema.Struct({
  version: Schema.Literal("v1"),
  intent: DaemonAction,
  confirm: ArmAction,
  id: Schema.String,
  job: OcalJob,
  loop: Schema.optional(OcalLoop),
  stop: OcalStop,
  context: Schema.optional(OcalContext),
  checkpoint: Schema.optional(OcalCheckpoint),
  tasks: Schema.optional(OcalTasks),
  incubator: Schema.optional(OcalIncubator),
  agents: Schema.optional(OcalAgents),
  mcp: Schema.optional(OcalMcp),
  permissions: Schema.optional(OcalPermissionMode),
  ui: Schema.optional(OcalUi),
  on: Schema.optional(Schema.Array(OcalOnHandler)),
  fan_out: Schema.optional(OcalFanOut),
  guardrails: Schema.optional(OcalGuardrails),
  assertions: Schema.optional(OcalAssertions),
  retry: Schema.optional(OcalRetry),
  hooks: Schema.optional(OcalHooks),
  constraints: Schema.optional(Schema.Array(OcalConstraint)),
  // v2 blocks
  workflow: Schema.optional(OcalWorkflow),
  memory: Schema.optional(OcalMemory),
  evidence: Schema.optional(OcalEvidence),
  approvals: Schema.optional(OcalApprovals),
})

export type OcalSpec = Schema.Schema.Type<typeof OcalSpec>

export const OcalScriptSchema = OcalSpec.pipe(withStatics((schema) => ({ zod: zod(schema) })))
export type OcalScript = Schema.Schema.Type<typeof OcalScriptSchema>

export const OcalParseMeta = Schema.Struct({
  openedId: Schema.String,
  armed: Schema.Boolean,
})
export type OcalParseMeta = Schema.Schema.Type<typeof OcalParseMeta>

export const OcalPreview = Schema.Struct({
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
})

export type OcalPreview = Schema.Schema.Type<typeof OcalPreview>

export type OcalParsed = {
  readonly spec: OcalScript
  readonly arm: OcalArm | undefined
  readonly specHash: string
  readonly preview: OcalPreview
}

export function assertOcalTopLevelKeys(input: Record<string, unknown>) {
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
  ])
  for (const key of Object.keys(input)) {
    if (!allowed.has(key)) {
      throw new Error(`Unknown OCAL top-level key: ${key}`)
    }
  }
}

export function buildOcalPreview(input: { spec: OcalScript; arm?: OcalArm }): OcalPreview {
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
  }
}

function describeCondition(condition: OcalStopCondition) {
  if ("shell" in condition) return `shell:${condition.shell.command}`
  return `git_clean${condition.git_clean.allow_untracked ? ":allow_untracked" : ""}`
}

function describeShellCheck(check: OcalShellCheck) {
  return check.command
}

function describeRouteWhen(route: OcalIncubatorRouteWhen) {
  const any = route.any?.length ?? 0
  const all = route.all?.length ?? 0
  return [`any:${any}`, `all:${all}`].join(" ")
}

export function schemaToEffectError(message: string) {
  return new Error(message)
}
