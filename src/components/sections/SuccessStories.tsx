"use client";

import { useEffect, useRef, useState } from "react";

const STORIES = [
  {
    id: "pharma",
    sector: "PHARMA & LIFE SCIENCES",
    org: "Global Pharma Company",
    size: "12,000+ employees · 8 manufacturing sites",
    challenge: "SOP retrieval required navigating legacy document systems across 8 sites. New hires spent 4–5 months before reaching independent operational competency. Compliance readiness audits required weeks of manual preparation.",
    outcome: "Sour Lemon indexed 14,000+ SOPs, batch records, and deviation reports across all sites. Knowledge Agent deployed to all production and QA teams within 6 weeks.",
    metrics: [
      { value: "60%", label: "Faster SOP retrieval" },
      { value: "45%", label: "Reduction in training time" },
      { value: "3 weeks", label: "Audit prep, down from 6 weeks" },
    ],
    quote: "Our QA team can now answer regulatory queries in real time during inspections. That confidence alone justified the investment.",
    quoteRole: "Head of Quality Assurance",
    tag: "GMP · Compliance · Onboarding",
  },
  {
    id: "manufacturing",
    sector: "INDUSTRIAL MANUFACTURING",
    org: "Manufacturing Enterprise",
    size: "5,500 employees · 3 production facilities",
    challenge: "Tribal knowledge was concentrated in a small group of senior engineers. Shift handovers were inconsistent. Production delays caused by knowledge gaps cost an estimated €2.1M annually.",
    outcome: "Manufacturing Agent trained on shift notes, maintenance logs, and engineering decisions spanning 9 years of operational history. Knowledge made available to all production staff instantly.",
    metrics: [
      { value: "50%", label: "Faster issue resolution" },
      { value: "9 years", label: "Operational knowledge indexed" },
      { value: "€1.4M", label: "Estimated annual savings" },
    ],
    quote: "We stopped losing critical knowledge when experienced engineers retired or moved teams. That institutional memory is now part of the platform.",
    quoteRole: "VP of Manufacturing Operations",
    tag: "Knowledge Retention · MES · Shift Intelligence",
  },
  {
    id: "enterprise-it",
    sector: "ENTERPRISE IT",
    org: "Enterprise IT Department",
    size: "2,200 IT staff · global enterprise",
    challenge: "L1 support was overwhelmed by recurring, documentable requests. Ticket backlog averaged 1,200+ open items. Onboarding new IT staff took 6–8 weeks due to fragmented internal knowledge.",
    outcome: "Support Agent deployed across the helpdesk and internal knowledge base. Ticket triage automated for 68% of incoming requests. New staff reached productive output in under 2 weeks.",
    metrics: [
      { value: "24/7", label: "AI-powered support coverage" },
      { value: "68%", label: "Tickets auto-resolved" },
      { value: "2 weeks", label: "New hire time-to-productivity" },
    ],
    quote: "We eliminated our L1 backlog without increasing headcount. The platform handles what used to take a team of 12.",
    quoteRole: "Director of IT Operations",
    tag: "Support Automation · Ticket Intelligence · Onboarding",
  },
];

export default function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const story = STORIES[active];

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
        position: "absolute", top: "20%", left: "-180px",
        width: "560px", height: "560px",
        background: "radial-gradient(circle, rgba(255,209,0,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          marginBottom: "64px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(255,209,0,0.3)", borderRadius: "100px",
            padding: "6px 16px", marginBottom: "28px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFD100", boxShadow: "0 0 8px #FFD100" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "#FFD100" }}>SUCCESS STORIES</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(34px, 4.5vw, 54px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0,
            }}>
              Results from the field.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", color: "rgba(255,255,255,0.3)",
              fontStyle: "italic", margin: 0, maxWidth: "320px", textAlign: "right",
              lineHeight: 1.6,
            }}>
              The following are illustrative scenarios based on typical enterprise deployments. They represent expected outcomes, not specific customer data.
            </p>
          </div>
        </div>

        {/* Selector tabs */}
        <div style={{
          display: "flex", gap: "8px", marginBottom: "32px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.1s",
        }}>
          {STORIES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px", fontWeight: 500,
                color: active === i ? "#000" : "rgba(255,255,255,0.45)",
                background: active === i ? "#FFD100" : "rgba(255,255,255,0.04)",
                border: active === i ? "1px solid #FFD100" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", padding: "8px 16px",
                cursor: "pointer", transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
            >
              {s.sector.split(" ")[0]} {s.sector.split(" ")[1] ?? ""}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div
          key={active}
          style={{
            border: "1px solid rgba(255,209,0,0.14)",
            borderRadius: "20px",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            position: "relative",
          }}
        >
          {/* Corner accent */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "240px", height: "1px", background: "linear-gradient(90deg, #FFD100, transparent)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "180px", background: "linear-gradient(180deg, #FFD100, transparent)" }} />

          {/* Card header */}
          <div style={{
            padding: "32px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,209,0,0.025)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
          }}>
            <div>
              <div style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "9px", letterSpacing: "2.5px",
                color: "rgba(255,209,0,0.55)", marginBottom: "8px",
              }}>{story.sector}</div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "22px", fontWeight: 800,
                color: "#fff", letterSpacing: "-0.02em", margin: "0 0 4px",
              }}>{story.org}</h3>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px", color: "rgba(255,255,255,0.35)",
              }}>{story.size}</div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {story.tag.split(" · ").map(t => (
                <span key={t} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px", fontWeight: 500,
                  color: "rgba(255,209,0,0.6)",
                  background: "rgba(255,209,0,0.08)",
                  border: "1px solid rgba(255,209,0,0.18)",
                  borderRadius: "5px", padding: "4px 10px",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            background: "rgba(255,255,255,0.01)",
          }}
            className="ss-body-grid"
          >
            {/* Before / After */}
            <div style={{ padding: "36px 40px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ marginBottom: "28px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  marginBottom: "12px",
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "rgba(255,100,80,0.6)" }} />
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,100,80,0.7)" }}>BEFORE</span>
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px", color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.75, margin: 0,
                }}>{story.challenge}</p>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "28px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  marginBottom: "12px",
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "rgba(100,220,100,0.6)" }} />
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", letterSpacing: "2px", color: "rgba(100,220,100,0.7)" }}>AFTER</span>
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px", color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.75, margin: 0,
                }}>{story.outcome}</p>
              </div>
            </div>

            {/* Metrics + Quote */}
            <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", gap: "24px" }}>

              {/* Metric cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {story.metrics.map((m, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center",
                    gap: "16px", padding: "14px 18px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                  }}>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "26px", fontWeight: 800,
                      color: "#FFD100", letterSpacing: "-0.03em",
                      lineHeight: 1, flexShrink: 0, minWidth: "80px",
                    }}>{m.value}</div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.4,
                    }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{
                padding: "20px 22px",
                background: "rgba(255,209,0,0.04)",
                border: "1px solid rgba(255,209,0,0.12)",
                borderRadius: "12px",
                position: "relative",
              }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "32px", fontWeight: 800,
                  color: "rgba(255,209,0,0.2)",
                  lineHeight: 0.6, marginBottom: "10px",
                }}>"</div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px", color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.7, margin: "0 0 12px",
                  fontStyle: "italic",
                }}>{story.quote}</p>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px", color: "rgba(255,255,255,0.3)",
                  fontStyle: "normal",
                }}>— {story.quoteRole} · Illustrative scenario</div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div style={{
            padding: "20px 40px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? "24px" : "6px",
                  height: "6px", borderRadius: "3px",
                  background: active === i ? "#FFD100" : "rgba(255,255,255,0.15)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "9px", letterSpacing: "2px",
              color: "rgba(255,255,255,0.2)", marginLeft: "8px",
            }}>{active + 1} / {STORIES.length}</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .ss-body-grid { grid-template-columns: 1fr !important; }
          .ss-body-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
        }
      `}</style>
    </section>
  );
}
