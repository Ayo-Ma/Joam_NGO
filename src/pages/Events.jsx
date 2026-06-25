// src/pages/Events.jsx — Sanity connected
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BiCalendar, BiListPlus } from "react-icons/bi";
import { useSanity } from "../hooks/useSanity";
import {
  EVENTS_UPCOMING_QUERY,
  EVENTS_PAST_QUERY,
  EVENTS_CALENDAR_QUERY,
} from "../lib/queries";
import { urlFor } from "../lib/sanityClient";
import Skeleton from "../components/ui/Skeleton";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

function formatDate(dateStr) {
  if (!dateStr) return "[Date TBC]";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function formatTime(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Events() {
  const [view, setView] = useState("list"); // "list" | "calendar"

  const { data: upcoming, loading: upcomingLoading } = useSanity(
    EVENTS_UPCOMING_QUERY,
  );
  const { data: past, loading: pastLoading } = useSanity(EVENTS_PAST_QUERY);
  const { data: calendar, loading: calendarLoading } = useSanity(
    EVENTS_CALENDAR_QUERY,
  );

  const featured = upcoming?.find((e) => e.featured) || upcoming?.[0];
  const rest = upcoming?.filter((e) => e._id !== featured?._id) || [];

  return (
    <main className="overflow-x-hidden">
      <EventsHero view={view} setView={setView} />

      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UpcomingEvents
              featured={featured}
              rest={rest}
              loading={upcomingLoading}
            />
            <PastEvents past={past} loading={pastLoading} />
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CalendarView events={calendar} loading={calendarLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      <EventsCTA />
    </main>
  );
}

/* ── Hero ──────────────────────────────── */
function EventsHero({ view, setView }) {
  return (
    <section className="relative bg-primary overflow-hidden pt-[72px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 35%, rgba(45,106,79,0.38) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-4 lg:px-10 sm:px-6 py-20 md:py-14">
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
          className="font-body text-[16px] leading-[1.75] text-cream-surface/80 max-w-[460px] mb-8"
        >
          Every event JOAM hosts is an extension of the mission — a chance to
          meet the people behind the programmes and become part of this
          community.
        </motion.p>

        {/* View toggle */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
          className="flex gap-2"
        >
          {[
            { key: "list", label: "List View", icon: BiListPlus },
            { key: "calendar", label: "Calendar View", icon: BiCalendar },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`font-body text-[12px] font-semibold px-5 py-2.5 rounded-btn border
                transition-all duration-200 cursor-pointer
                ${
                  view === v.key
                    ? "bg-accent border-accent text-ink"
                    : "bg-transparent border-cream-surface/25 text-cream-surface/65 hover:border-cream-surface/50"
                }`}
            >
              {v.icon && <v.icon className="inline-block mr-2" />}
              {v.label}
            </button>
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

/* ── Upcoming Events ─────────────────── */
function UpcomingEvents({ featured, rest, loading }) {
  return (
    <section className="bg-cream py-20 md:py-14 px-4 lg:px-10 sm:px-6">
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">Upcoming Events</Overline>
          <h2
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
            text-[clamp(24px,3vw,38px)]"
          >
            Where We Are Going.{" "}
            <em className="not-italic text-primary">Come With Us.</em>
          </h2>
        </motion.div>

        {loading ? (
          <div className="space-y-5">
            <Skeleton className="h-[280px] w-full rounded-[4px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[280px] rounded-[4px]" />
              ))}
            </div>
          </div>
        ) : (!featured && rest.length === 0) ? (
          <EmptyState
            title="No upcoming events yet."
            body="We are planning our first events. Check back soon or subscribe to our blog for updates."
            link={{ label: "Read our Blog →", href: "/blog" }}
          />
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <motion.div {...fadeUp(0.1)} className="mb-6">
                <FeaturedEventCard event={featured} />
              </motion.div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {rest.map((event, i) => (
                  <motion.div key={event._id} {...fadeUp(i * 0.08)}>
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ── Featured Event Card ─────────────── */
function FeaturedEventCard({ event }) {
  const location = event.location?.virtual
    ? "Virtual Event"
    : [event.location?.venue, event.location?.city, event.location?.state]
        .filter(Boolean)
        .join(", ");

  return (
    <Link
      to={`/events/${event.slug.current}`}
      className="no-underline block group"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-primary rounded-[4px] overflow-hidden
        hover:shadow-float-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="w-full h-[280px] md:h-[200px] bg-primary-mid/60 relative overflow-hidden">
          {event.coverImage?.asset?.url ? (
            <img
              src={urlFor(event.coverImage).width(800).auto("format").url()}
              alt={event.coverImage.alt || event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-[9px] uppercase tracking-[0.12em] text-cream-surface/22">
                Event Photo
              </span>
            </div>
          )}
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
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="font-body text-[12px] text-cream-surface/50">
                {formatDate(event.startDate)}
              </span>
              {event.startDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-cream-surface/25" />
                  <span className="font-body text-[12px] text-cream-surface/50">
                    {formatTime(event.startDate)}
                  </span>
                </>
              )}
            </div>
            <h3
              className="font-display font-bold text-cream-surface text-[22px] leading-[1.25] mb-3
              group-hover:text-accent transition-colors duration-200"
            >
              {event.title}
            </h3>
            {location && (
              <p className="font-body text-[12px] text-cream-surface/45 mb-4">
                📍 {location}
              </p>
            )}
            <p className="font-body text-[14px] leading-[1.78] text-cream-surface/58 mb-4">
              {event.description}
            </p>
            {event.capacityNote && (
              <p className="font-body text-[12px] text-accent/80 mb-5">
                ◆ {event.capacityNote}
              </p>
            )}
          </div>
          <span
            className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
            text-ink bg-accent hover:bg-accent-hover px-6 py-3 rounded-btn w-fit
            transition-all duration-200"
          >
            {event.rsvpButtonText || "View Event"} →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Standard Event Card ─────────────── */
function EventCard({ event }) {
  const location = event.location?.virtual
    ? "Virtual"
    : [event.location?.city, event.location?.state].filter(Boolean).join(", ");

  return (
    <Link to={`/events/${event.slug.current}`} className="no-underline group">
      <motion.div
        className="bg-cream-surface border border-border rounded-[4px] overflow-hidden
          hover:border-primary/20 hover:shadow-card transition-all duration-250 flex flex-col h-full"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="w-full h-[140px] bg-primary-light relative overflow-hidden">
          {event.coverImage?.asset?.url ? (
            <img
              src={urlFor(event.coverImage).width(500).auto("format").url()}
              alt={event.coverImage.alt || event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-[9px] uppercase tracking-[0.1em] text-primary/22">
                Event Photo
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span
              className="font-body text-[9px] font-semibold tracking-[0.1em] uppercase
              text-accent bg-accent/10 border border-accent/20 rounded-pill px-2.5 py-1"
            >
              {event.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-body text-[11px] text-ink-muted">
              {formatDate(event.startDate)}
            </span>
            {location && (
              <>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="font-body text-[11px] text-ink-muted">
                  {location}
                </span>
              </>
            )}
          </div>
          <h3
            className="font-display font-bold text-ink text-[17px] leading-[1.3] mb-2 flex-1
            group-hover:text-primary transition-colors duration-200"
          >
            {event.title}
          </h3>
          <p className="font-body text-[13px] leading-[1.7] text-ink-secondary mb-3 line-clamp-2">
            {event.description}
          </p>
          {event.needsVolunteers && event.volunteerNote && (
            <p className="font-body text-[11px] text-accent mb-3">
              ◆ {event.volunteerNote}
            </p>
          )}
          <span
            className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase
            text-primary inline-flex items-center gap-1.5 mt-auto
            group-hover:gap-2.5 transition-all duration-200"
          >
            {event.rsvpButtonText || "View Event"} →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

/* ── Past Events ─────────────────────── */
function PastEvents({ past, loading }) {
  return (
    <section className="bg-cream-surface py-20 md:py-14 px-4 lg:px-10 sm:px-6">
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">Past Events</Overline>
          <h2
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
            text-[clamp(24px,3vw,38px)]"
          >
            The Work, Documented.
          </h2>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[100px] rounded-[4px]" />
            ))}
          </div>
        ) : !past?.length ? (
          <EmptyState
            title="No past events yet."
            body="JOAM Foundation has just launched. Past events will be documented here as the work unfolds."
            link={{ label: "Follow our Blog →", href: "/blog" }}
          />
        ) : (
          <div className="flex flex-col gap-0">
            {past.map((event, i) => (
              <motion.div key={event._id} {...fadeUp(i * 0.07)}>
                <PastEventRow event={event} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PastEventRow({ event }) {
  const location = [event.location?.city, event.location?.state]
    .filter(Boolean)
    .join(", ");
  const thumb = event.gallery?.[0];

  return (
    <Link to={`/events/${event.slug.current}`} className="no-underline group">
      <div
        className="grid grid-cols-[120px_1fr_auto] md:grid-cols-[80px_1fr] gap-6 md:gap-4
        py-6 border-b border-border items-start hover:bg-cream-alt/50 transition-colors duration-200 px-2 -mx-2"
      >
        {/* Thumb */}
        <div
          className="h-[80px] md:h-[60px] bg-primary-light border border-primary/[0.06]
          rounded-[2px] overflow-hidden flex items-center justify-center relative"
        >
          {thumb?.asset?.url ? (
            <img
              src={urlFor(thumb).width(200).auto("format").url()}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-body text-[8px] uppercase tracking-[0.1em] text-primary/22">
              Photo
            </span>
          )}
        </div>

        {/* Copy */}
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-accent">
              {event.type}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="font-body text-[11px] text-ink-muted">
              {formatDate(event.startDate)}
            </span>
            {location && (
              <>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="font-body text-[11px] text-ink-muted">
                  {location}
                </span>
              </>
            )}
          </div>
          <h3
            className="font-display font-bold text-ink text-[16px] leading-snug
            group-hover:text-primary transition-colors duration-200"
          >
            {event.title}
          </h3>
          {event.recap && (
            <p className="font-body text-[13px] leading-[1.65] text-ink-secondary mt-1 line-clamp-2">
              {event.recap}
            </p>
          )}
        </div>

        {/* Link */}
        <span
          className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase
          text-primary md:hidden whitespace-nowrap group-hover:underline"
        >
          Read More →
        </span>
      </div>
    </Link>
  );
}

/* ── Calendar View ───────────────────── */
function CalendarView({ events, loading }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon start

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Map events to days
  const eventsByDay = {};
  events?.forEach((event) => {
    if (!event.startDate) return;
    const d = new Date(event.startDate);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(event);
    }
  });

  return (
    <section className="bg-cream py-20 md:py-14 px-4 lg:px-10 sm:px-6">
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">Event Calendar</Overline>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-display font-bold text-ink leading-[1.1] text-[clamp(24px,3vw,38px)]">
              {monthName}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="font-body text-[13px] font-semibold px-4 py-2 border border-border
                  rounded-btn hover:border-primary/30 cursor-pointer bg-transparent transition-colors duration-200"
              >
                ← Prev
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="font-body text-[13px] font-semibold px-4 py-2 border border-border
                  rounded-btn hover:border-primary/30 cursor-pointer bg-transparent transition-colors duration-200"
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <Skeleton className="h-[480px] w-full rounded-[4px]" />
        ) : (
          <div className="bg-cream-surface border border-border rounded-[4px] overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-border">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div
                  key={d}
                  className="py-3 text-center font-body text-[11px] font-semibold
                  tracking-[0.08em] uppercase text-ink-muted border-r border-border last:border-r-0"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                const dayEvents = day ? eventsByDay[day] || [] : [];
                const isToday =
                  day &&
                  new Date().getDate() === day &&
                  new Date().getMonth() === month &&
                  new Date().getFullYear() === year;

                return (
                  <div
                    key={i}
                    className={`min-h-[80px] sm:min-h-[60px] p-2 border-r border-b border-border
                      last-of-row:border-r-0 relative
                      ${!day ? "bg-cream-alt/30" : ""}
                      ${isToday ? "bg-primary-light/40" : ""}`}
                  >
                    {day && (
                      <>
                        <span
                          className={`font-body text-[12px] font-medium block mb-1
                          ${isToday ? "text-primary font-bold" : "text-ink-secondary"}`}
                        >
                          {day}
                        </span>
                        <div className="space-y-0.5">
                          {dayEvents.map((event) => (
                            <Link
                              key={event._id}
                              to={`/events/${event.slug.current}`}
                              className="block no-underline"
                            >
                              <div
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm
                                truncate transition-opacity duration-200 hover:opacity-80
                                ${
                                  event.status === "completed"
                                    ? "bg-ink-muted/15 text-ink-muted"
                                    : "bg-accent/20 text-primary"
                                }`}
                              >
                                {event.title}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex gap-5 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-accent/20" />
            <span className="font-body text-[11px] text-ink-muted">
              Upcoming
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-ink-muted/15" />
            <span className="font-body text-[11px] text-ink-muted">Past</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary-light/40 border border-primary/20" />
            <span className="font-body text-[11px] text-ink-muted">Today</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────── */
function EventsCTA() {
  return (
    <section className="bg-primary py-20 md:py-14 px-4 lg:px-10 sm:px-6">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Overline color="cream">Can't Make It?</Overline>
          <h2
            className="font-display font-bold text-cream-surface leading-[1.1]
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
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p className="font-body text-[15px] leading-[1.8] text-cream-surface/60">
            Not every supporter can be in the room — and that is completely
            fine. A donation to JOAM Foundation goes directly into the
            programmes our volunteers and staff are running on the ground.
          </p>
          <p className="font-display italic text-[18px] text-accent leading-snug mt-4">
            "Every act of care keeps the mission alive."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Empty State ─────────────────────── */
function EmptyState({ title, body, link }) {
  return (
    <motion.div
      {...fadeUp(0)}
      className="py-16 text-center border border-dashed border-primary/15 rounded-[4px]"
    >
      <div className="w-px h-10 bg-primary/15 mx-auto mb-5" />
      <h3 className="font-display font-bold text-ink text-[20px] leading-snug mb-3">
        {title}
      </h3>
      <p className="font-body text-[14px] leading-[1.75] text-ink-secondary max-w-[400px] mx-auto mb-5">
        {body}
      </p>
      {link && (
        <a
          href={link.href}
          className="font-body text-[13px] font-semibold text-primary no-underline
            border-b border-primary/30 hover:border-primary pb-px transition-colors duration-200"
        >
          {link.label}
        </a>
      )}
    </motion.div>
  );
}
