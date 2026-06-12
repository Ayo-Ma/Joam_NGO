import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Overline from "../ui/Overline";

const STATS = [
  { value: "3,200+", label: "Mothers Supported" },
  { value: "850+",   label: "Students Funded" },
  { value: "1,500+", label: "Elders Served" },
  { value: "12",     label: "Years of Service" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function ImpactNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      aria-label="Impact Numbers"
      className="bg-primary py-16 lg:py-20 px-5 sm:px-8 lg:px-16"
    >
      <div ref={ref} className="max-w-container mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="flex justify-center mb-10"
        >
          <Overline color="gold" centered withLine={false}>
            Our Impact, in Numbers
          </Overline>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.1 + 0.1}
              className="flex flex-col items-center py-8 px-4 text-center border-r border-b lg:border-b-0 border-cream-surface/10 last:border-r-0 even:border-r-0 lg:even:border-r lg:last:border-r-0"
            >
              <span className="font-display font-bold text-accent leading-none tracking-[-0.03em] text-[clamp(44px,5vw,72px)]">
                {stat.value}
              </span>
              <span className="font-body font-semibold text-[11px] tracking-[0.16em] uppercase text-cream-surface/55 mt-3">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
