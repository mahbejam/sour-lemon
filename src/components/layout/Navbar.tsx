"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[rgba(4,4,12,0.85)] backdrop-blur-[24px] border-b border-white/[0.06] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
              <line x1="32" y1="32" x2="12" y2="14" stroke="#F5E020" strokeWidth=".8" opacity=".5"/>
              <line x1="32" y1="32" x2="52" y2="14" stroke="#F5E020" strokeWidth=".8" opacity=".5"/>
              <line x1="32" y1="32" x2="6"  y2="36" stroke="#F5E020" strokeWidth=".8" opacity=".5"/>
              <line x1="32" y1="32" x2="58" y2="36" stroke="#F5E020" strokeWidth=".8" opacity=".5"/>
              <line x1="32" y1="32" x2="20" y2="56" stroke="#F5E020" strokeWidth=".8" opacity=".5"/>
              <line x1="32" y1="32" x2="44" y2="56" stroke="#F5E020" strokeWidth=".8" opacity=".5"/>
              <circle cx="12" cy="14" r="3"   fill="#F5E020" opacity=".6"/>
              <circle cx="52" cy="14" r="3"   fill="#F5E020" opacity=".6"/>
              <circle cx="6"  cy="36" r="2.5" fill="#F5E020" opacity=".5"/>
              <circle cx="58" cy="36" r="2.5" fill="#F5E020" opacity=".5"/>
              <circle cx="20" cy="56" r="2.5" fill="#F5E020" opacity=".5"/>
              <circle cx="44" cy="56" r="2.5" fill="#F5E020" opacity=".5"/>
              <circle cx="32" cy="32" r="15"  fill="#020208" stroke="#F5E020" strokeWidth="1.5"/>
              <text x="32" y="37" textAnchor="middle" fontFamily="'Segoe UI',Arial,sans-serif" fontWeight="800" fontSize="14" fill="#F5E020" letterSpacing="-0.5">SL</text>
            </svg>
            <span className="font-bold text-[15px] tracking-tight text-[#EEEEF2]">
              SOUR LEMON
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "text-[#F5E020] bg-[rgba(245,224,32,0.08)]"
                      : "text-[#8888A4] hover:text-[#EEEEF2] hover:bg-white/[0.05]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#book-demo"
              className="px-4 py-2 text-sm font-medium text-[#8888A4] hover:text-[#EEEEF2] transition-colors duration-200"
            >
              Talk to us
            </Link>
            <Link
              href="#book-demo"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#F5E020] text-[#04040C] transition-all duration-300 hover:bg-[#FFE840] hover:shadow-[0_0_24px_rgba(245,224,32,0.4)] active:scale-[0.97]"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-5 h-0.5 bg-[#EEEEF2] transition-all duration-300 origin-center",
                mobileOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-[#EEEEF2] transition-all duration-300",
                mobileOpen && "opacity-0 scale-x-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-[#EEEEF2] transition-all duration-300 origin-center",
                mobileOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-400",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-[#04040C]/90 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[280px] bg-[#06060F] border-l border-white/[0.06] p-8 flex flex-col transition-transform duration-400",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mt-16 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium transition-all",
                  pathname === link.href
                    ? "text-[#F5E020] bg-[rgba(245,224,32,0.08)]"
                    : "text-[#8888A4] hover:text-[#EEEEF2] hover:bg-white/[0.04]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="#book-demo"
              className="w-full text-center px-5 py-3 rounded-xl border border-white/[0.1] text-sm font-medium text-[#EEEEF2] hover:border-white/[0.2] transition-colors"
            >
              Talk to us
            </Link>
            <Link
              href="#book-demo"
              className="w-full text-center px-5 py-3 rounded-xl bg-[#F5E020] text-[#04040C] text-sm font-bold hover:bg-[#FFE840] transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
