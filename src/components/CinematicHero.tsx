"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Platform",   href: "/#platform" },
  { label: "Use Cases",  href: "/#use-cases" },
  { label: "About",      href: "/about" },
  { label: "Pricing",    href: "/#impact" },
  { label: "Contact",    href: "/#book-demo" },
];

function scrollToSection(event: ReactMouseEvent<HTMLAnchorElement>, href: string, closeMenu?: () => void) {
  if (!href.includes("#")) return;
  event.preventDefault();
  closeMenu?.();
  const id = href.slice(href.indexOf("#") + 1);
  window.history.pushState(null, "", `#${id}`);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CinematicHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyRef     = useRef<HTMLDivElement>(null);
  const etxtRef   = useRef<HTMLSpanElement>(null);
  const h1Ref     = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const mctaRef   = useRef<HTMLAnchorElement>(null);
  const snameRef  = useRef<HTMLSpanElement>(null);
  const dotsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const cv  = canvasRef.current!;
    const ctx = cv.getContext("2d")!;

    function resize() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    function CW() { return window.innerWidth; }
    function CH() { return window.innerHeight; }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
    function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
    function smoothstep(a: number, b: number, x: number) {
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    }

    // ── STARS ──────────────────────────────────────────────────────
    const STARS: { x: number; y: number; r: number; a: number }[] = [];
    for (let si = 0; si < 600; si++) {
      STARS.push({
        x: ((si * 421 + 17) % 997) / 997,
        y: ((si * 631 + 53) % 991) / 991,
        r: si % 9 === 0 ? 0.9 : si % 3 === 0 ? 0.5 : 0.28,
        a: 0.025 + ((si * 97) % 100) / 1000 * 0.11,
      });
    }

    // ── LEMON IMAGE ───────────────────────────────────────────────
    const LEMON_C = document.createElement("canvas");
    LEMON_C.width = LEMON_C.height = 700;
    const LEMON_CTX = LEMON_C.getContext("2d")!;
    let LEMON_READY = false;

    (() => {
      const img = new Image();
      img.onload = () => {
        const sz = 700;
        const scale = Math.min(sz / img.width, sz / img.height) * 0.88;
        const sw = img.width * scale, sh = img.height * scale;
        const ox = (sz - sw) / 2, oy = (sz - sh) / 2 + sz * 0.02;
        LEMON_CTX.drawImage(img, ox, oy, sw, sh);
        const d = LEMON_CTX.getImageData(0, 0, sz, sz);
        const px = d.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i], g = px[i + 1], b = px[i + 2];
          if (r > 180 && g > 180 && b > 180) {
            const v = (r + g + b) / 3;
            px[i + 3] = (v > 220) ? 0 : Math.max(0, ((255 - v) * 3)) | 0;
          }
        }
        LEMON_CTX.putImageData(d, 0, 0);
        LEMON_READY = true;
      };
      img.src = new URL("lemon.jpg", window.location.href).toString();
    })();

    // ── PARTICLES ─────────────────────────────────────────────────
    const PARTS: { nx: number; ny: number; tx: number; ty: number; col: string; size: number }[] = [];
    let PARTS_BUILT = false;
    function buildParticles() {
      if (PARTS_BUILT || !LEMON_READY) return;
      PARTS_BUILT = true;
      const g = LEMON_C.getContext("2d")!;
      const d = g.getImageData(0, 0, 700, 700).data;
      let count = 0, tries = 0;
      while (count < 350 && tries < 20000) {
        tries++;
        const xi = Math.floor(Math.random() * 700);
        const yi = Math.floor(Math.random() * 700);
        const idx = (yi * 700 + xi) * 4;
        if (d[idx + 3] < 60) continue;
        const pr = d[idx], pg = d[idx + 1], pb = d[idx + 2];
        if (pr < 120) continue;
        const nx = (xi / 700) - 0.5, ny = (yi / 700) - 0.5;
        const angle = Math.random() * Math.PI * 2;
        const dist = 0.8 + Math.random() * 1.4;
        PARTS.push({
          nx, ny,
          tx: Math.sin(angle) * dist * 0.5,
          ty: Math.cos(angle) * dist * 0.5,
          col: `rgba(${pr},${pg},${pb},`,
          size: 0.8 + Math.random() * 2.2,
        });
        count++;
      }
    }

    // ── GLOBE DATA ────────────────────────────────────────────────
    const HUBS = [
      { lat: 51.5, lon: 0 }, { lat: 40.7, lon: -74 },
      { lat: 35.7, lon: 140 }, { lat: 37.8, lon: -122 },
      { lat: 1.3, lon: 104 }, { lat: 48.9, lon: 2.3 },
      { lat: 22.3, lon: 114 }, { lat: -33.9, lon: 151 },
      { lat: 55.7, lon: 37.6 }, { lat: 28.6, lon: 77.2 },
    ];
    const SEC_NODES: { lat: number; lon: number }[] = [];
    for (let ni = 0; ni < 30; ni++) {
      const sphi = Math.acos(1 - 2 * (ni + 0.5) / 30);
      const sth  = Math.PI * (1 + Math.sqrt(5)) * ni;
      SEC_NODES.push({ lat: 90 - sphi * 180 / Math.PI, lon: sth * 180 / Math.PI % 360 - 180 });
    }
    const FLOWS: { a: number; b: number; t: number; sp: number; rev: boolean }[] = [];
    for (let fi = 0; fi < 25; fi++) {
      const fa = fi % HUBS.length;
      const fb = (fi + 2 + Math.floor(fi / 4)) % HUBS.length;
      FLOWS.push({ a: fa, b: fb, t: Math.random(), sp: 0.003 + Math.random() * 0.005, rev: fi % 2 === 0 });
    }

    function project(lat: number, lon: number, pcx: number, pcy: number, R: number, rotY: number, rotX: number) {
      const phi = (90 - lat) * Math.PI / 180, theta = lon * Math.PI / 180 + rotY;
      const x3 = Math.sin(phi) * Math.cos(theta) * R;
      const y3 = Math.cos(phi) * R;
      const z3 = Math.sin(phi) * Math.sin(theta) * R;
      const y3r = y3 * Math.cos(rotX) - z3 * Math.sin(rotX);
      const z3r = y3 * Math.sin(rotX) + z3 * Math.cos(rotX);
      return { x: pcx + x3, y: pcy - y3r, z: z3r, vis: z3r > -R * 0.05 };
    }

    // ── STAGE DATA ────────────────────────────────────────────────
    const SD = [
      { n: "STAGE 01", e: "DECISION INTELLIGENCE PLATFORM",      h: "Your organization<br/>knows the <em>answer.</em>",  s: "The problem is that the answer is distributed across thousands of documents, systems, and people. Sour Lemon makes what you already know usable — at the moment a decision must be made.", c: "See it in action" },
      { n: "STAGE 02", e: "SELECTION LOGIC METHODOLOGY",         h: "Better decisions<br/>start <em>before</em> the decision.", s: "Most organizations collapse complexity the moment it arrives — taking the first viable option rather than identifying the best one. We surface the full range of choices.", c: "Explore the method" },
      { n: "STAGE 03", e: "KNOWLEDGE INFRASTRUCTURE",            h: "Not faster answers.<br/><em>Better options.</em>",  s: "Sour Lemon transforms institutional knowledge into a structured intelligence layer — permanently available, instantly queryable, fully auditable.",                               c: "See the architecture" },
      { n: "STAGE 04", e: "INTELLIGENCE LAYER ONLINE",           h: "Operational intelligence<br/>for industries where<br/><em>wrong is not an option.</em>", s: "Built for environments where precision is mandatory, compliance is non-negotiable, and the cost of a wrong decision is measurable.", c: "Request a demo" },
    ];

    let currentPhase = -1;
    let phaseTimer: ReturnType<typeof setTimeout> | null = null;

    function setPhase(n: number) {
      if (n === currentPhase) return;
      currentPhase = n;
      const p = SD[n];
      if (phaseTimer) clearTimeout(phaseTimer);

      const h1  = h1Ref.current!;
      const sub = subRef.current!;
      const ey  = eyRef.current!;
      const etxt = etxtRef.current!;
      const cta = ctaRef.current!;
      const mcta = mctaRef.current!;
      const snm = snameRef.current!;

      h1.style.transition  = "opacity .5s ease";
      sub.style.transition = "opacity .4s ease";
      cta.style.transition = "opacity .4s ease";
      h1.style.opacity  = "0";
      sub.style.opacity = "0";
      cta.style.opacity = "0";
      ey.style.transition = "opacity .4s ease";
      ey.style.opacity = "0";

      phaseTimer = setTimeout(() => {
        snm.textContent  = p.n;
        etxt.textContent = p.e;
        h1.innerHTML     = p.h;
        sub.textContent  = p.s;
        if (mcta) mcta.textContent = p.c;

        requestAnimationFrame(() => {
          ey.style.transition  = "opacity 1.0s ease";
          h1.style.transition  = "opacity 1.4s cubic-bezier(.4,0,.2,1)";
          sub.style.transition = "opacity 1.2s cubic-bezier(.4,0,.2,1) .2s";
          cta.style.transition = "opacity 1.0s ease .4s";
          ey.style.opacity  = "1";
          h1.style.opacity  = "1";
          sub.style.opacity = "1";
          cta.style.opacity = "1";
        });
      }, 500);
    }

    // ── DOTS ──────────────────────────────────────────────────────
    const dotsEl = dotsRef.current!;
    dotsEl.innerHTML = "";
    SD.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "sd" + (i === 0 ? " on" : "");
      d.setAttribute("role", "button");
      d.setAttribute("aria-label", `Show stage ${i + 1}`);
      d.setAttribute("tabindex", "0");
      d.style.cssText = `height:2px;border-radius:2px;background:${i===0?"#F5E020":"#1A1A28"};width:${i===0?"28px":"8px"};cursor:pointer;transition:all .5s;`;
      const chooseStage = () => { setPhase(i); updateDots(i); };
      d.addEventListener("click", chooseStage);
      d.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") chooseStage(); });
      dotsEl.appendChild(d);
    });
    function updateDots(n: number) {
      dotsEl.querySelectorAll("div").forEach((d, i) => {
        (d as HTMLElement).style.background = i === n ? "#F5E020" : "#1A1A28";
        (d as HTMLElement).style.width      = i === n ? "28px"    : "8px";
      });
    }

    // ── MOUSE ─────────────────────────────────────────────────────
    let mx = 0, my = 0;
    function onMouseMove(e: MouseEvent) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    document.addEventListener("mousemove", onMouseMove);

    // ── TEXT REVEAL ───────────────────────────────────────────────
    const revealTimer = setTimeout(() => {
      [eyRef, h1Ref, subRef, ctaRef].forEach(r => {
        if (r.current) r.current.classList.add("on");
      });
      setPhase(0); updateDots(0);
    }, 650);

    // ── MAIN LOOP ─────────────────────────────────────────────────
    const CYCLE = 13.0;
    let startTime: number | null = null;
    let rafId: number;

    function loop(ts: number) {
      rafId = requestAnimationFrame(loop);
      if (!startTime) startTime = ts;
      const clock = (ts - startTime) / 1000;
      const t = (clock % CYCLE) / CYCLE;

      const cW = CW(), cH = CH();
      const ncx = cW / 2, ncy = cH / 2;
      const rotY = clock * 0.12 + mx * 0.08;
      const rotX = my * -0.04;

      // Timeline
      const dotPulse = 1 + 0.3 * Math.sin(clock * 3.2);
      let dotAlpha = 0;
      if (t < 0.06)       dotAlpha = smoothstep(0, 0.04, t);
      else if (t < 0.10)  dotAlpha = smoothstep(0.10, 0.06, t);
      else if (t > 0.93)  dotAlpha = smoothstep(0.93, 1.0, t);

      let lemonScale = 0;
      if (t >= 0.05 && t < 0.34) {
        const lp = smoothstep(0.05, 0.34, t);
        lemonScale = lp * lp * lp;
      }
      const lemonOpacity = Math.max(0, 1 - lemonScale);

      let partAlpha = 0, partT = 0;
      if (t >= 0.26 && t < 0.58) {
        partAlpha = smoothstep(0.26, 0.32, t) * smoothstep(0.58, 0.52, t);
        partT = easeOut(clamp((t - 0.26) / 0.26, 0, 1));
      }

      let globeAlpha = 0;
      if (t >= 0.36 && t < 1.0) {
        globeAlpha = smoothstep(0.36, 0.46, t) * smoothstep(1.0, 0.93, t);
        globeAlpha *= 0.93 + 0.07 * Math.sin(clock * 0.8);
      }

      let flowAlpha = 0;
      if (t >= 0.46 && t < 0.95)
        flowAlpha = smoothstep(0.46, 0.56, t) * smoothstep(0.95, 0.89, t);

      // Phase
      if      (t < 0.18) { setPhase(0); updateDots(0); }
      else if (t < 0.40) { setPhase(1); updateDots(1); }
      else if (t < 0.70) { setPhase(2); updateDots(2); }
      else               { setPhase(3); updateDots(3); }

      // ── CLEAR ─────────────────────────────────────────────────
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#020208";
      ctx.fillRect(0, 0, cW, cH);

      // ── STARS ─────────────────────────────────────────────────
      for (const st of STARS) {
        ctx.globalAlpha = st.a;
        ctx.fillStyle = "#C8D2FF";
        ctx.beginPath();
        ctx.arc(st.x * cW, st.y * cH, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── GLOBE ─────────────────────────────────────────────────
      if (globeAlpha > 0.01) {
        const GR = Math.max(cW, cH) * 0.68;

        ctx.lineWidth = 0.5;
        for (let glat = -80; glat <= 80; glat += 25) {
          ctx.globalAlpha = globeAlpha * 0.35;
          ctx.strokeStyle = "#6A5A10";
          ctx.beginPath();
          let gf = true;
          for (let gln = 0; gln <= 360; gln += 4) {
            const gp = project(glat, gln, ncx, ncy, GR, rotY, rotX);
            if (gp.vis) { gf ? ctx.moveTo(gp.x, gp.y) : ctx.lineTo(gp.x, gp.y); gf = false; }
            else gf = true;
          }
          ctx.stroke();
        }

        for (let gln2 = 0; gln2 < 360; gln2 += 30) {
          ctx.globalAlpha = globeAlpha * 0.25;
          ctx.strokeStyle = "#4A4010";
          ctx.beginPath();
          let gf2 = true;
          for (let glat2 = -88; glat2 <= 88; glat2 += 4) {
            const gp2 = project(glat2, gln2, ncx, ncy, GR, rotY, rotX);
            if (gp2.vis) { gf2 ? ctx.moveTo(gp2.x, gp2.y) : ctx.lineTo(gp2.x, gp2.y); gf2 = false; }
            else gf2 = true;
          }
          ctx.stroke();
        }

        for (let hi = 0; hi < HUBS.length; hi++) {
          for (let hj = hi + 1; hj < HUBS.length; hj++) {
            ctx.globalAlpha = globeAlpha * 0.32;
            ctx.strokeStyle = "#8A7A10";
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            let af = true;
            for (let ha = 0; ha <= 16; ha++) {
              const ht = ha / 16;
              const hp = project(lerp(HUBS[hi].lat, HUBS[hj].lat, ht), lerp(HUBS[hi].lon, HUBS[hj].lon, ht), ncx, ncy, GR, rotY, rotX);
              if (hp.vis) { af ? ctx.moveTo(hp.x, hp.y) : ctx.lineTo(hp.x, hp.y); af = false; }
              else af = true;
            }
            ctx.stroke();
          }
        }

        for (const sn of SEC_NODES) {
          const snp = project(sn.lat, sn.lon, ncx, ncy, GR, rotY, rotX);
          if (!snp.vis) continue;
          ctx.globalAlpha = globeAlpha * 0.45;
          ctx.fillStyle = "#8A7818";
          ctx.beginPath();
          ctx.arc(snp.x, snp.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (flowAlpha > 0.01) {
          for (const fl of FLOWS) {
            fl.t += fl.sp * (fl.rev ? -1 : 1);
            if (fl.t > 1) fl.t = 0;
            if (fl.t < 0) fl.t = 1;
            const fp = project(lerp(HUBS[fl.a].lat, HUBS[fl.b].lat, fl.t), lerp(HUBS[fl.a].lon, HUBS[fl.b].lon, fl.t), ncx, ncy, GR, rotY, rotX);
            if (!fp.vis) continue;
            const br = Math.sin(fl.t * Math.PI);
            const fsz = 2.5 + br * 3.0;
            ctx.globalAlpha = flowAlpha * br * 0.88;
            ctx.fillStyle = "#F5E020";
            ctx.shadowColor = "#F5E020";
            ctx.shadowBlur  = 10 * br;
            ctx.beginPath();
            ctx.arc(fp.x, fp.y, fsz, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        const hProj = HUBS.map(h => project(h.lat, h.lon, ncx, ncy, GR, rotY, rotX));
        for (let hpi = 0; hpi < hProj.length; hpi++) {
          const hp2 = hProj[hpi];
          if (!hp2.vis) continue;
          const freq = 1.8 + hpi * 0.31, phase2 = hpi * 1.618;
          const pulse = 1 + 0.22 * Math.sin(clock * freq + phase2);
          ctx.globalAlpha = globeAlpha * 0.15;
          ctx.fillStyle = "rgba(220,190,20,.3)";
          ctx.beginPath();
          ctx.arc(hp2.x, hp2.y, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = globeAlpha * 0.95;
          ctx.fillStyle = "#F5E020";
          ctx.shadowColor = "#F5E020";
          ctx.shadowBlur  = 14 * pulse;
          ctx.beginPath();
          ctx.arc(hp2.x, hp2.y, (hpi < 4 ? 6 : 4.5) * pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        const ORings = [{ r: GR * 1.08, rx: 0.55 }, { r: GR * 1.18, rx: 0.30 }, { r: GR * 1.30, rx: 0.82 }];
        for (let ori = 0; ori < ORings.length; ori++) {
          const or = ORings[ori];
          ctx.globalAlpha = globeAlpha * [0.28, 0.18, 0.12][ori];
          ctx.strokeStyle = "#6A5A10";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          for (let oa = 0; oa <= 360; oa += 3) {
            const orad = oa * Math.PI / 180 + rotY * 0.38;
            const ox2 = ncx + Math.cos(orad) * or.r * Math.cos(or.rx);
            const oy2 = ncy + Math.sin(orad) * or.r * 0.36;
            oa === 0 ? ctx.moveTo(ox2, oy2) : ctx.lineTo(ox2, oy2);
          }
          ctx.stroke();
        }
      }

      // ── LEMON ─────────────────────────────────────────────────
      if (lemonScale > 0.001 && LEMON_READY) {
        const maxSz = Math.max(cW, cH) * 1.6;
        const drawSz = lemonScale * maxSz;
        ctx.globalAlpha = lemonOpacity;
        ctx.save();
        ctx.translate(ncx, ncy);
        ctx.rotate(mx * 0.018);
        ctx.drawImage(LEMON_C, -drawSz * 0.5, -drawSz * 0.5, drawSz, drawSz);
        ctx.restore();
      }

      // ── PARTICLES ─────────────────────────────────────────────
      if (!PARTS_BUILT && LEMON_READY && t > 0.28) buildParticles();
      if (partAlpha > 0.01 && PARTS_BUILT) {
        const maxSz2 = Math.max(cW, cH) * 1.6;
        const GRP2   = Math.max(cW, cH) * 0.68;
        for (let pi = 0; pi < PARTS.length; pi++) {
          const p = PARTS[pi];
          const psx = ncx + p.nx * maxSz2,   psy = ncy + p.ny * maxSz2;
          const ptx = ncx + p.tx * GRP2 * 2, pty = ncy + p.ty * GRP2 * 2;
          const curve = Math.sin(pi * 2.399) * 0.35;
          const ppx = lerp(psx, ptx + ptx * curve - ncx, partT);
          const ppy = lerp(psy, pty + pty * curve - ncy, partT);
          const psz = p.size * (1 + partT * 1.5) * (1 - partT * 0.4);
          const palpha = partAlpha * Math.sin(partT * Math.PI) * 0.9;
          if (palpha <= 0) continue;
          ctx.globalAlpha = palpha;
          ctx.fillStyle = p.col + palpha + ")";
          ctx.beginPath();
          ctx.arc(ppx, ppy, psz, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── DOT ───────────────────────────────────────────────────
      if (dotAlpha > 0.01) {
        ctx.globalAlpha = dotAlpha;
        ctx.fillStyle = "#F5E020";
        ctx.shadowColor = "#F5E020";
        ctx.shadowBlur  = 22 * dotPulse;
        ctx.beginPath();
        ctx.arc(ncx, ncy, 4 * dotPulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = dotAlpha * 0.3;
        ctx.strokeStyle = "#F5E020";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(ncx, ncy, 16 * (1 - 0.2 * Math.sin(clock * 3.2)), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = dotAlpha * 0.15;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.arc(ncx, ncy, 30 * (1 + 0.15 * Math.sin(clock * 1.4)), 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      clearTimeout(revealTimer);
      if (phaseTimer) clearTimeout(phaseTimer);
    };
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <style>{`
        html,body{overflow-x:hidden;background:#020208}
        .ey{font-family:'Courier New',monospace;font-size:10px;color:#F5E020;letter-spacing:4px;
            margin-bottom:22px;display:flex;align-items:center;justify-content:center;gap:12px;
            opacity:0;transition:opacity .6s}
        .ey.on{opacity:1}
        .pd{width:6px;height:6px;border-radius:50%;background:#F5E020;
            box-shadow:0 0 10px #F5E020;animation:pdp 2.5s ease-in-out infinite}
        @keyframes pdp{0%,100%{opacity:.3;transform:scale(.7)}50%{opacity:1;transform:scale(1.4)}}
        #ch1{font-weight:800;font-size:clamp(38px,5vw,76px);line-height:1.04;letter-spacing:-1.5px;
             color:#EEEEF2;margin-bottom:18px;opacity:0;
             transition:opacity 1.2s cubic-bezier(.4,0,.2,1)}
        #ch1.on{opacity:1}
        #ch1 em{color:#F5E020;font-style:italic}
        #csub{font-size:clamp(14px,1.3vw,17px);font-weight:300;color:rgba(148,148,170,.9);
              line-height:1.75;max-width:480px;margin-bottom:40px;opacity:0;
              transition:opacity 1.0s cubic-bezier(.4,0,.2,1) .15s}
        #csub.on{opacity:1}
        .cctag{display:flex;gap:16px;align-items:center;pointer-events:all;
               opacity:0;transition:opacity .8s ease .3s}
        .cctag.on{opacity:1}
        .cbp{font-size:14px;font-weight:700;color:#020208;background:#F5E020;border:none;
             border-radius:6px;padding:13px 28px;cursor:pointer;transition:all .2s}
        .cbp:hover{background:#d4f455;transform:translateY(-2px);box-shadow:0 8px 28px rgba(245,224,32,.3)}
        .cbg2{font-size:14px;color:#9494AA;background:transparent;border:none;cursor:pointer;
              display:flex;align-items:center;gap:7px;transition:color .2s;pointer-events:all}
        .cbg2:hover{color:#EEEEF2}
        .cnl{font-size:13px;color:#9494AA;cursor:pointer;transition:color .2s}
        .cnl:hover{color:#EEEEF2}
        .ctrust{display:flex;gap:18px;font-family:'Courier New',monospace;font-size:9px;
                color:#252535;letter-spacing:1.5px;align-items:center}
        .ctid{width:3px;height:3px;border-radius:50%;background:#705E10;flex-shrink:0}

        /* ── HAMBURGER ─────────────────────────────────── */
        .chbg{display:none;flex-direction:column;justify-content:center;align-items:center;
              width:40px;height:40px;background:transparent;border:1px solid rgba(255,255,255,.1);
              border-radius:6px;cursor:pointer;gap:5px;flex-shrink:0;transition:border-color .2s}
        .chbg:hover{border-color:rgba(245,224,32,.4)}
        .chbg:focus-visible{outline:2px solid #F5E020;outline-offset:2px}
        .chbg span{display:block;width:18px;height:1.5px;background:#EEEEF2;
                   transition:transform .3s ease,opacity .3s ease,width .3s ease;border-radius:2px}
        .chbg.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
        .chbg.open span:nth-child(2){opacity:0;width:0}
        .chbg.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}

        /* ── MOBILE DROPDOWN ────────────────────────────── */
        .cmob-menu{
          position:fixed;top:0;left:0;right:0;bottom:0;
          background:#020208;
          z-index:15;
          transform:translateY(-100%);
          transition:transform .38s cubic-bezier(.4,0,.2,1);
          pointer-events:none;
          will-change:transform;
        }
        .cmob-menu.open{transform:translateY(0);pointer-events:all}
        .chero-hide{opacity:0!important;pointer-events:none!important;transition:opacity .2s ease!important}
        .cmob-inner{padding:72px 28px 40px;overflow-y:auto;max-height:100dvh}
        .cmob-link{
          display:flex;align-items:center;justify-content:space-between;
          font-size:22px;font-weight:700;color:#EEEEF2;
          padding:14px 0;
          border-bottom:1px solid rgba(255,255,255,.06);
          cursor:pointer;
          transition:color .2s;
          text-decoration:none;
          letter-spacing:-.3px;
        }
        .cmob-link:last-of-type{border-bottom:none}
        .cmob-link:hover,.cmob-link:focus-visible{color:#F5E020;outline:none}
        .cmob-link:focus-visible{text-decoration:underline}
        .cmob-arr{font-size:14px;color:#3A3A52;transition:transform .2s,color .2s}
        .cmob-link:hover .cmob-arr{transform:translateX(4px);color:#F5E020}
        .cmob-footer{margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,.06);
                     display:flex;gap:12px}
        .cmob-cta{flex:1;font-size:14px;font-weight:700;color:#020208;background:#F5E020;
                  border:none;border-radius:6px;padding:13px 20px;cursor:pointer;transition:all .2s}
        .cmob-cta:hover{background:#d4f455}
        .cmob-cta2{flex:1;font-size:14px;font-weight:500;color:#9494AA;
                   background:transparent;border:1px solid rgba(255,255,255,.1);
                   border-radius:6px;padding:13px 20px;cursor:pointer;transition:all .2s}
        .cmob-cta2:hover{border-color:rgba(255,255,255,.3);color:#EEEEF2}

        @media(max-width:768px){
          .chbg{display:flex}
          .cnav-links{display:none!important}
          .cnav-cta-desk{display:none!important}
        }
        @media(max-width:680px){
          #ch1{font-size:clamp(32px,8vw,52px)!important;letter-spacing:-1px!important}
          #csub{font-size:14px!important;max-width:90vw!important;padding:0 16px}
          .cctag{flex-direction:column;gap:12px!important}
          .cbp{width:auto;min-width:180px}
          .ctrust{display:none!important}
          .cnav-pad{padding-left:20px!important;padding-right:20px!important;min-height:56px!important}
          .cbot-pad{padding:0 20px 20px!important}
          .ey{font-size:8px!important;letter-spacing:2px!important}
        }
        @media(max-width:400px){
          #ch1{font-size:28px!important}
          #csub{font-size:13px!important}
          .cmob-link{font-size:19px}
        }
      `}</style>

      {/* Mobile nav dropdown */}
      <div
        id="cmobile-nav"
        className={`cmob-menu${menuOpen ? " open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="cmob-inner">
          {NAV_LINKS.map(link => (
            link.href.includes("#") ? (
              <a
                key={link.label}
                href={link.href.replace("/#", "#")}
                className="cmob-link"
                onClick={event => scrollToSection(event, link.href, () => setMenuOpen(false))}
                tabIndex={menuOpen ? 0 : -1}
                style={{ textDecoration: "none" }}
              >
                {link.label}
                <span className="cmob-arr">→</span>
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="cmob-link"
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                style={{ textDecoration: "none" }}
              >
                {link.label}
                <span className="cmob-arr">→</span>
              </Link>
            )
          ))}
          <div className="cmob-footer">
            <a className="cmob-cta" href="#book-demo" onClick={event => scrollToSection(event, "#book-demo", () => setMenuOpen(false))}>Get a demo</a>
            <a className="cmob-cta2" href="#platform" onClick={event => scrollToSection(event, "#platform", () => setMenuOpen(false))}>Learn more</a>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0, display: "block" }}
      />

      {/* UI overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", display: "flex", flexDirection: "column" }}>

        {/* NAV */}
        <nav className="cnav-pad" style={{
          pointerEvents: "all",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 48px", paddingLeft: "max(48px,env(safe-area-inset-left))",
          paddingRight: "max(48px,env(safe-area-inset-right))",
          paddingTop: "env(safe-area-inset-top,0px)",
          minHeight: "64px",
          background: "rgba(2,2,8,.82)",
          borderBottom: "1px solid rgba(255,255,255,.05)",
          flexWrap: "nowrap", gap: "16px",
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        }}>
          {/* Logo */}
          <a href="#home" aria-label="Sour Lemon home" onClick={event => scrollToSection(event, "#home")} style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
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
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#EEEEF2", letterSpacing: ".5px" }}>SOUR LEMON</span>
          </a>

          {/* Nav links — desktop only */}
          <div style={{ display: "flex", gap: "28px" }} className="cnav-links">
            {([ 
              { label: "Platform",     href: "/#platform" },
              { label: "Use Cases",    href: "/#use-cases" },
              { label: "About",        href: "/about" },
              { label: "Pricing",      href: "/#impact" },
            ] as const).map(l => (
              l.href.includes("#") ? (
                <a key={l.label} href={l.href.replace("/#", "#")} onClick={event => scrollToSection(event, l.href)} className="cnl" style={{ textDecoration: "none" }}>{l.label}</a>
              ) : (
                <Link key={l.label} href={l.href} className="cnl" style={{ textDecoration: "none" }}>{l.label}</Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#book-demo" className="cbp cnav-cta-desk" style={{ fontSize: "13px", padding: "9px 20px", borderRadius: "5px" }}>
            Get a demo
          </a>

          {/* Hamburger — mobile only */}
          <button
            className={`chbg${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="cmobile-nav"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* HERO CENTER */}
        <div className={menuOpen ? "chero-hide" : ""} style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 20px", pointerEvents: "none",
        }}>
          <div ref={eyRef} className="ey">
            <div className="pd" />
            <span ref={etxtRef}>DECISION INTELLIGENCE PLATFORM</span>
          </div>
          <h1 ref={h1Ref} id="ch1" dangerouslySetInnerHTML={{ __html: "Your organization<br/>knows the <em>answer.</em>" }} />
          <p ref={subRef} id="csub">
            The problem is that the answer is distributed across thousands of documents, systems, and people who may have left. Sour Lemon makes what you already know usable — at the moment a decision must be made.
          </p>
          <div ref={ctaRef} className="cctag">
            <a ref={mctaRef} href="#book-demo" className="cbp">Request a demo</a>
            <a className="cbg2" href="#platform">How it works →</a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={`cbot-pad${menuOpen ? " chero-hide" : ""}`} style={{
          padding: "0 48px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          pointerEvents: "all",
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div ref={dotsRef} style={{ display: "flex", gap: "6px", alignItems: "center" }} />
            <span ref={snameRef} style={{
              fontFamily: "'Courier New',monospace", fontSize: "9px",
              color: "#3A3A52", letterSpacing: "2px", marginLeft: "14px",
            }}>STAGE 01</span>
          </div>
          <div className="ctrust">
            {["GMP Manufacturing", "Enterprise Onboarding", "PAS-X Systems", "Knowledge Management"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div className="ctid" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
