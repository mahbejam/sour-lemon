import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(245,224,32,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center max-w-[700px] mx-auto">
          <div className="tag-label justify-center mb-6">Get Started</div>

          <h2 className="text-[40px] md:text-[60px] font-extrabold tracking-[-2px] text-[#EEEEF2] leading-[1.05] mb-6">
            Ready to transform
            <br />
            <span
              style={{
                background: "linear-gradient(125deg, #F5E020 0%, #FFD700 50%, #FFE840 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              your operations?
            </span>
          </h2>

          <p className="text-[#8888A4] text-lg leading-relaxed mb-10">
            Join hundreds of enterprises already using SOUR LEMON to reduce complexity,
            preserve knowledge, and accelerate their teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/contact"
              className="group inline-flex items-center px-10 py-4 rounded-xl bg-[#F5E020] text-[#04040C] font-bold text-base transition-all duration-300 hover:bg-[#FFE840] hover:shadow-[0_0_50px_rgba(245,224,32,0.55)] active:scale-[0.97]"
            >
              Book a Demo
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-4 rounded-xl border border-white/[0.1] text-[#EEEEF2] font-medium text-base transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.03]"
            >
              View pricing
            </Link>
          </div>

          <p className="text-[#505068] text-sm">
            No credit card required · Enterprise deployment in 4 weeks · Dedicated success team
          </p>
        </div>
      </div>

      {/* Pulsing rings decoration */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 pointer-events-none">
        {[200, 350, 500].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[rgba(245,224,32,0.06)] -translate-x-1/2 -translate-y-1/2"
            style={{
              width: size,
              height: size,
              animation: `ringPulse ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
