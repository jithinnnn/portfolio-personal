"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const marqueeItems = [
  "Angular 16", "React", "Next.js", "TypeScript", "WebSockets",
  "Node.js", "Express", "AWS S3", "ECharts", "WaveSurfer.js",
  "Decimal.js", "jsPDF", "Redux", "REST APIs", "Google Maps API",
];

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" ref={ref} style={{ position: "relative", zIndex: 1, padding: "120px 0" }}>
      {/* Marquee strip */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 0",
          marginBottom: 100,
          background: "rgba(124,58,237,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 48,
            width: "max-content",
            animation: "marquee 30s linear infinite",
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 48,
              }}
            >
              {item}
              <span style={{ color: "var(--violet)", opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <div style={{ width: 24, height: 1, background: "var(--violet-bright)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--violet-bright)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            about me
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gap: 64,
            gridTemplateColumns: "1fr",
          }}
          className="about-grid"
        >
          {/* Left: text */}
          <div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 54px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 32,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Building things that
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c4b5fd, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                actually matter
              </span>
            </h2>

            {[
              "I'm a Frontend Engineer based in Bangalore with 1.6+ years of production experience building Angular and React applications. My work spans ERP workflows, AI-powered healthcare platforms, and real-time clinical automation.",
              "I've engineered Speech-to-Text pipelines that cut documentation effort by ~40%, built financial modules with zero floating-point errors using Decimal.js, and shipped audio waveform visualisations doctors actually use every day.",
              "I care deeply about clean code, fast interfaces, and solving real problems — not hypothetical ones.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "var(--text-secondary)",
                  marginBottom: 18,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s`,
                }}
              >
                {para}
              </p>
            ))}

            {/* Education */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 32,
                padding: "18px 22px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s",
                maxWidth: 480,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  width: 44,
                  height: 44,
                  background: "rgba(124,58,237,0.1)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                🎓
              </div>
              <div>
                <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500, marginBottom: 2 }}>
                  B.Tech in Information Technology
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Amal Jyothi College of Engineering · 2019–2023
                </p>
              </div>
            </div>
          </div>

          {/* Right: card stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* Avatar placeholder with morph blob */}
            <div
              style={{
                position: "relative",
                height: 220,
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 180,
                  height: 180,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))",
                  animation: "blob-morph 8s ease-in-out infinite",
                }}
              />
              <div style={{ position: "relative", textAlign: "center" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#fff",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  JG
                </div>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, color: "var(--text-secondary)" }}>
                  Bangalore, India
                </p>
              </div>
            </div>

            {/* Currently card */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 22,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  color: "var(--violet-bright)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                // currently
              </p>
              {[
                { icon: "⚡", label: "building", value: "ERP & HMS Systems at Probeplus" },
                { icon: "📖", label: "learning", value: "System design & React patterns" },
                { icon: "🎯", label: "target", value: "Senior Frontend roles" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 10,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginRight: 6,
                      }}
                    >
                      {item.label}:
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact quick links */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "LinkedIn", href: "https://linkedin.com/in/jithin-george-272bb8246/" },
                { label: "GitHub", href: "https://github.com/jithinnnn" },
                { label: "Email", href: "mailto:jithingeorge165@gmail.com" },
              ].map((l) => (
                <QuickLink key={l.label} {...l} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        color: hov ? "var(--violet-bright)" : "var(--text-muted)",
        border: `1px solid ${hov ? "rgba(139,92,246,0.4)" : "var(--border)"}`,
        background: hov ? "rgba(124,58,237,0.08)" : "var(--surface)",
        borderRadius: 8,
        padding: "10px 0",
        textAlign: "center",
        textDecoration: "none",
        transition: "all 0.22s ease",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </a>
  );
}
