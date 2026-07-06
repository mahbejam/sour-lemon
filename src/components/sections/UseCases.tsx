"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  {
    number: "01",
    title: "Manufacturing Intelligence",
    text: "Connect production knowledge, maintenance history, SOPs and shift notes into a searchable operational layer.",
  },
  {
    number: "02",
    title: "Pharma & GMP Operations",
    text: "Support controlled processes, qualification workflows, deviation context and documentation-heavy environments.",
  },
  {
    number: "03",
    title: "Ticket & Support Automation",
    text: "Transform recurring support requests, internal tickets and knowledge base content into faster guided resolutions.",
  },
  {
    number: "04",
    title: "SOP & Document Intelligence",
    text: "Make procedures, manuals, policies and technical documentation searchable, explainable and actionable.",
  },
  {
    number: "05",
    title: "Process Discovery",
    text: "Identify hidden patterns, bottlenecks and repeated manual work across teams and systems.",
  },
  {
    number: "06",
    title: "AI Decision Support",
    text: "Give teams contextual recommendations based on documents, workflow history and operational knowledge.",
  },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".uc-reveal");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, Number(el.dataset.delay ?? 0));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "-100px", left: "50%",
        transform: "translateX(-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(255,209,0,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div
          className="uc-reveal"
          data-delay="0"
          style={{
            textAlign: "center",
            marginBottom: "80px",
            opacity: 0,
            transform: "translateY(28px)",
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
              background: "#FFD100",
              boxShadow: "0 0 8px #FFD100",
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "2px", color: "#FFD100",
            }}>USE CASES</span>
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
            AI for operations that cannot<br />afford guesswork.
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "17px", fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            maxWidth: "620px",
            margin: "0 auto",
          }}>
            Sour Lemon helps operational teams turn fragmented processes, documents and decisions into intelligent workflows that improve speed, visibility and execution quality.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "72px",
        }}
          className="uc-grid"
        >
          {CARDS.map((card, i) => (
            <div
              key={card.number}
              className="uc-reveal uc-cell"
              data-delay={String(i * 80)}
              style={{
                padding: "40px 36px",
                background: "#000",
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, background 0.25s ease",
              }}
            >
              <div style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2px",
                color: "rgba(255,209,0,0.5)",
                marginBottom: "20px",
              }}>
                {card.number}
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                margin: "0 0 14px",
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div
          className="uc-reveal"
          data-delay="0"
          style={{
            textAlign: "center",
            opacity: 0,
            transform: "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.02em",
            margin: 0,
          }}>
            Built for teams where precision, compliance and execution speed matter.
          </p>
        </div>

      </div>

      <style>{`
        .uc-cell:hover {
          background: rgba(255,209,0,0.03) !important;
        }
        @media (max-width: 900px) {
          .uc-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .uc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
