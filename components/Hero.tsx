"use client";

import { useEffect, useState, CSSProperties } from "react";

const roles = ["Frontend Engineer", "Angular Developer", "React Developer", "UI Engineer"];

function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = words[wi];
    if (!del && ci < cur.length) { const t = setTimeout(() => setCi((c) => c + 1), speed); return () => clearTimeout(t); }
    if (!del && ci === cur.length) { const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t); }
    if (del && ci > 0) { const t = setTimeout(() => setCi((c) => c - 1), speed / 2.5); return () => clearTimeout(t); }
    if (del && ci === 0) { setDel(false); setWi((w) => (w + 1) % words.length); }
  }, [ci, del, wi, words, speed, pause]);

  useEffect(() => setDisplay(words[wi].slice(0, ci)), [ci, wi, words]);
  return display;
}

function useMouseParallax(strength = 20) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({ x: ((e.clientX - cx) / cx) * strength, y: ((e.clientY - cy) / cy) * strength });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return pos;
}

const stats = [
  { num: "1.6+", label: "Years exp" },
  { num: "2", label: "Prod platforms" },
  { num: "~40%", label: "Docs effort saved" },
  { num: "0", label: "Billing errors" },
];

export default function Hero() {
  const typed = useTypewriter(roles);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useMouseParallax(14);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fade = (delay: number): CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      id="home"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, overflow: "hidden" }}
    >
      <GridLines />

      {/* ghosted background text */}
      <div style={{
        position: "absolute", left: "-2%", top: "50%",
        transform: `translate(0,-50%) translate(${mouse.x * -0.4}px, ${mouse.y * -0.4}px)`,
        fontFamily: "var(--font-mono), monospace",
        fontSize: "clamp(180px, 22vw, 320px)", fontWeight: 900,
        color: "transparent", WebkitTextStroke: "1px rgba(139,92,246,0.07)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
        letterSpacing: "-0.05em", transition: "transform 0.12s ease-out",
      }}>JGJ</div>

      {/* outer grid */}
      <div
        className="hero-grid"
        style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          padding: isMobile ? "90px 24px 48px" : "100px 40px 60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: isMobile ? 24 : 60,
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
        }}>
          {/* availability chip */}
          <div style={{ ...fade(0.1), display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <span style={{
              display: "inline-block", width: 8, height: 8, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 12px #22c55e, 0 0 24px rgba(34,197,94,0.4)",
              animation: "pulse-glow 2s ease-in-out infinite", flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 11,
              color: "var(--text-muted)", letterSpacing: "0.14em", textTransform: "uppercase",
            }}>Open to opportunities</span>
          </div>

          {/* NAME */}
          <h1 style={{ margin: "0 0 4px", lineHeight: 1.05, overflow: "visible", width: "100%" }}>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: 6 }}>
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-sora), 'Sora', sans-serif",
                fontSize: "clamp(42px, 6.5vw, 82px)", fontWeight: 700,
                color: "var(--text-primary)", letterSpacing: "-0.01em",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(100%)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}>Jithin</span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: 8 }}>
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-sora), 'Sora', sans-serif",
                fontSize: "clamp(38px, 5.8vw, 72px)", fontWeight: 700,
                background: "linear-gradient(120deg, #c4b5fd 0%, #a78bfa 40%, #06b6d4 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                letterSpacing: "-0.01em",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(100%)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s",
              }}>George Jose</span>
            </span>
          </h1>

          {/* accent line */}
          <div style={{
            ...fade(0.35),
            height: 2, width: "clamp(80px, 14vw, 180px)",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4, transparent)",
            borderRadius: 99, margin: "28px 0 28px",
          }} />

          {/* typewriter */}
          <div style={{ ...fade(0.45), height: 40, display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", marginBottom: 28, width: "100%" }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "clamp(14px, 2vw, 20px)", color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--violet-bright)" }}>{">"}</span>{" "}
              {typed}
              <span style={{
                display: "inline-block", width: 2, height: "1em", background: "var(--cyan)",
                marginLeft: 3, verticalAlign: "middle", animation: "blink-cursor 1s step-end infinite",
              }} />
            </span>
          </div>

          {/* bio */}
          <p style={{
            ...fade(0.55),
            fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.8,
            color: "var(--text-secondary)",
            maxWidth: isMobile ? "100%" : 520,
            marginBottom: 44,
            textAlign: isMobile ? "center" : "left",
          }}>
            Frontend engineer specialising in{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Angular & React</span>
            {" "}— crafting fast, production-grade interfaces for{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>ERP and AI-powered healthcare</span>{" "}
            platforms. 1.6+ years shipping real features for real users.
          </p>

          {/* CTA buttons */}
          <div style={{
            ...fade(0.65),
            display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64,
            flexDirection: isMobile ? "column" : "row",
            width: isMobile ? "100%" : "auto",
            alignItems: isMobile ? "stretch" : "flex-start",
          }}>
            <GradientButton href="#projects" label="View my work →" fullWidth={isMobile} />
            <OutlineButton href="#contact" label="Let's talk" fullWidth={isMobile} />
            <OutlineButton href="https://github.com/jithinnnn" label="GitHub ↗" external fullWidth={isMobile} />
            <OutlineButton href="https://linkedin.com/in/jithin-george-272bb8246/" label="LinkedIn ↗" external fullWidth={isMobile} />
          </div>

          {/* stats */}
          <div style={{
            ...fade(0.75),
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)",
            gap: isMobile ? "16px 0" : 0,
            width: "100%",
          }}>
            {stats.map((s, i) => (
              <StatPill key={s.label} stat={s} index={i} last={i === stats.length - 1} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* RIGHT — decorative card (desktop only) */}
        {!isMobile && (
          <div
            className="hero-right"
            style={{
              ...fade(0.3), flexShrink: 0,
              width: "clamp(200px, 22vw, 300px)",
              display: "flex", flexDirection: "column", gap: 16,
              transform: `translate(${mouse.x * 0.6}px, ${mouse.y * 0.6}px)`,
              transition: "transform 0.18s ease-out",
            }}
          >
            <CodeCard />
            <TechPillsCard />
          </div>
        )}
      </div>

      {/* scroll hint */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: mounted ? 0.45 : 0, transition: "opacity 1s ease 1.4s",
      }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--border2), transparent)", animation: "float-y 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

function GridLines() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <div style={{ position: "absolute", top: "22%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.06) 30%, rgba(139,92,246,0.12) 60%, transparent 100%)" }} />
      <div style={{ position: "absolute", bottom: "18%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.06) 40%, rgba(6,182,212,0.1) 60%, transparent 100%)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: "28%", width: 1, background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.07) 30%, rgba(139,92,246,0.12) 70%, transparent 100%)" }} />
      <svg style={{ position: "absolute", top: "18%", right: "26%", opacity: 0.25 }} width="20" height="20" viewBox="0 0 20 20">
        <line x1="10" y1="0" x2="10" y2="20" stroke="#8b5cf6" strokeWidth="1" />
        <line x1="0" y1="10" x2="20" y2="10" stroke="#8b5cf6" strokeWidth="1" />
      </svg>
      <svg style={{ position: "absolute", bottom: "16%", left: "8%", opacity: 0.2 }} width="16" height="16" viewBox="0 0 16 16">
        <line x1="8" y1="0" x2="8" y2="16" stroke="#06b6d4" strokeWidth="1" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="#06b6d4" strokeWidth="1" />
      </svg>
    </div>
  );
}

function StatPill({ stat, index, last, isMobile }: { stat: { num: string; label: string }; index: number; last: boolean; isMobile: boolean }) {
  const isSecondRow = isMobile && index >= 2;
  return (
    <div style={{
      paddingLeft: isMobile ? 0 : 20,
      paddingRight: last ? 0 : (isMobile ? 0 : 28),
      borderLeft: (!isMobile && index > 0) ? "1px solid var(--border)" : "none",
      borderTop: isSecondRow ? "1px solid var(--border)" : "none",
      paddingTop: isSecondRow ? 16 : 0,
      textAlign: isMobile ? "center" : "left",
    }}>
      <div style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 800,
        background: "linear-gradient(135deg, #c4b5fd, #06b6d4)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        lineHeight: 1,
      }}>{stat.num}</div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 5, letterSpacing: "0.04em" }}>{stat.label}</div>
    </div>
  );
}

function CodeCard() {
  return (
    <div style={{
      background: "rgba(15,15,26,0.85)", border: "1px solid var(--border)",
      borderRadius: 12, overflow: "hidden", backdropFilter: "blur(12px)",
      boxShadow: "0 0 0 1px rgba(139,92,246,0.06), 0 24px 48px rgba(0,0,0,0.4)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--text-muted)" }}>jithin.ts</span>
      </div>
      <div style={{ padding: "16px 18px", fontFamily: "var(--font-mono), monospace", fontSize: 12, lineHeight: 2, userSelect: "none" }}>
        <CodeLine num={1} content={<><Kw>const</Kw> <Var>dev</Var> <Sym>=</Sym> {"{"}</>} />
        <CodeLine num={2} indent content={<><Str>name</Str><Sym>:</Sym> <Val>"Jithin George Jose"</Val><Sym>,</Sym></>} />
        <CodeLine num={3} indent content={<><Str>role</Str><Sym>:</Sym> <Val>"Frontend Engineer"</Val><Sym>,</Sym></>} />
        <CodeLine num={4} indent content={<><Str>stack</Str><Sym>:</Sym> <Sym>[</Sym><Val>"Angular"</Val><Sym>,</Sym> <Val>"React"</Val><Sym>]</Sym><Sym>,</Sym></>} />
        <CodeLine num={5} indent content={<><Str>open</Str><Sym>:</Sym> <Kw>true</Kw><Sym>,</Sym></>} />
        <CodeLine num={6} content={<>{"}"}</>} />
      </div>
    </div>
  );
}

function CodeLine({ num, indent, content }: { num: number; indent?: boolean; content: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <span style={{ color: "var(--text-muted)", minWidth: 14, textAlign: "right", userSelect: "none" }}>{num}</span>
      <span style={{ paddingLeft: indent ? 16 : 0 }}>{content}</span>
    </div>
  );
}
const Kw = ({ children }: { children: React.ReactNode }) => <span style={{ color: "#c084fc" }}>{children}</span>;
const Var = ({ children }: { children: React.ReactNode }) => <span style={{ color: "#67e8f9" }}>{children}</span>;
const Str = ({ children }: { children: React.ReactNode }) => <span style={{ color: "#86efac" }}>{children}</span>;
const Val = ({ children }: { children: React.ReactNode }) => <span style={{ color: "#fde68a" }}>{children}</span>;
const Sym = ({ children }: { children: React.ReactNode }) => <span style={{ color: "var(--text-muted)" }}>{children}</span>;

const techs = [
  { label: "Angular", color: "#ef4444" },
  { label: "React", color: "#06b6d4" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "RxJS", color: "#ec4899" },
  { label: "Next.js", color: "#a3a3a3" },
  { label: "Tailwind", color: "#38bdf8" },
  { label: "REST APIs", color: "#8b5cf6" },
];

function TechPillsCard() {
  return (
    <div style={{ background: "rgba(15,15,26,0.7)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", backdropFilter: "blur(12px)" }}>
      <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Stack</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {techs.map((t) => (
          <span key={t.label} style={{
            fontFamily: "var(--font-mono), monospace", fontSize: 11,
            color: t.color, background: `${t.color}12`, border: `1px solid ${t.color}30`,
            borderRadius: 6, padding: "3px 9px", letterSpacing: "0.02em",
          }}>{t.label}</span>
        ))}
      </div>
    </div>
  );
}

function GradientButton({ href, label, fullWidth }: { href: string; label: string; fullWidth?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", fontFamily: "var(--font-mono), monospace", fontSize: 13,
        fontWeight: 600, color: "#fff", textDecoration: "none",
        padding: "13px 26px", borderRadius: 8,
        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
        transition: "all 0.25s ease",
        boxShadow: hov ? "0 0 32px rgba(124,58,237,0.55), 0 0 64px rgba(6,182,212,0.2)" : "0 0 0px transparent",
        transform: hov ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        letterSpacing: "0.03em", textAlign: "center",
        width: fullWidth ? "100%" : "auto",
        boxSizing: "border-box",
      }}
    >{label}</a>
  );
}

function OutlineButton({ href, label, external, fullWidth }: { href: string; label: string; external?: boolean; fullWidth?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", fontFamily: "var(--font-mono), monospace", fontSize: 13,
        color: hov ? "var(--text-primary)" : "var(--text-secondary)",
        textDecoration: "none", padding: "12px 22px", borderRadius: 8,
        border: `1px solid ${hov ? "rgba(139,92,246,0.5)" : "var(--border)"}`,
        background: hov ? "rgba(139,92,246,0.06)" : "transparent",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        letterSpacing: "0.02em", textAlign: "center",
        width: fullWidth ? "100%" : "auto",
        boxSizing: "border-box",
      }}
    >{label}</a>
  );
}
