"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "28px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
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
