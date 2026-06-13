import { useState } from "react";
import { motion } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation — Volunteer Page
 * Sections: Hero → Why Volunteer → Volunteer Roles →
 *           Sign-Up Form → What Happens Next → CTA Block
 */

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0   },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Volunteer() {
  return (
    <main className="overflow-x-hidden">
      <VolunteerHero />
      <WhyVolunteer />
      <VolunteerRoles />
      <SignUpForm />
      <WhatHappensNext />
      <VolunteerCTA />
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════ */
function VolunteerHero() {
  return (
    <section
      aria-label="Volunteer hero"
      className="relative bg-primary overflow-hidden pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 35%, rgba(45,106,79,0.38) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-16 lg:px-10 sm:px-6 py-20 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Overline color="cream">Get Involved</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[520px] mb-5"
        >
          Care Has{" "}
          <em className="italic text-accent">Many Hands.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/62 max-w-[460px] mb-10"
        >
          Some people give money. Some people give time. Some people give
          skills. All of it matters. All of it moves this work forward. If
          you have been looking for a way to be part of something real —
          this is it.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
          href="#signup-form"
          className="inline-flex items-center gap-2.5 font-body text-[14px] font-semibold
            text-ink bg-accent hover:bg-accent-hover
            px-7 py-3.5 rounded-btn no-underline
            shadow-btn hover:shadow-btn-hover
            transition-all duration-200"
        >
          Apply to Volunteer →
        </motion.a>

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
   2. WHY VOLUNTEER
══════════════════════════════════════════════════ */
const REASONS = [
  {
    num: "01",
    headline: "You Will See the Impact Directly.",
    body: "Volunteering with JOAM puts you inside the work — not reading about it in a newsletter, but present for it. You will meet the mothers, the students, and the elders whose lives are changing because someone showed up. That is not something you can get from writing a cheque.",
  },
  {
    num: "02",
    headline: "You Will Grow in Ways That Matter.",
    body: "Whether you are a medical professional, a teacher, a communications specialist, or someone with no formal credentials but genuine commitment — volunteering with JOAM will stretch you. You will problem-solve in real conditions, work alongside people whose lives look nothing like yours, and come away knowing something about yourself that you did not know before.",
  },
  {
    num: "03",
    headline: "You Will Be Part of Something That Lasts.",
    body: "JOAM Foundation is at its beginning. The people who volunteer now are not joining an institution — they are building one. The decisions made, the relationships formed, and the standards set in these early years will define what this foundation becomes. You have the chance to be part of that from the start.",
  },
];

function WhyVolunteer() {
  return (
    <section
      aria-labelledby="why-volunteer-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">

        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-2 md:grid-cols-1 gap-12 md:gap-5 items-end mb-14 md:mb-10"
        >
          <div>
            <Overline color="gold">Why It Matters</Overline>
            <h2
              id="why-volunteer-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              This Is Not Errand Work.{" "}
              <em className="not-italic text-primary">This Is the Work.</em>
            </h2>
          </div>
          <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
            JOAM volunteers are not support staff filling gaps in a system.
            They are the foundation itself — showing up in communities,
            building relationships, and making programmes possible that would
            not exist without them.
          </p>
        </motion.div>

        {/* Reasons */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.num}
              {...fadeUp(i * 0.1)}
              className="p-7 sm:p-5 border-t-[2px] border-border
                hover:border-accent transition-colors duration-250"
            >
              <span className="font-display italic text-[14px] text-accent block mb-3">
                {r.num}
              </span>
              <h3 className="font-display font-bold text-ink text-[19px] leading-[1.3] mb-3">
                {r.headline}
              </h3>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   3. VOLUNTEER ROLES
══════════════════════════════════════════════════ */
const ROLES = [
  {
    title:      "Field Support Volunteer",
    headline:   "Show Up Where It Counts.",
    body:       "Field volunteers work directly alongside our programme teams — supporting maternal care outreach, distributing provisions to elderly beneficiaries, assisting at scholarship events, and serving as a consistent human presence in the communities we serve. Physical availability required. Compassion non-negotiable.",
    commitment: "[X hours per week / month — to be confirmed by programme team]",
    tag:        "In-Person",
  },
  {
    title:      "Administrative Volunteer",
    headline:   "Keep the Foundation Running.",
    body:       "Every programme depends on systems, records, and organisation that someone has to build and maintain. Administrative volunteers support the foundation's operations — managing beneficiary records, coordinating communications, supporting reporting, and ensuring the back-end runs as well as the front-line.",
    commitment: "[X hours per week — flexible]",
    tag:        "Remote-Friendly",
  },
  {
    title:      "Fundraising Volunteer",
    headline:   "Help Us Find the People Who Care.",
    body:       "Fundraising volunteers support JOAM's donor outreach — identifying individuals and organisations who align with our mission, supporting event organisation, and helping communicate the foundation's work to new audiences. If you are well-connected, persuasive, and believe in this cause, this role multiplies your impact significantly.",
    commitment: "Project-based and ongoing options available.",
    tag:        "Flexible",
  },
  {
    title:      "Skills-Based Volunteer",
    headline:   "Bring What You Know.",
    body:       "Are you a doctor, nurse, or health professional? A teacher or education specialist? A photographer, writer, or designer? A lawyer, accountant, or finance professional? JOAM needs skilled volunteers who can contribute their expertise directly to programme delivery, communications, legal compliance, and financial management.",
    commitment: "Varies by role and project.",
    tag:        "Any Location",
  },
];

function VolunteerRoles() {
  return (
    <section
      aria-labelledby="roles-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">

        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">Where You Can Contribute</Overline>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              id="roles-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Find Your Place{" "}
              <em className="not-italic text-primary">in the Work.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.7] text-ink-secondary max-w-[320px] md:hidden">
              We need people with different skills, different availability,
              and different ways of giving.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              {...fadeUp(i * 0.09)}
              className="p-7 sm:p-5 bg-cream border border-border rounded-[4px]
                hover:border-primary/20 transition-colors duration-250 flex flex-col gap-4"
            >
              {/* Tag + title */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-ink text-[19px] leading-snug">
                    {role.title}
                  </h3>
                  <p className="font-display italic text-primary text-[15px] mt-0.5">
                    {role.headline}
                  </p>
                </div>
                <span className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase
                  text-accent bg-accent/10 border border-accent/20 rounded-pill px-2.5 py-1 shrink-0 mt-0.5">
                  {role.tag}
                </span>
              </div>

              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary flex-1">
                {role.body}
              </p>

              {/* Commitment */}
              <div className="pt-4 border-t border-border flex items-center gap-2">
                <span className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase text-ink-muted">
                  Commitment:
                </span>
                <span className="font-body text-[12px] text-ink-secondary">
                  {role.commitment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   4. SIGN-UP FORM
══════════════════════════════════════════════════ */
const INTERESTS = [
  "Field Support",
  "Administrative Support",
  "Fundraising",
  "Skills-Based",
  "Open to Any Role",
];

const AVAILABILITY = [
  "Weekdays",
  "Weekends",
  "Evenings",
  "Flexible / Project-based",
  "Remote only",
];

function SignUpForm() {
  const [interest,      setInterest]      = useState("");
  const [availability,  setAvailability]  = useState([]);
  const [submitted,     setSubmitted]     = useState(false);

  const toggleAvailability = (val) => {
    setAvailability(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  return (
    <section
      id="signup-form"
      aria-labelledby="form-heading"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-1 gap-16 md:gap-10">

        {/* LEFT — context */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="cream">Apply Now</Overline>
          <h2
            id="form-heading"
            className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-5"
          >
            Tell Us About Yourself.
          </h2>
          <p className="font-body text-[14px] leading-[1.75] text-cream-surface/58 mb-8">
            Fill in the form. We review every submission personally and will
            be in touch within [X] business days.
          </p>

          {/* What to expect */}
          <div className="space-y-4">
            {[
              "Every application is read by a real person.",
              "You will receive a personal response — not an automated reply.",
              "We will tell you exactly where your skills fit.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/25
                  flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-[10px] font-bold">✓</span>
                </div>
                <p className="font-body text-[14px] leading-[1.65] text-cream-surface/60">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Contact note */}
          <div className="mt-8 pt-6 border-t border-cream-surface/[0.08]">
            <p className="font-body text-[13px] leading-[1.65] text-cream-surface/45">
              Questions before submitting? WhatsApp Abubakar Abdulbasit at{" "}
              <a
                href="https://wa.me/2348168166347"
                target="_blank"
                rel="noreferrer"
                className="text-accent/80 hover:text-accent no-underline transition-colors duration-200"
              >
                08168166347
              </a>
            </p>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div {...fadeRight(0.1)}>
          {submitted ? (
            <ThankYouState />
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="flex flex-col gap-5"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <Field label="Full Name" name="name" required />
                <Field label="Email Address" name="email" type="email" required />
              </div>

              {/* Phone + Location */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <Field label="Phone / WhatsApp" name="phone" required />
                <Field label="Location (City, State)" name="location" required />
              </div>

              {/* Area of interest */}
              <div>
                <label className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase
                  text-cream-surface/60 block mb-2.5">
                  Area of Interest <span className="text-accent">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setInterest(item)}
                      className={`font-body text-[12px] font-medium px-4 py-2 rounded-btn border
                        transition-all duration-200 cursor-pointer
                        ${interest === item
                          ? "bg-accent border-accent text-ink"
                          : "bg-transparent border-cream-surface/20 text-cream-surface/65 hover:border-cream-surface/40"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase
                  text-cream-surface/60 block mb-2">
                  Skills or Professional Background{" "}
                  <span className="text-cream-surface/30 normal-case font-normal tracking-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Registered nurse, 4 years experience. Available weekends."
                  className="w-full px-4 py-3 bg-primary-mid/40 border border-cream-surface/[0.12]
                    rounded-btn font-body text-[13px] text-cream-surface placeholder:text-cream-surface/25
                    focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase
                  text-cream-surface/60 block mb-2.5">
                  Availability <span className="text-accent">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAvailability(item)}
                      className={`font-body text-[12px] font-medium px-4 py-2 rounded-btn border
                        transition-all duration-200 cursor-pointer
                        ${availability.includes(item)
                          ? "bg-accent border-accent text-ink"
                          : "bg-transparent border-cream-surface/20 text-cream-surface/65 hover:border-cream-surface/40"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anything else */}
              <div>
                <label className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase
                  text-cream-surface/60 block mb-2">
                  Anything else you want us to know?{" "}
                  <span className="text-cream-surface/30 normal-case font-normal tracking-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-primary-mid/40 border border-cream-surface/[0.12]
                    rounded-btn font-body text-[13px] text-cream-surface placeholder:text-cream-surface/25
                    focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2.5
                  font-body text-[14px] font-semibold text-ink
                  bg-accent hover:bg-accent-hover
                  py-4 rounded-btn border-none cursor-pointer
                  shadow-btn hover:shadow-btn-hover
                  transition-all duration-200 mt-1"
              >
                Submit My Application →
              </motion.button>

              <p className="font-body text-[12px] text-cream-surface/38 text-center leading-[1.6]">
                We read every application. You will hear from us directly —
                not from an automated system.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Field Component ─────────────────────────── */
function Field({ label, name, type = "text", required = false }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase
          text-cream-surface/60 block mb-2"
      >
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-primary-mid/40 border border-cream-surface/[0.12]
          rounded-btn font-body text-[13px] text-cream-surface placeholder:text-cream-surface/25
          focus:outline-none focus:border-accent/50 transition-colors duration-200"
      />
    </div>
  );
}

/* ── Thank You State ─────────────────────────── */
function ThankYouState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col items-start justify-center py-10"
    >
      <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30
        flex items-center justify-center mb-6">
        <span className="text-accent text-[20px]">✓</span>
      </div>
      <h3 className="font-display font-bold text-cream-surface text-[26px] leading-snug mb-3">
        Application Received.
      </h3>
      <p className="font-body text-[14px] leading-[1.75] text-cream-surface/58 max-w-[340px]">
        We have received your application and will be in touch personally
        within [X] business days. Thank you for choosing to be part of
        this work.
      </p>
      <div className="mt-6 pt-6 border-t border-cream-surface/[0.08] w-full">
        <p className="font-body text-[13px] text-cream-surface/40">
          Questions? WhatsApp Abubakar:{" "}
          <a
            href="https://wa.me/2348168166347"
            className="text-accent/70 hover:text-accent no-underline transition-colors"
          >
            08168166347
          </a>
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   5. WHAT HAPPENS NEXT
══════════════════════════════════════════════════ */
const STEPS = [
  {
    num:      "01",
    headline: "We Review Your Application.",
    body:     "Every submission is read by a member of the JOAM team — not filtered by software. We look at your skills, your availability, and where you might be most useful. This takes [X] business days from submission.",
  },
  {
    num:      "02",
    headline: "We Reach Out Directly.",
    body:     "You will receive a personal message — by email or WhatsApp, whichever you prefer — from someone on our team. We will tell you what role we think fits, ask any follow-up questions, and discuss next steps. No form letters. No automated responses.",
  },
  {
    num:      "03",
    headline: "You Get Oriented and Begin.",
    body:     "Before you start, we will give you a clear picture of what your role involves, who you will be working with, and what to expect in the field or remotely. We will not send you in without context — and we will always be reachable when questions come up.",
  },
];

function WhatHappensNext() {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">

        <motion.div {...fadeUp(0)} className="mb-12 md:mb-8">
          <Overline color="gold">After You Apply</Overline>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-10 md:gap-4 items-end">
            <h2
              id="next-steps-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Here Is Exactly{" "}
              <em className="not-italic text-primary">What Happens Next.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
              We know that applying for something and hearing nothing is
              frustrating. Here is our commitment to every person who
              submits a form.
            </p>
          </div>
        </motion.div>

        {/* Steps — horizontal connector on desktop */}
        <div className="relative">

          {/* Connector line — desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute top-[22px] left-0 right-0 h-px bg-border origin-left md:hidden"
          />

          <div className="grid grid-cols-3 md:grid-cols-1 gap-8 md:gap-7">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(i * 0.12)}
                className="relative md:flex md:gap-5"
              >
                {/* Step number circle */}
                <div className="w-11 h-11 rounded-full bg-cream border-2 border-accent
                  flex items-center justify-center mb-5 relative z-10
                  md:shrink-0 md:mb-0">
                  <span className="font-display italic text-[15px] text-accent leading-none">
                    {step.num}
                  </span>
                </div>

                <div className="md:pt-1">
                  <h3 className="font-display font-bold text-ink text-[18px] leading-[1.25] mb-3">
                    {step.headline}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   6. CTA BLOCK
══════════════════════════════════════════════════ */
function VolunteerCTA() {
  return (
    <section
      aria-label="Another way to give"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-1 gap-14 md:gap-8 items-center">

        {/* Left */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="cream">Another Way to Give</Overline>
          <h2 className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
            text-[clamp(24px,3vw,38px)] mb-2">
            Not Ready to Volunteer Yet?
          </h2>
          <h2 className="font-display italic font-normal text-accent leading-[1.1]
            text-[clamp(24px,3vw,38px)] mb-6">
            Your Donation Shows Up Too.
          </h2>
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" href="/donate">Donate Now</Button>
            <Button variant="ghost-dark" href="/programs">See Our Programs</Button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div {...fadeRight(0.1)} className="space-y-4">
          <p className="font-body text-[15px] leading-[1.8] text-cream-surface/60">
            Volunteering is not the only way to be part of this work. If your
            schedule does not allow it right now — or if you simply want to
            contribute in a different way — a donation to JOAM Foundation
            goes directly into the programmes our volunteers are running on
            the ground.
          </p>
          <p className="font-display italic text-[18px] text-accent leading-snug">
            "Every hand matters here. Including yours."
          </p>
        </motion.div>
      </div>
    </section>
  );
}