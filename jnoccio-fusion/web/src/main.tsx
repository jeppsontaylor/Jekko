import React, { useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import type { AgentActivity, CapacitySummary, ContextDashboard, ContextHistogramBucket, DashboardModel, DashboardSnapshot, DashboardTotals, MetricEvent, SocketMessage, TokenRateEstimate } from "./types"
import "./styles.css"

const emptyCapacity: CapacitySummary = { known_limit_per_hour: 0, known_used: 0, known_remaining: 0, percent_used: 0, models: [], unknown_models: [] }
const emptyContext: ContextDashboard = { estimates: [], histogram: [], recent_events: [] }
const emptyTokenRate: TokenRateEstimate = { median_m_tokens_per_24h: 0, max_m_tokens_per_24h: 0, sample_minutes: 0, window_minutes: 1440, smoothing_minutes: 10 }
const emptySnapshot: DashboardSnapshot = {
  totals: { total_models: 0, enabled_models: 0, calls: 0, successes: 0, failures: 0, wins: 0, prompt_tokens: 0, completion_tokens: 0, total_tokens: 0, average_latency_ms: null },
  token_rate: emptyTokenRate,
  capacity: emptyCapacity,
  context: emptyContext,
  models: [],
  recent_events: [],
  agent_count: 1,
  max_agents: 20,
  active_agents: [],
  instance_count: 1,
  max_instances: 20,
  available_instance_slots: 19,
  instance_role: "main",
  worker_threads: 0,
}

type TabId = "leaderboard" | "latency" | "tokens" | "limits" | "feed"
const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: "leaderboard", icon: "🏆", label: "Board" },
  { id: "latency", icon: "⚡", label: "Speed" },
  { id: "tokens", icon: "💰", label: "Vault" },
  { id: "limits", icon: "🔒", label: "Limits" },
  { id: "feed", icon: "📡", label: "Feed" },
]

function App() {
  const [snapshot, setSnapshot] = useState(emptySnapshot)
  const [connection, setConnection] = useState("loading")
  const [lastHeartbeat, setLastHeartbeat] = useState<number | null>(null)
  const [tab, setTab] = useState<TabId>("leaderboard")
  const [drawerModel, setDrawerModel] = useState<string | null>(null)
  const [splashHidden, setSplashHidden] = useState(false)
  const [flashModels, setFlashModels] = useState<Map<string, number>>(new Map())

  const flashModel = (modelId: string, agentId?: string | null) => {
    setFlashModels((prev) => {
      const next = new Map(prev)
      next.set(flashKey(modelId, agentId), Date.now())
      return next
    })
  }

  useEffect(() => {
    let closed = false
    let socket: WebSocket | null = null
    let timer: number | null = null
    let attempts = 0

    const load = async () => {
      const r = await fetch("/v1/jnoccio/metrics")
      setSnapshot(normalizeSnapshot(await r.json()))
    }
    const connect = () => {
      setConnection(attempts === 0 ? "connecting" : "reconnecting")
      socket = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/v1/jnoccio/metrics/ws`)
      socket.onopen = () => { attempts = 0; setConnection("live") }
      socket.onmessage = (e) => applyMessage(JSON.parse(e.data), setSnapshot, setLastHeartbeat, flashModel)
      socket.onclose = () => {
        if (closed) return
        attempts += 1; setConnection("reconnecting")
        timer = window.setTimeout(async () => { try { await load() } finally { connect() } }, Math.min(1000 * 2 ** attempts, 10000))
      }
      socket.onerror = () => socket?.close()
    }
    load().then(() => { hideSplash(); connect() }).catch(() => { setConnection("error"); timer = window.setTimeout(connect, 2000) })
    return () => { closed = true; socket?.close(); if (timer) clearTimeout(timer) }
  }, [])

  function hideSplash() {
    const el = document.getElementById("splash")
    if (el) { el.classList.add("hidden"); setTimeout(() => { el.style.display = "none"; setSplashHidden(true) }, 600) }
  }

  const selected = snapshot.models.find((m) => m.id === drawerModel) ?? null
  const selectedEvents = selected ? snapshot.recent_events.filter((e) => e.model_id === selected.id).slice(0, 20) : []

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <img src="/dashboard/assets/jnoccio_logo.png" alt="Jnoccio" />
          <div>
            <h1>Jnoccio Fusion</h1>
            <p className="subtitle">{snapshot.totals.enabled_models} of {snapshot.totals.total_models} models routable</p>
          </div>
        </div>
        <KpiStrip totals={snapshot.totals} tokenRate={snapshot.token_rate} />
        <div className={`agent-badge ${snapshot.agent_count > 1 ? "multi" : ""}`}>
          <span className="instance-icon">{snapshot.agent_count > 1 ? "⚡" : "●"}</span>
          <span className="instance-label">Agents</span>
          <span className="instance-value">{snapshot.agent_count}/{snapshot.max_agents}</span>
        </div>
        <div className={`instance-badge ${snapshot.instance_count > 1 ? "multi" : ""}`}>
          <span className="instance-icon">◌</span>
          <span className="instance-label">Gateways</span>
          <span className="instance-value">x{snapshot.instance_count}</span>
        </div>
        <div className={`conn-pill ${connection}`}>{connLabel(connection, lastHeartbeat)}</div>
      </header>

      <div className="workspace">
        <nav className="tab-nav">
          {TABS.map((t) => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <span className="tab-icon">{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div className="tab-content">
          {tab === "leaderboard" && <LeaderboardPane models={snapshot.models} onSelect={setDrawerModel} flashModels={flashModels} />}
          {tab === "latency" && <LatencyPane models={snapshot.models} onSelect={setDrawerModel} />}
          {tab === "tokens" && <TokenVaultPane models={snapshot.models} onSelect={setDrawerModel} />}
          {tab === "limits" && <RateLimitPane models={snapshot.models} capacity={snapshot.capacity} context={snapshot.context} />}
          {tab === "feed" && <LiveFeedPane events={snapshot.recent_events} />}
        </div>
      </div>

      <div className={`drawer-overlay ${drawerModel ? "open" : ""}`} onClick={() => setDrawerModel(null)} />
      <div className={`detail-drawer ${drawerModel ? "open" : ""}`}>
        {selected && <ModelDrawer model={selected} events={selectedEvents} onClose={() => setDrawerModel(null)} />}
      </div>
    </div>
  )
}

/* ── KPI Strip ── */
function KpiStrip({ totals, tokenRate }: { totals: DashboardTotals; tokenRate: TokenRateEstimate }) {
  return (
    <div className="kpi-strip">
      <KpiCard label="Total Calls" value={fmtN(totals.calls)} />
      <KpiCard label="Wins" value={fmtN(totals.wins)} tone="gold" />
      <KpiCard label="Failures" value={fmtN(totals.failures)} tone="red" />
      <KpiCard label="Tokens Stolen" value={fmtN(totals.total_tokens)} tone="purple" />
      <KpiCard label="Tokens / 24h" value={`${fmtM(tokenRate.median_m_tokens_per_24h)}M`} tone="teal" detail={`median · 10m max ${fmtM(tokenRate.max_m_tokens_per_24h)}M`} />
      <KpiCard label="Avg Latency" value={fmtMs(totals.average_latency_ms)} tone="blue" />
      <KpiCard label="Active Routes" value={`${totals.enabled_models}/${totals.total_models}`} tone="teal" />
    </div>
  )
}

function KpiCard({ label, value, tone, detail }: { label: string; value: string; tone?: string; detail?: string }) {
  const prevRef = useRef(value)
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    if (prevRef.current !== value) { prevRef.current = value; setPulse(true); setTimeout(() => setPulse(false), 600) }
  }, [value])
  return (
    <div className={`kpi-card ${tone ?? ""} ${pulse ? "kpi-pulse" : ""}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {detail && <div className="kpi-detail">{detail}</div>}
    </div>
  )
}

/* ── Activity Histogram (SVG) ── */
function ActivityHistogram({ models, flashModels }: { models: DashboardModel[]; flashModels: Map<string, number> }) {
  const top = [...models].filter((m) => m.call_count > 0).sort((a, b) => b.call_count - a.call_count).slice(0, 15)
  const maxCalls = Math.max(1, ...top.map((m) => m.call_count))
  const barW = Math.max(12, Math.floor(680 / Math.max(top.length, 1)) - 4)
  const h = 100
  const now = Date.now()

  if (top.length === 0) return null
  return (
    <div className="histogram-wrap">
      <svg width="100%" height={h + 24} viewBox={`0 0 ${top.length * (barW + 4)} ${h + 24}`} preserveAspectRatio="xMidYEnd meet">
        {top.map((m, i) => {
          const barH = Math.max(2, (m.call_count / maxCalls) * h)
          const flashes = flashesForModel(flashModels, m.id, now)
          const isActive = flashes.length > 0
          const winH = m.win_count > 0 ? Math.max(1, (m.win_count / maxCalls) * h) : 0
          return (
            <g key={m.id} transform={`translate(${i * (barW + 4)}, 0)`}>
              <rect x={0} y={h - barH} width={barW} height={barH} rx={3} fill="rgba(59,130,246,0.35)" style={{ transition: "height 500ms, y 500ms" }} />
              {winH > 0 && <rect x={0} y={h - winH} width={barW} height={winH} rx={3} fill="rgba(245,166,35,0.7)" style={{ transition: "height 500ms, y 500ms" }} />}
              {isActive && <rect x={0} y={h - barH} width={barW} height={barH} rx={3} fill="rgba(245,166,35,0.25)" className="hist-pulse" />}
              {flashes.slice(0, 3).map((flash, index) => (
                <circle
                  key={`${m.id}-${flash.agentId}`}
                  cx={barW - 5 - index * 7}
                  cy={Math.max(10, h - barH - 6 - index * 2)}
                  r={2.5}
                  fill={agentColor(flash.agentId)}
                  className="agent-dot"
                />
              ))}
              <title>{m.display_name}: {m.call_count} calls, {m.win_count} wins</title>
              <text x={barW / 2} y={h + 12} textAnchor="middle" fontSize={8} fill="var(--text-muted)" style={{ userSelect: "none" }}>
                {m.display_name.length > 8 ? m.display_name.slice(0, 7) + "…" : m.display_name}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="histogram-legend">
        <span><span className="legend-swatch" style={{ background: "rgba(59,130,246,0.5)" }} /> Calls</span>
        <span><span className="legend-swatch" style={{ background: "rgba(245,166,35,0.8)" }} /> Wins</span>
      </div>
    </div>
  )
}

/* ── Activity Spinner SVG ── */
function ActivitySpinner() {
  return (
    <svg className="activity-spinner" width="14" height="14" viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeDasharray="12 22" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="0.9s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* ── Leaderboard ── */
function LeaderboardPane({ models, onSelect, flashModels }: { models: DashboardModel[]; onSelect: (id: string) => void; flashModels: Map<string, number> }) {
  const [sort, setSort] = useState<"latest" | "wins" | "win_rate" | "success_rate">("latest")
  const now = Date.now()
  const active = models.filter((m) => m.call_count > 0)
  const sorted = [...active].sort((a, b) => {
    if (sort === "latest") {
      return Math.max(latestFlashForModel(flashModels, b.id, now), b.updated_at * 1000) -
        Math.max(latestFlashForModel(flashModels, a.id, now), a.updated_at * 1000)
    }
    if (sort === "wins") return b.win_count - a.win_count
    if (sort === "win_rate") return b.win_rate - a.win_rate
    return successRate(b) - successRate(a)
  })
  const maxVal = Math.max(1, ...sorted.map((m) => {
    if (sort === "latest" || sort === "wins") return m.win_count
    if (sort === "win_rate") return m.win_rate
    return successRate(m)
  }))

  return (
    <>
      <ActivityHistogram models={models} flashModels={flashModels} />
      <div className="pane-header">
        <h2>🏆 Leaderboard — Who's Winning?</h2>
        <div className="pane-controls">
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="latest">Latest Active</option>
            <option value="wins">By Wins</option>
            <option value="win_rate">By Win Rate</option>
            <option value="success_rate">By Success Rate</option>
          </select>
        </div>
      </div>
      <div className="bar-list">
        {sorted.map((m) => {
          const val = (sort === "latest" || sort === "wins") ? m.win_count : sort === "win_rate" ? m.win_rate : successRate(m)
          const pct = (val / maxVal) * 100
          const display = (sort === "latest" || sort === "wins") ? fmtN(m.win_count) : fmtPct(val)
          const flashes = flashesForModel(flashModels, m.id, now)
          const isFlashing = flashes.length > 0
          return (
            <div className={`bar-row ${isFlashing ? "flash" : ""}`} key={m.id} onClick={() => onSelect(m.id)}>
              <div className="bar-label">
                <div className="model-name">
                  {isFlashing && <ActivitySpinner />}
                  <span className={`status-dot ${m.status}`} />
                  <span>{m.display_name}</span>
                  <span className="flash-dots">
                    {flashes.slice(0, 4).map((flash) => (
                      <span
                        key={`${m.id}-${flash.agentId}`}
                        className="agent-dot"
                        title={flash.agentId}
                        style={{ background: agentColor(flash.agentId) }}
                      />
                    ))}
                    {flashes.length > 4 && <span className="flash-count">+{flashes.length - 4}</span>}
                  </span>
                </div>
                <div className="model-sub">{m.provider} · {fmtN(m.call_count)} calls · {fmtPct(m.win_rate)} win</div>
              </div>
              <div className="bar-track"><div className="bar-fill gold" style={{ width: `${Math.max(pct, 1)}%` }} /></div>
              <div className="bar-value">{display}</div>
            </div>
          )
        })}
        {sorted.length === 0 && <div className="empty-state">No models with calls yet</div>}
      </div>
    </>
  )
}

/* ── Latency Arena ── */
function LatencyPane({ models, onSelect }: { models: DashboardModel[]; onSelect: (id: string) => void }) {
  const active = models.filter((m) => m.avg_latency_ms !== null).sort((a, b) => (a.avg_latency_ms ?? 0) - (b.avg_latency_ms ?? 0))
  const maxLat = Math.max(1, ...active.map((m) => m.avg_latency_ms ?? 0))

  return (
    <>
      <div className="pane-header"><h2>⚡ Latency Arena — Who's Fastest?</h2></div>
      <div className="bar-list">
        {active.map((m) => {
          const lat = m.avg_latency_ms ?? 0
          const pct = (lat / maxLat) * 100
          const color = lat < 1000 ? "teal" : lat < 5000 ? "blue" : lat < 15000 ? "gold" : "red"
          const tier = lat < 1000 ? "⚡" : lat < 5000 ? "🔵" : lat < 15000 ? "🟡" : "🔴"
          return (
            <div className="bar-row" key={m.id} onClick={() => onSelect(m.id)}>
              <div className="bar-label">
                <div className="model-name">{tier} {m.display_name}</div>
                <div className="model-sub">{m.provider} · min {fmtMs(m.min_latency_ms)} · max {fmtMs(m.max_latency_ms)}</div>
              </div>
              <div className="bar-track"><div className={`bar-fill ${color}`} style={{ width: `${Math.max(pct, 1)}%` }} /></div>
              <div className="bar-value">{fmtMs(lat)}</div>
            </div>
          )
        })}
        {active.length === 0 && <div className="empty-state">No latency data yet</div>}
      </div>
    </>
  )
}

/* ── Token Vault ── */
function TokenVaultPane({ models, onSelect }: { models: DashboardModel[]; onSelect: (id: string) => void }) {
  const active = models.filter((m) => m.total_tokens > 0).sort((a, b) => b.total_tokens - a.total_tokens)
  const maxTok = Math.max(1, ...active.map((m) => m.total_tokens))
  const totalStolen = active.reduce((s, m) => s + m.total_tokens, 0)

  return (
    <>
      <div className="pane-header">
        <h2>💰 Token Vault — {fmtN(totalStolen)} Stolen</h2>
      </div>
      <div className="bar-list">
        {active.map((m) => {
          const promptPct = (m.prompt_tokens / maxTok) * 100
          const compPct = (m.completion_tokens / maxTok) * 100
          const efficiency = m.success_count > 0 ? Math.round(m.total_tokens / m.success_count) : 0
          return (
            <div className="bar-row" key={m.id} onClick={() => onSelect(m.id)}>
              <div className="bar-label">
                <div className="model-name">{m.display_name}</div>
                <div className="model-sub">{fmtN(m.prompt_tokens)} prompt · {fmtN(m.completion_tokens)} completion · {fmtN(efficiency)} tok/call</div>
              </div>
              <div className="bar-track">
                <div className="bar-stack">
                  <div className="bar-segment teal" style={{ width: `${promptPct}%` }} />
                  <div className="bar-segment purple" style={{ width: `${compPct}%` }} />
                </div>
              </div>
              <div className="bar-value">{fmtN(m.total_tokens)}</div>
            </div>
          )
        })}
        {active.length === 0 && <div className="empty-state">No tokens consumed yet</div>}
      </div>
    </>
  )
}

/* ── Rate Limit Observatory ── */
function RateLimitPane({ models, capacity, context }: { models: DashboardModel[]; capacity: CapacitySummary; context: ContextDashboard }) {
  const [contextFilter, setContextFilter] = useState("all")
  const providers = Array.from(new Set(models.map((m) => m.provider))).sort()
  const selectedModel = models.find((m) => m.id === contextFilter) ?? null
  const filteredEvents = context.recent_events.filter((event) => {
    if (contextFilter === "all") return true
    if (contextFilter.startsWith("provider:")) return event.provider === contextFilter.slice("provider:".length)
    return event.model_id === contextFilter
  })
  const filteredHistogram = contextFilter === "all" && filteredEvents.length === 0 ? context.histogram : bucketsFromEvents(filteredEvents)
  const selectedEstimate = selectedModel ? context.estimates.find((item) => item.model_id === selectedModel.id) : null
  const learnedLimit = selectedEstimate?.safe_context_window ?? selectedModel?.safe_context_window ?? null

  return (
    <>
      <div className="pane-header"><h2>🔒 Rate Limit Observatory</h2></div>

      <div className="section-card context-card">
        <div className="context-head">
          <h3>Context Runs</h3>
          <select value={contextFilter} onChange={(e) => setContextFilter(e.target.value)} aria-label="Context model filter">
            <option value="all">All models</option>
            {providers.map((provider) => <option key={provider} value={`provider:${provider}`}>{provider}</option>)}
            {models.map((model) => <option key={model.id} value={model.id}>{model.display_name}</option>)}
          </select>
        </div>
        <ContextHistogram buckets={filteredHistogram} marker={learnedLimit} />
        <div className="context-stats">
          <span>Configured {fmtN(selectedModel?.configured_context_window ?? maxConfigured(models))}</span>
          <span>Safe {learnedLimit === null ? "—" : fmtN(learnedLimit)}</span>
          <span>Learned {fmtN(context.estimates.filter((item) => item.learned_context_window || item.learned_request_token_limit).length)}</span>
          <span>Overruns {fmtN(filteredEvents.filter((event) => event.error_kind === "ContextOverflow").length)}</span>
        </div>
      </div>

      <div className="section-card">
        <h3>Known Capacity — {fmtN(capacity.known_remaining)} / {fmtN(capacity.known_limit_per_hour)} remaining/hr</h3>
        <div className="bar-list">
          {capacity.models.map((m) => {
            const pct = m.limit_per_hour > 0 ? (m.used / m.limit_per_hour) * 100 : 0
            const color = pct < 50 ? "safe" : pct < 80 ? "warning" : "danger"
            return (
              <div className="bar-row" key={m.model_id} style={{ cursor: "default" }}>
                <div className="bar-label">
                  <div className="model-name"><span className={`status-dot ${m.status}`} /> {m.display_name}</div>
                  <div className="model-sub">{m.provider} · {m.limit_kind}{m.credit_tier ? " (credit)" : ""}</div>
                </div>
                <div className="capacity-bar-track">
                  <div className={`capacity-bar-fill ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
                <div className="bar-value">{fmtN(m.used)}/{fmtN(m.limit_per_hour)}</div>
              </div>
            )
          })}
          {capacity.models.length === 0 && <div className="empty-state">No models with known limits</div>}
        </div>
      </div>

      <div className="section-card">
        <h3>Inferred Limits — Models Without Published Rates</h3>
        <div className="bar-list">
          {capacity.unknown_models.filter((m) => m.used > 0).sort((a, b) => b.successes - a.successes).map((m) => {
            const inferredRPH = m.successes
            const failRate = m.used > 0 ? m.failures / m.used : 0
            const maxInferred = Math.max(1, ...capacity.unknown_models.filter((x) => x.used > 0).map((x) => x.successes))
            const pct = (inferredRPH / maxInferred) * 100
            return (
              <div className="bar-row" key={m.model_id} style={{ cursor: "default" }}>
                <div className="bar-label">
                  <div className="model-name">{m.display_name}</div>
                  <div className="model-sub">{m.provider} · {fmtN(m.used)} attempts · {fmtPct(failRate)} fail · {fmtMs(m.average_latency_ms)} avg</div>
                </div>
                <div className="bar-track"><div className="bar-fill green" style={{ width: `${Math.max(pct, 1)}%` }} /></div>
                <div className="bar-value">~{fmtN(inferredRPH)}/hr</div>
              </div>
            )
          })}
          {capacity.unknown_models.filter((m) => m.used > 0).length === 0 && <div className="empty-state">No unknown-limit models active</div>}
        </div>
      </div>

      <div className="section-card">
        <h3>Error Pattern Analysis</h3>
        <div className="bar-list">
          {models.filter((m) => m.last_error_kind).sort((a, b) => b.failure_count - a.failure_count).slice(0, 15).map((m) => {
            const maxFail = Math.max(1, ...models.filter((x) => x.last_error_kind).map((x) => x.failure_count))
            const pct = (m.failure_count / maxFail) * 100
            return (
              <div className="bar-row" key={m.id} style={{ cursor: "default" }}>
                <div className="bar-label">
                  <div className="model-name">{m.display_name}</div>
                  <div className="model-sub">{m.last_error_kind} — {truncate(m.last_error_message ?? "", 60)}</div>
                </div>
                <div className="bar-track"><div className="bar-fill red" style={{ width: `${Math.max(pct, 1)}%` }} /></div>
                <div className="bar-value">{fmtN(m.failure_count)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function ContextHistogram({ buckets, marker }: { buckets: ContextHistogramBucket[]; marker: number | null }) {
  const maxCount = Math.max(1, ...buckets.map((bucket) => bucket.success_count + bucket.failure_count))
  const maxBucket = Math.max(marker ?? 0, ...buckets.map((bucket) => bucket.bucket_end), 1)
  if (buckets.length === 0) return <div className="empty-state">No context runs recorded yet</div>
  return (
    <div className="context-histogram">
      {marker !== null && <div className="context-marker" style={{ left: `${Math.min((marker / maxBucket) * 100, 100)}%` }}><span>{fmtN(marker)}</span></div>}
      {buckets.map((bucket) => {
        const total = bucket.success_count + bucket.failure_count
        const height = Math.max(4, (total / maxCount) * 120)
        const failedPct = total === 0 ? 0 : (bucket.failure_count / total) * 100
        return (
          <div className="context-bucket" key={bucket.bucket_start} title={`${fmtN(bucket.bucket_start)}-${fmtN(bucket.bucket_end)} tokens`}>
            <div className="context-bar" style={{ height }}>
              <div className="context-bar-failed" style={{ height: `${failedPct}%` }} />
            </div>
            <span>{bucket.bucket_start >= 1000 ? `${Math.round(bucket.bucket_start / 1000)}k` : bucket.bucket_start}</span>
          </div>
        )
      })}
    </div>
  )
}

function bucketsFromEvents(events: ContextDashboard["recent_events"]) {
  if (events.length === 0) return []
  const map = new Map<number, ContextHistogramBucket>()
  for (const event of events) {
    const bucketStart = Math.floor(event.estimated_total_tokens / 8000) * 8000
    const bucket = map.get(bucketStart) ?? { bucket_start: bucketStart, bucket_end: bucketStart + 8000, success_count: 0, failure_count: 0, overrun_count: 0 }
    if (event.status === "success") bucket.success_count += 1
    if (event.status === "failure") bucket.failure_count += 1
    if (event.error_kind === "ContextOverflow") bucket.overrun_count += 1
    map.set(bucketStart, bucket)
  }
  return Array.from(map.values()).sort((a, b) => a.bucket_start - b.bucket_start)
}

/* ── Live Feed ── */
function LiveFeedPane({ events }: { events: MetricEvent[] }) {
  const [filter, setFilter] = useState("")
  const [phaseFilter, setPhaseFilter] = useState("all")
  const phases = useMemo(() => ["all", ...Array.from(new Set(events.map((e) => e.phase))).sort()], [events])
  const filtered = useMemo(() => {
    const q = filter.toLowerCase()
    return events
      .filter((e) => phaseFilter === "all" || e.phase === phaseFilter)
      .filter((e) => !q || [e.model_id, e.provider, e.phase, e.status].join(" ").toLowerCase().includes(q))
      .slice(0, 100)
  }, [events, filter, phaseFilter])

  return (
    <>
      <div className="pane-header">
        <h2>📡 Live Heist Feed — {events.length} events</h2>
        <div className="pane-controls">
          <input aria-label="Filter live feed" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 140 }} />
          <select value={phaseFilter} onChange={(e) => setPhaseFilter(e.target.value)}>
            {phases.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="event-list">
        {filtered.map((e) => (
          <div className="event-row" key={e.id}>
            <span className={`status-dot ${e.status}`} />
            <span className={`event-phase ${e.phase}`}>{e.phase}</span>
            <span className="event-model" title={e.model_id}>
              {e.agent_id && <span className="agent-dot" title={e.agent_id} style={{ background: agentColor(e.agent_id) }} />}
              {e.model_id}
            </span>
            <span>{e.status}</span>
            <span className="event-latency">{e.error_kind ?? fmtMs(e.latency_ms)}</span>
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{fmtTime(e.created_at)}</span>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty-state">No events match</div>}
      </div>
    </>
  )
}

/* ── Model Drawer ── */
function ModelDrawer({ model, events, onClose }: { model: DashboardModel; events: MetricEvent[]; onClose: () => void }) {
  return (
    <>
      <div className="drawer-header">
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>{model.display_name}</h2>
          <span className="provider-badge">{model.provider}</span>
          <span style={{ marginLeft: 8, fontSize: 11, color: "var(--text-muted)" }}>{model.upstream_model}</span>
        </div>
        <button className="drawer-close" onClick={onClose}>✕</button>
      </div>

      <dl className="stat-grid">
        <div className="stat-item"><dt>Status</dt><dd><span className={`status-dot ${model.status}`} /> {model.status}</dd></div>
        <div className="stat-item"><dt>Roles</dt><dd>{model.roles.join(", ") || "—"}</dd></div>
        <div className="stat-item"><dt>Calls</dt><dd>{fmtN(model.call_count)}</dd></div>
        <div className="stat-item"><dt>Successes</dt><dd style={{ color: "var(--accent-teal)" }}>{fmtN(model.success_count)}</dd></div>
        <div className="stat-item"><dt>Failures</dt><dd style={{ color: "var(--accent-red)" }}>{fmtN(model.failure_count)}</dd></div>
        <div className="stat-item"><dt>Wins</dt><dd style={{ color: "var(--accent-gold)" }}>{fmtN(model.win_count)}</dd></div>
        <div className="stat-item"><dt>Win Rate</dt><dd>{fmtPct(model.win_rate)}</dd></div>
        <div className="stat-item"><dt>Avg Latency</dt><dd>{fmtMs(model.avg_latency_ms)}</dd></div>
        <div className="stat-item"><dt>Min / Max</dt><dd>{fmtMs(model.min_latency_ms)} / {fmtMs(model.max_latency_ms)}</dd></div>
        <div className="stat-item"><dt>Total Tokens</dt><dd style={{ color: "var(--accent-purple)" }}>{fmtN(model.total_tokens)}</dd></div>
        <div className="stat-item"><dt>Prompt Tokens</dt><dd>{fmtN(model.prompt_tokens)}</dd></div>
        <div className="stat-item"><dt>Completion Tokens</dt><dd>{fmtN(model.completion_tokens)}</dd></div>
        <div className="stat-item"><dt>Safe Context</dt><dd>{fmtN(model.safe_context_window)}</dd></div>
        <div className="stat-item"><dt>Overruns</dt><dd style={{ color: model.context_overrun_count > 0 ? "var(--accent-red)" : undefined }}>{fmtN(model.context_overrun_count)}</dd></div>
      </dl>

      {model.last_error_kind && (
        <div className="error-box">
          <strong>{model.last_error_kind}</strong>
          <span>{model.last_error_message}</span>
        </div>
      )}

      {model.capacity_known && model.hourly_capacity !== null && (
        <div className="section-card">
          <h3>Hourly Capacity</h3>
          <div className="capacity-bar-track" style={{ marginBottom: 6 }}>
            <div className={`capacity-bar-fill ${model.hourly_used / model.hourly_capacity < 0.5 ? "safe" : model.hourly_used / model.hourly_capacity < 0.8 ? "warning" : "danger"}`}
              style={{ width: `${Math.min((model.hourly_used / model.hourly_capacity) * 100, 100)}%` }} />
          </div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{fmtN(model.hourly_used)} / {fmtN(model.hourly_capacity)} used this hour</div>
        </div>
      )}

      <div className="section-card">
        <h3>Recent Events</h3>
        <div className="event-list" style={{ maxHeight: 260 }}>
          {events.map((e) => (
            <div className="event-row" key={e.id}>
              <span className={`status-dot ${e.status}`} />
              <span className={`event-phase ${e.phase}`}>{e.phase}</span>
              <span className="event-model">
                {e.agent_id && <span className="agent-dot" title={e.agent_id} style={{ background: agentColor(e.agent_id) }} />}
                {e.status}
              </span>
              <span>{e.error_kind ?? ""}</span>
              <span className="event-latency">{fmtMs(e.latency_ms)}</span>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{fmtTime(e.created_at)}</span>
            </div>
          ))}
          {events.length === 0 && <div className="empty-state">No events</div>}
        </div>
      </div>
    </>
  )
}

/* ── WebSocket ── */
function applyMessage(
  msg: SocketMessage,
  setSnapshot: React.Dispatch<React.SetStateAction<DashboardSnapshot>>,
  setLastHeartbeat: React.Dispatch<React.SetStateAction<number | null>>,
  flashModel: (modelId: string, agentId?: string | null) => void,
) {
  if (msg.type === "snapshot") { setSnapshot(normalizeSnapshot(msg.snapshot as Partial<DashboardSnapshot> & Record<string, unknown>)); return }
  if (msg.type === "model_updated") {
    flashModel(msg.model.id, "model")
    setSnapshot((s) => {
      const models = s.models.map((m) => m.id === msg.model.id ? msg.model : m)
      return { ...s, models, totals: totalsFromModels(models) }
    })
    return
  }
  if (msg.type === "request_event") {
    flashModel(msg.event.model_id, msg.event.agent_id ?? msg.event.request_id)
    setSnapshot((s) => ({
      ...s,
      recent_events: [msg.event, ...s.recent_events.filter((e) => e.id !== msg.event.id)].slice(0, 200),
    }))
    return
  }
  setLastHeartbeat(msg.timestamp)
}

function totalsFromModels(models: DashboardModel[]): DashboardTotals {
  const lat = models.reduce((s, m) => {
    if (m.avg_latency_ms === null) return s
    return { c: s.c + Math.max(m.call_count, 1), t: s.t + m.avg_latency_ms * Math.max(m.call_count, 1) }
  }, { c: 0, t: 0 })
  return {
    total_models: models.length,
    enabled_models: models.filter((m) => m.enabled).length,
    calls: models.reduce((s, m) => s + m.call_count, 0),
    successes: models.reduce((s, m) => s + m.success_count, 0),
    failures: models.reduce((s, m) => s + m.failure_count, 0),
    wins: models.reduce((s, m) => s + m.win_count, 0),
    prompt_tokens: models.reduce((s, m) => s + m.prompt_tokens, 0),
    completion_tokens: models.reduce((s, m) => s + m.completion_tokens, 0),
    total_tokens: models.reduce((s, m) => s + m.total_tokens, 0),
    average_latency_ms: lat.c === 0 ? null : lat.t / lat.c,
  }
}

/* ── Normalize ── */
function normalizeSnapshot(raw: Partial<DashboardSnapshot> & Record<string, unknown>): DashboardSnapshot {
  return {
    totals: raw.totals ?? emptySnapshot.totals,
    token_rate: raw.token_rate ?? emptyTokenRate,
    capacity: raw.capacity ?? emptyCapacity,
    context: raw.context ?? emptyContext,
    models: (raw.models ?? []).map((m) => ({
      ...m,
      capacity_known: m.capacity_known ?? false,
      hourly_capacity: m.hourly_capacity ?? null,
      hourly_used: m.hourly_used ?? 0,
      configured_context_window: m.configured_context_window ?? 0,
      safe_context_window: m.safe_context_window ?? m.configured_context_window ?? 0,
      learned_context_window: m.learned_context_window ?? null,
      learned_request_token_limit: m.learned_request_token_limit ?? null,
      context_overrun_count: m.context_overrun_count ?? 0,
      smallest_overrun_requested_tokens: m.smallest_overrun_requested_tokens ?? null,
    })),
    recent_events: dedupeEvents((raw.recent_events ?? []) as MetricEvent[]),
    agent_count: (raw.agent_count as number | undefined) ?? 1,
    max_agents: (raw.max_agents as number | undefined) ?? 20,
    active_agents: (raw.active_agents as AgentActivity[] | undefined) ?? [],
    instance_count: (raw.instance_count as number | undefined) ?? 1,
    max_instances: (raw.max_instances as number | undefined) ?? 20,
    available_instance_slots: (raw.available_instance_slots as number | undefined) ?? Math.max(0, ((raw.max_instances as number | undefined) ?? 20) - ((raw.instance_count as number | undefined) ?? 1)),
    instance_role: (raw.instance_role as string | undefined) ?? "main",
    worker_threads: (raw.worker_threads as number | undefined) ?? 0,
  }
}

/* ── Helpers ── */
function flashKey(modelId: string, agentId?: string | null) {
  return `${modelId}|${agentId ?? "unknown"}`
}
function latestFlashForModel(flashModels: Map<string, number>, modelId: string, now: number) {
  let latest = 0
  for (const [key, ts] of flashModels.entries()) {
    if (key.startsWith(`${modelId}|`) && now - ts < 3000) {
      latest = Math.max(latest, ts)
    }
  }
  return latest
}
function flashesForModel(flashModels: Map<string, number>, modelId: string, now: number) {
  return [...flashModels.entries()]
    .filter(([key, ts]) => key.startsWith(`${modelId}|`) && now - ts < 3000)
    .map(([key, ts]) => ({
      agentId: key.slice(modelId.length + 1),
      ts,
    }))
    .sort((a, b) => b.ts - a.ts)
}
function agentColor(agentId: string) {
  let hash = 0
  for (let i = 0; i < agentId.length; i += 1) {
    hash = ((hash << 5) - hash + agentId.charCodeAt(i)) | 0
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue} 85% 60%)`
}
function dedupeEvents(events: MetricEvent[]) {
  const seen = new Set<number>()
  return events.filter((event) => {
    if (seen.has(event.id)) return false
    seen.add(event.id)
    return true
  })
}
function successRate(m: DashboardModel) { return m.call_count === 0 ? 0 : m.success_count / m.call_count }
function connLabel(c: string, hb: number | null) { return c === "live" && hb ? `Live · ${fmtTime(hb)}` : c }
function fmtN(v: number) { return new Intl.NumberFormat().format(v) }
function fmtM(v: number) {
  if (!Number.isFinite(v) || v <= 0) return "0.0"
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: v < 10 ? 2 : 1 }).format(v)
}
function fmtMs(v: number | null) { return v === null ? "—" : `${Math.round(v)} ms` }
function fmtPct(v: number) { return `${Math.round(v * 100)}%` }
function fmtTime(v: number) { return new Date(v * 1000).toLocaleTimeString() }
function truncate(s: string, n: number) { return s.length <= n ? s : s.slice(0, n) + "…" }
function maxConfigured(models: DashboardModel[]) { return Math.max(0, ...models.map((model) => model.configured_context_window)) }

createRoot(document.getElementById("root")!).render(<App />)
