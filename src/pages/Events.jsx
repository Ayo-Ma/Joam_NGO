import { useState } from "react";
import { motion } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation — Events Page
 * Sections: Hero → Upcoming Events → Past Events → CTA Block
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

/* ── Data ──────────────────────────────────────────────────── */
const UPCOMING_EVENTS = [
  {
    type: "Fundraising Dinner",
    name: "An Evening for Dignity — JOAM Foundation Launch Gala",
    date: "[Date — to be confirmed]",
    location: "[Venue, City — to be confirmed]",
    desc: "Our inaugural fundraising dinner brings together donors, partners, and community leaders for an evening of conversation, storytelling, and commitment to the foundation's mission. Hear directly from Jacob Adesina on where JOAM is going — and why now is the right time to be part of it.",
    note: "Seats are limited. Reserve yours early.",
    cta: "Reserve My Seat",
    featured: true,
  },
  {
    type: "Community Outreach",
    name: "Maternal Health Awareness Day — [Location]",
    date: "[Date — to be confirmed]",
    location: "[Community, State — to be confirmed]",
    desc: "A free community health day focused on maternal wellbeing — offering basic prenatal screenings, health education, and information about JOAM's maternal care programme. Open to all expectant and new mothers in the community.",
    note: "We need 15 volunteers for this event.",
    cta: "RSVP to Attend",
    featured: false,
  },
  {
    type: "Scholarship Ceremony",
    name: "JOAM Scholarship Awards — [Year] Cohort",
    date: "[Date — to be confirmed]",
    location: "[Venue, City — to be confirmed]",
    desc: "The annual ceremony recognising our scholarship recipients — the students whose academic dedication earned them a place in JOAM's programme. An evening of celebration, testimony, and renewed commitment to education equity.",
    note: "Open to donors, families, and community guests.",
    cta: "RSVP Now",
    featured: false,
  },
  {
    type: "Elderly Care Drive",
    name: "Community Care Day — [Location]",
    date: "[Date — to be confirmed]",
    location: "[Community, State — to be confirmed]",
    desc: "A coordinated outreach day where JOAM volunteers deliver food provisions, healthcare checks, and welfare visits to elderly individuals in underserved communities. Join us as a volunteer or as a donor funding the provisions.",
    note: "Volunteer slots available.",
    cta: "Get Involved",
    featured: false,
  },
];

const PAST_EVENTS = [
  {
    type: "Foundation Event",
    name: "[Past Event Name — to be filled]",
    date: "[Date]",
    location: "[Location]",
    summary:
      "[Brief summary of what happened, who attended, and what was achieved. To be filled by client after first event.]",
  },
  {
    type: "Community Outreach",
    name: "[Past Outreach Name — to be filled]",
    date: "[Date]",
    location: "[Location]",
    summary:
      "[Brief summary of outcomes — number of people reached, provisions distributed, screenings conducted. To be filled.]",
  },
  {
    type: "Scholarship",
    name: "[Past Scholarship Event — to be filled]",
    date: "[Date]",
    location: "[Location]",
    summary:
      "[Brief summary of the scholarship event — students recognised, amounts awarded, families present. To be filled.]",
  },
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Events() {
  return (
    <main className="overflow-x-hidden">
      <EventsHero />
      <UpcomingEvents />
      <PastEvents />
      <EventsCTA />
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════ */
function EventsHero() {
  return (
    <section
      aria-label="Events hero"
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
          <Overline color="cream">Events</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[520px] mb-5"
        >
          Join Us. <em className="italic text-accent">Be Part of the Work.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[460px]"
        >
          Every event JOAM hosts is an extension of the mission — a chance to
          meet the people behind the programmes, see the work up close, and
          become part of a community that believes dignity is worth showing up
          for.
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
   2. UPCOMING EVENTS
══════════════════════════════════════════════════ */
function UpcomingEvents() {
  const [featured, ...rest] = UPCOMING_EVENTS;

  return (
    <section
      aria-labelledby="upcoming-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-12 md:mb-8">
          <Overline color="gold">Upcoming Events</Overline>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              id="upcoming-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Where We Are Going.{" "}
              <em className="not-italic text-primary">Come With Us.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.7] text-ink-secondary max-w-[320px] md:hidden">
              These are the next opportunities to engage with JOAM Foundation in
              person — as a supporter, a volunteer, a partner, or simply someone
              who wants to understand the work better.
            </p>
          </div>
        </motion.div>

        {/* Featured event — full width */}
        <motion.div {...fadeUp(0.1)} className="mb-6">
          <FeaturedEventCard event={featured} />
        </motion.div>

        {/* Remaining events — 3 col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((event, i) => (
            <motion.div key={i} {...fadeUp(i * 0.09)}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Featured Event Card ─────────────────────── */
function FeaturedEventCard({ event }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-primary rounded-[4px] overflow-hidden">
      {/* Image */}
      <div
        className="w-full h-[280px] md:h-[180px] bg-primary-mid/60
        flex items-center justify-center relative"
      >
        <div className="flex flex-col items-center gap-2 text-center px-8">
          <div className="w-px h-8 bg-cream-surface/20" />
          <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-cream-surface/22">
            Event Photograph
          </span>
        </div>
        {/* Type tag */}
        <div className="absolute top-4 left-4">
          <span
            className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase
            text-ink bg-accent rounded-pill px-3 py-1.5"
          >
            {event.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="font-body text-[12px] text-cream-surface/50">
              {event.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-cream-surface/25" />
            <span className="font-body text-[12px] text-cream-surface/50">
              {event.location}
            </span>
          </div>

          <h3 className="font-display font-bold text-cream-surface text-[22px] leading-[1.25] mb-4">
            {event.name}
          </h3>

          <p className="font-body text-[14px] leading-[1.78] text-cream-surface/70 mb-4">
            {event.desc}
          </p>

          {event.note && (
            <p className="font-body text-[12px] text-accent/80 mb-6">
              ◆ {event.note}
            </p>
          )}
        </div>

        <a
          href="/events/launch-gala"
          className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
            text-ink bg-accent hover:bg-accent-hover
            px-6 py-3 rounded-btn no-underline w-fit
            transition-all duration-200"
        >
          {event.cta} →
        </a>
      </div>
    </div>
  );
}

/* ── Standard Event Card ─────────────────────── */
function EventCard({ event }) {
  return (
    <motion.div
      className="bg-cream-surface border border-border rounded-[4px] overflow-hidden
        hover:border-primary/20 hover:shadow-card transition-all duration-250 flex flex-col"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div className="w-full h-[140px] bg-primary-light flex items-center justify-center relative">
        <div className="flex flex-col items-center gap-1.5 text-center px-4">
          <div className="w-px h-6 bg-primary/20" />
          <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-primary/25">
            Event Photo
          </span>
        </div>
        {/* Type tag */}
        <div className="absolute top-3 left-3">
          <span
            className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase
            text-accent bg-accent/10 border border-accent/20 rounded-pill px-2.5 py-1"
          >
            {event.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="font-body text-[11px] text-ink-muted">
            {event.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="font-body text-[11px] text-ink-muted">
            {event.location}
          </span>
        </div>

        <h3 className="font-display font-bold text-ink text-[17px] leading-[1.3] mb-3">
          {event.name}
        </h3>

        <p className="font-body text-[13px] leading-[1.7] text-ink-secondary mb-3 flex-1">
          {event.desc}
        </p>

        {event.note && (
          <p className="font-body text-[11px] text-accent mb-4">
            ◆ {event.note}
          </p>
        )}

        <a
          href="#"
          className="inline-flex items-center gap-1.5 font-body text-[12px] font-semibold
            tracking-[0.08em] uppercase text-primary no-underline mt-auto
            border-b border-primary/25 hover:border-primary pb-px w-fit
            transition-colors duration-200"
        >
          {event.cta} →
        </a>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   3. PAST EVENTS
══════════════════════════════════════════════════ */
function PastEvents() {
  return (
    <section
      aria-labelledby="past-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">Past Events</Overline>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              id="past-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              The Work, Documented.
            </h2>
            <p className="font-body text-[14px] text-ink-secondary md:hidden">
              A record of where JOAM has been and what we have built together.
            </p>
          </div>
        </motion.div>

        {/* Empty state — for launch */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-8 p-6 bg-cream border border-border rounded-[4px]"
        >
          <p className="font-body text-[13px] text-ink-muted text-center">
            JOAM Foundation has just launched. Past events will be documented
            here as the work unfolds.{" "}
            <a
              href="/blog"
              className="text-primary no-underline border-b border-primary/30 hover:border-primary transition-colors duration-200"
            >
              Follow our Blog for updates →
            </a>
          </p>
        </motion.div>

        {/* Placeholder past event rows */}
        <div className="flex flex-col gap-0">
          {PAST_EVENTS.map((event, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.08)}
              className="grid grid-cols-[200px_1fr_auto] md:grid-cols-1 gap-8 md:gap-3
                py-6 border-b border-border last:border-b-0 items-start"
            >
              {/* Image thumbnail */}
              <div
                className="h-[100px] md:h-[80px] bg-primary-light border border-primary/[0.06]
                rounded-[2px] flex items-center justify-center"
              >
                <span className="font-body text-[9px] font-medium tracking-[0.1em] uppercase text-primary/22">
                  Photo
                </span>
              </div>

              {/* Copy */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-accent">
                    {event.type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="font-body text-[11px] text-ink-muted">
                    {event.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="font-body text-[11px] text-ink-muted">
                    {event.location}
                  </span>
                </div>
                <h3 className="font-display font-bold text-ink text-[17px] leading-snug mb-2">
                  {event.name}
                </h3>
                <p className="font-body text-[13px] leading-[1.7] text-ink-secondary">
                  {event.summary}
                </p>
              </div>

              {/* Link */}
              <div className="md:hidden">
                <a
                  href="#"
                  className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase
                    text-primary no-underline border-b border-primary/25
                    hover:border-primary pb-px transition-colors duration-200 whitespace-nowrap"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   4. CTA BLOCK
══════════════════════════════════════════════════ */
function EventsCTA() {
  return (
    <section
      aria-label="Support the foundation"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-8 items-center">
        {/* Left */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="cream">Can't Make It?</Overline>
          <h2
            className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
            text-[clamp(24px,3vw,38px)] mb-2"
          >
            Your Donation Shows Up
          </h2>
          <h2
            className="font-display italic font-normal text-accent leading-[1.1]
            text-[clamp(24px,3vw,38px)] mb-6"
          >
            Even When You Can't.
          </h2>
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" href="/donate">
              Donate Now
            </Button>
            <Button variant="ghost-dark" href="/volunteer">
              Volunteer Instead
            </Button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div {...fadeRight(0.1)} className="space-y-4">
          <p className="font-body text-[15px] leading-[1.8] text-cream-surface/60">
            Not every supporter can be in the room — and that is completely
            fine. A donation to JOAM Foundation goes directly into the
            programmes our volunteers and staff are running on the ground. It
            shows up where it is needed, when it is needed.
          </p>
          <p className="font-display italic text-[18px] text-accent leading-snug">
            "Every act of care keeps the mission alive."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
