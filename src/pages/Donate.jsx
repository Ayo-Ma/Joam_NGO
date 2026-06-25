/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * JOAM Foundation  Donate / Give Page
 * No Navbar. No Footer. Distraction-free conversion environment.
 * Sections: Minimal Header → Headline → Donation Form →
 *           What Your Donation Funds → Trust Signal → Bottom bar
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const AMOUNTS = [
  {
    value: "₦5,000",
    raw: 5000,
    impact: "Prenatal care for one mother, one month",
    outcome:
      "A pregnant woman in an underserved community receives her monthly check-up, basic medication, and midwife access  care she could not otherwise afford.",
    label: "Maternal Care",
    color: "bg-primary-light",
    img: "Maternal Care · Mother & Child",
  },
  {
    value: "₦10,000",
    raw: 10000,
    impact: "School fees for one student, one term",
    outcome:
      "A gifted student who would have been sent home from class stays in school for one full term. Their family breathes easier. Their future stays open.",
    label: "Scholarships",
    color: "bg-accent-light",
    img: "Scholarships · Student in Class",
  },
  {
    value: "₦25,000",
    raw: 25000,
    impact: "Full monthly support for one elder",
    outcome:
      "An elderly person living without family nearby receives food provisions, a healthcare visit, and a welfare check-in for the entire month. They are not forgotten.",
    label: "Elderly Care",
    color: "bg-primary-light",
    img: "Elderly Care · Elder at Home",
  },
  {
    value: "₦50,000",
    raw: 50000,
    impact: "Emergency delivery care for two mothers",
    outcome:
      "Two mothers in labour receive skilled birth attendance, equipment, and postnatal follow-up  the difference between a safe delivery and a tragedy.",
    label: "Maternal Care",
    color: "bg-accent-light",
    img: "Maternal Care · Delivery Room",
  },
  {
    value: "Custom",
    raw: null,
    impact: "Every naira has a purpose here",
    outcome:
      "₦2,000 matters here. ₦500,000 changes a programme. Whatever you can give, it will be tracked, allocated, and reported against a specific outcome.",
    label: "Your Choice",
    color: "bg-cream-alt",
    img: "Your Gift · Community Impact",
  },
];

const FUNDING_BREAKDOWN = [
  {
    amount: "₦5,000",
    covers:
      "One month of prenatal care for a mother in an underserved community  check-ups, basic medication, and midwife access.",
    tag: "Maternal Care",
    img: "Maternal Care",
  },
  {
    amount: "₦10,000",
    covers:
      "One term of school fees for a scholarship student who would otherwise be sent home from class.",
    tag: "Scholarships",
    img: "Student Scholarship",
  },
  {
    amount: "₦15,000",
    covers:
      "A full pregnancy support package  prenatal through to postnatal care  for one mother.",
    tag: "Maternal Care",
    img: "Full Antenatal Care",
  },
  {
    amount: "₦25,000",
    covers:
      "One month of complete support for one elderly person  food provisions, a healthcare visit, and welfare check-in.",
    tag: "Elderly Care",
    img: "Elder Support",
  },
  {
    amount: "₦50,000",
    covers:
      "Emergency delivery care for two mothers  skilled birth attendance, equipment, and postnatal follow-up.",
    tag: "Maternal Care",
    img: "Emergency Delivery",
  },
  {
    amount: "₦75,000",
    covers:
      "One semester of university support for a JOAM scholar  fees, textbooks, and mentorship access.",
    tag: "Scholarships",
    img: "University Support",
  },
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Donate() {
  const [frequency, setFrequency] = useState("monthly");
  const [selectedAmt, setSelectedAmt] = useState("₦10,000");
  const [customAmt, setCustomAmt] = useState("");
  const [activeOutcome, setActiveOutcome] = useState(null);

  /* Pre-fill from persuasion section */
  const handleSelectFromOutcome = (value) => {
    setSelectedAmt(value);
    document
      .getElementById("donation-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* ── 1. MINIMAL HEADER ──────────────────────── */}
      <MinimalHeader />

      <main className="flex-1">
        {/* ── 2. HEADLINE ────────────────────────────── */}
        <section
          aria-label="Page headline"
          className="bg-cream pt-16 pb-12 md:pt-12 md:pb-8 px-4 lg:px-10 sm:px-6"
        >
          <div className="max-w-[640px] mx-auto text-center">
            <motion.h1
              {...fadeUp(0.1)}
              className="font-display font-bold text-ink leading-[1.08] tracking-[-0.02em]
                text-[clamp(30px,4vw,52px)] mb-4"
            >
              Your Gift Becomes{" "}
              <em className="italic text-primary">Someone's Tomorrow.</em>
            </motion.h1>
            <motion.p
              {...fadeUp(0.22)}
              className="font-body text-[15px] leading-[1.78] text-ink-secondary"
            >
              A mother who delivers safely. A student who stays in school. An
              elder who is not forgotten. That is what a donation to JOAM
              Foundation does  directly, specifically, and without layers in
              between.
            </motion.p>
          </div>
        </section>

        {/* ── 3. DONATION FORM ───────────────────────── */}
        <section
          id="donation-form"
          aria-label="Donation form"
          className="bg-cream pb-16 md:pb-12 px-4 lg:px-10 sm:px-6"
        >
          <motion.div
            {...fadeUp(0.1)}
            className="max-w-[640px] mx-auto bg-cream-surface border border-border
              rounded-[8px] p-10 sm:p-6 shadow-card"
          >
            {/* Form headline */}
            <h2 className="font-display font-bold text-ink text-[22px] leading-snug mb-6">
              Choose Your Impact.
            </h2>

            {/* Frequency toggle */}
            <div className="flex rounded-btn border border-border overflow-hidden mb-6 w-fit">
              {[
                { key: "monthly", label: "Give Monthly" },
                { key: "once", label: "Give Once" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFrequency(f.key)}
                  className={`font-body text-[13px] font-semibold px-5 py-2.5 transition-all duration-200 cursor-pointer border-none
                    ${
                      frequency === f.key
                        ? "bg-primary text-cream-surface"
                        : "bg-transparent text-ink-secondary hover:text-ink"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Frequency label */}
            <p className="font-body text-[13px] leading-[1.65] text-ink-secondary mb-6 max-w-[420px]">
              {frequency === "monthly"
                ? "Become a founding monthly supporter  the most powerful thing you can do for a new foundation."
                : "Make a one-time contribution to the programme that needs it most."}
            </p>

            {/* Amount grid */}
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-2.5 mb-4">
              {AMOUNTS.filter((a) => a.value !== "Custom").map((a) => (
                <button
                  key={a.value}
                  onClick={() => setSelectedAmt(a.value)}
                  className={`text-left p-3.5 rounded-btn border transition-all duration-200 cursor-pointer
                    ${
                      selectedAmt === a.value
                        ? "border-primary bg-primary-light"
                        : "border-border bg-cream hover:border-primary/30"
                    }`}
                >
                  <span
                    className={`font-display font-bold text-[17px] block leading-none mb-1
                    ${selectedAmt === a.value ? "text-primary" : "text-ink"}`}
                  >
                    {a.value}
                  </span>
                  <span className="font-body text-[11px] leading-[1.4] text-ink-muted block">
                    {a.impact}
                  </span>
                </button>
              ))}

              {/* Custom */}
              <button
                onClick={() => setSelectedAmt("Custom")}
                className={`text-left p-3.5 rounded-btn border transition-all duration-200 cursor-pointer
                  ${
                    selectedAmt === "Custom"
                      ? "border-primary bg-primary-light"
                      : "border-border bg-cream hover:border-primary/30"
                  }`}
              >
                <span
                  className={`font-display font-bold text-[17px] block leading-none mb-1
                  ${selectedAmt === "Custom" ? "text-primary" : "text-ink"}`}
                >
                  Custom
                </span>
                <span className="font-body text-[11px] text-ink-muted block">
                  Every naira has a purpose here
                </span>
              </button>
            </div>

            {/* Custom input */}
            <AnimatePresence>
              {selectedAmt === "Custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-[14px] text-ink-muted">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmt}
                      onChange={(e) => setCustomAmt(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-border rounded-btn
                        font-body text-[14px] text-ink bg-cream
                        focus:outline-none focus:border-primary
                        transition-colors duration-200"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Payment method */}
            <p className="font-body text-[12px] text-ink-muted mb-5">
              Pay securely via Paystack or Flutterwave. All major cards and bank
              transfers accepted.
            </p>

            {/* Submit */}
            <motion.a
              href="/donate/checkout"
              className="w-full flex items-center justify-center gap-2.5
                font-body text-[15px] font-semibold text-ink
                bg-accent hover:bg-accent-hover
                py-4 rounded-btn no-underline
                shadow-btn hover:shadow-btn-hover
                transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Complete My Donation →
            </motion.a>

            {/* Micro-reassurance */}
            <p className="font-body text-[12px] leading-[1.65] text-ink-muted text-center mt-4">
              Your donation is processed securely. You will receive a
              confirmation and a receipt immediately.{" "}
              <a
                href="mailto:joamfoundation1@gmail.com"
                className="text-primary no-underline hover:underline"
              >
                Questions? Email Us directly.
              </a>
            </p>
          </motion.div>
        </section>


        {/* ── 5. TRUST SIGNAL ────────────────────────── */}
        <section
          aria-label="Why this foundation"
          className="bg-green-900 py-16 md:py-12 px-4 lg:px-10 sm:px-6"
        >
          <div className="max-w-[640px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Overline */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-accent" />
                <span className="font-body text-[11px] font-semibold tracking-[0.14em] uppercase text-accent">
                  Why This Foundation
                </span>
              </div>

              {/* Founder + photo */}
              <div className="flex items-start gap-5 mb-6">
                {/* Photo placeholder */}
                <div
                  className="w-20 h-29 overflow-hidden  rounded-full bg-primary-light border border-primary/[0.1]
                  flex items-center justify-center shrink-0"
                >
                 <img src="jacob.jpeg" className=" object-contain  " alt="" />
                </div>
                <div className="pt-1">
                  <p className="font-display font-bold text-cream text-[16px] leading-snug">
                    Jacob Adesina
                  </p>
                  <p className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent mt-0.5">
                    Founder & Executive Director
                  </p>
                </div>
              </div>

              {/* Pull quote */}
              <blockquote
                className="font-display italic text-[clamp(16px,1.8vw,20px)]
                leading-[1.55] text-white/80 m-0 mb-5 border-l-[2px] border-accent pl-5"
              >
                "I did not build JOAM to raise money. I built it to honour a
                life and change lives. Every naira that comes through this
                foundation goes to exactly that  nothing more, nothing less. I
                will answer personally for every programme we run."
              </blockquote>

              {/* Attribution + contact */}
              <p className="font-body text-[13px] text-cream/50 leading-[1.7]">
                Questions about how your donation is used?{" "}
                <a
                  href="mailto:joamfoundation1@gmail.com"
                  className="text-cream no-underline font-semibold
                    border-b border-primary/30 hover:border-primary
                    transition-colors duration-200"
                >
                  Email Us @ joamfoundation1@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── 6. BOTTOM BAR  no nav links ───────────── */}
      <div className="bg-cream border-t border-border py-4 px-4 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto flex items-center justify-between flex-wrap gap-3">
          <p className="font-body text-[12px] text-ink-muted">
            © 2026 JOAM Foundation. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="/privacy"
              className="font-body text-[12px] text-ink-muted hover:text-ink no-underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="font-body text-[12px] text-ink-muted hover:text-ink no-underline transition-colors duration-200"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MINIMAL HEADER
══════════════════════════════════════════════════ */
function MinimalHeader() {
  return (
    <header className="bg-cream border-b justify-between border-border h-[64px] flex items-center px-4 lg:px-10 sm:px-6">
      <a href="/" className="font-body text-[14px] text-ink hover:text-ink/70 no-underline hover:text-yellow-500">
        ← Back
      </a>
      <a href="/" className="flex items-center gap-3 no-underline">
       <img src="/joam_logo.png" className="w-40 md:w-40 p-4" alt="JOAM Foundation Logo" />
      </a>
    </header>
  );
}
