import Link from "next/link";
import { PLATFORM_MODULES } from "@/lib/constants";

const ICON_MAP: Record<string, string> = {
  Brain: "🧠",
  GitBranch: "🌿",
  Workflow: "⚡",
  Bot: "🤖",
  BarChart3: "📊",
  FileText: "📄",
  GraduationCap: "🎓",
  Users: "👥",
};

export default function PlatformOverview() {
  const featured = PLATFORM_MODULES.slice(0, 4);
  const rest = PLATFORM_MODULES.slice(4);

  return (
    <section className="section-padding relative overflow-hidden bg-[#04040C]">
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,224,32,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-16">
          <div className="tag-label justify-center">The Platform</div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-[-1.5px] text-[#EEEEF2] leading-tight mb-5">
            Eight modules.
            <br />
            <span
              style={{
                background: "linear-gradient(125deg, #F5E020 0%, #FFD700 60%, #FFE840 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One unified intelligence.
            </span>
          </h2>
          <p className="text-[#8888A4] text-lg max-w-[560px] mx-auto">
            A complete AI platform designed for regulated industries — from knowledge management
            to autonomous digital workers.
          </p>
        </div>

        {/* Featured 4 */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((module) => (
            <div
              key={module.id}
              className="glass rounded-2xl p-7 card-hover group cursor-pointer"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(245,224,32,0.08)] border border-[rgba(245,224,32,0.15)] flex items-center justify-center text-xl transition-all duration-300 group-hover:bg-[rgba(245,224,32,0.15)]">
                  {ICON_MAP[module.icon] || "✦"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#EEEEF2] font-semibold text-lg mb-1">{module.title}</h3>
                  <p className="text-[#F5E020] text-sm mb-3">{module.subtitle}</p>
                  <p className="text-[#505068] text-sm leading-relaxed mb-4 line-clamp-2">
                    {module.description}
                  </p>
                  <ul className="space-y-1.5">
                    {module.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#8888A4]">
                        <span className="text-[#F5E020] mt-0.5 flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining 4 as smaller cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {rest.map((module) => (
            <div
              key={module.id}
              className="glass rounded-xl p-5 card-hover group cursor-pointer"
            >
              <div className="text-2xl mb-3">{ICON_MAP[module.icon] || "✦"}</div>
              <h3 className="text-[#EEEEF2] font-semibold text-sm mb-1">{module.title}</h3>
              <p className="text-[#505068] text-xs leading-relaxed line-clamp-2">
                {module.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[rgba(245,224,32,0.25)] text-[#F5E020] font-semibold text-sm transition-all duration-300 hover:bg-[rgba(245,224,32,0.06)] hover:border-[rgba(245,224,32,0.4)]"
          >
            Explore full platform
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
