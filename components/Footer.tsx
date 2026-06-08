"use client";

import { useEffect, useState } from "react";

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

export default function Footer() {
  const isMobile = useMobile();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: isMobile ? "24px 20px" : "28px 32px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        flexWrap: "wrap",
        gap: isMobile ? 16 : 12,
        position: "relative",
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 12,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "var(--violet-bright)" }}>Jithin George Jose</span>
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        built with Next.js · TypeScript · love
      </p>
      <div style={{ display: "flex", gap: 20 }}>
        {[
          { label: "GitHub", href: "https://github.com/jithinnnn" },
          { label: "LinkedIn", href: "https://linkedin.com/in/jithin-george-272bb8246/" },
          { label: "Email", href: "mailto:jithingeorge165@gmail.com" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              color: "var(--text-muted)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--violet-bright)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
