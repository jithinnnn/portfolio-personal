"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: 5, width: 22 }}>
      <span style={{
        display: "block", width: 22, height: 2, borderRadius: 2,
        background: "var(--text-primary)", transformOrigin: "center",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s",
        transform: open ? "translateY(7px) rotate(45deg)" : "none",
      }} />
      <span style={{
        display: "block", width: 22, height: 2, borderRadius: 2,
        background: "var(--text-primary)",
        transition: "opacity 0.2s, transform 0.2s",
        opacity: open ? 0 : 1,
      }} />
      <span style={{
        display: "block", width: 22, height: 2, borderRadius: 2,
        background: "var(--text-primary)", transformOrigin: "center",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
      }} />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile]   = useState(false);

  /* track viewport width */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* close menu when resizing to desktop */
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  /* scroll tracking */
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

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        background: scrolled || menuOpen ? "rgba(6,6,9,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,26,46,0.8)" : "1px solid transparent",
      }}>
        <nav style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 20px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#fff",
              fontFamily: "var(--font-mono), monospace", letterSpacing: "-0.02em",
              flexShrink: 0,
            }}>JG</div>
            <span style={{
              fontFamily: "var(--font-mono), monospace", fontSize: 13,
              color: "var(--text-secondary)", letterSpacing: "0.02em",
            }}>jithin.dev</span>
          </a>

          {/* Desktop nav — only visible when NOT mobile */}
          {!isMobile && (
            <ul style={{ display: "flex", gap: 4, listStyle: "none", alignItems: "center" }}>
              {links.map((l) => {
                const isActive = activeSection === l.href.replace("#", "");
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      style={{
                        fontFamily: "var(--font-mono), monospace", fontSize: 12,
                        color: isActive ? "var(--violet-bright)" : "var(--text-secondary)",
                        textDecoration: "none", padding: "6px 14px", borderRadius: 6,
                        display: "block", transition: "all 0.2s",
                        background: isActive ? "rgba(124,58,237,0.12)" : "transparent",
                        letterSpacing: "0.04em",
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
                    >{l.label}</a>
                  </li>
                );
              })}
              <li style={{ marginLeft: 8 }}>
                <a
                  href="/resume.pdf"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "#fff",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    padding: "8px 18px", borderRadius: 6, textDecoration: "none",
                    letterSpacing: "0.04em", transition: "opacity 0.2s", display: "block",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >résumé ↗</a>
              </li>
            </ul>
          )}

          {/* Burger — only visible on mobile */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border2)",
                borderRadius: 8, padding: "9px 10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}
            >
              <BurgerIcon open={menuOpen} />
            </button>
          )}
        </nav>

        {/* Mobile drawer — slides down, only rendered on mobile */}
        {isMobile && (
          <div style={{
            overflow: "hidden",
            maxHeight: menuOpen ? 500 : 0,
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
            borderTop: menuOpen ? "1px solid var(--border)" : "1px solid transparent",
          }}>
            <div style={{ padding: "8px 20px 28px" }}>
              {links.map((l, i) => {
                const isActive = activeSection === l.href.replace("#", "");
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      fontFamily: "var(--font-mono), monospace", fontSize: 15,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--violet-bright)" : "var(--text-secondary)",
                      textDecoration: "none", padding: "14px 0",
                      borderBottom: i < links.length - 1 ? "1px solid var(--border)" : "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {l.label}
                    {isActive && (
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "var(--violet-bright)",
                        boxShadow: "0 0 8px var(--violet-bright)", flexShrink: 0,
                      }} />
                    )}
                  </a>
                );
              })}

              <a
                href="/resume.pdf"
                target="_blank" rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", marginTop: 20,
                  fontFamily: "var(--font-mono), monospace", fontSize: 13,
                  fontWeight: 600, color: "#fff", textDecoration: "none",
                  padding: "14px 0", borderRadius: 10,
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  letterSpacing: "0.04em", textAlign: "center",
                }}
              >résumé ↗</a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop — tap outside to close */}
      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)",
          }}
        />
      )}
    </>
  );
}
