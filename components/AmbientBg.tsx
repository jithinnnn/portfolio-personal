"use client";

import { useEffect, useRef } from "react";

// Slowly morphing radial gradients that shift as the user scrolls
export default function AmbientBg() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? y / max : 0;

      if (ref1.current) {
        // Moves from top-left to bottom-right
        ref1.current.style.top = `${10 + t * 60}%`;
        ref1.current.style.left = `${-10 + t * 20}%`;
        ref1.current.style.opacity = String(0.5 + t * 0.3);
      }
      if (ref2.current) {
        // Moves from bottom-right upward
        ref2.current.style.top = `${70 - t * 50}%`;
        ref2.current.style.right = `${-5 + t * 15}%`;
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
          width: 700,
          height: 700,
          top: "10%",
          left: "-10%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 65%)",
          transition: "top 0.8s ease, left 0.8s ease, opacity 0.8s ease",
          pointerEvents: "none",
        }}
      />
      {/* Cyan blob */}
      <div
        ref={ref2}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: "70%",
          right: "-5%",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 65%)",
          transition: "top 0.8s ease, right 0.8s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
