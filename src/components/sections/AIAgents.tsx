"use client";

import { useEffect, useRef, useState } from "react";

const AGENTS = [
  {
    id: "knowledge",
    code: "AGT-01",
    name: "Knowledge Agent",
    role: "Enterprise Intelligence",
    description: "Answers questions from across your organization's documents, procedures, and institutional knowledge — with full source citations.",
    capabilities: ["Document Q&A", "Source tracing", "Multi-source synthesis"],
    status: "ACTIVE",
  },
  {
    id: "sop",
    code: "AGT-02",
    name: "SOP Agent",
    role: "Compliance & Procedures",
    description: "Locates the exact procedure, revision, and compliance requirement relevant to any operational query — instantly and with audit trail.",
    capabilities: ["Procedure lookup", "Revision tracking", "Compliance check"],
    status: "ACTIVE",
  },
  {
    id: "support",
    code: "AGT-03",
    name: "Support Agent",
    role: "Ticket Resolution",
    description: "Resolves recurring support requests and internal tickets by matching them to documented solutions and routing unresolved cases.",
    capabilities: ["Ticket triage", "Auto-resolution", "Escalation routing"],
    status: "ACTIVE",
  },
  {
    id: "manufacturing",
    code: "AGT-04",
    name: "Manufacturing Agent",
    role: "Production Operations",
    description: "Assists production and operational teams with shift handovers, batch record queries, maintenance history, and process deviations.",
    capabilities: ["Batch intelligence", "Shift handover", "Deviation context"],
    status: "ACTIVE",
  },
  {
    id: "quality",
    code: "AGT-05",
    name: "Quality Agent",
    role: "Risk & Compliance",
    description: "Monitors operational data for compliance deviations, flags risk patterns, and surfaces relevant quality events before they escalate.",
    capabilities: ["Risk detection", "Deviation alerts", "Audit readiness"],
    status: "ACTIVE",
  },
  {
    id: "executive",
    code: "AGT-06",
    name: "Executive Agent",
    role: "Intelligence Reporting",
    description: "Synthesizes operational data, knowledge signals, and cross-department insights into structured summaries and decision-ready reports.",
    capabilities: ["Executive summaries", "Trend analysis", "Decision briefs"],
    status: "ACTIVE",
  },
];

const ICONS: Record<string, JSX.Element> = {
  knowledge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  sop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="9" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  manufacturing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  quality: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  executive: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function AIAgents() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
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
      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "-100px", left: "50%",
        transform: "translateX(-50%)",
        width: "900px", height: "500px",
        background: "radial-gradient(ellipse, rgba(255,209,0,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          alignItems: "flex-end", gap: "40px", marginBottom: "72px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
          className="aia-header-grid"
        >
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(255,209,0,0.3)",
              borderRadius: "100px", padding: "6px 16px", marginBottom: "28px",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#FFD100", boxShadow: "0 0 8px #FFD100",
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "2px", color: "#FFD100",
              }}>AI AGENTS</span>
            </div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(34px, 4.5vw, 54px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0,
            }}>
              Specialized agents.<br />One intelligent platform.
            </h2>
          </div>

          {/* Live indicator */}
          <div style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", padding: "16px 20px",
            textAlign: "center", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#4ADE80",
                boxShadow: "0 0 6px rgba(74,222,128,0.7)",
                animation: "aia-pulse 2s ease infinite",
              }} />
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "10px", letterSpacing: "2px", color: "rgba(74,222,128,0.8)",
              }}>6 AGENTS ONLINE</span>
            </div>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "9px", letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.25)",
            }}>ALL SYSTEMS OPERATIONAL</div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "17px", color: "rgba(255,255,255,0.5)",
          lineHeight: 1.75, maxWidth: "640px",
          marginBottom: "60px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          Each agent is purpose-built for a specific operational domain — trained on your systems, documents, and processes — and works autonomously or in collaboration with your teams.
        </p>

        {/* Agent cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
          className="aia-grid"
        >
          {AGENTS.map((agent, i) => {
            const isActive = activeCard === agent.id;
            return (
              <div
                key={agent.id}
                onMouseEnter={() => setActiveCard(agent.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  padding: "28px",
                  border: `1px solid ${isActive ? "rgba(255,209,0,0.3)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "16px",
                  background: isActive ? "rgba(255,209,0,0.04)" : "rgba(255,255,255,0.015)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isActive ? "0 12px 40px rgba(255,209,0,0.07)" : "none",
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${0.05 + i * 0.07}s`,
                }}
                className="aia-card-reveal"
              >
                {/* Top accent bar on hover */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: isActive
                    ? "linear-gradient(90deg, transparent, #FFD100, transparent)"
                    : "transparent",
                  transition: "background 0.3s ease",
                }} />

                {/* Agent code */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "20px",
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "10px", letterSpacing: "2.5px",
                    color: isActive ? "rgba(255,209,0,0.7)" : "rgba(255,255,255,0.2)",
                    transition: "color 0.3s ease",
                  }}>{agent.code}</span>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "5px",
                  }}>
                    <div style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: "#4ADE80",
                      boxShadow: isActive ? "0 0 5px rgba(74,222,128,0.7)" : "none",
                      transition: "box-shadow 0.3s ease",
                    }} />
                    <span style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "9px", letterSpacing: "1.5px",
                      color: "rgba(74,222,128,0.5)",
                    }}>{agent.status}</span>
                  </div>
                </div>

                {/* Icon */}
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "10px",
                  background: isActive ? "rgba(255,209,0,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isActive ? "rgba(255,209,0,0.25)" : "rgba(255,255,255,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isActive ? "#FFD100" : "rgba(255,255,255,0.4)",
                  marginBottom: "18px",
                  transition: "all 0.3s ease",
                }}>
                  {ICONS[agent.id]}
                </div>

                {/* Name + role */}
                <div style={{ marginBottom: "12px" }}>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "17px", fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                    margin: "0 0 4px",
                  }}>{agent.name}</h3>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px", fontWeight: 500,
                    color: isActive ? "rgba(255,209,0,0.65)" : "rgba(255,255,255,0.28)",
                    letterSpacing: "0.5px",
                    transition: "color 0.3s ease",
                  }}>{agent.role}</div>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px", fontWeight: 400,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7, margin: "0 0 20px",
                }}>{agent.description}</p>

                {/* Capabilities */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {agent.capabilities.map((cap) => (
                    <span key={cap} style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px", fontWeight: 500,
                      color: isActive ? "rgba(255,209,0,0.7)" : "rgba(255,255,255,0.3)",
                      background: isActive ? "rgba(255,209,0,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? "rgba(255,209,0,0.18)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: "5px", padding: "4px 10px",
                      transition: "all 0.3s ease",
                    }}>{cap}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div style={{
          marginTop: "56px",
          padding: "28px 36px",
          border: "1px solid rgba(255,209,0,0.12)",
          borderRadius: "14px",
          background: "rgba(255,209,0,0.02)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "20px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
        }}
          className="aia-strip"
        >
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px", fontWeight: 600,
              color: "#fff", marginBottom: "4px",
            }}>All agents work on your data. In your environment.</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", color: "rgba(255,255,255,0.4)",
            }}>No generic AI. No public model training. Full data sovereignty.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {["ISO 27001", "GMP Ready", "21 CFR Part 11"].map((badge) => (
              <span key={badge} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px", fontWeight: 600,
                color: "rgba(255,209,0,0.6)",
                border: "1px solid rgba(255,209,0,0.18)",
                borderRadius: "5px", padding: "5px 10px",
                letterSpacing: "0.3px",
              }}>{badge}</span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes aia-pulse {
          0%,100%{opacity:1;box-shadow:0 0 6px rgba(74,222,128,0.7)}
          50%{opacity:0.5;box-shadow:0 0 2px rgba(74,222,128,0.3)}
        }
        .aia-card-reveal {
          transition: border-color 0.3s ease, background 0.3s ease,
                      transform 0.3s ease, box-shadow 0.3s ease,
                      opacity 0.6s ease !important;
        }
        @media (max-width: 960px) {
          .aia-grid { grid-template-columns: repeat(2,1fr) !important; }
          .aia-header-grid { grid-template-columns: 1fr !important; }
          .aia-strip { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 560px) {
          .aia-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
