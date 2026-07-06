"use client";

import { useEffect, useRef, useState } from "react";

const LAYERS = [
  {
    id: "sources",
    label: "DATA SOURCES",
    title: "Fragmented Enterprise Data",
    color: "rgba(255,255,255,0.12)",
    accent: "rgba(255,255,255,0.35)",
    items: ["SOPs", "PDFs", "Emails", "Tickets", "MES", "ERP", "SharePoint", "Databases"],
    layout: "pills",
  },
  {
    id: "knowledge",
    label: "KNOWLEDGE LAYER",
    title: "Structured Knowledge Graph",
    color: "rgba(255,209,0,0.08)",
    accent: "#FFD100",
    items: ["Structured Knowledge Graph", "Semantic Search", "Context Retrieval"],
    layout: "blocks",
  },
  {
    id: "reasoning",
    label: "AI REASONING ENGINE",
    title: "Intelligent Processing",
    color: "rgba(255,209,0,0.13)",
    accent: "#FFD100",
    items: ["Agents", "Decision Support", "Process Understanding"],
    layout: "blocks",
  },
  {
    id: "intelligence",
    label: "OPERATIONAL INTELLIGENCE",
    title: "Insights & Signals",
    color: "rgba(255,209,0,0.08)",
    accent: "#FFD100",
    items: ["Recommendations", "Insights", "Risk Detection", "Automation"],
    layout: "blocks",
  },
  {
    id: "actions",
    label: "ACTIONS & DECISIONS",
    title: "Measurable Outcomes",
    color: "rgba(255,209,0,0.05)",
    accent: "rgba(255,209,0,0.7)",
    items: ["Create Ticket", "Trigger Workflow", "Generate Report", "Notify Teams"],
    layout: "pills",
  },
];

export default function PlatformArchitecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [flowStep, setFlowStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % (LAYERS.length + 1);
      setFlowStep(step);
    }, 900);
    return () => clearInterval(interval);
  }, [visible]);

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
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,209,0,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,209,0,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
      }} />

      {/* Center glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(255,209,0,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div
          style={{
            textAlign: "center", marginBottom: "80px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(255,209,0,0.3)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "28px",
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#FFD100", boxShadow: "0 0 8px #FFD100",
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "2px", color: "#FFD100",
            }}>PLATFORM ARCHITECTURE</span>
          </div>

          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(34px, 4.5vw, 54px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
          }}>
            From fragmented data<br />to operational intelligence.
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "17px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            maxWidth: "580px",
            margin: "0 auto",
          }}>
            Five layers that transform disconnected enterprise knowledge into structured, queryable, and actionable intelligence — in real time.
          </p>
        </div>

        {/* Flow diagram */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
          position: "relative",
        }}>
          {LAYERS.map((layer, i) => {
            const isActive = activeLayer === i;
            const isFlowing = flowStep === i + 1;
            const isPassed = flowStep > i + 1 || (flowStep === 0 && visible);

            return (
              <div key={layer.id}>
                {/* Layer card */}
                <div
                  onMouseEnter={() => setActiveLayer(i)}
                  onMouseLeave={() => setActiveLayer(null)}
                  style={{
                    border: `1px solid ${isActive ? "rgba(255,209,0,0.35)" : isFlowing ? "rgba(255,209,0,0.25)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "16px",
                    padding: "28px 36px",
                    background: isActive
                      ? "rgba(255,209,0,0.05)"
                      : isFlowing
                      ? "rgba(255,209,0,0.03)"
                      : "rgba(255,255,255,0.01)",
                    cursor: "default",
                    transition: "all 0.35s ease",
                    position: "relative",
                    overflow: "hidden",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${0.1 + i * 0.1}s`,
                    boxShadow: isFlowing
                      ? "0 0 30px rgba(255,209,0,0.06)"
                      : isActive
                      ? "0 0 40px rgba(255,209,0,0.08)"
                      : "none",
                  }}
                >
                  {/* Active left bar */}
                  <div style={{
                    position: "absolute", left: 0, top: "20%", bottom: "20%",
                    width: "2px",
                    background: isActive || isFlowing ? "#FFD100" : "transparent",
                    borderRadius: "0 2px 2px 0",
                    boxShadow: isActive || isFlowing ? "0 0 10px #FFD100" : "none",
                    transition: "all 0.3s ease",
                  }} />

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "220px 1fr",
                    gap: "40px",
                    alignItems: "center",
                  }}
                    className="pa-row-grid"
                  >
                    {/* Left: label + title */}
                    <div>
                      <div style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "2.5px",
                        color: isActive || isFlowing ? "#FFD100" : "rgba(255,209,0,0.4)",
                        marginBottom: "8px",
                        transition: "color 0.3s ease",
                      }}>
                        {layer.label}
                      </div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: isActive || isFlowing ? "#fff" : "rgba(255,255,255,0.6)",
                        letterSpacing: "-0.01em",
                        transition: "color 0.3s ease",
                      }}>
                        {layer.title}
                      </div>
                    </div>

                    {/* Right: items */}
                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      alignItems: "center",
                    }}>
                      {layer.items.map((item) => (
                        <div
                          key={item}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: isActive || isFlowing
                              ? (i === 0 || i === 4 ? "rgba(255,255,255,0.75)" : "#FFD100")
                              : "rgba(255,255,255,0.35)",
                            background: isActive || isFlowing
                              ? (i === 0 || i === 4 ? "rgba(255,255,255,0.07)" : "rgba(255,209,0,0.1)")
                              : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isActive || isFlowing
                              ? (i === 0 || i === 4 ? "rgba(255,255,255,0.15)" : "rgba(255,209,0,0.25)")
                              : "rgba(255,255,255,0.07)"}`,
                            borderRadius: "6px",
                            padding: "5px 12px",
                            letterSpacing: "0.01em",
                            transition: "all 0.3s ease",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector arrow between layers */}
                {i < LAYERS.length - 1 && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0",
                    height: "44px",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    <div style={{
                      width: "1px",
                      height: "24px",
                      background: flowStep > i + 1
                        ? "linear-gradient(180deg, rgba(255,209,0,0.6), rgba(255,209,0,0.2))"
                        : "rgba(255,255,255,0.1)",
                      transition: "background 0.4s ease",
                      position: "relative",
                    }}>
                      {/* Traveling dot */}
                      {flowStep === i + 1 && (
                        <div style={{
                          position: "absolute",
                          top: 0, left: "50%",
                          transform: "translateX(-50%)",
                          width: "5px", height: "5px",
                          borderRadius: "50%",
                          background: "#FFD100",
                          boxShadow: "0 0 8px #FFD100",
                          animation: "pa-dot-travel 0.9s linear forwards",
                        }} />
                      )}
                    </div>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginTop: "-1px" }}>
                      <path d="M1 1l4 4 4-4" stroke={flowStep > i + 1 ? "rgba(255,209,0,0.5)" : "rgba(255,255,255,0.15)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }}/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom stat strip */}
        <div style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
        }}
          className="pa-stats-grid"
        >
          {[
            { val: "<2s", label: "End-to-end query response" },
            { val: "100%", label: "Traceable to source document" },
            { val: "40+", label: "Enterprise system connectors" },
          ].map((s) => (
            <div key={s.val} style={{
              background: "#000",
              padding: "28px 32px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "28px", fontWeight: 800,
                color: "#FFD100",
                letterSpacing: "-0.03em",
                marginBottom: "6px",
              }}>{s.val}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 400,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes pa-dot-travel {
          from { top: 0; opacity: 1; }
          to   { top: 100%; opacity: 0; }
        }
        @media (max-width: 720px) {
          .pa-row-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .pa-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
