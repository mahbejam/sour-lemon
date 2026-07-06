"use client";

import { useEffect, useRef } from "react";

const INDUSTRIES = [
  {
    title: "Pharma & Life Sciences",
    description: "Navigate GMP compliance, deviation management, and clinical documentation with AI-guided precision.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Manufacturing",
    description: "Connect production systems, shift knowledge, and maintenance history into a single operational intelligence layer.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="#FFD100" strokeWidth="1.4"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="12" y1="12" x2="12" y2="16" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="10" y1="14" x2="14" y2="14" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Automotive",
    description: "Accelerate engineering change management, supplier documentation, and quality validation across complex supply chains.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="17" r="2" stroke="#FFD100" strokeWidth="1.4"/>
        <circle cx="19" cy="17" r="2" stroke="#FFD100" strokeWidth="1.4"/>
        <path d="M7 17H17M3 17H1v-4l2-6h14l2 6v4h-2" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 13h18" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Energy",
    description: "Manage asset documentation, regulatory compliance, and operational procedures across distributed infrastructure.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Engineering",
    description: "Structure technical knowledge, project documentation, and expert decisions into accessible, auditable intelligence.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Enterprise IT",
    description: "Reduce ticket resolution time, automate L1 support, and make internal knowledge instantly accessible at scale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#FFD100" strokeWidth="1.4"/>
        <path d="M8 21h8M12 17v4" stroke="#FFD100" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".ind-reveal");
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
      {/* Top-right ambient glow */}
      <div style={{
        position: "absolute", top: "-160px", right: "-160px",
        width: "560px", height: "560px",
        background: "radial-gradient(circle, rgba(255,209,0,0.055) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "end",
          marginBottom: "80px",
        }}
          className="ind-header-grid"
        >
          <div
            className="ind-reveal"
            data-delay="0"
            style={{
              opacity: 0, transform: "translateY(28px)",
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
              }}>INDUSTRIES</span>
            </div>

            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: 0,
            }}>
              Precision AI<br />for complex<br />industries.
            </h2>
          </div>

          <div
            className="ind-reveal"
            data-delay="120"
            style={{
              opacity: 0, transform: "translateY(28px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              paddingBottom: "6px",
            }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px", fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              margin: "0 0 32px",
            }}>
              Regulated, high-stakes industries operate under constraints that generic AI cannot accommodate. Sour Lemon is built specifically for environments where accuracy, traceability, and compliance are non-negotiable.
            </p>
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <div style={{
                width: "32px", height: "1px",
                background: "rgba(255,209,0,0.4)",
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px", fontWeight: 500,
                color: "rgba(255,209,0,0.6)",
                letterSpacing: "1.5px",
              }}>6 INDUSTRIES SERVED</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
          className="ind-grid"
        >
          {INDUSTRIES.map((item, i) => (
            <div
              key={item.title}
              className="ind-reveal ind-card"
              data-delay={String(i * 90)}
              style={{
                opacity: 0, transform: "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  width: "40px", height: "40px",
                  borderRadius: "10px",
                  background: "rgba(255,209,0,0.07)",
                  border: "1px solid rgba(255,209,0,0.14)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.icon}
                </div>
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px", fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.01em",
                margin: "0 0 10px",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", fontWeight: 400,
                color: "rgba(255,255,255,0.43)",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {item.description}
              </p>
              <div className="ind-card-line" />
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .ind-card {
          padding: 32px 28px 28px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          background: rgba(255,255,255,0.01);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s ease, background 0.3s ease,
                      transform 0.3s ease, opacity 0.6s ease;
        }
        .ind-card-line {
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #FFD100, rgba(255,209,0,0));
          border-radius: 0 2px 0 0;
          transition: width 0.4s ease;
        }
        .ind-card:hover {
          border-color: rgba(255,209,0,0.18);
          background: rgba(255,209,0,0.03);
          transform: translateY(-3px);
        }
        .ind-card:hover .ind-card-line {
          width: 100%;
        }
        @media (max-width: 900px) {
          .ind-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ind-header-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 560px) {
          .ind-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
