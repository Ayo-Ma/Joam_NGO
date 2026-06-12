import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Overline from "../ui/Overline";

const PARTNER_COUNT = 5;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function PartnersStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      aria-label="Partners and Supporters"
      className="bg-cream-surface py-14 lg:py-16 px-5 sm:px-8 lg:px-16"
    >
      <div ref={ref} className="max-w-container mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="flex justify-center mb-8"
        >
          <Overline color="gold" centered withLine={false}>
            Our Partners &amp; Supporters
          </Overline>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: PARTNER_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.07 + 0.08}
              className="flex items-center justify-center h-16 bg-cream-alt/70 border border-border/50
                rounded-card hover:border-border transition-colors duration-200"
            >
              <span className="font-body font-semibold text-[11px] tracking-[0.16em] uppercase text-ink-muted/35">
                Logo
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
