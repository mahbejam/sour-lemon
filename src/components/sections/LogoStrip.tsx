const LOGOS = [
  "Bayer",
  "Roche",
  "BASF",
  "Bosch",
  "Siemens",
  "Volkswagen",
  "DHL",
  "Deutsche Bank",
  "Merck",
  "Henkel",
];

export default function LogoStrip() {
  return (
    <section className="py-10 border-y border-white/[0.05] overflow-hidden">
      <p className="text-center text-[11px] tracking-widest text-[#505068] uppercase font-medium mb-8">
        Trusted by enterprise teams across Europe
      </p>
      <div className="relative flex gap-16 items-center">
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-16 items-center shrink-0"
            style={{
              animation: "logoScroll 28s linear infinite",
              animationDelay: copy === 1 ? "-14s" : "0s",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any}
          >
            {LOGOS.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap text-[#505068] text-sm font-semibold tracking-wider hover:text-[#8888A4] transition-colors duration-200 cursor-default select-none"
              >
                {name.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
