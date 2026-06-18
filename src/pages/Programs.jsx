import { useState } from "react";
import { motion } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation — Programs Page
 * Sections: Hero → Maternal Healthcare → Student Scholarships →
 *           Elderly Care → How We Deliver → CTA Block
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Programs() {
  return (
    <main className="overflow-x-hidden">
      <ProgramsHero />
      <MaternalHealthcare />
      <StudentScholarships />
      <ElderlyCare />
      <HowWeDeliver />
      <ProgramsCTA />
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. PAGE HERO
══════════════════════════════════════════════════ */
function ProgramsHero() {
  return (
    <section
      aria-label="Programs hero"
      className="relative bg-primary overflow-hidden pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(45,106,79,0.38) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-16 lg:px-10 sm:px-6 py-20 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Overline color="cream">Our Work</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[560px] mb-5"
        >
          Three Pillars.
          <br />
          <em className="italic text-accent">One Promise.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[500px]"
        >
          Every programme JOAM runs exists to answer the same question: what
          does a person need to live with dignity? For a mother, it is safe
          care. For a student, it is a fighting chance. For an elder, it is not
          being forgotten.
        </motion.p>

        {/* Programme nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="flex gap-3 flex-wrap mt-10 md:mt-7"
        >
          {[
            { label: "Maternal Healthcare", href: "#maternal" },
            { label: "Student Scholarships", href: "#scholarships" },
            { label: "Elderly Care", href: "#elderly" },
          ].map((p) => (
            <a
              key={p.label}
              href={p.href}
              className="font-body text-[12px] font-semibold tracking-[0.08em]
                text-cream-surface/70 hover:text-cream-surface
                border border-cream-surface/20 hover:border-cream-surface/50
                rounded-pill px-4 py-2 no-underline transition-all duration-200"
            >
              {p.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="mt-14 md:mt-10 h-px bg-cream-surface/10 origin-left"
        />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   SHARED — Programme Section Layout
══════════════════════════════════════════════════ */
function ProgrammeSection({
  id,
  pillar,
  headline,
  headlineItalic,
  subheadline,
  whatWeDo,
  whoWeServe,
  donations,
  storyOverline,
  storyHeadline,
  storyPlaceholder,
  pullQuote,
  cta,
  reverse = false,
  bg = "cream",
}) {
  const bgClass = bg === "surface" ? "bg-cream-surface" : "bg-cream";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`${bgClass} py-20 md:py-14 px-16 lg:px-10 sm:px-6`}
    >
      <div className="max-w-container mx-auto">
        {/* ── Top: image + core info ─────────────────── */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-start mb-14 md:mb-10`}
        >
          {/* Image side */}
          <motion.div
            {...(reverse ? fadeRight(0) : fadeLeft(0))}
            className={reverse ? "order-last md:order-first" : "order-first"}
          >
            <ProgrammeImage id={id} />
          </motion.div>

          {/* Copy side */}
          <motion.div
            {...(reverse ? fadeLeft(0.1) : fadeRight(0.1))}
            className={reverse ? "order-first md:order-last" : "order-last"}
          >
            <Overline color="gold">{pillar}</Overline>

            <h2
              id={`${id}-heading`}
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,2.8vw,36px)] mb-4"
            >
              {headline}
              <br />
              <em className="not-italic text-primary">{headlineItalic}</em>
            </h2>

            <p className="font-body text-[15px] leading-[1.78] text-ink-secondary mb-6">
              {subheadline}
            </p>

            {/* What we do */}
            <div className="mb-5">
              <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted mb-2">
                What We Do
              </p>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {whatWeDo}
              </p>
            </div>

            {/* Who we serve */}
            <div>
              <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted mb-2">
                Who We Serve
              </p>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {whoWeServe}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Donation table ─────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="mb-14 md:mb-10">
          <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted mb-4">
            What Your Donation Funds
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {donations.map((d, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                className="flex items-start gap-4 p-5 bg-primary-light border border-primary/[0.07]
                  rounded-[4px] hover:border-primary/20 transition-colors duration-200"
              >
                <div className="shrink-0 pt-0.5">
                  <span className="font-display font-bold text-primary text-[18px] leading-none block">
                    {d.amount}
                  </span>
                </div>
                <div className="w-px self-stretch bg-border shrink-0" />
                <p className="font-body text-[13px] leading-[1.65] text-ink-secondary">
                  {d.covers}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Impact story ───────────────────────────── */}
        <motion.div
          {...fadeUp(0.1)}
          className="bg-primary rounded-[4px] p-8 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center"
        >
          {/* Story image */}
          <div
            className="w-full aspect-[4/3] bg-primary-mid/50 border border-cream-surface/[0.06]
            rounded-[2px] flex items-center justify-center relative overflow-hidden"
          >
            <div className="flex flex-col items-center gap-2 text-center px-6">
              <div className="w-px h-7 bg-cream-surface/20" />
              <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-cream-surface/22">
                {storyOverline}
              </span>
            </div>
          </div>

          {/* Story copy */}
          <div>
            <span className="font-body text-[10px] font-semibold tracking-[0.14em] uppercase text-accent block mb-3">
              {storyOverline}
            </span>

            <h3 className="font-display font-bold text-cream-surface text-[20px] leading-[1.25] mb-4">
              {storyHeadline}
            </h3>

            <p className="font-body text-[13px] leading-[1.75] text-cream-surface/55 mb-6">
              {storyPlaceholder}
            </p>

            {/* Pull quote placeholder */}
            <figure className="border-l-2 border-accent/40 pl-4 mb-6">
              <blockquote
                className="font-display italic text-[16px] leading-[1.5]
                text-cream-surface/75 m-0 mb-2"
              >
                "{pullQuote}"
              </blockquote>
              <figcaption className="font-body text-[11px] text-cream-surface/40">
                — [First name], [Location]
              </figcaption>
            </figure>

            <a
              href="/donate"
              className="inline-flex items-center gap-2 font-body text-[12px] font-semibold
                tracking-[0.08em] uppercase text-accent no-underline
                border-b border-accent/30 hover:border-accent pb-px
                transition-colors duration-200"
            >
              {cta} →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Programme image placeholder */
function ProgrammeImage({ id }) {
  const labels = {
    maternal: { top: "Programme Photograph", bottom: "Maternal Healthcare" },
    scholarships: {
      top: "Programme Photograph",
      bottom: "Student Scholarships",
    },
    elderly: { top: "Programme Photograph", bottom: "Elderly Care" },
  };
  const l = labels[id] || labels.maternal;

  return (
    <div
      className="w-full aspect-[4/3] bg-primary-light border border-primary/[0.08]
        rounded-[2px] relative overflow-hidden flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-2 text-center px-8">
        <div className="w-px h-8 bg-primary/20" />
        <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-primary/28">
          {l.top}
        </span>
        <span className="font-body text-[9px] text-primary/20 tracking-[0.04em]">
          — {l.bottom}
        </span>
      </div>
      {/* Watermark number */}
      <div className="absolute bottom-4 right-5 opacity-[0.04]">
        <span className="font-display font-bold text-[64px] text-primary leading-none select-none">
          {id === "maternal" ? "01" : id === "scholarships" ? "02" : "03"}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   2. MATERNAL HEALTHCARE
══════════════════════════════════════════════════ */
function MaternalHealthcare() {
  return (
    <ProgrammeSection
      id="maternal"
      bg="cream"
      pillar="Pillar One"
      headline="No Mother Faces"
      headlineItalic="Childbirth Alone."
      subheadline="In Nigeria, preventable complications during childbirth remain one of the leading causes of maternal death — almost always in communities where care is too far, too expensive, or simply absent. We go to where the gaps are."
      whatWeDo="The JOAM maternal healthcare programme provides free prenatal care, skilled birth attendance, postnatal support, and emergency referral services to mothers in underserved communities. We do not wait for women to find us. We build presence in the places that formal healthcare systems have not reached."
      whoWeServe="Financially disadvantaged pregnant women and new mothers — many of whom would otherwise deliver at home, without skilled support, without a safety net. Women for whom the nearest clinic is hours away or costs more than a month's income."
      donations={[
        {
          amount: "₦5,000",
          covers: "Prenatal care for one mother for one month",
        },
        {
          amount: "₦15,000",
          covers: "Full antenatal support through a full-term pregnancy",
        },
        { amount: "₦25,000", covers: "Emergency delivery care for one mother" },
        {
          amount: "₦50,000",
          covers:
            "Postnatal care and support for two mothers and their newborns",
        },
      ]}
      storyOverline="From the Field"
      storyHeadline="She came in alone. She left with a daughter and a community."
      storyPlaceholder="[Client to provide: first name, location, what she faced, what the foundation provided, what changed. 4–5 sentences maximum. Specific, not sentimental.]"
      pullQuote="[Direct quote from beneficiary — to be filled]"
      cta="Support Maternal Care"
      reverse={false}
    />
  );
}

/* ══════════════════════════════════════════════════
   3. STUDENT SCHOLARSHIPS
══════════════════════════════════════════════════ */
function StudentScholarships() {
  return (
    <ProgrammeSection
      id="scholarships"
      bg="surface"
      pillar="Pillar Two"
      headline="A Student's Future Should Not"
      headlineItalic="Depend on Their Family's Means."
      subheadline="Across Nigeria, academically gifted students leave school every year — not because they failed, but because their families ran out of money. JOAM scholarships exist to make sure that never happens to a student we can reach."
      whatWeDo="The JOAM scholarship programme provides full and partial financial support to academically gifted students from low-income households. Coverage includes school fees, textbooks, examination registration, and mentorship from professionals in the student's field of interest. We follow our scholars — we do not fund one term and disappear."
      whoWeServe="Students at primary, secondary, and tertiary level who demonstrate academic ability but face financial barriers that would force them out of education. Selection prioritises students whose families have exhausted every available option."
      donations={[
        {
          amount: "₦10,000",
          covers: "School fees for one student for one term",
        },
        {
          amount: "₦20,000",
          covers: "Full academic year support at primary level",
        },
        {
          amount: "₦35,000",
          covers: "Secondary school fees and textbooks for one year",
        },
        {
          amount: "₦75,000",
          covers: "University support — one semester, fees and materials",
        },
      ]}
      storyOverline="From the Classroom"
      storyHeadline="He passed every exam. The only thing standing between him and school was ₦[amount]."
      storyPlaceholder="[Client to provide: first name, level of education, what he was facing, what the scholarship covered, where he is now. 4–5 sentences. Specific.]"
      pullQuote="[Direct quote from scholar — to be filled]"
      cta="Fund a Scholar"
      reverse={true}
    />
  );
}

/* ══════════════════════════════════════════════════
   4. ELDERLY CARE
══════════════════════════════════════════════════ */
function ElderlyCare() {
  return (
    <ProgrammeSection
      id="elderly"
      bg="cream"
      pillar="Pillar Three"
      headline="The People Who Built This Country"
      headlineItalic="Deserve Better Than Silence."
      subheadline="Old age should not mean isolation. It should not mean going without food, without medication, without someone who remembers your name. For too many elders in Nigeria, that is exactly what it means. We are here to change that."
      whatWeDo="The JOAM elderly care programme delivers regular healthcare checks, essential food provisions, and consistent human presence to elderly individuals living without adequate family support. We are not running a facility. We are bringing care to people where they already live — in their homes, in their communities, with their dignity intact."
      whoWeServe="Elderly men and women — particularly those without family nearby, living on inadequate income, or managing health conditions without access to consistent medical attention. People the system has stopped counting."
      donations={[
        {
          amount: "₦5,000",
          covers: "Food provisions for one elder for two weeks",
        },
        {
          amount: "₦15,000",
          covers: "Monthly food and welfare support for one elder",
        },
        {
          amount: "₦25,000",
          covers: "Monthly healthcare check and medication for one elder",
        },
        {
          amount: "₦60,000",
          covers:
            "Full monthly support — healthcare, food, and welfare — for one elder",
        },
      ]}
      storyOverline="From the Community"
      storyHeadline="He had not seen a doctor in [X] years. He thought no one was coming."
      storyPlaceholder="[Client to provide: first name, location, situation, what the foundation provided, what changed. 4–5 sentences. Honest and direct.]"
      pullQuote="[Direct quote from beneficiary — to be filled]"
      cta="Support Elderly Care"
      reverse={false}
    />
  );
}

/* ══════════════════════════════════════════════════
   5. HOW WE DELIVER
══════════════════════════════════════════════════ */
const METHODOLOGY = [
  {
    num: "01",
    headline: "Community-Rooted",
    body: "Every programme we run is built in partnership with the communities we serve — not designed for them from the outside. We listen before we act. We stay after we start. The people we serve are not recipients. They are the reason we exist.",
  },
  {
    num: "02",
    headline: "Long-Term by Design",
    body: "We do not measure success by the number of one-time interventions we deliver. We measure it by what changes — and whether that change lasts. Our programmes are structured around sustained support, not one-off gestures.",
  },
  {
    num: "03",
    headline: "Honest About Outcomes",
    body: "We document what we do and report what we find — including when something does not work the way we intended. Transparency is not a marketing position for JOAM. It is the only way we know how to operate.",
  },
  {
    num: "04",
    headline: "Built to Scale Carefully",
    body: "We are a new foundation. We will not promise to reach every community in Nigeria by next year. What we will promise is that every community we enter, we enter properly — with the resources, the people, and the commitment to do the work right.",
  },
];

function HowWeDeliver() {
  return (
    <section
      aria-labelledby="methodology-heading"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 items-end mb-12 md:mb-8"
        >
          <div>
            <Overline color="cream">Our Methodology</Overline>
            <h2
              id="methodology-heading"
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.01em]
                text-[clamp(24px,3vw,38px)]"
            >
              We Do Not Parachute In.{" "}
              <em className="italic text-accent">We Stay.</em>
            </h2>
          </div>
          <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55 md:hidden">
            The difference between aid that works and aid that doesn't is almost
            always the same thing: presence. We build it into everything we do.
          </p>
        </motion.div>

        {/* Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {METHODOLOGY.map((m, i) => (
            <motion.div
              key={m.num}
              {...fadeUp(i * 0.09)}
              className="p-7 sm:p-5 border border-cream-surface/[0.07]
                rounded-[4px] hover:border-cream-surface/20
                transition-colors duration-250"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-7 h-7 rounded-full bg-accent/15 border border-accent/25
                  flex items-center justify-center shrink-0"
                >
                  <span className="font-display text-[11px] font-bold text-accent leading-none">
                    {m.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-cream-surface text-[18px] leading-snug">
                  {m.headline}
                </h3>
              </div>
              <p className="font-body text-[14px] leading-[1.78] text-cream-surface/55">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   6. CTA BLOCK
══════════════════════════════════════════════════ */
function ProgramsCTA() {
  return (
    <section
      aria-label="Support our programmes"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center"
        >
          {/* Left */}
          <div>
            <Overline color="gold">Every Programme Runs on Generosity</Overline>
            <h2
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.01em]
              text-[clamp(24px,3vw,40px)] mb-4"
            >
              None of This Happens{" "}
              <em className="not-italic text-primary">
                Without People Like You.
              </em>
            </h2>
            <div className="flex gap-3 flex-wrap mt-6">
              <Button variant="primary" href="/donate">
                Donate Now
              </Button>
              <Button variant="ghost-light" href="/partner">
                Become a Partner
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <p className="font-body text-[15px] leading-[1.8] text-ink-secondary">
              A mother does not deliver safely by accident. A student does not
              stay in school by luck. An elder does not receive care through
              wishful thinking. Every single outcome this foundation produces
              begins with someone choosing to give.
            </p>
            <p className="font-body text-[15px] leading-[1.8] text-ink-secondary">
              You have read what we do. You know who we serve. You understand
              what your money does when it arrives here.
            </p>
            <p className="font-display italic text-[18px] text-primary leading-snug">
              "The next step is yours."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
