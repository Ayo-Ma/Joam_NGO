import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "../ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

export default function ImpactStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-label="Stories of Impact"
      className="bg-primary py-16 lg:py-24 px-5 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div
        ref={ref}
        className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left — Story copy */}
        <div className="flex flex-col">
          {/* Tag pill */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="mb-7"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-pill border border-accent/40 font-body font-semibold text-[11px] tracking-[0.16em] uppercase text-accent">
              Stories of Impact
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="font-display font-bold text-cream-surface leading-[1.12] tracking-[-0.02em] mb-7
              text-[clamp(32px,4vw,54px)]"
          >
            She arrived alone.
            <br />
            She left a{" "}
            <em className="italic text-accent">mother.</em>
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="font-body text-[15px] leading-[1.85] text-cream-surface/70 mb-4 max-w-[460px]"
          >
            When Amara came to our maternal clinic in labour with no one beside
            her, our midwives stayed through the night. Today she holds a
            healthy daughter — and a place in our mothers&apos; support circle.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.28}
            className="font-body text-[15px] leading-[1.85] text-cream-surface/50 mb-10 max-w-[440px]"
          >
            Her story is one of thousands. Each begins the same way: someone
            chose to care.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.36}
          >
            <Button variant="primary" href="/blog">
              Read Her Story
            </Button>
          </motion.div>
        </div>

        {/* Right — Image placeholder */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden lg:block"
        >
          <div className="relative w-full aspect-[4/3] bg-primary-mid/50 border border-cream-surface/[0.08] rounded-[2px] overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-px h-10 bg-cream-surface/15" />
              <span className="font-body text-[10px] font-medium tracking-[0.14em] uppercase text-cream-surface/30 text-center px-8">
                Editorial Portrait
              </span>
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <div className="bg-cream-surface/[0.07] border border-cream-surface/[0.08] rounded-[2px] px-4 py-1.5">
                <span className="font-body text-[9px] font-medium tracking-[0.1em] uppercase text-cream-surface/35 whitespace-nowrap">
                  Editorial Portrait — Amara &amp; Daughter, Wide
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
