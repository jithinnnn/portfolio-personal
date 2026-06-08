"use client";

import { useRef, useEffect, useState, useCallback } from "react";

function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return { ref, visible: v };
}

/* ── skill data ─────────────────────────────────────────── */
const skills = [
  {
    id: "angular",
    name: "Angular 16",
    sub: "Primary framework",
    color: "#dd0031",
    level: 95,
    desc: "Production ERP + HMS — patient management, billing modules, clinical workflows. 1.5 yrs daily.",
    tags: ["RxJS", "NgRx", "Angular CDK", "Signals"],
  },
  {
    id: "react",
    name: "React & Next.js",
    sub: "UI layer",
    color: "#61dafb",
    level: 85,
    desc: "Full-stack apps, side projects, this portfolio. Hooks, RSC, App Router.",
    tags: ["Hooks", "App Router", "RSC", "Zustand"],
  },
  {
    id: "ts",
    name: "TypeScript",
    sub: "Always strict",
    color: "#3178c6",
    level: 90,
    desc: "Strict mode across every project. Generics, discriminated unions, utility types.",
    tags: ["Generics", "Utility Types", "Zod"],
  },
  {
    id: "ws",
    name: "WebSockets",
    sub: "Real-time",
    color: "#f59e0b",
    level: 80,
    desc: "Live Speech-to-Text pipeline for doctor–patient transcription. Sub-200 ms latency.",
    tags: ["Socket.io", "WS", "Audio streaming"],
  },
  {
    id: "node",
    name: "Node.js",
    sub: "Backend",
    color: "#68a063",
    level: 78,
    desc: "REST APIs, auth flows, streaming audio backends. Express + Inngest for async jobs.",
    tags: ["Express", "Inngest", "bcrypt", "JWT"],
  },
  {
    id: "decimal",
    name: "Decimal.js",
    sub: "Financial precision",
    color: "#22c55e",
    level: 88,
    desc: "Zero floating-point errors in billing & invoicing. Handles tax chaining and rounding.",
    tags: ["Precision math", "Billing", "Tax engine"],
  },
  {
    id: "integrations",
    name: "AWS S3 · ECharts · jsPDF",
    sub: "Integrations",
    color: "#ff9900",
    level: 82,
    desc: "File storage, analytics dashboards, PDF report generation — all in production.",
    tags: ["AWS SDK", "Chart config", "PDF templates"],
  },
  {
    id: "audio",
    name: "WaveSurfer.js",
    sub: "Audio UI",
    color: "#8b5cf6",
    level: 75,
    desc: "Waveform visualisation for medical audio — playback, scrubbing, region markers.",
    tags: ["Audio API", "Waveform", "Region markers"],
  },
];

const toolPills = [
  "Git", "Bitbucket", "Jira", "Postman", "Chrome DevTools",
  "GitHub Copilot", "bcrypt", "Clerk", "Inngest", "Stream",
  "Google Maps API", "Redux", "CI/CD", "Figma", "VS Code",
];

/* ── tiny SVG logos ─────────────────────────────────────── */
function SkillLogo({ id, color }: { id: string; color: string }) {
  const s: React.CSSProperties = { width: 28, height: 28, flexShrink: 0 };
  switch (id) {
    case "angular": return (
      <svg style={s} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L2 6.5l1.5 13L12 23l8.5-3.5L22 6.5z" opacity={0.2} />
        <path d="M12 2v21M2 6.5l10 3.5 10-3.5M9 15h6M8.5 18l3.5-9 3.5 9" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    );
    case "react": return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
      </svg>
    );
    case "ts": return (
      <svg style={s} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="3" fill={color} opacity={0.15} />
        <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke={color} strokeWidth="1.2" />
        <text x="5" y="17" fontSize="10" fontWeight="800" fill={color} fontFamily="monospace">TS</text>
      </svg>
    );
    case "ws": return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M3 12h4l3-8 4 16 3-8h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
    case "node": return (
      <svg style={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7z" stroke={color} strokeWidth="1.2" />
        <path d="M12 2v20M3 7l9 5 9-5" stroke={color} strokeWidth="1.2" />
      </svg>
    );
    case "decimal": return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M4 7h10a5 5 0 010 10H4" strokeLinecap="round" />
        <circle cx="19" cy="17" r="1.5" fill={color} />
      </svg>
    );
    case "integrations": return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" />
      </svg>
    );
    case "audio": return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M3 9v6M6 6v12M9 8v8M12 4v16M15 7v10M18 5v14M21 9v6" strokeLinecap="round" />
      </svg>
    );
    default: return <span style={{ fontSize: 24 }}>●</span>;
  }
}

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ── main component ─────────────────────────────────────── */
export default function Skills() {
  const { ref, visible } = useInView();
  const [active, setActive] = useState<string | null>(null);
  const activeSkill = skills.find((s) => s.id === active) ?? null;
  const isMobile = useMobile();

  return (
    <section id="skills" ref={ref} style={{ position: "relative", zIndex: 1, padding: isMobile ? "80px 20px" : "120px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── header ── */}
        <div style={{ marginBottom: 64, textAlign: isMobile ? "center" : "left" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 12, marginBottom: 16,
            opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
          }}>
            <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 11,
              color: "var(--cyan)", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>skills & tools</span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            The toolkit I{" "}
            <span style={{
              background: "linear-gradient(135deg, #c4b5fd, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>actually ship with</span>
          </h2>
        </div>

        {/* ── skill cards grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 48,
          }}
        >
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              index={i}
              visible={visible}
              active={active === skill.id}
              onToggle={() => setActive(active === skill.id ? null : skill.id)}
            />
          ))}
        </div>

        {/* ── expanded detail panel ── */}
        <DetailPanel skill={activeSkill} visible={visible} isMobile={isMobile} />

        {/* ── marquee tool strip ── */}
        <MarqueeStrip pills={toolPills} visible={visible} />

      </div>

    </section>
  );
}

/* ── skill card ─────────────────────────────────────────── */
function SkillCard({
  skill, index, visible, active, onToggle,
}: {
  skill: typeof skills[0];
  index: number;
  visible: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  const [hov, setHov] = useState(false);
  const lit = hov || active;

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        background: lit ? `linear-gradient(145deg, ${skill.color}14, #13131f)` : "#0f0f1a",
        border: `1px solid ${active ? skill.color + "80" : lit ? skill.color + "45" : "#1a1a2e"}`,
        borderRadius: 16,
        padding: "20px 18px 16px",
        cursor: "pointer",
        transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? (lit ? "translateY(-5px)" : "translateY(0)") : "translateY(28px)",
        transitionDelay: `${index * 0.055}s`,
        boxShadow: active
          ? `0 0 0 1px ${skill.color}50, 0 16px 48px ${skill.color}25`
          : lit ? `0 8px 32px ${skill.color}18` : "none",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ambient glow blob */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 80% 20%, ${skill.color}${lit ? "18" : "08"} 0%, transparent 65%)`,
        transition: "background 0.3s",
      }} />

      {/* top row: logo + level bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, position: "relative" }}>
        <SkillLogo id={skill.id} color={skill.color} />
        <LevelArc level={skill.level} color={skill.color} lit={lit} />
      </div>

      {/* name */}
      <div style={{
        fontSize: 13.5, fontWeight: 700, color: lit ? "#f0f0ff" : "#c0c0d8",
        lineHeight: 1.3, marginBottom: 4, position: "relative",
        transition: "color 0.2s",
      }}>
        {skill.name}
      </div>

      {/* subtitle */}
      <div style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10, color: skill.color,
        letterSpacing: "0.08em", textTransform: "uppercase",
        opacity: lit ? 1 : 0.6, transition: "opacity 0.2s",
        position: "relative",
      }}>
        {skill.sub}
      </div>

      {/* active indicator dot */}
      {active && (
        <div style={{
          position: "absolute", bottom: 10, right: 12,
          width: 6, height: 6, borderRadius: "50%",
          background: skill.color,
          boxShadow: `0 0 8px ${skill.color}`,
        }} />
      )}
    </div>
  );
}

/* ── arc progress indicator ─────────────────────────────── */
function LevelArc({ level, color, lit }: { level: number; color: string; lit: boolean }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75; // 270° arc
  const filled = arc * (level / 100);
  const gap = arc - filled;
  const rotation = 135; // start bottom-left

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
      {/* track */}
      <circle cx="18" cy="18" r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth="2.5"
        strokeDasharray={`${arc} ${circ - arc}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${rotation} 18 18)`}
      />
      {/* fill */}
      <circle cx="18" cy="18" r={r} fill="none"
        stroke={color} strokeWidth="2.5"
        strokeDasharray={`${lit ? filled : 0} ${circ}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${rotation} 18 18)`}
        style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s", filter: lit ? `drop-shadow(0 0 3px ${color})` : "none" }}
      />
      {/* level text */}
      <text x="18" y="22" textAnchor="middle"
        fontSize="8" fontWeight="700" fill={lit ? color : "rgba(255,255,255,0.3)"}
        fontFamily="monospace"
        style={{ transition: "fill 0.2s" }}
      >
        {level}
      </text>
    </svg>
  );
}

/* ── expanded detail panel ──────────────────────────────── */
function DetailPanel({ skill, visible, isMobile }: { skill: typeof skills[0] | null; visible: boolean; isMobile: boolean }) {
  const show = skill !== null && visible;
  return (
    <div style={{
      overflow: "hidden",
      maxHeight: show ? (isMobile ? 500 : 320) : 0,
      opacity: show ? 1 : 0,
      transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
      marginBottom: show ? 36 : 0,
    }}>
      {skill && (
        <div style={{
          background: `linear-gradient(135deg, ${skill.color}0d, #0f0f1a)`,
          border: `1px solid ${skill.color}35`,
          borderRadius: 14,
          padding: "18px 24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 14 : 32,
          alignItems: "flex-start",
        }}>
          {/* left: desc */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <SkillLogo id={skill.id} color={skill.color} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0ff" }}>{skill.name}</div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: skill.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{skill.sub}</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#a0a0c0", margin: 0 }}>{skill.desc}</p>
          </div>
          {/* right: tag chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, maxWidth: isMobile ? "100%" : 260, flexShrink: 0, paddingTop: 4 }}>
            {skill.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11, padding: "4px 10px", borderRadius: 6,
                color: skill.color,
                background: skill.color + "14",
                border: `1px solid ${skill.color}30`,
                letterSpacing: "0.04em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── marquee tool strip ─────────────────────────────────── */
function MarqueeStrip({ pills, visible }: { pills: string[]; visible: boolean }) {
  const doubled = [...pills, ...pills];
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: "opacity 0.7s ease 0.8s",
      position: "relative",
    }}>
      <div style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10, color: "var(--text-muted)",
        letterSpacing: "0.12em", textTransform: "uppercase",
        marginBottom: 14,
      }}>Also in the toolbox</div>

      {/* fade edges */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(90deg, var(--bg) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(270deg, var(--bg) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        <div style={{
          display: "flex", gap: 10, width: "max-content",
          animation: "marquee 22s linear infinite",
        }}>
          {doubled.map((label, i) => (
            <MarqueePill key={i} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MarqueePill({ label }: { label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12, padding: "7px 16px", borderRadius: 100,
        border: `1px solid ${hov ? "#383860" : "#1e1e32"}`,
        background: hov ? "rgba(255,255,255,0.05)" : "#0c0c18",
        color: hov ? "#d0d0f0" : "#606080",
        transition: "all 0.2s",
        cursor: "default", userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
