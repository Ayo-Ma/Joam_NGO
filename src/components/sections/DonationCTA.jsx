import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Overline from "../ui/Overline";

const AMOUNTS = ["₦5,000", "₦10,000", "₦25,000", "Custom"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function DonationCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState("₦10,000");

  return (
    <section
      aria-label="Donation CTA"
      className="bg-cream py-16 lg:py-20 px-5 sm:px-8 lg:px-16"
    >
      <div ref={ref} className="max-w-container mx-auto flex justify-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="w-full max-w-[680px] bg-primary rounded-card px-8 sm:px-12 lg:px-16 py-12 text-center"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="flex justify-center"
          >
            <Overline color="gold" centered withLine={false}>
              Make a Difference Today
            </Overline>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.18}
            className="font-display font-bold text-cream-surface leading-[1.15] tracking-[-0.02em] mb-4
              text-[clamp(26px,3vw,42px)]"
          >
            Your gift becomes
            <br />
            <em className="italic text-accent">someone&apos;s tomorrow</em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.26}
            className="font-body text-[15px] leading-[1.78] text-cream-surface/65 max-w-[400px] mx-auto mb-8"
          >
            Every contribution, no matter the size, directly funds care for a
            mother, a student, or an elder who needs it most.
          </motion.p>

          {/* Amount pills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.34}
            className="flex items-center justify-center gap-2.5 flex-wrap mb-7"
          >
            {AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelected(amount)}
                className={`px-5 py-2 rounded-pill font-body font-semibold text-[14px]
                  border transition-all duration-200 cursor-pointer
                  ${
                    selected === amount
                      ? "bg-accent border-accent text-ink shadow-btn"
                      : "bg-transparent border-cream-surface/25 text-cream-surface hover:border-cream-surface/55"
                  }`}
              >
                {amount}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.42}
            className="flex justify-center"
          >
            <a
              href="/donate"
              className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-btn
                bg-accent hover:bg-accent-hover border border-accent
                font-body font-semibold text-[15px] text-ink
                shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5
                transition-all duration-200 no-underline"
            >
              Donate Now →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
