"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "skills", "experience", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled ? "rgba(6,6,9,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,26,46,0.8)" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "-0.02em",
            }}
          >
            JG
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 13,
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
            }}
          >
            jithin.dev
          </span>
        </a>

        {/* Desktop nav */}
        <ul
          style={{ display: "flex", gap: 4, listStyle: "none", alignItems: "center" }}
          className="hidden md:flex"
        >
          {links.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    color: isActive ? "var(--violet-bright)" : "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: 6,
                    display: "block",
                    transition: "all 0.2s",
                    background: isActive ? "rgba(124,58,237,0.12)" : "transparent",
                    letterSpacing: "0.04em",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
          <li style={{ marginLeft: 8 }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                color: "#fff",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                padding: "8px 18px",
                borderRadius: 6,
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "opacity 0.2s",
                display: "block",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              résumé ↗
            </a>
          </li>
        </ul>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--border2)",
            borderRadius: 6,
            color: "var(--text-primary)",
            cursor: "none",
            fontSize: 16,
            padding: "6px 10px",
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            background: "rgba(6,6,9,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid var(--border)",
            padding: "20px 32px 28px",
          }}
          className="md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 15,
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "13px 0",
                borderBottom: "1px solid var(--border)",
                letterSpacing: "0.04em",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
