const PROBLEMS = [
  {
    icon: "📂",
    title: "Knowledge trapped in silos",
    description:
      "Critical SOPs, batch records, and expert know-how live in disconnected systems. When employees leave, knowledge disappears with them.",
  },
  {
    icon: "⏳",
    title: "Onboarding takes months",
    description:
      "New hires spend 3–6 months navigating outdated documents, tribal knowledge, and manual training — before they become productive.",
  },
  {
    icon: "🔄",
    title: "Manual processes don't scale",
    description:
      "Repetitive operational tasks consume expert capacity. Compliance workflows, report generation, and approvals pile up without automation.",
  },
  {
    icon: "🚨",
    title: "Zero real-time visibility",
    description:
      "Operations managers lack live insight into process health, deviations, and risk — reacting to problems instead of preventing them.",
  },
];

export default function ProblemSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,50,50,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-16">
          <div className="tag-label justify-center">The Problem</div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-[-1.5px] text-[#EEEEF2] leading-tight mb-5">
            Enterprise operations are
            <br />
            <span className="text-[#505068]">drowning in complexity.</span>
          </h2>
          <p className="text-[#8888A4] text-lg max-w-[540px] mx-auto">
            The average regulated enterprise has 12,000+ documents, 5+ disconnected systems,
            and loses €3.2M annually to preventable knowledge gaps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              className="glass rounded-2xl p-6 card-hover cursor-default"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-[#EEEEF2] font-semibold text-base mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-[#505068] text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
