"use client";

import { useEffect, useRef, useState } from "react";

const PANELS = [
  { id: "search", label: "Knowledge Search", icon: "⌕" },
  { id: "chat",   label: "AI Assistant",     icon: "◈" },
  { id: "ticket", label: "Ticket Automation", icon: "◎" },
  { id: "exec",   label: "Executive Insights", icon: "◇" },
];

const SIDEBAR_ITEMS = [
  { icon: "▣", label: "Dashboard",  active: false },
  { icon: "◈", label: "AI Agents",  active: true  },
  { icon: "⌕", label: "Search",     active: false },
  { icon: "◎", label: "Tickets",    active: false },
  { icon: "◇", label: "Reports",    active: false },
  { icon: "⊞", label: "Knowledge",  active: false },
];

function KnowledgeSearch() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "16px" }}>
      {/* Search bar */}
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,209,0,0.3)",
        borderRadius: "10px", padding: "12px 16px",
        display: "flex", alignItems: "center", gap: "10px",
        boxShadow: "0 0 20px rgba(255,209,0,0.05)",
      }}>
        <span style={{ color: "rgba(255,209,0,0.6)", fontSize: "14px" }}>⌕</span>
        <span style={{ fontFamily: "'Courier New',monospace", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
          What is the validated cleaning procedure for Reactor B?
        </span>
        <div style={{ marginLeft: "auto", background: "#FFD100", borderRadius: "6px", padding: "3px 10px" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: 700, color: "#000" }}>ASK</span>
        </div>
      </div>

      {/* Answer block */}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px", padding: "16px", flex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFD100", boxShadow: "0 0 6px #FFD100" }} />
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,209,0,0.6)" }}>KNOWLEDGE AGENT · RESPONSE</span>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 14px" }}>
          Per <strong style={{ color: "#FFD100" }}>SOP-MFG-0047 Rev. 3</strong> (approved 2024-11-12), Reactor B requires a 3-stage validated cleaning sequence following any β-lactam batch:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
          {["Pre-rinse with WFI at 65°C — 15 min", "CIP with 2% NaOH solution — 30 min", "Final WFI rinse + swab test (< 10 ppm)"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(255,209,0,0.5)", marginTop: "1px" }}>0{i+1}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["SOP-MFG-0047", "DEV-2024-0831", "QSP-VAL-012"].map(s => (
            <span key={s} style={{
              fontFamily: "'Courier New',monospace", fontSize: "9px",
              color: "rgba(255,209,0,0.6)", background: "rgba(255,209,0,0.08)",
              border: "1px solid rgba(255,209,0,0.18)", borderRadius: "4px", padding: "3px 8px",
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {[["1.4s", "Response"], ["3", "Sources"], ["100%", "Logged"]].map(([v, l]) => (
          <div key={l} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "8px", padding: "10px", textAlign: "center",
          }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: 800, color: "#FFD100" }}>{v}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChat() {
  const messages = [
    { role: "user", text: "Show me all open deviations in Q4 2024 related to temperature excursions." },
    { role: "agent", text: "I found 7 open deviations matching that criteria. The most critical is DEV-2024-0412 (Batch 8821-B, +2.3°C excursion, assigned to QA team). Three others are pending root cause analysis.", sources: ["DEV-LOG-Q4", "BATCH-8821", "QA-TRACKER"] },
    { role: "user", text: "What was the root cause for DEV-2024-0412?" },
    { role: "agent", text: "Root cause documented in CAPA-2024-0081: sensor calibration drift on Unit 3 cooling system. Corrective action completed 2024-12-03. System recalibrated and re-validated.", sources: ["CAPA-2024-0081", "CAL-UNIT3"] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "10px" }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "user" ? (
              <div style={{
                background: "rgba(255,255,255,0.07)", borderRadius: "10px 10px 2px 10px",
                padding: "10px 14px", maxWidth: "82%",
              }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>{m.text}</span>
              </div>
            ) : (
              <div style={{ maxWidth: "90%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FFD100", boxShadow: "0 0 5px #FFD100" }} />
                  <span style={{ fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "2px", color: "rgba(255,209,0,0.5)" }}>SL AGENT</span>
                </div>
                <div style={{
                  background: "rgba(255,209,0,0.05)", border: "1px solid rgba(255,209,0,0.15)",
                  borderRadius: "2px 10px 10px 10px", padding: "10px 14px",
                }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{m.text}</span>
                  {m.sources && (
                    <div style={{ display: "flex", gap: "5px", marginTop: "8px", flexWrap: "wrap" }}>
                      {m.sources.map(s => (
                        <span key={s} style={{
                          fontFamily: "'Courier New',monospace", fontSize: "8px",
                          color: "rgba(255,209,0,0.55)", background: "rgba(255,209,0,0.07)",
                          border: "1px solid rgba(255,209,0,0.15)", borderRadius: "3px", padding: "2px 6px",
                        }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px", padding: "10px 14px",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", flex: 1 }}>Ask the platform anything…</span>
        <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#FFD100", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "11px", color: "#000" }}>↑</span>
        </div>
      </div>
    </div>
  );
}

function TicketPanel() {
  const tickets = [
    { id: "TKT-4821", title: "Batch record missing sign-off", priority: "HIGH", status: "AUTO-RESOLVED", agent: "SOP Agent" },
    { id: "TKT-4820", title: "Reactor temp calibration query", priority: "MED", status: "IN REVIEW", agent: "Quality Agent" },
    { id: "TKT-4819", title: "PAS-X login issue for new hire", priority: "LOW", status: "AUTO-RESOLVED", agent: "Support Agent" },
    { id: "TKT-4818", title: "CAPA closure documentation", priority: "HIGH", status: "ESCALATED", agent: "SOP Agent" },
  ];
  const priorityColor: Record<string, string> = { HIGH: "rgba(255,100,80,0.7)", MED: "rgba(255,209,0,0.7)", LOW: "rgba(100,200,100,0.7)" };
  const statusBg: Record<string, string> = { "AUTO-RESOLVED": "rgba(100,200,100,0.1)", "IN REVIEW": "rgba(255,209,0,0.1)", "ESCALATED": "rgba(255,100,80,0.1)" };
  const statusColor: Record<string, string> = { "AUTO-RESOLVED": "rgba(100,200,100,0.8)", "IN REVIEW": "rgba(255,209,0,0.8)", "ESCALATED": "rgba(255,100,80,0.8)" };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "10px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "4px" }}>
        {[["68%", "Auto-resolved"], ["4", "Escalated"], ["1.2h", "Avg. time"]].map(([v, l]) => (
          <div key={l} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "8px", padding: "10px", textAlign: "center",
          }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "15px", fontWeight: 800, color: "#FFD100" }}>{v}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{l}</div>
          </div>
        ))}
      </div>
      {tickets.map(t => (
        <div key={t.id} style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "9px", padding: "12px 14px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{ width: "3px", height: "32px", borderRadius: "2px", background: priorityColor[t.priority], flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>{t.id}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</span>
            </div>
            <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", color: "rgba(255,209,0,0.45)" }}>{t.agent}</span>
          </div>
          <span style={{
            fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "1px",
            color: statusColor[t.status], background: statusBg[t.status],
            border: `1px solid ${statusColor[t.status].replace("0.8", "0.25")}`,
            borderRadius: "4px", padding: "3px 7px", flexShrink: 0,
          }}>{t.status}</span>
        </div>
      ))}
    </div>
  );
}

function ExecPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "12px" }}>
      <div style={{
        background: "rgba(255,209,0,0.04)", border: "1px solid rgba(255,209,0,0.15)",
        borderRadius: "10px", padding: "14px 16px",
      }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,209,0,0.55)", marginBottom: "8px" }}>EXECUTIVE BRIEF · WEEK 51</div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
          Operational knowledge queries increased <strong style={{ color: "#FFD100" }}>+34%</strong> this week. Ticket auto-resolution rate held at <strong style={{ color: "#FFD100" }}>68%</strong>. Two quality deviations surfaced by Quality Agent before escalation. Onboarding completion for 3 new engineers achieved in <strong style={{ color: "#FFD100" }}>4 days</strong>.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", flex: 1 }}>
        {[
          { label: "Knowledge queries", val: "+34%", sub: "vs. last week" },
          { label: "SOP lookups", val: "1,240", sub: "this week" },
          { label: "Avg. onboarding", val: "4 days", sub: "↓ from 18 days" },
          { label: "Risk signals", val: "2", sub: "early detection" },
        ].map(m => (
          <div key={m.label} style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "9px", padding: "14px",
          }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.3)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{m.label}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 800, color: "#FFD100", lineHeight: 1 }}>{m.val}</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "9px", padding: "12px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Full report ready for download</span>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: 600,
          color: "#FFD100", border: "1px solid rgba(255,209,0,0.3)",
          borderRadius: "5px", padding: "4px 10px",
        }}>Export PDF →</span>
      </div>
    </div>
  );
}

const PANEL_COMPONENTS: Record<string, JSX.Element> = {
  search: <KnowledgeSearch />,
  chat:   <AIChat />,
  ticket: <TicketPanel />,
  exec:   <ExecPanel />,
};

export default function ProductPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePanel, setActivePanel] = useState("search");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000",
        padding: "120px 0 140px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "1000px", height: "600px",
        background: "radial-gradient(ellipse, rgba(255,209,0,0.045) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(255,209,0,0.3)", borderRadius: "100px",
            padding: "6px 16px", marginBottom: "28px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFD100", boxShadow: "0 0 8px #FFD100" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "#FFD100" }}>PRODUCT PREVIEW</span>
          </div>
          <h2 style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "clamp(34px, 4.5vw, 54px)",
            fontWeight: 800, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 20px",
          }}>The platform, in action.</h2>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: "17px",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
            maxWidth: "540px", margin: "0 auto",
          }}>Four interfaces. One operational intelligence platform.</p>
        </div>

        {/* Dashboard shell */}
        <div style={{
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "18px",
          overflow: "hidden",
          background: "rgba(8,6,4,0.95)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.99)",
          transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
        }}>

          {/* Window chrome */}
          <div style={{
            padding: "12px 18px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["rgba(255,95,87,0.7)", "rgba(255,189,46,0.7)", "rgba(39,201,63,0.7)"].map((c, i) => (
                <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.04)",
              borderRadius: "5px", padding: "4px 12px",
              fontFamily: "'Courier New',monospace", fontSize: "10px",
              color: "rgba(255,255,255,0.25)", textAlign: "center",
            }}>app.sourlemon.ai / workspace</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 5px rgba(74,222,128,0.6)" }} />
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "1.5px", color: "rgba(74,222,128,0.6)" }}>LIVE</span>
            </div>
          </div>

          {/* App layout */}
          <div style={{ display: "flex", height: "520px" }} className="pp-app-layout">

            {/* Sidebar */}
            <div style={{
              width: "56px", borderRight: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.01)",
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "16px 0", gap: "4px", flexShrink: 0,
            }}
              className="pp-sidebar"
            >
              {/* Logo mark */}
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,209,0,0.15)", border: "1px solid rgba(255,209,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", fontWeight: 800, color: "#FFD100" }}>SL</span>
              </div>
              {SIDEBAR_ITEMS.map(item => (
                <div key={item.label} title={item.label} style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: item.active ? "rgba(255,209,0,0.12)" : "transparent",
                  border: item.active ? "1px solid rgba(255,209,0,0.25)" : "1px solid transparent",
                  cursor: "pointer",
                }}>
                  <span style={{ fontSize: "14px", color: item.active ? "#FFD100" : "rgba(255,255,255,0.25)" }}>{item.icon}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

              {/* Top bar */}
              <div style={{
                padding: "0 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: "4px", height: "44px", flexShrink: 0,
              }}>
                {PANELS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePanel(p.id)}
                    style={{
                      fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 500,
                      color: activePanel === p.id ? "#FFD100" : "rgba(255,255,255,0.35)",
                      background: activePanel === p.id ? "rgba(255,209,0,0.08)" : "transparent",
                      border: activePanel === p.id ? "1px solid rgba(255,209,0,0.2)" : "1px solid transparent",
                      borderRadius: "6px", padding: "4px 12px",
                      cursor: "pointer", transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: "5px",
                    }}
                  >
                    <span style={{ fontSize: "12px" }}>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>M</span>
                  </div>
                </div>
              </div>

              {/* Panel content */}
              <div style={{ flex: 1, padding: "18px 20px", overflow: "hidden" }}
                key={activePanel}
              >
                {PANEL_COMPONENTS[activePanel]}
              </div>
            </div>

            {/* Right context panel */}
            <div style={{
              width: "180px", borderLeft: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.01)", padding: "16px 14px",
              display: "flex", flexDirection: "column", gap: "16px", flexShrink: 0,
            }}
              className="pp-right-panel"
            >
              <div>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "2px", color: "rgba(255,255,255,0.2)", marginBottom: "10px" }}>ACTIVE AGENTS</div>
                {[
                  { name: "Knowledge", on: true },
                  { name: "SOP", on: true },
                  { name: "Quality", on: true },
                  { name: "Support", on: false },
                  { name: "Executive", on: false },
                ].map(a => (
                  <div key={a.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>{a.name}</span>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: a.on ? "#4ADE80" : "rgba(255,255,255,0.12)", boxShadow: a.on ? "0 0 4px rgba(74,222,128,0.5)" : "none" }} />
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "14px" }}>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "2px", color: "rgba(255,255,255,0.2)", marginBottom: "10px" }}>SYSTEM</div>
                {[["Queries", "1,240"], ["Resolved", "843"], ["Sources", "4,820"]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{l}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: 700, color: "#FFD100" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .pp-sidebar { display: none !important; }
          .pp-right-panel { display: none !important; }
          .pp-app-layout { height: 480px !important; }
        }
        @media (max-width: 560px) {
          .pp-app-layout { height: 420px !important; }
        }
      `}</style>
    </section>
  );
}
