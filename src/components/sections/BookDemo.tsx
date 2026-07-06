"use client";

import { useEffect, useRef, useState } from "react";

const TRUST_ITEMS = [
  { icon: "◈", label: "Response within 24 hours" },
  { icon: "◎", label: "No commitment required" },
  { icon: "◇", label: "Tailored to your environment" },
  { icon: "▣", label: "Live platform walkthrough" },
];

const COMPANY_SIZES = ["1–100", "100–500", "500–2,000", "2,000–10,000", "10,000+"];
const ROLES = ["CTO / CIO", "VP of Operations", "Head of Quality", "IT Director", "Digital Transformation Lead", "Plant Manager", "Other"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "13px 16px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, background 0.2s ease",
  appearance: "none" as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.5px",
  marginBottom: "7px",
  display: "block",
};

export default function BookDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", role: "", size: "", message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === field ? "rgba(255,209,0,0.5)" : "rgba(255,255,255,0.1)",
    background: focused === field ? "rgba(255,209,0,0.04)" : "rgba(255,255,255,0.04)",
    boxShadow: focused === field ? "0 0 0 3px rgba(255,209,0,0.06)" : "none",
  });

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
      {/* Glows */}
      <div style={{ position: "absolute", top: "-80px", right: "-100px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,209,0,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "-80px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,209,0,0.03) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "72px",
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
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "#FFD100" }}>REQUEST A DEMO</span>
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 800, color: "#fff",
            lineHeight: 1.08, letterSpacing: "-0.03em",
            margin: "0 0 20px",
          }}>
            See Sour Lemon<br />in your environment.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "17px", color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75, maxWidth: "560px", margin: "0 auto",
          }}>
            Book a live session tailored to your industry, stack, and operational context. We come prepared — not with generic slides.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.15fr",
          gap: "48px", alignItems: "start",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
        }}
          className="bd-layout"
        >

          {/* Left: value props */}
          <div>
            {/* What to expect */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", letterSpacing: "2.5px", color: "rgba(255,209,0,0.5)", marginBottom: "20px" }}>WHAT TO EXPECT</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  ["60 min", "Live platform walkthrough in your operational context"],
                  ["Custom", "Agent configuration scoped to your industry and data"],
                  ["Technical", "Integration discussion with your existing systems"],
                  ["Strategic", "ROI modeling based on your team size and use case"],
                ].map(([tag, desc]) => (
                  <div key={tag} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "9px", letterSpacing: "1.5px",
                      color: "#FFD100",
                      background: "rgba(255,209,0,0.1)",
                      border: "1px solid rgba(255,209,0,0.2)",
                      borderRadius: "4px", padding: "3px 8px",
                      flexShrink: 0, marginTop: "1px",
                      whiteSpace: "nowrap",
                    }}>{tag}</div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "24px",
              background: "rgba(255,255,255,0.015)",
              marginBottom: "24px",
            }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", letterSpacing: "2.5px", color: "rgba(255,255,255,0.2)", marginBottom: "18px" }}>ENTERPRISE READY</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {TRUST_ITEMS.map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "14px", color: "#FFD100", flexShrink: 0, marginTop: "1px" }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "14px 18px",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "10px",
              background: "rgba(74,222,128,0.04)",
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.6)", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "2px" }}>Response within 24 business hours</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Our enterprise team reviews every request personally.</div>
              </div>
            </div>

            {/* Security note */}
            <div style={{ marginTop: "20px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "1px" }}>◎</span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", lineHeight: 1.65, margin: 0 }}>
                Your information is handled under strict confidentiality. We do not share, sell, or use your data for marketing beyond this inquiry.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div style={{
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "20px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            position: "relative",
          }}>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "200px", height: "1px", background: "linear-gradient(90deg, rgba(255,209,0,0.5), transparent)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "120px", background: "linear-gradient(180deg, rgba(255,209,0,0.5), transparent)" }} />

            {submitted ? (
              <div style={{ padding: "64px 40px", textAlign: "center" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "rgba(255,209,0,0.1)", border: "1px solid rgba(255,209,0,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <span style={{ fontSize: "22px", color: "#FFD100" }}>✓</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Request received.</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
                  Our enterprise team will review your request and reach out within 24 business hours to schedule your personalized demo session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: "36px 36px 32px" }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", letterSpacing: "2.5px", color: "rgba(255,209,0,0.5)", marginBottom: "28px" }}>DEMO REQUEST FORM</div>

                {/* Row 1 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }} className="bd-form-row">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      required type="text" value={form.name} onChange={set("name")}
                      placeholder="Jane Smith"
                      style={focusStyle("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company *</label>
                    <input
                      required type="text" value={form.company} onChange={set("company")}
                      placeholder="ACME Corporation"
                      style={focusStyle("company")}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Business Email *</label>
                  <input
                    required type="email" value={form.email} onChange={set("email")}
                    placeholder="jane.smith@company.com"
                    style={focusStyle("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Row 3 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }} className="bd-form-row">
                  <div>
                    <label style={labelStyle}>Your Role *</label>
                    <select
                      required value={form.role} onChange={set("role")}
                      style={{ ...focusStyle("role"), cursor: "pointer" }}
                      onFocus={() => setFocused("role")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled style={{ background: "#111" }}>Select role</option>
                      {ROLES.map(r => <option key={r} value={r} style={{ background: "#111" }}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Company Size *</label>
                    <select
                      required value={form.size} onChange={set("size")}
                      style={{ ...focusStyle("size"), cursor: "pointer" }}
                      onFocus={() => setFocused("size")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled style={{ background: "#111" }}>Select size</option>
                      {COMPANY_SIZES.map(s => <option key={s} value={s} style={{ background: "#111" }}>{s} employees</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={labelStyle}>What are you looking to solve? <span style={{ color: "rgba(255,255,255,0.2)" }}>(optional)</span></label>
                  <textarea
                    value={form.message} onChange={set("message")}
                    placeholder="Describe your operational challenge, team size, or specific use case…"
                    rows={4}
                    style={{
                      ...focusStyle("message"),
                      resize: "vertical",
                      minHeight: "96px",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "15px 24px",
                    background: "#FFD100",
                    border: "none",
                    borderRadius: "10px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#000",
                    cursor: "pointer",
                    letterSpacing: "0.3px",
                    transition: "opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLButtonElement).style.opacity = "0.92";
                    (e.target as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(255,209,0,0.3)";
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLButtonElement).style.opacity = "1";
                    (e.target as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Request Demo →
                </button>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px", color: "rgba(255,255,255,0.2)",
                  textAlign: "center", margin: "14px 0 0", lineHeight: 1.6,
                }}>
                  By submitting you agree to our Privacy Policy. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #111; color: #fff; }
        @media (max-width: 860px) {
          .bd-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .bd-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
