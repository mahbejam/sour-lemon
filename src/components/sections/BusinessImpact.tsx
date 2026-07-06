"use client";

import { useEffect, useRef, useState } from "react";

const KPIS = [
  {
    value: 60, suffix: "%", label: "Faster Knowledge Retrieval",
    detail: "Teams locate the exact procedure, document, or expert answer in seconds — not hours of searching across systems.",
    category: "EFFICIENCY",
  },
  {
    value: 45, suffix: "%", label: "Faster Ticket Resolution",
    detail: "Support and operational tickets matched to documented solutions automatically, reducing manual handling time.",
    category: "OPERATIONS",
  },
  {
    value: 70, suffix: "%", label: "Reduction in Knowledge Loss",
    detail: "Institutional expertise, processes, and decisions are captured and preserved — regardless of team turnover.",
    category: "RISK",
  },
  {
    value: 35, suffix: "%", label: "Faster SOP Discovery",
    detail: "Compliance teams and operators find the correct procedure version and deviation context in a single query.",
    category: "COMPLIANCE",
  },
  {
    value: 50, suffix: "%", label: "Less Time Preparing Reports",
    detail: "Executive summaries, KPI briefs, and operational insights generated automatically from live organizational data.",
    category: "LEADERSHIP",
  },
  {
    value: 24, suffix: "/7", label: "AI Operational Support",
    detail: "Every agent operates continuously — no downtime, no shifts, no bottlenecks. Intelligence available around the clock.",
    category: "AVAILABILITY",
  },
];

const CATEGORY_COLOR: Record<string, string> = {
  EFFICIENCY: "rgba(255,209,0,0.7)",
  OPERATIONS: "rgba(180,255,180,0.7)",
  RISK:       "rgba(255,140,100,0.7)",
  COMPLIANCE: "rgba(140,180,255,0.7)",
  LEADERSHIP: "rgba(255,209,0,0.7)",
  AVAILABILITY: "rgba(180,255,180,0.7)",
};

function useCountUp(target: number, duration: number, active: boolean) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return current;
}

function KPICard({ kpi, index, visible }: { kpi: typeof KPIS[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [counting, setCounting] = useState(false);
  const count = useCountUp(kpi.value, 1400 + index * 100, counting);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setCounting(true), index * 120);
      return () => clearTimeout(t);
    }
  }, [visible, index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px",
        border: `1px solid ${hovered ? "rgba(255,209,0,0.28)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        background: hovered ? "rgba(255,209,0,0.035)" : "rgba(255,255,255,0.015)",
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(24px)",
        boxShadow: hovered ? "0 16px 48px rgba(255,209,0,0.07)" : "none",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.06}s` : "0s",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: hovered
          ? "linear-gradient(90deg, transparent, rgba(255,209,0,0.6), transparent)"
          : "transparent",
        transition: "background 0.3s",
      }} />

      {/* Category badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "9px", letterSpacing: "2.5px",
          color: CATEGORY_COLOR[kpi.category],
          background: `${CATEGORY_COLOR[kpi.category].replace("0.7", "0.08")}`,
          border: `1px solid ${CATEGORY_COLOR[kpi.category].replace("0.7", "0.2")}`,
          borderRadius: "4px", padding: "3px 8px",
        }}>{kpi.category}</span>
      </div>

      {/* Metric */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", lineHeight: 1 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(44px, 5vw, 56px)",
            fontWeight: 800,
            color: "#FFD100",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            transition: "text-shadow 0.3s",
            textShadow: hovered ? "0 0 40px rgba(255,209,0,0.35)" : "none",
          }}>{count}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "28px", fontWeight: 700,
            color: "rgba(255,209,0,0.6)",
            letterSpacing: "-0.02em",
            paddingBottom: "6px",
          }}>{kpi.suffix}</span>
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px", fontWeight: 600,
          color: hovered ? "#fff" : "rgba(255,255,255,0.75)",
          letterSpacing: "-0.01em",
          marginTop: "8px",
          transition: "color 0.3s",
        }}>{kpi.label}</div>
      </div>

      {/* Detail */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: hovered ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)",
        lineHeight: 1.7, margin: 0,
        transition: "color 0.3s",
      }}>{kpi.detail}</p>
    </div>
  );
}

export default function BusinessImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
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
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "30%", right: "-200px",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(255,209,0,0.045) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-150px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(255,209,0,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "64px", alignItems: "end",
          marginBottom: "80px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
          className="bi-header-grid"
        >
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(255,209,0,0.3)", borderRadius: "100px",
              padding: "6px 16px", marginBottom: "28px",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFD100", boxShadow: "0 0 8px #FFD100" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "#FFD100" }}>BUSINESS IMPACT</span>
            </div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(36px, 4.5vw, 54px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0,
            }}>
              Measurable outcomes.<br />From day one.
            </h2>
          </div>
          <div style={{ paddingBottom: "4px" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px", color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75, margin: "0 0 28px",
            }}>
              Organizations deploying Sour Lemon see operational results within the first quarter — not after multi-year transformation programs.
            </p>
            <div style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "16px 20px",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ width: "3px", height: "36px", background: "linear-gradient(180deg, #FFD100, rgba(255,209,0,0.2))", borderRadius: "2px", flexShrink: 0 }} />
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px", color: "rgba(255,255,255,0.5)",
                lineHeight: 1.65, margin: 0, fontStyle: "italic",
              }}>
                "The ROI was visible within 6 weeks of deployment. We reduced onboarding time from 5 months to 3 weeks."
                <span style={{ display: "block", marginTop: "6px", color: "rgba(255,255,255,0.3)", fontStyle: "normal", fontSize: "11px" }}>— Head of Operations, Global Pharma Company</span>
              </p>
            </div>
          </div>
        </div>

        {/* KPI grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "56px",
        }}
          className="bi-grid"
        >
          {KPIS.map((kpi, i) => (
            <KPICard key={kpi.label} kpi={kpi} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom ROI strip */}
        <div style={{
          padding: "36px 40px",
          border: "1px solid rgba(255,209,0,0.14)",
          borderRadius: "16px",
          background: "rgba(255,209,0,0.025)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "40px",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
          position: "relative", overflow: "hidden",
        }}
          className="bi-roi-strip"
        >
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "180px", height: "1px",
            background: "linear-gradient(90deg, #FFD100, transparent)",
          }} />
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "1px", height: "80px",
            background: "linear-gradient(180deg, #FFD100, transparent)",
          }} />

          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px", fontWeight: 700,
              color: "#fff", marginBottom: "8px", letterSpacing: "-0.01em",
            }}>
              The cost of fragmented knowledge is measurable.
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7, margin: 0, maxWidth: "560px",
            }}>
              Enterprise organizations lose an average of 20–30% of productive capacity to knowledge friction — time spent searching, re-learning, re-documenting, and re-escalating. Sour Lemon converts that loss into measurable operational output.
            </p>
          </div>

          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "48px", fontWeight: 800,
              color: "#FFD100", letterSpacing: "-0.04em",
              lineHeight: 1, marginBottom: "4px",
              textShadow: "0 0 40px rgba(255,209,0,0.25)",
            }}>30%</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px", color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.5px",
            }}>avg. productivity recovered</div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .bi-grid { grid-template-columns: repeat(2,1fr) !important; }
          .bi-header-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bi-roi-strip { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .bi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
