"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    let angle = 0;
    const tick = () => {
      angle += 0.004;
      const x = Math.sin(angle) * 8;
      const y = Math.cos(angle * 0.7) * 6;
      orb.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#04040C]">
      {/* Ambient glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245,224,32,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="absolute top-1/3 left-[15%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(100,80,200,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-1/2 right-[10%] w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(32,200,180,0.05) 0%, transparent 70%)",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-xl relative z-10 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgba(245,224,32,0.2)] bg-[rgba(245,224,32,0.06)] text-[#F5E020] text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5E020] animate-pulse" />
          Operational Intelligence Platform
        </div>

        {/* Floating orb */}
        <div ref={orbRef} className="relative mx-auto mb-12 w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
          <div
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,245,80,0.9) 0%, rgba(245,224,32,0.7) 30%, rgba(200,180,0,0.4) 60%, transparent 80%)",
              boxShadow:
                "0 0 60px rgba(245,224,32,0.35), 0 0 120px rgba(245,224,32,0.15), inset 0 0 40px rgba(255,255,200,0.2)",
            }}
          />
          {/* Orbital rings */}
          {[0.7, 0.85, 1].map((scale, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-[rgba(245,224,32,0.15)]"
              style={{
                transform: `scale(${scale + 0.25 * i})`,
                animation: `ringPulse ${3 + i * 0.8}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
          {/* Particle dots */}
          {[
            { top: "8%", left: "50%", delay: "0s" },
            { top: "50%", left: "92%", delay: "0.6s" },
            { top: "88%", left: "62%", delay: "1.2s" },
            { top: "65%", left: "5%", delay: "1.8s" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#F5E020]"
              style={{
                top: pos.top,
                left: pos.left,
                animation: `dotPulse 2s ease-in-out ${pos.delay} infinite`,
                boxShadow: "0 0 8px rgba(245,224,32,0.8)",
              }}
            />
          ))}
        </div>

        {/* Headline */}
        <h1
          className="text-[42px] sm:text-[56px] md:text-[72px] font-extrabold leading-[1.08] tracking-[-2px] text-[#EEEEF2] mb-6"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Complexity becomes
          <br />
          <span
            style={{
              background: "linear-gradient(125deg, #F5E020 0%, #FFD700 50%, #FFE840 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            intelligence.
          </span>
        </h1>

        <p className="max-w-[640px] mx-auto text-lg md:text-xl text-[#8888A4] leading-relaxed mb-12">
          SOUR LEMON transforms enterprise operations with AI — reducing onboarding time by 87%,
          automating critical workflows, and preserving institutional knowledge at scale.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="group inline-flex items-center px-8 py-4 rounded-xl bg-[#F5E020] text-[#04040C] font-bold text-base transition-all duration-300 hover:bg-[#FFE840] hover:shadow-[0_0_40px_rgba(245,224,32,0.5)] active:scale-[0.97]"
          >
            Book a Demo
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/platform"
            className="inline-flex items-center px-8 py-4 rounded-xl border border-white/[0.1] text-[#EEEEF2] font-medium text-base transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.03]"
          >
            Explore Platform
          </Link>
        </div>

        {/* Social proof bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#505068]">
          {[
            "ISO 27001 Certified",
            "GDPR Compliant",
            "SOC 2 Type II",
            "GxP Validated",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#F5E020] opacity-60" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #04040C)",
        }}
      />
    </section>
  );
}
