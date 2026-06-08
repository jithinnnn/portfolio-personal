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

const jobs = [
  {
    role: "Frontend Engineer",
    company: "Probeplus Innovative Solutions",
    period: "Jan 2025 – Present",
    tenure: "Current",
    type: "Full-time",
    location: "Bangalore, KA",
    color: "#8b5cf6",
    tenurePct: 100,
    bullets: [
      { impact: "~40% docs effort", text: "Engineered AI Speech-to-Text via WebSockets, enabling real-time doctor–patient conversation capture." },
      { impact: "ERP + HMS", text: "Spearheaded frontend for both platforms using Angular 16 — patient management, billing, clinical workflows." },
      { impact: "Zero float errors", text: "Built financial calculation modules using Decimal.js for accurate billing, taxation and invoicing." },
      { impact: "Audio UX", text: "Integrated WaveSurfer.js for waveform visualisation — precise playback, scrubbing and validation." },
      { impact: "AI summaries", text: "Built interfaces that transform consultation data into structured, editable discharge summaries." },
      { impact: "Multi-integration", text: "Wired AWS S3, Google Maps API, jsPDF, ECharts, and WebSockets across both platforms." },
    ],
    tags: ["Angular 16", "WebSockets", "Decimal.js", "WaveSurfer.js", "AWS S3", "ECharts", "jsPDF"],
  },
  {
    role: "Founding Engineer",
    company: "NyxSpectra Technologies",
    period: "Aug 2024 – Jan 2025",
    tenure: "2 months",
    type: " Remote",
    location: "Kochi, KL",
    color: "#06b6d4",
    tenurePct: 60,
    bullets: [
      { impact: "Full PoC", text: "Built end-to-end healthcare documentation proof-of-concept showcasing AI-driven clinical workflow automation." },
      { impact: "Live STT", text: "Architected real-time speech-to-text pipeline with low-latency streaming audio processing." },
      { impact: "SOAP notes", text: "Developed automated clinical note generation — unstructured conversation → structured SOAP output." },
      { impact: "Billing codes", text: "Implemented SOAP → standardised medical billing code conversion for healthcare compliance." },
      { impact: "E2E flow", text: "Designed full consultation pipeline: audio capture → transcription → finalised clinical documentation." },
    ],
    tags: ["React", "Node.js", "Express.js", "WebSockets", "SOAP", "Healthcare AI"],
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

export default function Experience() {
  const { ref, visible } = useInView();
  const isMobile = useMobile();

  return (
    <section id="experience" ref={ref} style={{ position: "relative", zIndex: 1, padding: isMobile ? "80px 20px" : "120px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* header */}
        <div style={{ marginBottom: 72, textAlign: isMobile ? "center" : "left" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 12, marginBottom: 16,
            opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
          }}>
            <div style={{ width: 24, height: 1, background: "var(--violet-bright)" }} />
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 11,
              color: "var(--violet-bright)", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>experience</span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", lineHeight: 1.1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            Where I&apos;ve{" "}
            <span style={{
              background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>shipped</span>
          </h2>
        </div>

        {/* timeline */}
        <div style={{ position: "relative" }}>
          {/* spine line — hidden on mobile */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: 220,
              top: 0, bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, var(--border2) 6%, var(--border2) 94%, transparent)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }} />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {jobs.map((job, i) => (
              <JobRow key={job.company} job={job} index={i} isMobile={isMobile} />
            ))}
          </div>

          {/* spine end cap — hidden on mobile */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: 220,
              bottom: -16,
              transform: "translateX(-50%)",
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--border2)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.5s",
            }} />
          )}
        </div>
      </div>
    </section>
  );
}

function JobRow({ job, index, isMobile }: { job: typeof jobs[0]; index: number; isMobile: boolean }) {
  const { ref, v: cardVisible } = useRowInView();

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        gap: isMobile ? 12 : 0,
      }}
    >
      {/* LEFT — meta column */}
      <div
        style={{
          width: isMobile ? "auto" : 220,
          flexShrink: 0,
          paddingRight: isMobile ? 0 : 36,
          paddingTop: isMobile ? 0 : 26,
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          flexWrap: isMobile ? "wrap" : "nowrap",
          alignItems: isMobile ? "center" : "flex-start",
          gap: isMobile ? 10 : 6,
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? "translateX(0)" : "translateX(-20px)",
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        }}
      >
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, fontWeight: 700,
          color: job.color,
          letterSpacing: "0.07em",
          marginBottom: 2,
        }}>{job.period}</div>
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, color: "var(--text-muted)",
          letterSpacing: "0.05em", lineHeight: 1.5,
        }}>{job.type}</div>
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, color: "var(--text-muted)",
          letterSpacing: "0.05em",
        }}>{job.location}</div>

        {/* tenure bar */}
        <div style={{ marginTop: 10 }}>
          <div style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9, color: "var(--text-muted)",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5,
          }}>tenure</div>
          <div style={{
            width: 80, height: 2, borderRadius: 99,
            background: "var(--border)", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 99,
              background: `linear-gradient(90deg, ${job.color}, ${job.color}70)`,
              boxShadow: `0 0 6px ${job.color}80`,
              width: cardVisible ? `${job.tenurePct}%` : "0%",
              transition: "width 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }} />
          </div>
          <div style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9, color: job.color,
            letterSpacing: "0.06em", marginTop: 4,
          }}>{job.tenure}</div>
        </div>
      </div>

      {/* CENTER — spine node (hidden on mobile) */}
      {!isMobile && <div
        style={{
          width: 1,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 24,
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* pulse ring */}
          <div style={{
            position: "absolute",
            width: 24, height: 24, borderRadius: "50%",
            border: `1px solid ${job.color}60`,
            animation: cardVisible ? "exp-pulse 2.6s ease-in-out infinite" : "none",
          }} />
          {/* dot */}
          <div style={{
            width: 11, height: 11, borderRadius: "50%",
            background: job.color,
            boxShadow: `0 0 10px ${job.color}, 0 0 20px ${job.color}50`,
            border: "2px solid var(--bg)",
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "scale(1)" : "scale(0)",
            transition: `opacity 0.4s ease ${index * 0.1 + 0.2}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.2}s`,
          }} />
        </div>
      </div>}

      {/* RIGHT — job card */}
      <div style={{
        flex: 1,
        paddingLeft: isMobile ? 0 : 36,
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? "translateX(0)" : "translateX(24px)",
        transition: `opacity 0.7s ease ${index * 0.1 + 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + 0.05}s`,
      }}>
        <JobCard job={job} />
      </div>
    </div>
  );
}

function useRowInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [hov, setHov] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setActiveIdx(null); }}
      style={{
        background: hov ? `linear-gradient(145deg, ${job.color}0d, #0d0d18)` : "#0c0c18",
        border: `1px solid ${hov ? job.color + "50" : "#1a1a2e"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: hov ? `0 16px 48px ${job.color}15, 0 0 0 1px ${job.color}18` : "none",
        position: "relative",
      }}
    >
      {/* top accent bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, ${job.color}, ${job.color}40, transparent)`,
      }} />

      {/* ambient glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, pointerEvents: "none",
        width: 180, height: 180,
        background: `radial-gradient(circle at top right, ${job.color}${hov ? "14" : "07"}, transparent 65%)`,
        transition: "background 0.4s",
      }} />

      {/* header */}
      <div style={{ padding: "20px 24px 16px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* initial badge */}
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: job.color + "15",
            border: `1px solid ${job.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 15, fontWeight: 800, color: job.color,
          }}>
            {job.company[0]}
          </div>
          <div>
            <h3 style={{
              fontSize: 17, fontWeight: 700, color: "#f0f0ff",
              letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0,
            }}>{job.role}</h3>
            <div style={{ fontSize: 13, color: job.color, fontWeight: 500, marginTop: 2 }}>{job.company}</div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div style={{
        height: 1, margin: "0 24px",
        background: "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
      }} />

      {/* bullets */}
      <div style={{ padding: "16px 24px 4px" }}>
        {job.bullets.map((b, i) => (
          <BulletRow
            key={i}
            bullet={b}
            color={job.color}
            index={i}
            active={activeIdx === i}
            onEnter={() => setActiveIdx(i)}
          />
        ))}
      </div>

      {/* tags */}
      <div style={{ padding: "12px 24px 20px", display: "flex", flexWrap: "wrap", gap: 7 }}>
        {job.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, padding: "3px 9px", borderRadius: 6,
            background: job.color + "10",
            border: `1px solid ${job.color}25`,
            color: job.color + "bb",
            letterSpacing: "0.04em",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function BulletRow({ bullet, color, index, active, onEnter }: {
  bullet: { impact: string; text: string };
  color: string; index: number; active: boolean; onEnter: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      style={{
        display: "flex", gap: 12, alignItems: "flex-start",
        padding: "8px 10px",
        borderRadius: 8,
        marginBottom: 3,
        background: active ? color + "0c" : "transparent",
        borderLeft: `2px solid ${active ? color : "transparent"}`,
        transition: "all 0.2s ease",
        cursor: "default",
      }}
    >
      <span style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 9, color: "var(--text-muted)",
        minWidth: 18, paddingTop: 3,
        userSelect: "none", opacity: 0.45,
      }}>{String(index + 1).padStart(2, "0")}</span>

      <span style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 9, color: color,
        background: color + "15",
        border: `1px solid ${color}28`,
        borderRadius: 4,
        padding: "2px 7px",
        whiteSpace: "nowrap",
        flexShrink: 0,
        letterSpacing: "0.06em",
        fontWeight: 600,
        marginTop: 1,
      }}>{bullet.impact}</span>

      <span style={{
        fontSize: 13, lineHeight: 1.65,
        color: active ? "#d0d0e8" : "var(--text-secondary)",
        transition: "color 0.2s",
      }}>{bullet.text}</span>
    </div>
  );
}

// global keyframes injected once
if (typeof document !== "undefined") {
  if (!document.getElementById("exp-styles")) {
    const s = document.createElement("style");
    s.id = "exp-styles";
    s.textContent = `
      @keyframes exp-pulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.7); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
}
