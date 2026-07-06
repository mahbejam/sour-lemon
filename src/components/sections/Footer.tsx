"use client";

const LINKS: { title: string; items: string[] }[] = [
  {
    title: "Platform",
    items: ["AI Agents", "Knowledge Intelligence", "Automation", "Analytics"],
  },
  {
    title: "Industries",
    items: ["Pharma", "Manufacturing", "Automotive", "Enterprise IT"],
  },
  {
    title: "Resources",
    items: ["Documentation", "Security", "Contact"],
  },
  {
    title: "Legal",
    items: ["Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "72px 0 0",
    }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "80px",
          paddingBottom: "56px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
          className="ft-top-grid"
        >
          {/* Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(255,209,0,0.12)",
                border: "1px solid rgba(255,209,0,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 800, color: "#FFD100" }}>SL</span>
              </div>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px", fontWeight: 800,
                color: "#fff", letterSpacing: "-0.02em",
              }}>SOUR LEMON</span>
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", color: "rgba(255,255,255,0.38)",
              lineHeight: 1.75, margin: "0 0 28px",
            }}>
              Decision intelligence for industries where wrong is not an option.
            </p>

            {/* Status pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "100px", padding: "5px 12px",
            }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#4ADE80", boxShadow: "0 0 5px rgba(74,222,128,0.6)",
              }} />
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "9px", letterSpacing: "2px",
                color: "rgba(74,222,128,0.7)",
              }}>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Link columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
          }}
            className="ft-links-grid"
          >
            {LINKS.map(col => (
              <div key={col.title}>
                <div style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "9px", letterSpacing: "2.5px",
                  color: "rgba(255,209,0,0.5)",
                  marginBottom: "18px",
                }}>{col.title.toUpperCase()}</div>
                {col.items.map(item => (
                  <div key={item} style={{ marginBottom: "11px" }}>
                    <a
                      href="#"
                      onClick={e => e.preventDefault()}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px", fontWeight: 400,
                        color: "rgba(255,255,255,0.38)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                    >
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          flexWrap: "wrap", gap: "12px",
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px", color: "rgba(255,255,255,0.2)",
          }}>
            © {new Date().getFullYear()} Sour Lemon. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {["ISO 27001", "GMP Ready", "21 CFR Part 11", "GDPR"].map(b => (
              <span key={b} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px", fontWeight: 500,
                color: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px", padding: "3px 8px",
              }}>{b}</span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .ft-top-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ft-links-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ft-links-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
