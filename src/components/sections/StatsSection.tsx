import { STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,224,32,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-12">
          <div className="tag-label justify-center">Results</div>
          <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-[-1.2px] text-[#EEEEF2]">
            Measured impact.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-yellow rounded-2xl p-7 text-center group card-hover cursor-default"
            >
              <div className="mb-3">
                <span
                  className="text-[48px] md:text-[56px] font-black leading-none tabular-nums"
                  style={{
                    background: "linear-gradient(125deg, #F5E020 0%, #FFD700 60%, #FFE840 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </span>
              </div>
              <p className="text-[#8888A4] text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
