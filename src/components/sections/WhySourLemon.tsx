"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  {
    title: "Selection Logic",
    text: "We do not give you faster answers. We give you better options. Selection Logic is the methodology behind every system we build — surfacing the full range of viable choices before committing to one.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="#FFD100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Knowledge Preservation",
    text: "Institutional knowledge retires, transfers, and disappears. Sour Lemon captures expertise, decisions, and operational history — making them permanently available, not dependent on who is still in the building.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#FFD100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Decision Infrastructure",
    text: "Knowledge management archives what you know. Decision infrastructure makes what you know available at the moment of deciding — structured, queryable, and directly connected to the choice in front of you.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#FFD100" strokeWidth="1.5"/>
        <path d="m21 21-4.35-4.35" stroke="#FFD100" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 8v3l2 2" stroke="#FFD100" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function WhySourLemon() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".wsl-reveal");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
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
      }}
    >
      {/* Subtle ambient glow */}
      <div style={{
        position: "absolute", top: "-200px", right: "-200px",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(255,209,0,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-150px", left: "-150px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(255,209,0,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Badge + Headline */}
        <div
          className="wsl-reveal"
          data-delay="0"
          style={{
            textAlign: "center", marginBottom: "72px",
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
              background: "#FFD100",
              boxShadow: "0 0 8px #FFD100",
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "2px", color: "#FFD100",
            }}>WHY SOUR LEMON</span>
          </div>

          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: "0 0 28px",
          }}>
            The knowledge was always there. Now it works.
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "17px", fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            maxWidth: "680px",
            margin: "0 auto",
          }}>
            Organizations do not fail because they lack information. They fail because they cannot use the information they already have.
            <br /><br />
            The knowledge exists — inside your SOPs, batch records, engineering decisions, and institutional memory. But it is fragmented, siloed, and retrievable only by people who already know where to look. Which means it is not really available at all.
            <br /><br />
            Sour Lemon was built to close that gap. Not by adding more intelligence to your organization — but by making the intelligence already inside it actually function.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "80px",
        }}>
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="wsl-reveal wsl-card"
              data-delay={String(i * 120)}
              style={{
                opacity: 0, transform: "translateY(32px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              <div style={{ padding: "6px" }}>
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "10px",
                  background: "rgba(255,209,0,0.08)",
                  border: "1px solid rgba(255,209,0,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  {card.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px", fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 12px",
                  letterSpacing: "-0.01em",
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px", fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Block */}
        <div
          className="wsl-reveal"
          data-delay="100"
          style={{
            opacity: 0, transform: "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            border: "1px solid rgba(255,209,0,0.12)",
            borderRadius: "20px",
            background: "rgba(255,209,0,0.03)",
            padding: "64px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "200px", height: "1px",
            background: "linear-gradient(90deg, #FFD100, transparent)",
          }} />
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "1px", height: "200px",
            background: "linear-gradient(180deg, #FFD100, transparent)",
          }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
            className="wsl-vision-grid"
          >
            <div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "2.5px", color: "#FFD100",
                marginBottom: "20px",
              }}>OUR VISION</div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "0 0 24px",
              }}>
                No critical decision should be made without the full depth of available intelligence behind it.
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                margin: 0,
              }}>
                The organizations that lead the next decade will not simply use AI tools — they will operate on top of a structured intelligence layer that makes every decision visible, justified, and traceable. Not faster. Better.
              </p>
            </div>

            <div style={{ paddingTop: "4px" }}>
              {[
                "Every decision informed by the full depth of organizational knowledge.",
                "Institutional expertise that survives turnover, restructuring, and time.",
                "Complexity that is structured, not endured.",
              ].map((line, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  marginBottom: i < 2 ? "20px" : 0,
                }}>
                  <div style={{
                    width: "20px", height: "20px", flexShrink: 0,
                    borderRadius: "50%",
                    background: "rgba(255,209,0,0.1)",
                    border: "1px solid rgba(255,209,0,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: "2px",
                  }}>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: "#FFD100",
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px", fontWeight: 500,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6,
                  }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div
          className="wsl-reveal"
          data-delay="0"
          style={{
            opacity: 0, transform: "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            textAlign: "center",
            marginTop: "72px",
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.35)",
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            &ldquo;The knowledge was always there. We built the infrastructure to make it work.&rdquo;
          </p>
        </div>

      </div>

      <style>{`
        .wsl-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px;
          transition: border-color 0.3s ease, background 0.3s ease,
                      opacity 0.65s ease, transform 0.65s ease;
        }
        .wsl-card:hover {
          border-color: rgba(255,209,0,0.2);
          background: rgba(255,209,0,0.04);
        }
        @media (max-width: 768px) {
          .wsl-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .wsl-vision-grid + div,
          section [style*="padding: 64px"] {
            padding: 36px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
