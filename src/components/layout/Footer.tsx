import Link from "next/link";
import { SITE, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#04040C]">
      {/* Main grid */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-[#F5E020] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(245,224,32,0.45)]">
                <span className="text-[#04040C] font-black text-sm leading-none">SL</span>
              </div>
              <span className="font-bold text-[15px] tracking-tight text-[#EEEEF2]">
                SOUR LEMON
              </span>
            </Link>
            <p className="text-[#505068] text-sm leading-relaxed max-w-[220px] mb-6">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3">
              {["LinkedIn", "X", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-[#505068] hover:text-[#EEEEF2] hover:border-white/[0.2] transition-all duration-200 text-[10px] font-mono"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(Object.entries(FOOTER_LINKS) as [string, readonly { label: string; href: string }[]][]).map(
            ([category, links]) => (
              <div key={category} className="col-span-1">
                <h4 className="text-[11px] font-semibold tracking-widest text-[#505068] uppercase mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#505068] hover:text-[#EEEEF2] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#505068] text-xs">
            © {year} SOUR LEMON GmbH. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[#505068] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
