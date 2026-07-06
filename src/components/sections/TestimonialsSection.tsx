const TESTIMONIALS = [
  {
    quote:
      "SOUR LEMON reduced our batch release review time from 4 days to under 6 hours. The AI understands GxP context better than we expected — it cites the right SOPs every time.",
    name: "Dr. Martina Richter",
    role: "VP Quality Operations",
    company: "European Pharma Group",
    industry: "Pharma",
  },
  {
    quote:
      "Onboarding new engineers used to take 4 months in our GMP plant. With SOUR LEMON, they're fully productive in 3 weeks. The knowledge assistant just works.",
    name: "Klaus Hoffmann",
    role: "Head of Manufacturing Excellence",
    company: "Precision Automotive GmbH",
    industry: "Automotive",
  },
  {
    quote:
      "We were skeptical about AI in a regulated environment. SOUR LEMON addressed every compliance concern upfront — the audit trail and explainability are exactly what our QA team needed.",
    name: "Sarah Chen",
    role: "Chief Compliance Officer",
    company: "MedTech Solutions AG",
    industry: "Healthcare",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#06060F] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-16">
          <div className="tag-label justify-center">Testimonials</div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-[-1.5px] text-[#EEEEF2] leading-tight">
            Trusted by operations
            <br />
            <span className="text-[#505068]">leaders across Europe.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-7 flex flex-col card-hover cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-[#F5E020] text-sm">★</span>
                ))}
              </div>

              <blockquote className="text-[#8888A4] text-sm leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-[rgba(245,224,32,0.1)] flex items-center justify-center text-[#F5E020] font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[#EEEEF2] text-sm font-semibold">{t.name}</p>
                  <p className="text-[#505068] text-xs">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
