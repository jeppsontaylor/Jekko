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

// ─── Skills: Agent Skill Registry ──────────────────────────────────────────

export const OcalSkillDefinition = Schema.Struct({
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
export type OcalSkillDefinition = Schema.Schema.Type<typeof OcalSkillDefinition>

export const OcalSkills = Schema.Struct({
  registry: Schema.optional(Schema.Record(Schema.String, OcalSkillDefinition)),
  allow_creation: Schema.optional(Schema.Boolean),
  max_skills: Schema.optional(Schema.Number),
})
export type OcalSkills = Schema.Schema.Type<typeof OcalSkills>

// ─── Sandbox: Execution Boundaries ─────────────────────────────────────────

export const OcalSandboxPathRule = Schema.Struct({
  path: Schema.String,
  access: Schema.Union([
    Schema.Literal("read"),
    Schema.Literal("write"),
    Schema.Literal("deny"),
  ]),
})
export type OcalSandboxPathRule = Schema.Schema.Type<typeof OcalSandboxPathRule>

export const OcalSandboxNetworkPolicy = Schema.Struct({
  outbound: Schema.optional(Schema.Union([
    Schema.Literal("allow"),
    Schema.Literal("deny"),
    Schema.Literal("allowlist"),
  ])),
  allowlist: Schema.optional(Schema.Array(Schema.String)),
})
export type OcalSandboxNetworkPolicy = Schema.Schema.Type<typeof OcalSandboxNetworkPolicy>

export const OcalSandboxResources = Schema.Struct({
  max_file_size: Schema.optional(Schema.String),
  max_total_disk: Schema.optional(Schema.String),
  max_memory: Schema.optional(Schema.String),
  max_processes: Schema.optional(Schema.Number),
})
export type OcalSandboxResources = Schema.Schema.Type<typeof OcalSandboxResources>

export const OcalSandbox = Schema.Struct({
  paths: Schema.optional(Schema.Array(OcalSandboxPathRule)),
  network: Schema.optional(OcalSandboxNetworkPolicy),
  resources: Schema.optional(OcalSandboxResources),
  env_inherit: Schema.optional(Schema.Array(Schema.String)),
  env_deny: Schema.optional(Schema.Array(Schema.String)),
})
export type OcalSandbox = Schema.Schema.Type<typeof OcalSandbox>

// ─── Security: Trust Zones & Injection Defense ─────────────────────────────

export const OcalSecurityTrustZone = Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  require_approval: Schema.optional(Schema.Boolean),
  max_risk_score: Schema.optional(Schema.Number),
})
export type OcalSecurityTrustZone = Schema.Schema.Type<typeof OcalSecurityTrustZone>

export const OcalSecurityInjection = Schema.Struct({
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
export type OcalSecurityInjection = Schema.Schema.Type<typeof OcalSecurityInjection>

export const OcalSecuritySecrets = Schema.Struct({
  allowed_env: Schema.optional(Schema.Array(Schema.String)),
  redact_from_logs: Schema.optional(Schema.Boolean),
  rotate_after: Schema.optional(Schema.String),
})
export type OcalSecuritySecrets = Schema.Schema.Type<typeof OcalSecuritySecrets>

export const OcalSecurity = Schema.Struct({
  trust_zones: Schema.optional(Schema.Record(Schema.String, OcalSecurityTrustZone)),
  injection: Schema.optional(OcalSecurityInjection),
  secrets: Schema.optional(OcalSecuritySecrets),
})
export type OcalSecurity = Schema.Schema.Type<typeof OcalSecurity>

// ─── Observability: Spans, Metrics & Cost Tracking ─────────────────────────

export const OcalObservabilitySpan = Schema.Struct({
  emit: Schema.optional(Schema.Union([
    Schema.Literal("all"),
    Schema.Literal("errors_only"),
    Schema.Literal("none"),
  ])),
  include_tool_calls: Schema.optional(Schema.Boolean),
  include_model_calls: Schema.optional(Schema.Boolean),
})
export type OcalObservabilitySpan = Schema.Schema.Type<typeof OcalObservabilitySpan>

export const OcalObservabilityMetric = Schema.Struct({
  name: Schema.String,
  type: Schema.Union([
    Schema.Literal("counter"),
    Schema.Literal("gauge"),
    Schema.Literal("histogram"),
  ]),
  source: Schema.String,
})
export type OcalObservabilityMetric = Schema.Schema.Type<typeof OcalObservabilityMetric>

export const OcalObservabilityCost = Schema.Struct({
  budget: Schema.optional(Schema.Number),
  currency: Schema.optional(Schema.String),
  alert_at_percent: Schema.optional(Schema.Number),
  on_budget_exceeded: Schema.optional(Schema.Union([
    Schema.Literal("pause"),
    Schema.Literal("abort"),
    Schema.Literal("warn"),
  ])),
})
export type OcalObservabilityCost = Schema.Schema.Type<typeof OcalObservabilityCost>

export const OcalObservabilityReport = Schema.Struct({
  format: Schema.optional(Schema.Union([
    Schema.Literal("json"),
    Schema.Literal("markdown"),
  ])),
  on_complete: Schema.optional(Schema.Boolean),
  on_checkpoint: Schema.optional(Schema.Boolean),
  include: Schema.optional(Schema.Array(Schema.String)),
})
export type OcalObservabilityReport = Schema.Schema.Type<typeof OcalObservabilityReport>

export const OcalObservability = Schema.Struct({
  spans: Schema.optional(OcalObservabilitySpan),
  metrics: Schema.optional(Schema.Array(OcalObservabilityMetric)),
  cost: Schema.optional(OcalObservabilityCost),
  report: Schema.optional(OcalObservabilityReport),
})
export type OcalObservability = Schema.Schema.Type<typeof OcalObservability>

// ─── v2.1: Arming (origin-aware, hash-bound) ──────────────────────────────

export const OcalArmingOrigin = Schema.Union([
  Schema.Literal("trusted_user_message"),
  Schema.Literal("signed_cli_input"),
  Schema.Literal("signed_api_request"),
  Schema.Literal("host_ui_button"),
])
export type OcalArmingOrigin = Schema.Schema.Type<typeof OcalArmingOrigin>

export const OcalArmingPolicy = Schema.Struct({
  preview_hash_required: Schema.optional(Schema.Boolean),
  host_nonce_required: Schema.optional(Schema.Boolean),
  reject_inside_code_fence: Schema.optional(Schema.Boolean),
  reject_from: Schema.optional(Schema.Array(Schema.String)),
  accepted_origins: Schema.optional(Schema.Array(OcalArmingOrigin)),
  preview_expires_after: Schema.optional(Schema.String),
  arm_token_single_use: Schema.optional(Schema.Boolean),
  bound_to: Schema.optional(Schema.Array(Schema.String)),
})
export type OcalArmingPolicy = Schema.Schema.Type<typeof OcalArmingPolicy>

// ─── v2.1: Capabilities (least-privilege leases) ──────────────────────────

export const OcalCapabilityRule = Schema.Struct({
  id: Schema.String,
  tool: Schema.optional(Schema.String),
  paths: Schema.optional(Schema.Array(Schema.String)),
  command_regex: Schema.optional(Schema.String),
  decision: Schema.Union([Schema.Literal("allow"), Schema.Literal("ask"), Schema.Literal("deny")]),
  require_gate: Schema.optional(Schema.String),
  expires: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})
export type OcalCapabilityRule = Schema.Schema.Type<typeof OcalCapabilityRule>

export const OcalCapabilities = Schema.Struct({
  default: Schema.optional(Schema.Union([Schema.Literal("deny"), Schema.Literal("ask"), Schema.Literal("allow")])),
  rules: Schema.optional(Schema.Array(OcalCapabilityRule)),
  command_floor: Schema.optional(Schema.Struct({
    always_block: Schema.Array(Schema.String),
  })),
})
export type OcalCapabilities = Schema.Schema.Type<typeof OcalCapabilities>

// ─── v2.1: Quality / anti-vibe ────────────────────────────────────────────

export const OcalQualityCheck = Schema.Struct({
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
export type OcalQualityCheck = Schema.Schema.Type<typeof OcalQualityCheck>

export const OcalQuality = Schema.Struct({
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
  checks: Schema.optional(Schema.Array(OcalQualityCheck)),
})
export type OcalQuality = Schema.Schema.Type<typeof OcalQuality>

// ─── v2.1: Experiments (hypothesis tournament) ────────────────────────────

export const OcalExperimentLane = Schema.Struct({
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
export type OcalExperimentLane = Schema.Schema.Type<typeof OcalExperimentLane>

export const OcalExperiments = Schema.Struct({
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
  lanes: Schema.Array(OcalExperimentLane),
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
export type OcalExperiments = Schema.Schema.Type<typeof OcalExperiments>

// ─── v2.1: Models (routing + fallback + critic discipline) ────────────────

export const OcalModelProfile = Schema.Struct({
  provider: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  temperature: Schema.optional(Schema.Number),
  reasoning: Schema.optional(Schema.Boolean),
  budget_usd: Schema.optional(Schema.Number),
})
export type OcalModelProfile = Schema.Schema.Type<typeof OcalModelProfile>

export const OcalModels = Schema.Struct({
  profiles: Schema.optional(Schema.Record(Schema.String, OcalModelProfile)),
  routes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  critic: Schema.optional(Schema.Struct({
    must_differ_from_builder: Schema.optional(Schema.Boolean),
    must_use_different_provider: Schema.optional(Schema.Boolean),
  })),
  fallback: Schema.optional(Schema.Struct({
    on_rate_limit: Schema.optional(Schema.String),
    on_context_overflow: Schema.optional(Schema.String),
    chain: Schema.optional(Schema.Array(Schema.String)),
    cooldown: Schema.optional(Schema.String),
  })),
  confidence_cap: Schema.optional(Schema.Number),
})
export type OcalModels = Schema.Schema.Type<typeof OcalModels>

// ─── v2.1: Budgets (multi-scope, on_exhaust policy) ───────────────────────

export const OcalBudgetScope = Schema.Struct({
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
export type OcalBudgetScope = Schema.Schema.Type<typeof OcalBudgetScope>

export const OcalBudgets = Schema.Struct({
  run: Schema.optional(OcalBudgetScope),
  task: Schema.optional(OcalBudgetScope),
  iteration: Schema.optional(OcalBudgetScope),
  experiment_lane: Schema.optional(OcalBudgetScope),
})
export type OcalBudgets = Schema.Schema.Type<typeof OcalBudgets>

// ─── v2.1: Triggers (manual/cron/github/ci/webhook) ───────────────────────

export const OcalTrigger = Schema.Struct({
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
export type OcalTrigger = Schema.Schema.Type<typeof OcalTrigger>

export const OcalTriggers = Schema.Struct({
  list: Schema.Array(OcalTrigger),
  anti_recursion: Schema.optional(Schema.Boolean),
})
export type OcalTriggers = Schema.Schema.Type<typeof OcalTriggers>

// ─── v2.1: Rollback (first-class) ─────────────────────────────────────────

export const OcalRollback = Schema.Struct({
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
export type OcalRollback = Schema.Schema.Type<typeof OcalRollback>

// ─── v2.1: Done definition (host-evaluated) ───────────────────────────────

export const OcalDone = Schema.Struct({
  require: Schema.optional(Schema.Array(Schema.String)),
  forbid: Schema.optional(Schema.Array(Schema.String)),
})
export type OcalDone = Schema.Schema.Type<typeof OcalDone>

// ─── v2.1: Repo intelligence (indexes, scope, blast radius) ───────────────

export const OcalRepoIntelligence = Schema.Struct({
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
export type OcalRepoIntelligence = Schema.Schema.Type<typeof OcalRepoIntelligence>

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
  // v2 wave 2 blocks
  skills: Schema.optional(OcalSkills),
  sandbox: Schema.optional(OcalSandbox),
  security: Schema.optional(OcalSecurity),
  observability: Schema.optional(OcalObservability),
  // v2.1 power blocks
  arming: Schema.optional(OcalArmingPolicy),
  capabilities: Schema.optional(OcalCapabilities),
  quality: Schema.optional(OcalQuality),
  experiments: Schema.optional(OcalExperiments),
  models: Schema.optional(OcalModels),
  budgets: Schema.optional(OcalBudgets),
  triggers: Schema.optional(OcalTriggers),
  rollback: Schema.optional(OcalRollback),
  done: Schema.optional(OcalDone),
  repo_intelligence: Schema.optional(OcalRepoIntelligence),
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
