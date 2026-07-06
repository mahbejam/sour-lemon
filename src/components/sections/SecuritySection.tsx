const BADGES = [
  { icon: "🔒", label: "ISO 27001", desc: "Information Security" },
  { icon: "🇪🇺", label: "GDPR", desc: "Data Protection" },
  { icon: "🏥", label: "GxP Validated", desc: "Pharma & MedDev" },
  { icon: "🛡️", label: "SOC 2 Type II", desc: "Security Controls" },
  { icon: "☁️", label: "EU Cloud", desc: "Data Residency" },
  { icon: "🔍", label: "Full Audit Trail", desc: "Every AI action logged" },
];

export default function SecuritySection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-xl relative z-10">
        <div className="glass rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          {/* Inner glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(245,224,32,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="tag-label justify-center">Security & Compliance</div>
            <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-1.2px] text-[#EEEEF2] leading-tight mb-4">
              Enterprise-grade security.
              <br />
              <span
                style={{
                  background: "linear-gradient(125deg, #F5E020 0%, #FFD700 60%, #FFE840 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                No compromises.
              </span>
            </h2>
            <p className="text-[#8888A4] text-base max-w-[480px] mx-auto mb-12">
              Built from the ground up for regulated industries. Your data never leaves your
              designated region and every AI action is fully auditable.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center group hover:border-[rgba(245,224,32,0.2)] hover:bg-[rgba(245,224,32,0.04)] transition-all duration-200"
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <p className="text-[#EEEEF2] text-xs font-semibold mb-0.5">{badge.label}</p>
                  <p className="text-[#505068] text-[10px]">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
