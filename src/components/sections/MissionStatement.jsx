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

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MissionStatement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-cream py-16 lg:py-24 px-5 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div
        ref={ref}
        className="max-w-container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left  Arch image */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center lg:justify-start"
        >
          <img src="/care.jpg" alt="" />

        </motion.div>

        {/* Right  Copy */}
        <div className="flex flex-col">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            <Overline color="gold">Our Mission</Overline>
          </motion.div>

          <motion.blockquote
            id="mission-heading"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
            className="font-display italic font-normal leading-[1.4] text-primary m-0 mb-6
              text-[clamp(22px,2.6vw,38px)]"
          >
            &ldquo;We believe dignity is not a privilege of the few, but the{" "}
            <em className="not-italic text-accent">birthright</em> of every
            mother, child, and elder.&rdquo;
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.3}
            className="font-body text-[15px] leading-[1.85] text-ink-secondary max-w-[460px]"
          >
            The JOAM Foundation exists to close the gaps that leave the
            vulnerable behind providing safe maternal care, educational
            opportunity, and compassionate support for the elderly across
            Nigeria.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
