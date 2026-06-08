import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import AmbientBg from "@/components/AmbientBg";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <ParticleBackground />
      <AmbientBg />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider accent="cyan" />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider accent="cyan" />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function SectionDivider({ accent = "violet" }: { accent?: "violet" | "cyan" }) {
  const color = accent === "cyan" ? "rgba(6,182,212,0.15)" : "rgba(124,58,237,0.15)";
  const glow = accent === "cyan" ? "rgba(6,182,212,0.4)" : "rgba(124,58,237,0.4)";
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 32px",
      }}
    >
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${color} 20%, ${glow} 50%, ${color} 80%, transparent 100%)`,
          boxShadow: `0 0 12px ${glow}`,
        }}
      />
    </div>
  );
}
