"use client";

import { useRef, useEffect, useState } from "react";

function useInView(t = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return { ref, visible: v };
}

const links = [
  {
    icon: "✉",
    label: "Email",
    value: "jithingeorge165@gmail.com",
    href: "mailto:jithingeorge165@gmail.com",
    color: "#8b5cf6",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "/in/jithin-george-272bb8246",
    href: "https://linkedin.com/in/jithin-george-272bb8246/",
    color: "#0ea5e9",
  },
  {
    icon: "gh",
    label: "GitHub",
    value: "github.com/jithinnnn",
    href: "https://github.com/jithinnnn",
    color: "#e2e8f0",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+91 8606218292",
    href: "tel:+918606218292",
    color: "#22c55e",
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

export default function Contact() {
  const { ref, visible } = useInView();
  const isMobile = useMobile();

  return (
    <section id="contact" ref={ref} style={{ position: "relative", zIndex: 1, padding: isMobile ? "80px 20px 80px" : "120px 32px 160px" }}>
      {/* Background blob */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: isMobile ? "100vw" : 800,
          height: isMobile ? 300 : 400,
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Big headline */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                color: "var(--text-secondary)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Open to opportunities
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5.5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              paddingBottom: 4,
            }}
          >
            <span style={{ color: "var(--text-primary)", display: "block" }}>Let&apos;s build</span>
            <span
              style={{
                display: "block",
                background: "linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 40%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingBottom: 6,
              }}
            >
              something great!
            </span>
          </h2>

          <p
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 440,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            I&apos;m actively looking for frontend
             opportunities.
            If you have a role or a project — let&apos;s talk.
          </p>

          <a
            href="mailto:jithingeorge165@gmail.com"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              padding: "16px 40px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              letterSpacing: "0.02em",
              transition: "all 0.3s ease",
              boxShadow: "0 0 0 rgba(124,58,237,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(6,182,212,0.15)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(124,58,237,0)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            say hello →
          </a>
        </div>

        {/* Contact cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {links.map((item, i) => (
            <ContactCard
              key={item.label}
              item={item}
              delay={i * 0.09}
              visible={visible}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string;
  color: string;
}

function ContactCard({ item, delay, visible }: { item: ContactItem; delay: number; visible: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        background: hov ? `${item.color}08` : "var(--surface)",
        border: `1px solid ${hov ? item.color + "44" : "var(--border)"}`,
        borderRadius: 12,
        padding: "20px",
        textDecoration: "none",
        transition: "all 0.25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}s`,
        boxShadow: hov ? `0 8px 32px ${item.color}14` : "none",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: hov ? `${item.color}18` : "rgba(255,255,255,0.04)",
          border: `1px solid ${hov ? item.color + "33" : "var(--border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontFamily: "var(--font-mono), monospace",
          color: hov ? item.color : "var(--text-muted)",
          fontWeight: 600,
          marginBottom: 14,
          transition: "all 0.25s",
        }}
      >
        {item.icon}
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 5,
        }}
      >
        {item.label}
      </p>
      <p
        style={{
          fontSize: 12,
          color: hov ? "var(--text-primary)" : "var(--text-secondary)",
          transition: "color 0.2s",
          wordBreak: "break-all",
          lineHeight: 1.4,
        }}
      >
        {item.value}
      </p>
    </a>
  );
}
