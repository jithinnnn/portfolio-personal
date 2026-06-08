"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientBg() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // Don't apply scroll parallax on mobile — it causes misalignment
      if (window.innerWidth < 768) return;

      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? y / max : 0;

      if (ref1.current) {
        ref1.current.style.top = `${10 + t * 60}%`;
        ref1.current.style.left = `${-20 + t * 20}%`;
        ref1.current.style.opacity = String(0.5 + t * 0.3);
      }
      if (ref2.current) {
        ref2.current.style.top = `${70 - t * 50}%`;
        ref2.current.style.right = `${-15 + t * 15}%`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Violet blob */}
      <div
        ref={ref1}
        style={{
          position: "absolute",
          width: isMobile ? "100vw" : "clamp(400px, 50vw, 700px)",
          height: isMobile ? "60vh" : "clamp(400px, 50vw, 700px)",
          top: isMobile ? "-20%" : "10%",
          left: isMobile ? "-20%" : "-20%",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Cyan blob */}
      <div
        ref={ref2}
        style={{
          position: "absolute",
          width: isMobile ? "100vw" : "clamp(300px, 40vw, 500px)",
          height: isMobile ? "60vh" : "clamp(300px, 40vw, 500px)",
          top: isMobile ? "40%" : "70%",
          right: isMobile ? "-20%" : "-15%",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
