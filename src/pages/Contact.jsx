import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Overline from "../components/ui/Overline";

/**
 * JOAM Foundation  Contact Page
 * Sections: Hero → Contact Form → Direct Contacts →
 *           Office Location → Response Time Commitment
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── Data ─────────────────────────────────────────────────── */
const SUBJECTS = [
  {
    value: "general",
    label: "General Enquiry",
    desc: "Questions about the foundation, our mission, or our work that don't fit the other categories.",
  },
  {
    value: "donation",
    label: "Donation Enquiry",
    desc: "Questions about making a donation, payment methods, receipts, or how your contribution is used.",
  },
  {
    value: "media",
    label: "Media & Press",
    desc: "Journalists, researchers, and media organisations seeking information, interviews, or official statements.",
  },
  {
    value: "beneficiary",
    label: "Beneficiary Support",
    desc: "If you or someone you know needs help accessing our maternal care, scholarship, or elderly care programmes  tell us here.",
  },
  {
    value: "partnership",
    label: "Partnership & Sponsorship",
    desc: "Organisations interested in formal partnership, corporate sponsorship, or institutional giving relationships.",
  },
  {
    value: "volunteering",
    label: "Volunteering",
    desc: "Questions about volunteer roles, availability, or your application status.",
  },
];

const COMMITMENTS = [
  {
    num: "01",
    headline: "Every Message Gets a Personal Response.",
    body: "No automated replies. No ticketing systems. A real member of the JOAM team reads your message and responds to it  by name, specifically, and with actual information.",
  },
  {
    num: "02",
    headline: "We Respond Within 2–3 Business Days.",
    body: "For most enquiries, we respond faster. For complex partnership or programme questions that require more thought, we will acknowledge your message within 24 hours and give you a full response within three business days.",
  },
  // {
  //   num: "03",
  //   headline: "Urgent? Use WhatsApp.",
  //   body: "For time-sensitive matters  including beneficiary support requests  WhatsApp is the fastest way to reach us. Jacob and Abubakar's numbers are above. They are reachable during working hours.",
  // },
  {
    num: "03",
    headline: "We Will Tell You If We Cannot Help.",
    body: "Not every request is something JOAM can fulfil right now. If we receive a message we cannot act on, we will tell you honestly and point you toward someone who can help. You will not be left without an answer.",
  },
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Contact() {
  return (
    <main className="overflow-x-hidden">
      <ContactHero />
      <ContactForm />
      {/* <DirectContacts /> */}
      {/* <OfficeLocation /> */}
      <ResponseCommitment />
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════ */
function ContactHero() {
  return (
    <section
      aria-label="Contact hero"
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
          <Overline color="cream">Contact Us</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[540px] mb-5"
        >
          We Would Love{" "}
          <em className="italic text-accent">to Hear From You.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[460px]"
        >
          Whether you want to give, volunteer, partner, seek support, or simply
          ask a question  there is a real person on the other end of every
          message sent to this foundation. Reach out. We will respond.
        </motion.p>

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
   2. CONTACT FORM
══════════════════════════════════════════════════ */
function ContactForm() {
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeSubject = SUBJECTS.find((s) => s.value === subject);

  return (
    <section
      aria-labelledby="form-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
        {/* LEFT  context */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="gold">Get in Touch</Overline>
          <h2
            id="form-heading"
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-4"
          >
            Send Us a Message.
          </h2>
          <p className="font-body text-[14px] leading-[1.75] text-ink-secondary mb-8">
            Tell us who you are and what you need. Select the subject that best
            describes your enquiry so we can direct your message to the right
            person immediately.
          </p>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted mb-3">
              Or reach us directly
            </p>
            <a
              href="mailto:joamfoundation1@gmail.com "
              className="flex items-center gap-3 font-body text-[14px] text-ink-secondary
                hover:text-primary no-underline transition-colors duration-200 group"
            >
              <div
                className="w-8 h-8 rounded-full bg-primary-light border border-primary/[0.1]
                flex items-center justify-center shrink-0 group-hover:border-primary/30
                transition-colors duration-200"
              >
                <span className="text-primary text-[11px]">✉</span>
              </div>
              joamfoundation1@gmail.com
            </a>
            {/* <a
              href="https://wa.me/2348095900357"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 font-body text-[14px] text-ink-secondary
                hover:text-primary no-underline transition-colors duration-200 group"
            >
              <div
                className="w-8 h-8 rounded-full bg-primary-light border border-primary/[0.1]
                flex items-center justify-center shrink-0 group-hover:border-primary/30
                transition-colors duration-200"
              >
                <span className="text-primary text-[11px]">📱</span>
              </div>
              WhatsApp: +234 809 590 0357
            </a> */}
          </div>

          {/* Response note */}
          <div className="mt-8 pt-7 border-t border-border">
            <p className="font-body text-[13px] leading-[1.7] text-ink-muted">
              Every message is read by a member of the JOAM team. You will
              receive a personal response within{" "}
              <span className="text-ink font-medium">2–3 business days.</span>
            </p>
          </div>
        </motion.div>

        {/* RIGHT  form */}
        <motion.div {...fadeRight(0.1)}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <FormSuccess key="success" />
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full Name" name="name" required />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                {/* Phone */}
                <FormField label="Phone / WhatsApp" name="phone" optional />

                {/* Subject dropdown */}
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-ink-muted block mb-2"
                  >
                    Subject <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-cream-surface border border-border
                        rounded-btn font-body text-[13px] text-ink
                        focus:outline-none focus:border-primary/40
                        transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a subject…
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="text-ink-muted text-[10px]">▾</span>
                    </div>
                  </div>

                  {/* Contextual descriptor */}
                  <AnimatePresence>
                    {activeSubject && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-body text-[12px] leading-[1.6] text-ink-muted mt-1.5 pl-1"
                      >
                        {activeSubject.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-ink-muted block mb-2"
                  >
                    Your Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind. The more specific you are, the better we can help."
                    className="w-full px-4 py-3 bg-cream-surface border border-border
                      rounded-btn font-body text-[13px] text-ink
                      placeholder:text-ink-muted
                      focus:outline-none focus:border-primary/40
                      transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2
                    font-body text-[14px] font-semibold text-ink
                    bg-accent hover:bg-accent-hover
                    py-4 rounded-btn border-none cursor-pointer
                    shadow-btn hover:shadow-btn-hover
                    transition-all duration-200"
                >
                  Send My Message →
                </motion.button>

                {/* <p className="font-body text-[12px] text-ink-muted text-center leading-[1.6]">
                  Every message is read by a real person. For urgent matters,
                  WhatsApp Jacob or Abubakar directly.
                </p> */}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Form Field ──────────────────────────────── */
function FormField({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
          text-ink-muted block mb-2"
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
        {optional && (
          <span className="text-ink-muted/60 normal-case font-normal tracking-normal ml-1">
            (optional)
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-cream-surface border border-border
          rounded-btn font-body text-[13px] text-ink
          placeholder:text-ink-muted
          focus:outline-none focus:border-primary/40
          transition-colors duration-200"
      />
    </div>
  );
}

/* ── Form Success ────────────────────────────── */
function FormSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="p-10 sm:p-7 bg-primary-light border border-primary/[0.08] rounded-[4px]
        flex flex-col items-start"
    >
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-6">
        <span className="text-accent text-[16px]">✓</span>
      </div>
      <h3 className="font-display font-bold text-ink text-[22px] leading-snug mb-3">
        Message Received.
      </h3>
      <p className="font-body text-[14px] leading-[1.75] text-ink-secondary mb-6">
        A member of the JOAM team will read your message and respond personally
        within 2–3 business days. You will not receive an automated reply.
      </p>
      <div className="pt-5 border-t border-primary/[0.08] w-full">
        <p className="font-body text-[13px] text-ink-muted">
          For urgent matters, WhatsApp Jacob at{" "}
          <a
            href="https://wa.me/2348095900357"
            className="text-primary no-underline font-medium border-b border-primary/30
              hover:border-primary transition-colors duration-200"
          >
            +234 809 590 0357
          </a>
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   3. DIRECT CONTACTS
══════════════════════════════════════════════════ */
const LEADERS = [
  {
    name: "Jacob Adesina",
    title: "Founder & Executive Director",
    initial: "JA",
    resp: "Overall foundation strategy, donor relationships, partnerships, and programme oversight. If your question is about where this foundation is going and why  Jacob is the right person.",
    email: "jacobgreat1@gmail.com",
    whatsapp: "+234 809 590 0357",
    waLink: "https://wa.me/2348095900357",
    commitment: "Responds to donor and partnership enquiries within 48 hours.",
  },
  {
    name: "Abubakar Abdulbasit",
    title: "Programme Director",
    initial: "AA",
    resp: "Day-to-day programme delivery across maternal care, scholarships, and elderly support. If your question is about how programmes work, who qualifies, or how to access support  Abubakar is the right person.",
    email: null,
    whatsapp: "+234 816 816 6347",
    waLink: "https://wa.me/2348168166347",
    commitment:
      "Responds to programme and beneficiary enquiries within 48 hours.",
  },
];

function DirectContacts() {
  return (
    <section
      aria-labelledby="contacts-heading"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="cream">Speak Directly to Leadership</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="contacts-heading"
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              You Can Reach Us <em className="italic text-accent">By Name.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55 md:hidden">
              A foundation that cannot be contacted directly should not be
              trusted with your support. Here are the two people accountable for
              everything JOAM does.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEADERS.map((leader, i) => (
            <motion.div
              key={leader.name}
              {...fadeUp(i * 0.12)}
              className="bg-primary-mid/35 border border-cream-surface/[0.07]
                rounded-[4px] p-8 sm:p-6 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full bg-primary border border-accent/25
                  flex items-center justify-center shrink-0"
                >
                  <span className="font-display text-[20px] font-bold text-accent leading-none">
                    {leader.initial}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-cream-surface text-[19px] leading-snug">
                    {leader.name}
                  </h3>
                  <p className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mt-0.5">
                    {leader.title}
                  </p>
                </div>
              </div>

              {/* Responsibility */}
              <p className="font-body text-[13px] leading-[1.75] text-cream-surface/55">
                {leader.resp}
              </p>

              {/* Contact details */}
              <div className="space-y-2.5 pt-4 border-t border-cream-surface/[0.07]">
                {leader.email && (
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-2.5 font-body text-[13px] text-accent/75
                      hover:text-accent no-underline transition-colors duration-200"
                  >
                    <span className="text-[10px]">✉</span>
                    {leader.email}
                  </a>
                )}
                <a
                  href={leader.waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 font-body text-[13px] text-cream-surface/50
                    hover:text-cream-surface no-underline transition-colors duration-200"
                >
                  <span className="text-[10px]">📱</span>
                  WhatsApp: {leader.whatsapp}
                </a>
              </div>

              {/* Commitment */}
              <div className="flex items-start gap-2.5">
                <div className="w-1 h-1 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                <p className="font-body text-[12px] text-cream-surface/40 leading-[1.6]">
                  {leader.commitment}
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={leader.waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-body text-[12px] font-semibold
                  text-ink bg-accent hover:bg-accent-hover
                  px-5 py-2.5 rounded-btn no-underline w-fit
                  transition-all duration-200"
              >
                WhatsApp {leader.name.split(" ")[0]} →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-body text-[13px] leading-[1.7] text-cream-surface/40
            text-center max-w-[520px] mx-auto mt-8"
        >
          We publish direct contact details because transparency is not a policy
          for JOAM  it is a practice. If you send a message, a person reads it.
          If you ask a question, a person answers it.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   4. OFFICE LOCATION
══════════════════════════════════════════════════ */
function OfficeLocation() {
  return (
    <section
      aria-labelledby="location-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10">
        {/* LEFT  info */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="gold">Where We Are</Overline>
          <h2
            id="location-heading"
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-5"
          >
            Find Us.
          </h2>

          <p className="font-body text-[14px] leading-[1.78] text-ink-secondary mb-7">
            JOAM Foundation is based in Nigeria. Our field work spans multiple
            states  but our doors are open to anyone who wants to visit,
            verify, or simply see the work in person.
          </p>

          {/* Address */}
          <div className="p-6 bg-cream border border-border rounded-[4px] mb-5">
            <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted mb-3">
              Address
            </p>
            <address className="not-italic font-body text-[14px] leading-[1.75] text-ink-secondary">
              JOAM Foundation
              <br />
              [Full address  to be confirmed by client]
              <br />
              Ado-Ekiti, Ekiti State, Nigeria
            </address>
          </div>

          {/* Contact info */}
          <div className="space-y-2.5 mb-7">
            <a
              href="mailto:hello@joamfoundation.org"
              className="flex items-center gap-2.5 font-body text-[14px] text-ink-secondary
                hover:text-primary no-underline transition-colors duration-200"
            >
              <span className="text-primary/60 text-[11px]">✉</span>
              hello@joamfoundation.org
            </a>
            <a
              href="tel:+2348000000000"
              className="flex items-center gap-2.5 font-body text-[14px] text-ink-secondary
                hover:text-primary no-underline transition-colors duration-200"
            >
              <span className="text-primary/60 text-[11px]">📞</span>
              +234 800 000 0000 (placeholder)
            </a>
          </div>

          {/* Visiting note */}
          <div className="p-5 bg-primary-light border border-primary/[0.08] rounded-[4px]">
            <p className="font-body text-[13px] leading-[1.75] text-ink-secondary">
              If you would like to visit our offices or accompany our field team
              on an outreach day, contact Jacob Adesina directly to arrange it.
              We welcome donors, partners, and journalists who want to see the
              work firsthand.{" "}
              <span className="font-medium text-primary">
                Seeing is believing  and we have nothing to hide.
              </span>
            </p>
          </div>
        </motion.div>

        {/* RIGHT  map placeholder */}
        <motion.div {...fadeRight(0.1)}>
          <div
            className="w-full h-full min-h-[360px] bg-primary-light border border-primary/[0.08]
              rounded-[4px] relative overflow-hidden flex items-center justify-center"
          >
            {/* Map placeholder */}
            <div className="flex flex-col items-center gap-3 text-center px-8">
              <div
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/15
                flex items-center justify-center"
              >
                <span className="text-primary/40 text-[16px]">📍</span>
              </div>
              <p className="font-body text-[11px] font-medium tracking-[0.12em] uppercase text-primary/30">
                Google Maps Embed
              </p>
              <p className="font-body text-[12px] text-primary/20 leading-snug">
                Pin to be added once address is confirmed
              </p>
            </div>

            {/* Grid overlay for map feel */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(27,67,50,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,0.06) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   5. RESPONSE TIME COMMITMENT
══════════════════════════════════════════════════ */
function ResponseCommitment() {
  return (
    <section
      aria-labelledby="commitment-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-8">
          <Overline color="gold">Our Commitment to You</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="commitment-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              You Will Hear From Us.{" "}
              <em className="not-italic text-primary">Not a System. Us.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
              We know what it feels like to send a message into the void and
              receive nothing back. That will not happen here.
            </p>
          </div>
        </motion.div>

        {/* Commitment grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {COMMITMENTS.map((c, i) => (
            <motion.div
              key={c.num}
              {...fadeUp(i * 0.09)}
              className="p-7 sm:p-5 bg-cream-surface border border-border rounded-[4px]
                hover:border-primary/20 transition-colors duration-250"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-display text-[11px] font-bold text-accent leading-none">
                    {c.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-ink text-[17px] leading-snug">
                  {c.headline}
                </h3>
              </div>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-body text-[14px] leading-[1.75] text-ink-secondary
            text-center max-w-[520px] mx-auto border-t border-border pt-8"
        >
          This is a small team doing serious work. We take every message
          seriously because every message represents a person who cares enough
          to reach out. That is not something we take for granted.
        </motion.p>
      </div>
    </section>
  );
}
