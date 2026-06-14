import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Overline from "../ui/Overline";
import Button from "../ui/Button";

const PROGRAMS = [
  {
    num: "01",
    tag: "Maternal Healthcare",
    headline: "No mother faces",
    headlineAccent: "childbirth alone",
    body: "Safe deliveries, prenatal support, and emergency care for mothers in underserved communities — meeting women where they are, when it matters most.",
    href: "/programs#maternal",
    imageCaption: "Maternal Care",
    reverse: false,
    imgSrc: "/maternalCare.jpg",
  },
  {
    num: "02",
    tag: "Student Scholarships",
    headline: "Keeping bright minds",
    headlineAccent: "in the classroom",
    body: "Full and partial scholarships covering fees, books, and mentorship — so a determined student's future is never decided by their family's means.",
    href: "/programs#scholarships",
    imageCaption: "Student Scholarships",
    reverse: true,
    imgSrc: "/studentinClass.jpg",
  },
  {
    num: "03",
    tag: "Elderly Care",
    headline: "Honouring those who",
    headlineAccent: "came before us",
    body: "Healthcare, companionship, and essential provisions for elders living without support — restoring dignity to the final chapters of life.",
    href: "/programs#elderly",
    imageCaption: "Elderly Care",
    reverse: false,
    imgSrc: "/baba.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
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

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProgramsOverview() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="programs-heading"
      className="bg-cream-surface py-16 lg:py-20 px-5 sm:px-8 lg:px-16"
    >
      <div className="max-w-container mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              custom={0}
            >
              <Overline color="gold">What We Do</Overline>
              <h2
                id="programs-heading"
                className="font-display font-bold text-ink leading-[1.12] tracking-[-0.01em] text-[clamp(30px,3.8vw,48px)]"
              >
                Three pillars,
                <br />
                <em className="not-italic text-primary">one promise</em>
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              custom={0.15}
              className="hidden lg:block"
            >
              <p className="font-body text-[15px] leading-relaxed text-ink-secondary max-w-sm">
                Every programme is built around long-term presence, honest
                outcomes, and the dignity of the communities we serve.
              </p>
              <a
                href="/programs"
                className="inline-flex items-center gap-1.5 mt-5 font-body font-semibold text-[12px]
                  tracking-[0.1em] uppercase text-accent hover:text-accent-hover no-underline transition-colors"
              >
                View All Programs →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-10 h-px bg-border origin-left"
          />
        </div>

        {/* Program rows */}
        <div className="flex flex-col">
          {PROGRAMS.map((program) => (
            <ProgramRow key={program.num} program={program} />
          ))}
        </div>

        {/* Bottom CTA */}
        <BottomCTA />
      </div>
    </section>
  );
}

function ProgramRow({ program }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const imgVariant = program.reverse ? fadeRight : fadeLeft;
  const copyVariant = program.reverse ? fadeLeft : fadeRight;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 border-b border-border last:border-b-0"
    >
      {/* Image */}
      <motion.div
        variants={imgVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={program.reverse ? "lg:order-last" : ""}
      >
        <div className="relative w-full aspect-[4/3] bg-cream-alt rounded-t-[120px] overflow-hidden border border-border/60 group">
          <img
            src={program.imgSrc}
            alt={program.imageCaption}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute bottom-4 right-5">
            <span className="font-display text-[72px] font-bold leading-none text-ink/[0.05] select-none">
              {program.num}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        variants={copyVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`flex flex-col ${program.reverse ? "lg:order-first" : ""}`}
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="font-display text-[16px] italic text-accent leading-none">
            {program.num}
          </span>
          <Overline color="gold" withLine={false}>
            {program.tag}
          </Overline>
        </div>

        <h3
          className="font-display font-bold text-ink leading-[1.2] tracking-[-0.01em] mb-4
          text-[clamp(24px,2.8vw,36px)]"
        >
          {program.headline}
          <br />
          <em className="not-italic text-primary">{program.headlineAccent}</em>
        </h3>

        <div className="w-10 h-[2px] bg-accent mb-5" />

        <p className="font-body text-[15px] leading-[1.8] text-ink-secondary mb-7 max-w-[400px]">
          {program.body}
        </p>

        <a
          href={program.href}
          className="inline-flex items-center gap-2 font-body font-semibold text-[12px]
            tracking-[0.1em] uppercase text-primary hover:text-primary-mid no-underline
            transition-colors duration-200 group/link w-fit"
        >
          <span className="relative">
            Learn More
            <span className="absolute -bottom-0.5 left-0 w-0 group-hover/link:w-full h-px bg-primary transition-all duration-250" />
          </span>
          <span className="text-accent">→</span>
        </a>
      </motion.div>
    </div>
  );
}

function BottomCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={0}
      className="mt-12 pt-10 border-t border-border flex items-center justify-between flex-wrap gap-6"
    >
      <div>
        <p className="font-display text-[20px] font-bold text-ink leading-snug">
          Every programme runs on{" "}
          <em className="not-italic text-primary">generosity like yours.</em>
        </p>
        <p className="font-body text-[14px] text-ink-secondary mt-1.5">
          See exactly where your donation goes before you give.
        </p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button variant="primary" href="/donate">
          Donate Now
        </Button>
        <Button variant="ghost-light" href="/programs">
          All Programs
        </Button>
      </div>
    </motion.div>
  );
}
