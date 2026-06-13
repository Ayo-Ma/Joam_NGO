import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Overline from "../ui/Overline";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen bg-primary flex items-center overflow-hidden pt-[72px]"
    >
      {/* Radial depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 68% 50%, rgba(45,106,79,0.35) 0%, transparent 58%), radial-gradient(ellipse at 18% 85%, rgba(0,0,0,0.18) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-container-wide mx-auto px-5 sm:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT — Copy ───────────────────────────────── */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <Overline color="cream">A Nigerian Humanitarian Foundation</Overline>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-display font-bold text-cream-surface leading-[1.07] tracking-[-0.02em] mb-7 text-[clamp(44px,5.5vw,72px)]"
          >
            Every Life<br />
            Deserves<br />
            <em className="italic text-accent">Dignity</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="font-body text-[16px] leading-[1.8] text-cream-surface/70 max-w-[420px] mb-10"
          >
            In honour of Janet Oluwaremilekun Adesina, we walk alongside
            Nigeria&apos;s mothers, students, and elders — restoring dignity
            through care that lasts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Button variant="primary" href="/donate">Donate Now</Button>
            <Button variant="ghost-dark" href="/programs">See Our Programs</Button>
          </motion.div>
        </div>

        {/* ── RIGHT — Image + floating stat ────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 36 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="hidden lg:block relative"
        >
          {/* Main image */}
          <div className="w-full aspect-[4/5] bg-primary-mid/40 border border-cream-surface/[0.06] rounded-[2px] relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <img src="./imageoofmotherandhild.webp" alt="" />
            </div>
          
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-cream-surface rounded-btn shadow-float-lg px-7 py-5 min-w-[200px] z-10"
          >
            <p className="font-display text-[30px] font-bold text-primary leading-none tracking-[-0.02em]">
              12,400+
            </p>
            <p className="font-body text-[12px] text-ink-secondary mt-1.5 leading-snug">
              lives touched across 6 states<br />since 2014
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
