const STEPS = [
  {
    num: "01",
    title: "Connect your data",
    description:
      "SOUR LEMON ingests your documents, ERP data, SOPs, and batch records through 40+ pre-built connectors. No custom integration work required.",
    detail: "SAP, Oracle, Microsoft 365, SharePoint, LIMS, MES, email, and more.",
  },
  {
    num: "02",
    title: "AI understands your operations",
    description:
      "Our domain-trained models build a semantic knowledge graph of your organization — understanding relationships, workflows, and institutional context.",
    detail: "GxP-aware, compliance-ready, role-based access by default.",
  },
  {
    num: "03",
    title: "Ask, automate, and predict",
    description:
      "Ask natural-language questions, trigger intelligent workflows, and receive predictive alerts — from a single interface your team actually uses.",
    detail: "No training required. Operational from day one.",
  },
];

export default function AICapabilities() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(100,80,220,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: steps */}
          <div>
            <div className="tag-label">How it works</div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-1.2px] text-[#EEEEF2] leading-tight mb-6">
              From raw data to
              <br />
              <span
                style={{
                  background: "linear-gradient(125deg, #F5E020 0%, #FFD700 60%, #FFE840 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                operational clarity.
              </span>
            </h2>
            <p className="text-[#8888A4] text-base leading-relaxed mb-10">
              Three steps to transform how your organization accesses, uses, and acts on knowledge.
            </p>

            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <div key={step.num} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[rgba(245,224,32,0.2)] bg-[rgba(245,224,32,0.06)] flex items-center justify-center text-[#F5E020] font-mono text-xs font-bold transition-all duration-300 group-hover:bg-[rgba(245,224,32,0.12)]">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-[#EEEEF2] font-semibold text-base mb-1.5">{step.title}</h3>
                    <p className="text-[#505068] text-sm leading-relaxed mb-2">{step.description}</p>
                    <p className="text-[#F5E020] text-xs font-medium opacity-70">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock UI panel */}
          <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
            {/* Panel top bar */}
            <div className="flex items-center gap-2 mb-5 pb-5 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="ml-4 flex-1 bg-white/[0.04] rounded-md h-6 px-3 flex items-center">
                <span className="text-[#505068] text-[11px] font-mono">sour-lemon.ai/dashboard</span>
              </div>
            </div>

            {/* Mock AI query */}
            <div className="mb-5 p-4 rounded-xl bg-[rgba(245,224,32,0.06)] border border-[rgba(245,224,32,0.1)]">
              <p className="text-xs text-[#505068] mb-2 font-mono">AI Knowledge Assistant</p>
              <p className="text-[#EEEEF2] text-sm">
                &quot;What is the maximum allowed deviation for in-process pH control in Batch B-2024-1103?&quot;
              </p>
            </div>

            {/* Mock answer */}
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/[0.06] mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-[#F5E020] font-mono font-semibold uppercase tracking-widest">Answer</span>
                <span className="text-[10px] text-[#505068] font-mono">· Source: SOP-QC-014, Rev. 7</span>
              </div>
              <p className="text-[#8888A4] text-sm leading-relaxed">
                Per SOP-QC-014 §4.2, in-process pH for this product must remain within{" "}
                <span className="text-[#EEEEF2] font-medium">6.8 ± 0.2</span>. Any deviation
                beyond ±0.3 requires immediate QA notification and batch investigation protocol.
              </p>
            </div>

            {/* Mock stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Sources checked", value: "1,247" },
                { label: "Response time", value: "0.4s" },
                { label: "Confidence", value: "99.1%" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-[#F5E020] font-bold text-lg mb-0.5">{s.value}</p>
                  <p className="text-[#505068] text-[11px]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Glow overlay */}
            <div
              className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(245,224,32,0.08) 0%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
