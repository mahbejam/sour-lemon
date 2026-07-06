import Link from "next/link";

const INDUSTRIES = [
  {
    slug: "pharma",
    icon: "💊",
    title: "Pharma & Life Sciences",
    challenge: "Regulatory compliance at scale",
    result: "87% faster batch record review, GxP-validated AI from day one.",
  },
  {
    slug: "manufacturing",
    icon: "🏭",
    title: "GMP Manufacturing",
    challenge: "Process deviation prevention",
    result: "Predictive quality alerts 48 hours before deviations occur.",
  },
  {
    slug: "automotive",
    icon: "🚗",
    title: "Automotive",
    challenge: "Complex supply chain knowledge",
    result: "Cross-tier supplier intelligence with instant supplier risk assessment.",
  },
  {
    slug: "healthcare",
    icon: "🏥",
    title: "Healthcare",
    challenge: "Clinical operations complexity",
    result: "AI-assisted clinical documentation reducing administrative burden by 60%.",
  },
  {
    slug: "logistics",
    icon: "🚚",
    title: "Logistics & Supply Chain",
    challenge: "Real-time operational visibility",
    result: "Dynamic rerouting intelligence and predictive disruption management.",
  },
  {
    slug: "finance",
    icon: "🏦",
    title: "Financial Services",
    challenge: "Compliance and risk management",
    result: "Automated regulatory reporting with full audit trail and explainability.",
  },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#06060F]">
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,224,32,0.15) 50%, transparent 100%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-16">
          <div className="tag-label justify-center">Industries</div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-[-1.5px] text-[#EEEEF2] leading-tight mb-5">
            Built for regulated
            <br />
            <span className="text-[#505068]">industries.</span>
          </h2>
          <p className="text-[#8888A4] text-lg max-w-[500px] mx-auto">
            Domain-specific AI trained on the workflows, compliance requirements,
            and operational realities of your industry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/use-cases/${ind.slug}`}
              className="glass rounded-2xl p-6 card-hover group block"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{ind.icon}</span>
                <h3 className="text-[#EEEEF2] font-semibold text-sm">{ind.title}</h3>
              </div>
              <p className="text-[#505068] text-xs mb-3 leading-relaxed">{ind.challenge}</p>
              <p className="text-[#8888A4] text-xs leading-relaxed border-t border-white/[0.05] pt-3">
                {ind.result}
              </p>
              <div className="mt-4 text-[#F5E020] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explore use case →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
