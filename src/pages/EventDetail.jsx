// src/pages/EventDetail.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSanity } from "../hooks/useSanity";
import { EVENT_DETAIL_QUERY } from "../lib/queries";
import { urlFor } from "../lib/sanityClient";
import PortableTextRenderer from "../components/ui/PortableTextRenderer";
import Skeleton from "../components/ui/Skeleton";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

function formatDate(dateStr) {
  if (!dateStr) return "Date TBC";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function formatTime(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit",
  });
}

export default function EventDetail() {
  const { slug } = useParams();
  const { data: event, loading, error } = useSanity(EVENT_DETAIL_QUERY, { slug });

  if (loading) return <EventDetailSkeleton />;
  if (error || !event) return <NotFound />;

  const location = event.location?.virtual
    ? { label: "Virtual Event", link: event.location.virtualLink }
    : {
        label: [
          event.location?.venue,
          event.location?.address,
          event.location?.city,
          event.location?.state,
        ].filter(Boolean).join(", "),
        link: null,
      };

  const isUpcoming = event.status === "upcoming" || event.status === "ongoing";
  const isCompleted = event.status === "completed";

  return (
    <main className="overflow-x-hidden pt-[72px]">

      {/* ── HERO ── */}
      <section className="bg-primary py-16 md:py-12 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link to="/events" className="font-body text-[12px] text-cream-surface/45
              hover:text-cream-surface no-underline transition-colors duration-200">
              ← Events
            </Link>
            <span className="text-cream-surface/25">/</span>
            <span className="font-body text-[12px] text-accent">{event.type}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase
                text-ink bg-accent rounded-pill px-3 py-1.5">
                {event.type}
              </span>
              {isCompleted && (
                <span className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                  text-cream-surface/50 border border-cream-surface/20 rounded-pill px-3 py-1.5">
                  Past Event
                </span>
              )}
              {event.status === "cancelled" && (
                <span className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                  text-red-400 border border-red-400/30 rounded-pill px-3 py-1.5">
                  Cancelled
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.02em]
              text-[clamp(28px,4vw,52px)] max-w-[720px] mb-6">
              {event.title}
            </h1>

            {/* Meta grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetaBlock icon="📅" label="Date" value={formatDate(event.startDate)} />
              {event.startDate && (
                <MetaBlock icon="🕐" label="Time" value={formatTime(event.startDate)} />
              )}
              <MetaBlock
                icon={event.location?.virtual ? "💻" : "📍"}
                label="Location"
                value={location.label || "Location TBC"}
                link={location.link}
              />
              {event.capacity && (
                <MetaBlock icon="👥" label="Capacity" value={`${event.capacity} seats`} />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      {event.coverImage?.asset?.url && (
        <div className="bg-primary-light">
          <img src={urlFor(event.coverImage).width(1200).auto("format").url()}
            alt={event.coverImage.alt || event.title}
            className="w-full max-h-[440px] object-cover" />
        </div>
      )}

      {/* ── CONTENT + SIDEBAR ── */}
      <section className="bg-cream py-16 md:py-12 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-[1fr_280px] gap-16 md:gap-0 items-start">

          {/* Body */}
          <div>
            <p className="font-body text-[16px] leading-[1.85] text-ink-secondary mb-6">
              {event.description}
            </p>
            {event.body && <PortableTextRenderer value={event.body} />}

            {/* Volunteer note */}
            {event.needsVolunteers && event.volunteerNote && (
              <div className="mt-8 p-5 bg-primary-light border border-primary/[0.08] rounded-[4px]
                flex items-start gap-4">
                <span className="text-[18px] shrink-0">🙋</span>
                <div>
                  <p className="font-body text-[13px] font-semibold text-primary mb-1">
                    Volunteers Needed
                  </p>
                  <p className="font-body text-[13px] leading-[1.65] text-ink-secondary">
                    {event.volunteerNote}
                  </p>
                  <a href="/volunteer" className="font-body text-[12px] font-semibold text-primary
                    no-underline border-b border-primary/30 hover:border-primary pb-px mt-2 inline-block
                    transition-colors duration-200">
                    Sign Up to Volunteer →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:hidden sticky top-28 pl-12 border-l border-border">
            <EventSidebar event={event} isUpcoming={isUpcoming} />
          </aside>
        </div>
      </section>

      {/* Mobile sidebar */}
      <div className="hidden md:block bg-cream px-6 pb-10">
        <EventSidebar event={event} isUpcoming={isUpcoming} />
      </div>

      {/* ── GALLERY (past events) ── */}
      {isCompleted && event.gallery?.length > 0 && (
        <section className="bg-cream-surface py-16 px-16 lg:px-10 sm:px-6">
          <div className="max-w-container mx-auto">
            <Overline color="gold">Event Gallery</Overline>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
              {event.gallery.map((img, i) => (
                <div key={i} className="aspect-square bg-primary-light rounded-[2px] overflow-hidden">
                  <img src={urlFor(img).width(400).auto("format").url()}
                    alt={img.alt || ""}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                </div>
              ))}
            </div>
            {event.recap && (
              <div className="mt-8 p-6 bg-cream border border-border rounded-[4px]">
                <Overline color="gold" withLine={false}>Event Recap</Overline>
                <p className="font-body text-[15px] leading-[1.8] text-ink-secondary">
                  {event.recap}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="bg-primary py-16 md:py-12 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container-narrow mx-auto text-center">
          <h2 className="font-display font-bold text-cream-surface leading-[1.1]
            text-[clamp(22px,3vw,36px)] mb-2">
            Can't make it to this event?
          </h2>
          <h2 className="font-display italic font-normal text-accent leading-[1.1]
            text-[clamp(22px,3vw,36px)] mb-6">
            Your donation shows up anyway.
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="primary" href="/donate">Donate Now</Button>
            <Button variant="ghost-dark" href="/events">All Events</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Sub-components ──────────────────── */
function MetaBlock({ icon, label, value, link }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[16px] shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase
          text-cream-surface/40 mb-0.5">{label}</p>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer"
            className="font-body text-[13px] text-accent no-underline hover:underline">
            {value}
          </a>
        ) : (
          <p className="font-body text-[13px] text-cream-surface/75">{value}</p>
        )}
      </div>
    </div>
  );
}

function EventSidebar({ event, isUpcoming }) {
  return (
    <div className="space-y-4">
      {/* RSVP card */}
      {isUpcoming && (
        <div className="bg-primary rounded-[4px] p-6">
          <h3 className="font-display font-bold text-cream-surface text-[18px] leading-snug mb-2">
            {event.capacityNote || "Secure your place."}
          </h3>
          {event.rsvpLink ? (
            <a href={event.rsvpLink} target="_blank" rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 font-body text-[13px]
                font-semibold text-ink bg-accent hover:bg-accent-hover py-3 rounded-btn
                no-underline transition-all duration-200 mt-4">
              {event.rsvpButtonText || "Reserve My Seat"} →
            </a>
          ) : (
            <p className="font-body text-[13px] text-cream-surface/50 mt-3">
              Registration details coming soon.
            </p>
          )}
        </div>
      )}

      {/* Share */}
      <div className="p-5 border border-border rounded-[4px]">
        <p className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
          text-ink-muted mb-3">Share this event</p>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(event.title + " " + (typeof window !== "undefined" ? window.location.href : ""))}` },
            { label: "Twitter/X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}` },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              className="font-body text-[11px] font-semibold text-primary no-underline
                border border-primary/25 hover:border-primary rounded-pill px-3 py-1.5
                transition-colors duration-200">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Donate */}
      <div className="p-5 bg-primary-light border border-primary/[0.08] rounded-[4px]">
        <p className="font-body text-[13px] leading-[1.65] text-ink-secondary mb-3">
          Can't attend? Your donation funds the programmes behind every event.
        </p>
        <a href="/donate"
          className="font-body text-[12px] font-semibold text-primary no-underline
            border-b border-primary/30 hover:border-primary pb-px transition-colors duration-200">
          Donate Instead →
        </a>
      </div>
    </div>
  );
}

function EventDetailSkeleton() {
  return (
    <div className="pt-[72px]">
      <div className="bg-primary py-16 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto space-y-4">
          <Skeleton className="h-4 w-24 bg-primary-mid/60" />
          <Skeleton className="h-12 w-3/4 bg-primary-mid/60" />
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-14 bg-primary-mid/60" />)}
          </div>
        </div>
      </div>
      <div className="bg-cream py-16 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto space-y-3">
          {[1,2,3,4,5].map(i => (
            <Skeleton key={i} className="h-4" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display font-bold text-ink text-[48px] mb-4">Event Not Found</h1>
        <p className="font-body text-[16px] text-ink-secondary mb-8">
          This event doesn't exist or may have been removed.
        </p>
        <Link to="/events" className="font-body text-[14px] font-semibold text-primary
          no-underline border-b border-primary/30 hover:border-primary pb-px transition-colors">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}