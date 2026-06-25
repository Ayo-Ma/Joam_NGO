import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation  Partner / Sponsor Page
 * Sections: Hero → Why Partner → Partnership Tiers →
 *           Current Partners → Impact for Partners →
 *           Inquiry Form → CTA Block
 * Fully responsive  mobile-first
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
const WHY_PARTNER = [
  {
    num: "01",
    sdg: "SDG 3 · SDG 4 · SDG 10",
    headline: "Reach That Goes Where Others Don't.",
    body: "JOAM Foundation builds presence in underserved communities that formal institutions  government agencies, large NGOs, corporate CSR programmes  routinely fail to reach. Our maternal care operates in communities where the nearest government clinic is hours away. Our scholars come from households that have never been touched by a corporate giving programme. If your organisation wants community reach that is genuine rather than cosmetic, this is where it exists.",
  },
  {
    num: "02",
    sdg: "Accountability",
    headline: "Accountability You Can Report On.",
    body: "Every partnership with JOAM comes with documented outcomes  programme reports, beneficiary data, field photography, and impact summaries that your organisation can use directly in CSR reporting, grant documentation, and stakeholder communications. We do not ask you to trust us. We give you the evidence to verify us. Every naira of partner funding is tracked, allocated to a specific programme pillar, and reported against at agreed intervals.",
  },
  {
    num: "03",
    sdg: "ESG Alignment",
    headline: "Direct Alignment With Global Development Goals.",
    body: "JOAM's three programme pillars map directly to United Nations Sustainable Development Goals  SDG 3 (Good Health and Well-Being) through maternal and elderly care, SDG 4 (Quality Education) through our scholarship programme, and SDG 10 (Reduced Inequalities) across all three. For organisations with ESG commitments, international reporting obligations, or impact investment mandates, this alignment is not incidental. It is structural.",
  },
];

const TIERS = [
  {
    name: "Community Partner",
    level: "Entry Level",
    commitment: "[₦X  to be confirmed by foundation]",
    funds:
      "Direct programme support across one pillar of your choice  maternal care, scholarships, or elderly care  for one programme cycle.",
    includes: [
      "Named acknowledgement on JOAM website and programme materials",
      "End-of-cycle impact report documenting outcomes funded by your contribution",
      "JOAM co-branded receipt suitable for CSR reporting",
      "Field photography from funded programme activities",
    ],
  },
  {
    name: "Programme Partner",
    level: "Mid-Level",
    commitment: "[₦X  to be confirmed]",
    funds:
      "Sustained support across one full programme pillar for a defined period  covering staff costs, beneficiary support, and field operations.",
    includes: [
      "Everything in Community Partner tier",
      "Quarterly impact updates with beneficiary data and field reports",
      "Co-branded programme materials carrying your organisation's name",
      "Named recognition across JOAM digital channels and events",
      "Invitation to attend one field visit per cycle",
    ],
    featured: true,
  },
  {
    name: "Foundation Partner",
    level: "Institutional",
    commitment: "[₦X  to be confirmed]",
    funds:
      "Multi-pillar or multi-cycle support  sustained investment in the foundation's capacity to deliver across all three programme areas.",
    includes: [
      "Everything in Programme Partner tier",
      "Dedicated impact reporting tailored to your CSR framework",
      "Co-branding rights on JOAM Foundation communications",
      "Executive access  direct engagement with JOAM leadership",
      "Recognition at JOAM Foundation events as a founding institutional partner",
      "Option to co-design a specific programme aligned with your mission",
    ],
  },
];

const IMPACT_BENEFITS = [
  {
    num: "01",
    headline: "Documented Community Impact.",
    body: "Every programme your organisation funds is documented  in numbers, in photographs, and in the words of the people served. You will have evidence of impact that is specific, credible, and ready to deploy in annual reports, board presentations, and stakeholder communications.",
  },
  {
    num: "02",
    headline: "CSR Reporting Material, Built In.",
    body: "We produce impact summaries specifically formatted for CSR and ESG reporting. You will not need to extract data from a generic report and reformat it for your purposes. We build the documentation around your organisation's reporting framework from the start of the partnership.",
  },
  {
    num: "03",
    headline: "Genuine Community Access.",
    body: "JOAM operates in communities that most organisations cannot access independently  without the relationships, the trust, or the field presence to enter meaningfully. A partnership with JOAM gives your organisation a legitimate, established presence in those communities.",
  },
  {
    num: "04",
    headline: "Co-Branding That Means Something.",
    body: "Your organisation's name on a JOAM programme is not a logo on a banner. It is your name on a delivery room, on a scholar's fees receipt, on the monthly provisions that reach an elderly person who has no family. That is co-branding with genuine weight.",
  },
  {
    num: "05",
    headline: "Executive Relationship, Not Just a Transaction.",
    body: "Programme Partner and Foundation Partner organisations have direct access to JOAM leadership  not account managers, but the people who run the foundation. If something is not working, you tell us directly. If you have an idea, we hear it directly.",
  },
];

const ORG_TYPES = [
  "Corporate / Private Sector",
  "Foundation / Grant-Making Institution",
  "Government Agency",
  "Faith-Based Organisation",
  "International Development Organisation",
  "Other",
];

const INTEREST_AREAS = [
  "Maternal Healthcare Programme",
  "Student Scholarships Programme",
  "Elderly Care Programme",
  "General Foundation Support",
  "Co-Designed Initiative",
  "Not Sure Yet  Open to Discussion",
];

const BUDGET_RANGES = [
  "Under ₦500,000",
  "₦500,000 – ₦1,000,000",
  "₦1,000,000 – ₦5,000,000",
  "₦5,000,000+",
  "Prefer to discuss directly",
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Partner() {
  return (
    <main className="overflow-x-hidden">
      <PartnerHero />
      <WhyPartner />
      <PartnershipTiers />
      <CurrentPartners />
      <ImpactForPartners />
      <InquiryForm />
      <PartnerCTA />
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════ */
function PartnerHero() {
  return (
    <section
      aria-label="Partner hero"
      className="relative bg-primary overflow-hidden pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(45,106,79,0.4) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(0,0,0,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-4 lg:px-10 sm:px-6 py-20 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Overline color="cream">Partner & Sponsor</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[560px] mb-5"
        >
          Partner <em className="italic text-accent">With Purpose.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[500px] mb-10"
        >
          The JOAM Foundation is looking for organisations whose values align
          with ours  and who want their resources to produce outcomes they can
          stand behind, document, and be proud of.
        </motion.p>

        {/* SDG badges */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
          className="flex gap-3 flex-wrap"
        >
          {[
            "SDG 3  Good Health",
            "SDG 4  Quality Education",
            "SDG 10  Reduced Inequalities",
          ].map((sdg) => (
            <span
              key={sdg}
              className="font-body text-[11px] font-semibold tracking-[0.08em]
                text-cream-surface/65 border border-cream-surface/20
                rounded-pill px-4 py-1.5"
            >
              {sdg}
            </span>
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
   2. WHY PARTNER
══════════════════════════════════════════════════ */
function WhyPartner() {
  return (
    <section
      aria-labelledby="why-partner-heading"
      className="bg-cream py-20 md:py-14 px-4 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-8">
          <Overline color="gold">Why JOAM</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="why-partner-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Three Reasons Serious{" "}
              <em className="not-italic text-primary">
                Organisations Choose JOAM.
              </em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
              We will not waste your time with broad claims. Here is the
              specific case for partnering with this foundation  in the
              language that matters to institutions that have to account for
              where their money goes.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {WHY_PARTNER.map((w, i) => (
            <motion.div
              key={w.num}
              {...fadeUp(i * 0.1)}
              className="p-7 sm:p-5 border-t-[2px] border-border
                hover:border-accent transition-colors duration-250"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-display italic text-[14px] text-accent">
                  {w.num}
                </span>
                <span
                  className="font-body text-[9px] font-semibold tracking-[0.1em] uppercase
                  text-accent/70 bg-accent/10 border border-accent/15
                  rounded-pill px-2.5 py-1 text-right"
                >
                  {w.sdg}
                </span>
              </div>
              <h3 className="font-display font-bold text-ink text-[19px] leading-[1.3] mb-3">
                {w.headline}
              </h3>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {w.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   3. PARTNERSHIP TIERS
══════════════════════════════════════════════════ */
function PartnershipTiers() {
  return (
    <section
      aria-labelledby="tiers-heading"
      className="bg-primary py-20 md:py-14 px-4 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-8">
          <Overline color="cream">Partnership Tiers</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="tiers-heading"
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Find the Level{" "}
              <em className="italic text-accent">
                That Fits Your Organisation.
              </em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55 md:hidden">
              We have structured our partnership framework to accommodate
              organisations at different scales of commitment. Every tier comes
              with full accountability and documented outcomes.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              {...fadeUp(i * 0.1)}
              className={`rounded-[4px] overflow-hidden flex flex-col
                ${
                  tier.featured
                    ? "border-2 border-accent"
                    : "border border-cream-surface/[0.08]"
                }`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="bg-accent px-5 py-2 text-center">
                  <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-ink">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`p-7 sm:p-5 flex flex-col flex-1
                ${tier.featured ? "bg-primary-mid/60" : "bg-primary-mid/30"}`}
              >
                {/* Level tag */}
                <span
                  className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase
                  text-accent/70 block mb-3"
                >
                  {tier.level}
                </span>

                {/* Name */}
                <h3 className="font-display font-bold text-cream-surface text-[20px] leading-snug mb-1">
                  {tier.name}
                </h3>

                {/* Commitment */}
                <p className="font-body text-[13px] text-accent mb-4">
                  {tier.commitment}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-cream-surface/15 mb-4" />

                {/* What it funds */}
                <p className="font-body text-[13px] leading-[1.7] text-cream-surface/55 mb-5">
                  {tier.funds}
                </p>

                {/* Includes */}
                <ul className="space-y-2.5 flex-1">
                  {tier.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full bg-accent/15 border border-accent/20
                        flex items-center justify-center shrink-0 mt-0.5"
                      >
                        <span className="text-accent text-[8px]">✓</span>
                      </div>
                      <span className="font-body text-[12px] leading-[1.6] text-cream-surface/55">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#inquiry-form"
                  className={`mt-6 w-full flex items-center justify-center gap-2
                    font-body text-[13px] font-semibold py-3 rounded-btn no-underline
                    transition-all duration-200
                    ${
                      tier.featured
                        ? "bg-accent hover:bg-accent-hover text-ink"
                        : "bg-transparent border border-cream-surface/20 hover:border-cream-surface/50 text-cream-surface/75 hover:text-cream-surface"
                    }`}
                >
                  Start a Conversation →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom note */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-body text-[13px] leading-[1.7] text-cream-surface/40
            text-center mt-8 max-w-[500px] mx-auto"
        >
          These tiers are a starting point, not a ceiling. If your organisation
          has a specific objective, contact us. We build partnerships around
          what actually works, not around a fixed menu.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   4. CURRENT PARTNERS
══════════════════════════════════════════════════ */
function CurrentPartners() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="bg-cream py-16 md:py-12 px-4 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="text-center mb-8">
          <Overline color="gold" centered>
            Our Partners & Supporters
          </Overline>
          <h2
            id="partners-heading"
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
              text-[clamp(20px,2.5vw,30px)]"
          >
            The Organisations Already In the Work.
          </h2>
        </motion.div>

        {/* Empty state */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-6 p-5 bg-cream-surface border border-border rounded-[4px]"
        >
          <p className="font-body text-[13px] text-ink-muted text-center">
            JOAM Foundation is actively building its institutional partnership
            base. Our first institutional partners will be listed here as
            agreements are formalised.{" "}
            <a
              href="#inquiry-form"
              className="text-primary no-underline border-b border-primary/30
                hover:border-primary transition-colors duration-200"
            >
              Be among the first →
            </a>
          </p>
        </motion.div>

        {/* Logo placeholder strip */}
        <motion.div
          {...fadeUp(0.15)}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-[56px] bg-cream-surface border border-border rounded-btn
                flex items-center justify-center"
            >
              <span
                className="font-body text-[10px] font-medium tracking-[0.1em]
                uppercase text-ink-muted/35"
              >
                Logo
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   5. IMPACT FOR PARTNERS
══════════════════════════════════════════════════ */
function ImpactForPartners() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-cream-surface py-20 md:py-14 px-4 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">What Your Organisation Gains</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="impact-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Partnership With JOAM{" "}
              <em className="not-italic text-primary">
                Is Not a Cost. It Is a Return.
              </em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
              We understand that institutional giving has to justify itself
              internally  to boards, to shareholders, to ESG committees, to
              grant trustees. Here is what a partnership with JOAM produces for
              the organisations that commit to it.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {IMPACT_BENEFITS.map((b, i) => (
            <motion.div
              key={b.num}
              {...fadeUp(i * 0.08)}
              className={`p-7 sm:p-5 bg-cream border border-border rounded-[4px]
                hover:border-primary/20 transition-colors duration-250
                ${i === 4 ? "md:col-span-1 col-span-2" : ""}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-display text-[11px] font-bold text-accent leading-none">
                    {b.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-ink text-[17px] leading-snug">
                  {b.headline}
                </h3>
              </div>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   6. INQUIRY FORM
══════════════════════════════════════════════════ */
function InquiryForm() {
  const [orgType, setOrgType] = useState("");
  const [interest, setInterest] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="inquiry-form"
      aria-labelledby="inquiry-heading"
      className="bg-primary py-20 md:py-14 px-4 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
        {/* LEFT  context */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="cream">Start the Conversation</Overline>
          <h2
            id="inquiry-heading"
            className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-4"
          >
            Tell Us About Your Organisation.
          </h2>
          <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55 mb-8">
            Fill in the form. We review every enquiry personally and will
            respond within 2–3 business days with a specific proposal or a
            request to speak directly.
          </p>

          {/* What to expect */}
          <div className="space-y-3 mb-8">
            {[
              "Every inquiry is reviewed by Jacob Adesina personally.",
              "You will receive a specific response  not a brochure.",
              "We will propose a partnership structure that fits your objectives.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full bg-accent/15 border border-accent/25
                  flex items-center justify-center shrink-0 mt-0.5"
                >
                  <span className="text-accent text-[9px]">✓</span>
                </div>
                <p className="font-body text-[13px] leading-[1.65] text-cream-surface/55">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Direct contact */}
          <div className="pt-6 border-t border-cream-surface/[0.08]">
            <p className="font-body text-[13px] leading-[1.65] text-cream-surface/40 mb-3">
              For urgent or time-sensitive conversations, contact Jacob
              directly:
            </p>
            <a
              href="mailto:jacobgreat1@gmail.com"
              className="flex items-center gap-2 font-body text-[13px] text-accent/75
                hover:text-accent no-underline transition-colors duration-200 mb-2"
            >
              <span className="text-[10px]">✉</span>
              jacobgreat1@gmail.com
            </a>
            <a
              href="https://wa.me/2348095900357"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-body text-[13px] text-cream-surface/45
                hover:text-cream-surface no-underline transition-colors duration-200"
            >
              <span className="text-[10px]">📱</span>
              WhatsApp: +234 809 590 0357
            </a>
          </div>
        </motion.div>

        {/* RIGHT  form */}
        <motion.div {...fadeRight(0.1)}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <InquirySuccess key="success" />
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                {/* Org name + contact person */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PartnerField label="Organisation Name" name="org" required />
                  <PartnerField label="Your Name" name="contact" required />
                </div>

                {/* Title + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PartnerField
                    label="Your Title / Role"
                    name="title"
                    required
                  />
                  <PartnerField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                {/* Phone */}
                <PartnerField label="Phone / WhatsApp" name="phone" optional />

                {/* Org type */}
                <SelectField
                  label="Organisation Type"
                  value={orgType}
                  onChange={setOrgType}
                  options={ORG_TYPES}
                  placeholder="Select organisation type…"
                  required
                />

                {/* Area of interest */}
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-cream-surface/55 block mb-2"
                  >
                    Area of Interest <span className="text-accent">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_AREAS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setInterest(item)}
                        className={`font-body text-[11px] font-medium px-3 py-1.5 rounded-btn border
                          transition-all duration-200 cursor-pointer
                          ${
                            interest === item
                              ? "bg-accent border-accent text-ink"
                              : "bg-transparent border-cream-surface/20 text-cream-surface/60 hover:border-cream-surface/40"
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <SelectField
                  label="Partnership Budget Range"
                  value={budget}
                  onChange={setBudget}
                  options={BUDGET_RANGES}
                  placeholder="Select budget range…"
                  optional
                />

                {/* Message */}
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-cream-surface/55 block mb-2"
                  >
                    Tell us about your organisation and what you are looking for{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="A brief description of your organisation, your CSR or giving objectives, and what kind of partnership you have in mind."
                    className="w-full px-4 py-3 bg-primary-mid/40 border border-cream-surface/[0.12]
                      rounded-btn font-body text-[13px] text-cream-surface
                      placeholder:text-cream-surface/22
                      focus:outline-none focus:border-accent/40
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
                    transition-all duration-200 mt-1"
                >
                  Submit Partnership Enquiry →
                </motion.button>

                <p className="font-body text-[12px] text-cream-surface/35 text-center leading-[1.6]">
                  Your enquiry goes directly to Jacob Adesina. You will receive
                  a personal response within 2–3 business days.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Shared form field components ────────────── */
function PartnerField({
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
          text-cream-surface/55 block mb-2"
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
        {optional && (
          <span className="text-cream-surface/28 normal-case font-normal tracking-normal ml-1">
            (optional)
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-primary-mid/40 border border-cream-surface/[0.12]
          rounded-btn font-body text-[13px] text-cream-surface
          placeholder:text-cream-surface/22
          focus:outline-none focus:border-accent/40
          transition-colors duration-200"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  optional = false,
}) {
  return (
    <div>
      <label
        className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
        text-cream-surface/55 block mb-2"
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
        {optional && (
          <span className="text-cream-surface/28 normal-case font-normal tracking-normal ml-1">
            (optional)
          </span>
        )}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-4 py-3 bg-primary-mid/40 border border-cream-surface/[0.12]
            rounded-btn font-body text-[13px] text-cream-surface
            focus:outline-none focus:border-accent/40
            transition-colors duration-200 appearance-none cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-primary text-cream-surface">
              {o}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-cream-surface/35 text-[10px]">▾</span>
        </div>
      </div>
    </div>
  );
}

function InquirySuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="p-10 sm:p-6 bg-primary-mid/40 border border-cream-surface/[0.07]
        rounded-[4px] flex flex-col items-start"
    >
      <div
        className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30
        flex items-center justify-center mb-5"
      >
        <span className="text-accent text-[16px]">✓</span>
      </div>
      <h3 className="font-display font-bold text-cream-surface text-[22px] leading-snug mb-3">
        Enquiry Received.
      </h3>
      <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55 mb-6">
        Your enquiry has been sent directly to Jacob Adesina. You will receive a
        personal response  not a brochure, not a standard reply  within 2–3
        business days.
      </p>
      <div className="pt-5 border-t border-cream-surface/[0.07] w-full">
        <p className="font-body text-[13px] text-cream-surface/38">
          For urgent matters, email Jacob directly at{" "}
          <a
            href="mailto:jacobgreat1@gmail.com"
            className="text-accent/70 hover:text-accent no-underline transition-colors"
          >
            jacobgreat1@gmail.com
          </a>
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   7. CTA BLOCK  for individual visitors
══════════════════════════════════════════════════ */
function PartnerCTA() {
  return (
    <section
      aria-label="Individual giving"
      className="bg-cream py-20 md:py-14 px-4 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center
            p-10 sm:p-7 bg-primary-light border border-primary/[0.08] rounded-[4px]"
        >
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-accent/60" />
              <span
                className="font-body text-[11px] font-semibold tracking-[0.14em]
                uppercase text-accent/80"
              >
                Not an Organisation?
              </span>
            </div>
            <h2
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
              text-[clamp(22px,2.8vw,34px)] mb-2"
            >
              Individual Giving
            </h2>
            <h2
              className="font-display italic font-normal text-primary leading-[1.1]
              text-[clamp(22px,2.8vw,34px)] mb-6"
            >
              Matters Just as Much.
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Button variant="primary" href="/donate">
                Donate as an Individual
              </Button>
              <Button variant="ghost-light" href="/volunteer">
                Volunteer Instead
              </Button>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="font-body text-[15px] leading-[1.8] text-ink-secondary mb-4">
              This page is built for institutional partners  but the foundation
              runs on individual donors too. If you are a person rather than an
              organisation, and what you have read here has moved you to act,
              the donate page is one click away.
            </p>
            <p className="font-display italic text-[17px] text-primary leading-snug">
              "Every naira given by an individual is just as tracked, just as
              impactful, and just as valued as every naira given by a
              corporation."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
