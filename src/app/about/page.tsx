"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    // Node definitions — fixed positions as ratio of canvas size
    const NODE_DEFS = [
      // Hub nodes (larger)
      { rx: 0.5,  ry: 0.48, r: 7,   hub: true  },
      { rx: 0.24, ry: 0.28, r: 5,   hub: true  },
      { rx: 0.76, ry: 0.28, r: 5,   hub: true  },
      { rx: 0.18, ry: 0.62, r: 5,   hub: true  },
      { rx: 0.82, ry: 0.62, r: 5,   hub: true  },
      { rx: 0.5,  ry: 0.82, r: 4.5, hub: true  },
      // Satellite nodes
      { rx: 0.36, ry: 0.18, r: 3,   hub: false },
      { rx: 0.64, ry: 0.18, r: 3,   hub: false },
      { rx: 0.10, ry: 0.42, r: 2.5, hub: false },
      { rx: 0.90, ry: 0.42, r: 2.5, hub: false },
      { rx: 0.12, ry: 0.78, r: 2.5, hub: false },
      { rx: 0.88, ry: 0.78, r: 2.5, hub: false },
      { rx: 0.38, ry: 0.92, r: 2.5, hub: false },
      { rx: 0.62, ry: 0.92, r: 2.5, hub: false },
      { rx: 0.50, ry: 0.12, r: 2.5, hub: false },
      { rx: 0.30, ry: 0.70, r: 2,   hub: false },
      { rx: 0.70, ry: 0.70, r: 2,   hub: false },
      { rx: 0.42, ry: 0.36, r: 2,   hub: false },
      { rx: 0.58, ry: 0.36, r: 2,   hub: false },
    ];

    // Edge pairs (indices into NODE_DEFS)
    const EDGES = [
      [0,1],[0,2],[0,3],[0,4],[0,5],
      [1,6],[1,7],[1,2],
      [2,7],[2,4],
      [3,8],[3,10],[3,1],
      [4,9],[4,11],[4,2],
      [5,12],[5,13],[5,3],[5,4],
      [6,14],[7,14],
      [1,15],[3,15],[0,15],
      [2,16],[4,16],[0,16],
      [0,17],[0,18],[1,17],[2,18],
    ];

    // Particles travelling along edges
    type Particle = { edge: number; t: number; speed: number; alpha: number };
    const particles: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        edge: Math.floor(Math.random() * EDGES.length),
        t: Math.random(),
        speed: 0.0008 + Math.random() * 0.0012,
        alpha: 0.4 + Math.random() * 0.6,
      });
    }

    // Pulse state per hub node
    const pulses = NODE_DEFS.map(() => ({ phase: Math.random() * Math.PI * 2 }));

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;  H = rect.height;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
    }

    function nodePos(def: typeof NODE_DEFS[0]) {
      return { x: def.rx * W, y: def.ry * H };
    }

    let clock = 0;
    function draw() {
      clock += 0.008;
      ctx!.clearRect(0, 0, W, H);

      // ── Ambient glow behind centre hub ──
      const hub = nodePos(NODE_DEFS[0]);
      const grd = ctx!.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, W * 0.38);
      grd.addColorStop(0, "rgba(255,209,0,0.06)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, W, H);

      // ── Edges ──
      for (const [ai, bi] of EDGES) {
        const a = nodePos(NODE_DEFS[ai]);
        const b = nodePos(NODE_DEFS[bi]);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.strokeStyle = "rgba(255,209,0,0.08)";
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      }

      // ── Particles ──
      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) { p.t = 0; p.edge = Math.floor(Math.random() * EDGES.length); }
        const [ai, bi] = EDGES[p.edge];
        const a = nodePos(NODE_DEFS[ai]);
        const b = nodePos(NODE_DEFS[bi]);
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,209,0,${p.alpha * fade * 0.9})`;
        ctx!.fill();
      }

      // ── Nodes ──
      for (let i = 0; i < NODE_DEFS.length; i++) {
        const def = NODE_DEFS[i];
        const { x, y } = nodePos(def);
        const pulse = Math.sin(clock * 1.2 + pulses[i].phase) * 0.3 + 0.7;

        if (def.hub) {
          // Outer glow ring
          const glowR = def.r * 3.5;
          const glowGrd = ctx!.createRadialGradient(x, y, def.r * 0.5, x, y, glowR);
          glowGrd.addColorStop(0, `rgba(255,209,0,${0.12 * pulse})`);
          glowGrd.addColorStop(1, "rgba(255,209,0,0)");
          ctx!.beginPath();
          ctx!.arc(x, y, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = glowGrd;
          ctx!.fill();

          // Ring
          ctx!.beginPath();
          ctx!.arc(x, y, def.r + 3, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(255,209,0,${0.2 * pulse})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }

        // Core dot
        const dotGrd = ctx!.createRadialGradient(x, y, 0, x, y, def.r);
        dotGrd.addColorStop(0, `rgba(255,235,100,${def.hub ? 1 : 0.9})`);
        dotGrd.addColorStop(1, `rgba(200,160,0,${def.hub ? 0.8 : 0.5})`);
        ctx!.beginPath();
        ctx!.arc(x, y, def.r * (def.hub ? pulse * 0.15 + 0.85 : 1), 0, Math.PI * 2);
        ctx!.fillStyle = dotGrd;
        ctx!.fill();
      }

      // ── Holographic rings around centre ──
      for (let r = 0; r < 3; r++) {
        const radius = W * (0.18 + r * 0.11);
        const alpha  = 0.04 - r * 0.01;
        ctx!.beginPath();
        ctx!.arc(hub.x, hub.y, radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(255,209,0,${alpha})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      // ── Corner label (enterprise terminal feel) ──
      ctx!.font = "600 9px 'Courier New', monospace";
      ctx!.fillStyle = "rgba(255,209,0,0.2)";
      ctx!.letterSpacing = "2px";
      ctx!.fillText("KNOWLEDGE GRAPH v2.4", 16, H - 16);

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0.92,
      }}
      aria-hidden="true"
    />
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".abt-reveal");
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
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const VALUES = [
  {
    label: "Precision over speed",
    body: "We do not optimize for fast answers. We optimize for better options — surfaced completely before a commitment is made.",
  },
  {
    label: "Auditability as a feature",
    body: "Every recommendation Sour Lemon makes is traceable. In regulated industries, a decision without a record is not a decision — it is a liability.",
  },
  {
    label: "Knowledge as infrastructure",
    body: "Institutional knowledge is not soft capital. It is the most fragile and valuable asset most organizations own. We treat it accordingly.",
  },
  {
    label: "Complexity is solvable",
    body: "Complexity is not a property of the problem. It is a property of the tools being used to address it. Better tools make hard things tractable.",
  },
];

export default function AboutPage() {
  const pageRef = useReveal();

  return (
    <>
      <Navbar />

      <main
        ref={pageRef}
        style={{ background: "#000", minHeight: "100vh", paddingTop: "100px" }}
      >

        {/* ── Hero ── */}
        <section style={{ padding: "60px 0 100px", position: "relative", overflow: "hidden" }}>
          {/* subtle left glow */}
          <div style={{
            position: "absolute", top: "0", left: "-200px",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(255,209,0,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
            <div className="abt-hero-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
              minHeight: "460px",
            }}>

              {/* Left — text */}
              <div
                className="abt-reveal"
                data-delay="0"
                style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  border: "1px solid rgba(255,209,0,0.3)", borderRadius: "100px",
                  padding: "6px 16px", marginBottom: "32px",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#FFD100", boxShadow: "0 0 8px #FFD100",
                  }} />
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "11px",
                    fontWeight: 600, letterSpacing: "2px", color: "#FFD100",
                  }}>ABOUT SOUR LEMON</span>
                </div>

                <h1 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(42px, 5vw, 72px)",
                  fontWeight: 800, color: "#fff",
                  lineHeight: 1.05, letterSpacing: "-0.04em",
                  margin: "0 0 32px",
                }}>
                  The knowledge was<br />always there.
                </h1>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "19px", fontWeight: 400,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
                  maxWidth: "480px", margin: 0,
                }}>
                  We built the infrastructure to make it work.
                </p>
              </div>

              {/* Right — animated knowledge graph */}
              <div
                className="abt-reveal abt-hero-visual"
                data-delay="200"
                style={{
                  opacity: 0, transform: "translateY(28px)",
                  transition: "opacity 0.9s ease, transform 0.9s ease",
                  position: "relative",
                  height: "460px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,209,0,0.07)",
                  background: "rgba(255,209,0,0.015)",
                }}
              >
                {/* corner accents */}
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "60px", height: "1px",
                  background: "linear-gradient(90deg, #FFD100, transparent)",
                  zIndex: 2,
                }} />
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "1px", height: "60px",
                  background: "linear-gradient(180deg, #FFD100, transparent)",
                  zIndex: 2,
                }} />
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "60px", height: "1px",
                  background: "linear-gradient(270deg, #FFD100, transparent)",
                  zIndex: 2,
                }} />
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "1px", height: "60px",
                  background: "linear-gradient(0deg, #FFD100, transparent)",
                  zIndex: 2,
                }} />

                {/* top-right status chip */}
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,209,0,0.15)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  zIndex: 3,
                }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "#FFD100", boxShadow: "0 0 6px #FFD100",
                    animation: "abt-pulse 2s ease-in-out infinite",
                  }} />
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px", letterSpacing: "1.5px",
                    color: "rgba(255,209,0,0.6)",
                  }}>LIVE</span>
                </div>

                <HeroVisual />
              </div>

            </div>
          </div>
        </section>

        {/* ── Brand Story ── */}
        <section style={{ padding: "0 0 120px" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
              className="abt-two-col">

              <div
                className="abt-reveal"
                data-delay="0"
                style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
              >
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "11px",
                  fontWeight: 600, letterSpacing: "2.5px",
                  color: "rgba(255,209,0,0.6)", marginBottom: "24px",
                }}>OUR STORY</div>

                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 800, color: "#fff",
                  lineHeight: 1.15, letterSpacing: "-0.02em",
                  margin: "0 0 32px",
                }}>
                  Why we exist.
                </h2>

                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px", color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                }}>
                  <p style={{ margin: "0 0 20px" }}>
                    Every organization we have ever worked with had the same problem. Not a lack of data. Not a shortage of talented people. A structural inability to use what they already knew — at the moment it mattered most.
                  </p>
                  <p style={{ margin: "0 0 20px" }}>
                    A regulatory submission delayed because the relevant precedent existed somewhere in a legacy system no one could query. A quality deviation that repeated itself because the corrective action from three years ago had retired with the engineer who wrote it. A new employee making a decision in week two that a ten-year veteran would have made differently — because that decade of context was simply unavailable.
                  </p>
                  <p style={{ margin: 0 }}>
                    Sour Lemon was built to solve that problem. Not by replacing human judgment — but by ensuring that judgment is always informed by the full depth of available intelligence. The knowledge was always there. We built the infrastructure to make it work.
                  </p>
                </div>
              </div>

              <div
                className="abt-reveal"
                data-delay="150"
                style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
              >
                {/* Mission */}
                <div style={{
                  border: "1px solid rgba(255,209,0,0.12)",
                  borderRadius: "16px",
                  background: "rgba(255,209,0,0.03)",
                  padding: "36px",
                  marginBottom: "24px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, width: "120px", height: "1px",
                    background: "linear-gradient(90deg, #FFD100, transparent)",
                  }} />
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "10px",
                    fontWeight: 600, letterSpacing: "2.5px",
                    color: "rgba(255,209,0,0.5)", marginBottom: "14px",
                  }}>MISSION</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "17px", fontWeight: 600,
                    color: "#fff", lineHeight: 1.5, margin: 0,
                    letterSpacing: "-0.01em",
                  }}>
                    To make institutional knowledge permanently available — structured, queryable, and directly connected to the decisions that depend on it.
                  </p>
                </div>

                {/* Vision */}
                <div style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.02)",
                  padding: "36px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "10px",
                    fontWeight: 600, letterSpacing: "2.5px",
                    color: "rgba(255,255,255,0.25)", marginBottom: "14px",
                  }}>VISION</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "17px", fontWeight: 600,
                    color: "rgba(255,255,255,0.8)", lineHeight: 1.5, margin: 0,
                    letterSpacing: "-0.01em",
                  }}>
                    A world where no critical decision is made without the full depth of available intelligence behind it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Selection Logic ── */}
        <section style={{
          padding: "100px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", bottom: "-200px", left: "-100px",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(255,209,0,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
            <div
              className="abt-reveal"
              data-delay="0"
              style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease", marginBottom: "64px" }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: "11px",
                fontWeight: 600, letterSpacing: "2.5px",
                color: "rgba(255,209,0,0.6)", marginBottom: "20px",
              }}>OUR METHODOLOGY</div>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800, color: "#fff",
                lineHeight: 1.1, letterSpacing: "-0.03em",
                margin: "0 0 24px", maxWidth: "700px",
              }}>
                Selection Logic.
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px", color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75, maxWidth: "640px", margin: 0,
              }}>
                Most AI tools are built to give you an answer faster. Selection Logic is built on a different premise: that the quality of a decision depends on the quality of the options considered — not the speed at which one is chosen.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}
              className="abt-three-col">
              {[
                {
                  n: "01",
                  title: "Collapse is the problem.",
                  body: "Organizations under pressure collapse complexity the moment it arrives. They take the first viable option rather than identifying the best one. The result is not a wrong decision — it is an incomplete one. Made without the full picture.",
                },
                {
                  n: "02",
                  title: "Surface the range.",
                  body: "Selection Logic surfaces the full range of viable choices before committing to one. It draws on institutional knowledge, historical decisions, regulatory precedent, and operational data — so the person deciding actually sees their options.",
                },
                {
                  n: "03",
                  title: "Infrastructure, not assistance.",
                  body: "This is not a chatbot. It is decision infrastructure — a structured layer beneath every consequential choice, ensuring that what the organization already knows is never absent from the moment it is needed most.",
                },
              ].map((item, i) => (
                <div
                  key={item.n}
                  className="abt-reveal abt-sl-card"
                  data-delay={String(i * 120)}
                  style={{
                    opacity: 0, transform: "translateY(24px)",
                    transition: "opacity 0.65s ease, transform 0.65s ease",
                    padding: "40px 36px",
                    borderLeft: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "11px", color: "#FFD100",
                    letterSpacing: "2px", marginBottom: "20px",
                  }}>{item.n}</div>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "18px", fontWeight: 700,
                    color: "#fff", lineHeight: 1.3,
                    letterSpacing: "-0.01em", margin: "0 0 16px",
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.75, margin: 0,
                  }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section style={{ padding: "100px 0" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
            <div
              className="abt-reveal"
              data-delay="0"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", marginBottom: "56px" }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: "11px",
                fontWeight: 600, letterSpacing: "2.5px",
                color: "rgba(255,209,0,0.6)", marginBottom: "20px",
              }}>WHAT WE BELIEVE</div>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(30px, 3.5vw, 46px)",
                fontWeight: 800, color: "#fff",
                lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0,
              }}>Core values.</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}
              className="abt-two-col-sm">
              {VALUES.map((v, i) => (
                <div
                  key={v.label}
                  className="abt-reveal abt-val-card"
                  data-delay={String(i * 80)}
                  style={{
                    opacity: 0, transform: "translateY(24px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                    padding: "36px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px", fontWeight: 700,
                    color: "#FFD100", margin: "0 0 12px",
                    letterSpacing: "-0.01em",
                  }}>{v.label}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.75, margin: 0,
                  }}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          padding: "80px 0 120px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
            <div
              className="abt-reveal"
              data-delay="0"
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
            >
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 800, color: "#fff",
                lineHeight: 1.2, letterSpacing: "-0.02em",
                margin: "0 0 16px",
              }}>
                See what better decisions look like.
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px", color: "rgba(255,255,255,0.4)",
                margin: "0 0 40px",
              }}>
                Request a demo and we will show you Selection Logic in your environment.
              </p>
              <Link
                href="/#book-demo"
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "14px 32px",
                  background: "#FFD100", color: "#000",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px", fontWeight: 700,
                  borderRadius: "10px", textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 28px rgba(255,209,0,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes abt-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #FFD100; }
          50%       { opacity: 0.4; box-shadow: 0 0 2px #FFD100; }
        }
        @media (max-width: 900px) {
          .abt-hero-grid  { grid-template-columns: 1fr !important; }
          .abt-hero-visual { height: 320px !important; }
          .abt-two-col    { grid-template-columns: 1fr !important; gap: 48px !important; }
          .abt-three-col  { grid-template-columns: 1fr !important; }
          .abt-sl-card    { border-left: 1px solid rgba(255,255,255,0.08) !important; }
        }
        @media (max-width: 640px) {
          .abt-hero-visual { height: 260px !important; }
          .abt-two-col-sm  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
