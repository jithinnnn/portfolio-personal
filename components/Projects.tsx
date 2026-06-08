"use client";

import { useRef, useEffect, useState } from "react";

function useInView(t = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: t }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return { ref, visible: v };
}

const featured = [
  {
    id: "hms",
    title: "Hospital Management System",
    label: "Production",
    labelColor: "#22c55e",
    year: "2025",
    desc: "Angular 16 HMS with real-time Speech-to-Text via WebSockets, AI-generated discharge summaries, WaveSurfer.js waveform UI, and multi-module patient and billing workflows.",
    tags: ["Angular 16", "WebSockets", "WaveSurfer.js", "AWS S3"],
    link: null,
    metric: { value: "~40%", label: "docs effort saved" },
  },
  {
    id: "erp",
    title: "ERPOne",
    label: "Production",
    labelColor: "#22c55e",
    year: "2025",
    desc: "Precision billing, taxation, and invoicing engine built with Decimal.js for zero floating-point errors. Integrated jsPDF for reports and ECharts for analytics dashboards.",
    tags: ["Angular 16", "Decimal.js", "jsPDF", "ECharts"],
    link: null,
    metric: { value: "0", label: "billing errors" },
  },
];

const rest = [
  {
    id: "ai-docs",
    title: "AI Clinical Docs PoC",
    label: "PoC",
    labelColor: "#f59e0b",
    year: "2024",
    desc: "End-to-end: audio capture → transcription → SOAP notes → billing codes.",
    tags: ["React", "Node.js", "WebSockets"],
    link: null,
    metric: { value: "E2E", label: "audio → billing" },
  },
  {
    id: "finance",
    title: "Finance Tracker",
    label: "Side Project",
    labelColor: "#60a5fa",
    year: "2024",
    desc: "Personal finance dashboard with expense categories, trend charts, and monthly budget management.",
    tags: ["React", "Redux", "Node.js"],
    link: "https://github.com/jithinnnn",
    metric: { value: "↗", label: "open source" },
  },
  {
    id: "social",
    title: "Social Media App",
    label: "Side Project",
    labelColor: "#a78bfa",
    year: "2024",
    desc: "Full-stack social platform with Clerk auth, stream-based feeds, real-time notifications.",
    tags: ["React", "Clerk", "Stream"],
    link: "https://github.com/jithinnnn",
    metric: { value: "RT", label: "real-time" },
  },
];

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

export default function Projects() {
  const { ref, visible } = useInView();
  const isMobile = useMobile();

  return (
    <section id="projects" ref={ref} style={{ position: "relative", zIndex: 1, padding: isMobile ? "80px 20px" : "120px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* header */}
        <div style={{ marginBottom: 56, textAlign: isMobile ? "center" : "left" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 12, marginBottom: 16,
            opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
          }}>
            <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 11,
              color: "var(--cyan)", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>featured work</span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            Things I&apos;ve{" "}
            <span style={{
              background: "linear-gradient(135deg, #c4b5fd, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>actually shipped</span>
          </h2>
        </div>

        {/* ── row 1: two equal featured cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 14,
          marginBottom: 14,
        }}>
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} visible={visible} delay={i * 0.1} />
          ))}
        </div>

        {/* ── row 2: three equal small cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: 14,
          marginBottom: 48,
        }}>
          {rest.map((p, i) => (
            <SmallCard key={p.id} project={p} visible={visible} delay={0.2 + i * 0.08} />
          ))}
        </div>

        {/* footer */}
        <div style={{
          textAlign: "center",
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.7s",
        }}>
          
        </div>
      </div>

    </section>
  );
}

/* ── shared glow shell ── */
function GlowShell({ color, hovered, children, style }: {
  color: string; hovered: boolean;
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      position: "relative",
      background: "#0a0a15",
      border: `1px solid ${hovered ? color + "60" : "#1c1c30"}`,
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: hovered
        ? `0 0 0 1px ${color}25, 0 20px 60px ${color}20, inset 0 1px 0 ${color}20`
        : "0 0 0 1px rgba(255,255,255,0.03)",
      transition: "border-color 0.3s, box-shadow 0.3s",
      height: "100%",
      ...style,
    }}>
      {/* top edge glow */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: `linear-gradient(90deg, transparent, ${color}${hovered ? "90" : "40"}, transparent)`,
        transition: "background 0.4s",
        pointerEvents: "none",
      }} />
      {/* ambient blob top-right */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "55%", height: "55%",
        background: `radial-gradient(ellipse, ${color}${hovered ? "16" : "08"} 0%, transparent 65%)`,
        transition: "background 0.5s", pointerEvents: "none",
      }} />
      {/* grain */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />
      {children}
    </div>
  );
}

/* ── featured card ── */
function FeaturedCard({ project, visible, delay }: {
  project: typeof featured[0]; visible: boolean; delay: number;
}) {
  const [hov, setHov] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 9;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -9;
    cardRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    setHov(false);
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <GlowShell color={project.labelColor} hovered={hov}>
        <div
          ref={cardRef}
          onMouseEnter={() => setHov(true)}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            padding: "28px 28px 24px",
            display: "flex", flexDirection: "column",
            gap: 0, cursor: "default",
            transition: "transform 0.2s ease",
          }}
        >
          {/* top: label + year */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 9, fontWeight: 700,
              color: project.labelColor, background: project.labelColor + "16",
              border: `1px solid ${project.labelColor}28`,
              borderRadius: 4, padding: "3px 9px", letterSpacing: "0.1em",
            }}>{project.label}</span>
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 10,
              color: "var(--text-muted)", letterSpacing: "0.06em",
            }}>{project.year}</span>
          </div>

          {/* hero metric */}
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(44px, 6vw, 68px)", fontWeight: 900, lineHeight: 0.9,
              background: `linear-gradient(140deg, #ffffff 0%, ${project.labelColor} 120%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-0.04em",
            }}>{project.metric.value}</div>
            <div style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 10,
              color: project.labelColor, letterSpacing: "0.1em",
              textTransform: "uppercase", marginTop: 7, opacity: 0.9,
            }}>{project.metric.label}</div>
          </div>

          {/* divider */}
          <div style={{
            height: 1, marginBottom: 16,
            background: `linear-gradient(90deg, ${project.labelColor}30, transparent)`,
          }} />

          {/* title */}
          <h3 style={{
            fontSize: 19, fontWeight: 800, color: "#f0f0ff",
            letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: 10,
          }}>{project.title}</h3>

          {/* desc */}
          <p style={{
            fontSize: 13, lineHeight: 1.8, color: "#7a7a96", marginBottom: 20,
          }}>{project.desc}</p>

          {/* tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "var(--font-mono), monospace", fontSize: 10,
                padding: "3px 9px", borderRadius: 6,
                color: project.labelColor + "cc",
                background: project.labelColor + "0e",
                border: `1px solid ${project.labelColor}22`,
                letterSpacing: "0.04em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </GlowShell>
    </div>
  );
}

/* ── small card ── */
function SmallCard({ project, visible, delay }: {
  project: typeof rest[0]; visible: boolean; delay: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      <GlowShell color={project.labelColor} hovered={hov}>
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{ padding: "22px", display: "flex", flexDirection: "column", cursor: "default" }}
        >
          {/* label + link */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 9,
              color: project.labelColor, background: project.labelColor + "14",
              border: `1px solid ${project.labelColor}25`,
              borderRadius: 4, padding: "2px 8px", letterSpacing: "0.08em",
            }}>{project.label}</span>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  color: hov ? project.labelColor : "var(--text-muted)",
                  fontSize: 14, textDecoration: "none", transition: "color 0.2s",
                }}>↗</a>
            )}
          </div>

          {/* metric */}
          <div style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 34, fontWeight: 900, lineHeight: 1,
            background: `linear-gradient(135deg, #ffffff, ${project.labelColor})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            letterSpacing: "-0.03em", marginBottom: 4,
          }}>{project.metric.value}</div>
          <div style={{
            fontFamily: "var(--font-mono), monospace", fontSize: 9,
            color: project.labelColor, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 14, opacity: 0.8,
          }}>{project.metric.label}</div>

          {/* title */}
          <h3 style={{
            fontSize: 14, fontWeight: 700,
            color: hov ? "#f0f0ff" : "#c0c0d8",
            letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 8,
            transition: "color 0.2s",
          }}>{project.title}</h3>

          {/* desc */}
          <p style={{
            fontSize: 12, lineHeight: 1.65, color: "#5a5a72", marginBottom: 16, flex: 1,
          }}>{project.desc}</p>

          {/* tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "var(--font-mono), monospace", fontSize: 9,
                padding: "2px 7px", borderRadius: 4,
                color: "var(--text-muted)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                letterSpacing: "0.04em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </GlowShell>
    </div>
  );
}
