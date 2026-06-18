import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Overline from "../ui/Overline";

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

export default function VolunteerCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="volunteer-heading"
      className="bg-accent py-16 lg:py-24 px-5 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div
        ref={ref}
        className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left  Copy */}
        <div className="flex flex-col">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            <Overline color="green">Join the Movement</Overline>
          </motion.div>

          <motion.h2
            id="volunteer-heading"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="font-display font-bold text-primary leading-[1.12] tracking-[-0.02em] mb-5
              text-[clamp(30px,3.8vw,50px)]"
          >
            Care has many hands.
            <br />
            <em className="italic text-primary/75">Will you lend yours?</em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="font-body text-[15px] leading-[1.85] text-primary/70 max-w-[400px] mb-9"
          >
            Whether you give an hour or a lifetime, there is a place for you in
            this work. Volunteers are the heartbeat of everything we do.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.3}
          >
            <a
              href="/volunteer"
              className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-btn
                bg-primary hover:bg-primary-mid border border-primary
                font-body font-semibold text-[15px] text-cream-surface
                hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              Get Involved →
            </a>
          </motion.div>
        </div>

        {/* Right — Image placeholder */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden lg:block"
        >
          <div className="relative w-full aspect-[4/3] bg-cream-alt/40  rounded-[2px] overflow-hidden">
           <img src="/hands.jpg"  alt="volunteers strecthing their hands" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
