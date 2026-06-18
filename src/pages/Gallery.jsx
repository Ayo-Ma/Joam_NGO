import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation  Gallery / Media Page
 * Sections: Hero → Photo Grid → Video Section → Press & Media → CTA Block
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
const PHOTO_FILTERS = [
  "All",
  "Maternal Care",
  "Scholarships",
  "Elderly Care",
  "Events",
  "Team",
];

const FILTER_DESCRIPTORS = {
  All: "Every photograph JOAM has published  field work, events, team, and community.",
  "Maternal Care":
    "Images from our maternal healthcare programme  clinic days, community outreach, and the mothers at the centre of everything we do.",
  Scholarships:
    "Our scholars  in classrooms, at award ceremonies, and in the communities they are going to change.",
  "Elderly Care":
    "The elders we serve. Their faces, their homes, their dignity. This programme exists because someone looked and did not look away.",
  Events:
    "Fundraisers, awareness days, community gatherings, and the moments that bring JOAM's supporters together.",
  Team: "The people behind the work  our leadership, our field staff, and our volunteers.",
};

/* Placeholder photo grid  varied aspect ratios for visual interest */
const PHOTOS = [
  {
    category: "Maternal Care",
    caption:
      "Maternal Care · Ekiti State  A midwife conducts a prenatal check during JOAM's first community health day.",
    span: "col-span-2 row-span-2",
  },
  {
    category: "Scholarships",
    caption:
      "Scholarships · [State]  A scholarship recipient at the award ceremony.",
    span: "",
  },
  {
    category: "Elderly Care",
    caption:
      "Elderly Care · [State]  Volunteers deliver food provisions to an elderly beneficiary.",
    span: "",
  },
  {
    category: "Team",
    caption:
      "Team · [Location]  JOAM field staff preparing for a community outreach day.",
    span: "",
  },
  {
    category: "Events",
    caption:
      "Events · [City]  Community members gather for JOAM's first public awareness event.",
    span: "",
  },
  {
    category: "Maternal Care",
    caption:
      "Maternal Care · [State]  Mothers at the postnatal support circle.",
    span: "",
  },
  {
    category: "Scholarships",
    caption:
      "Scholarships · [City]  Students receiving their first scholarship letters.",
    span: "",
  },
  {
    category: "Elderly Care",
    caption:
      "Elderly Care · [State]  A healthcare check conducted in a beneficiary's home.",
    span: "",
  },
  {
    category: "Team",
    caption:
      "Team · [Location]  Volunteers at the end of a community outreach day.",
    span: "",
  },
];

const VIDEOS = [
  {
    label: "Foundation Story",
    headline: "Jacob Adesina on Why He Built JOAM",
    desc: "In this short film, JOAM founder Jacob Adesina speaks directly about the person this foundation honours, the problem it exists to solve, and what he intends to build. Watch this before anything else.",
    duration: "[X] minutes  to be filmed",
  },
  {
    label: "From the Field",
    headline: "[Title  to be determined after first programme activity]",
    desc: "[To be written after first field visit is filmed  real account of what the camera captured, who spoke, what changed. Honest and specific.]",
    duration: "[X] minutes",
  },
  {
    label: "Beneficiary Story",
    headline: "[First name]  [Programme, State]",
    desc: "[To be written after first beneficiary agrees to speak on camera  their situation, what JOAM provided, what they want people to know.]",
    duration: "[X] minutes",
  },
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeFilter === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeFilter);

  return (
    <main className="overflow-x-hidden">
      <GalleryHero />
      <PhotoGrid
        photos={filtered}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setLightbox={setLightbox}
      />
      <VideoSection />
      <PressMedia />
      <GalleryCTA />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photo={PHOTOS[lightbox]}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════ */
function GalleryHero() {
  return (
    <section
      aria-label="Gallery hero"
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
          <Overline color="cream">Gallery & Media</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[540px] mb-5"
        >
          This Is What{" "}
          <em className="italic text-accent">the Work Looks Like.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[460px]"
        >
          Not stock photography. Not staged moments. Every image on this page
          was taken in the field  in the communities we serve, with the people
          we serve, doing the work we said we would do. Look closely. This is
          where your donation goes.
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
   2. PHOTO GRID
══════════════════════════════════════════════════ */
function PhotoGrid({ photos, activeFilter, setActiveFilter, setLightbox }) {
  return (
    <section
      aria-labelledby="photos-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">From the Field</Overline>
          <h2
            id="photos-heading"
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-3"
          >
            The Work, Documented.
          </h2>
          <p className="font-body text-[14px] leading-[1.7] text-ink-secondary max-w-[480px]">
            We photograph our programmes because visibility is accountability.
            Filter by programme to see exactly where JOAM shows up.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div {...fadeUp(0.1)} className="mb-3 flex gap-2 flex-wrap">
          {PHOTO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-body text-[12px] font-semibold px-4 py-2 rounded-pill border
                transition-all duration-200 cursor-pointer
                ${
                  activeFilter === f
                    ? "bg-primary border-primary text-cream-surface"
                    : "bg-transparent border-border text-ink-secondary hover:border-primary/30 hover:text-ink"
                }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Filter descriptor */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeFilter}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-body text-[13px] text-ink-muted mb-8 italic"
          >
            {FILTER_DESCRIPTORS[activeFilter]}
          </motion.p>
        </AnimatePresence>

        {/* Empty state */}
        {photos.length === 0 ? (
          <EmptyPhotoState />
        ) : (
          <>
            {/* Masonry-style grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]"
              >
                {photos.map((photo, i) => (
                  <PhotoTile
                    key={i}
                    photo={photo}
                    index={i}
                    onClick={() => setLightbox(i)}
                    featured={i === 0 && activeFilter === "All"}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load more */}
            <motion.div {...fadeUp(0.2)} className="text-center mt-10">
              <button
                className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
                  text-ink-secondary hover:text-ink
                  border border-border hover:border-primary/30
                  px-7 py-3 rounded-btn cursor-pointer bg-transparent
                  transition-all duration-200"
              >
                Load More Photos →
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

/* ── Photo Tile ──────────────────────────────── */
function PhotoTile({ photo, index, onClick, featured }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      className={`relative bg-primary-light border border-primary/[0.07]
        rounded-[2px] overflow-hidden cursor-pointer group
        ${featured ? "col-span-2 row-span-2 md:col-span-2 md:row-span-1" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-px h-7 bg-primary/15" />
        <span className="font-body text-[9px] font-medium tracking-[0.1em] uppercase text-primary/22 text-center px-4">
          {photo.category}
        </span>
      </div>

      {/* Category tag */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="font-body text-[9px] font-semibold tracking-[0.1em] uppercase
          text-accent bg-primary/80 border border-accent/20 rounded-pill px-2.5 py-1"
        >
          {photo.category}
        </span>
      </div>

      {/* Caption overlay on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          background:
            "linear-gradient(to top, rgba(27,67,50,0.85), transparent)",
        }}
      >
        <p className="font-body text-[11px] leading-[1.55] text-cream-surface/90">
          {photo.caption}
        </p>
      </motion.div>

      {/* Expand icon */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary/70
          flex items-center justify-center"
      >
        <span className="text-cream-surface text-[11px]">⤢</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Empty Photo State ───────────────────────── */
function EmptyPhotoState() {
  return (
    <motion.div
      {...fadeUp(0)}
      className="py-20 text-center border border-dashed border-primary/15 rounded-[4px]"
    >
      <div className="w-px h-12 bg-primary/15 mx-auto mb-5" />
      <h3 className="font-display font-bold text-ink text-[20px] leading-snug mb-3">
        Our First Photos Are Being Taken Right Now.
      </h3>
      <p className="font-body text-[14px] leading-[1.75] text-ink-secondary max-w-[400px] mx-auto mb-6">
        The JOAM Foundation has just launched. Our field teams are in
        communities, our programmes are beginning, and our first photographs
        will be published here as the work unfolds.
      </p>
      <a
        href="/blog"
        className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
          text-primary no-underline border-b border-primary/30
          hover:border-primary pb-px transition-colors duration-200"
      >
        Get Notified via Blog →
      </a>
    </motion.div>
  );
}

/* ── Lightbox ────────────────────────────────── */
function Lightbox({ photo, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[1000] bg-primary/95 flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div
          className="w-full aspect-[4/3] bg-primary-mid border border-cream-surface/[0.06]
          rounded-[2px] flex items-center justify-center"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.12em] uppercase text-cream-surface/22">
            {photo.category}
          </span>
        </div>

        {/* Caption */}
        <p className="font-body text-[13px] leading-[1.65] text-cream-surface/60 mt-4">
          {photo.caption}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full
            bg-cream-surface/10 hover:bg-cream-surface/20
            border border-cream-surface/20 flex items-center justify-center
            font-body text-cream-surface/70 text-[16px] cursor-pointer
            transition-all duration-200"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   3. VIDEO SECTION
══════════════════════════════════════════════════ */
function VideoSection() {
  return (
    <section
      aria-labelledby="video-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">In Their Own Words</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="video-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              Some Things Are Better{" "}
              <em className="not-italic text-primary">Heard Than Read.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
              When our field teams go out, we bring a camera. When our
              beneficiaries are willing to speak, we listen and we record. These
              are their stories  unscripted, unedited, and entirely real.
            </p>
          </div>
        </motion.div>

        {/* Empty state */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-8 p-5 bg-cream border border-border rounded-[4px]"
        >
          <p className="font-body text-[13px] text-ink-muted text-center">
            Our first field documentary is in production. We are committed to
            showing this work on camera  not because it makes good content, but
            because it makes our accountability visible.{" "}
            <a
              href="/blog"
              className="text-primary no-underline border-b border-primary/30
              hover:border-primary transition-colors duration-200"
            >
              Subscribe to be notified →
            </a>
          </p>
        </motion.div>

        {/* Video placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className="bg-cream border border-border rounded-[4px] overflow-hidden
                hover:border-primary/20 hover:shadow-card
                transition-all duration-250 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div
                className="w-full h-[160px] bg-primary-light relative
                flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-2">
                  {/* Play button */}
                  <div
                    className="w-12 h-12 rounded-full bg-primary/80 border border-accent/30
                    flex items-center justify-center group-hover:bg-primary
                    transition-colors duration-200"
                  >
                    <span className="text-accent text-[14px] ml-0.5">▶</span>
                  </div>
                  <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-primary/25">
                    {video.label}
                  </span>
                </div>

                {/* Label tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="font-body text-[9px] font-semibold tracking-[0.1em] uppercase
                    text-accent bg-primary/70 border border-accent/20 rounded-pill px-2.5 py-1"
                  >
                    {video.label}
                  </span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3">
                  <span
                    className="font-body text-[10px] text-cream-surface/40 bg-primary/50
                    px-2 py-0.5 rounded-sm"
                  >
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="font-display font-bold text-ink text-[16px] leading-[1.3] mb-2
                  group-hover:text-primary transition-colors duration-200"
                >
                  {video.headline}
                </h3>
                <p className="font-body text-[13px] leading-[1.7] text-ink-secondary mb-4">
                  {video.desc}
                </p>
                <span
                  className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase
                  text-primary inline-flex items-center gap-1.5
                  group-hover:gap-2.5 transition-all duration-200"
                >
                  Watch Now →
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
   4. PRESS & MEDIA
══════════════════════════════════════════════════ */
function PressMedia() {
  return (
    <section
      aria-labelledby="press-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">Press & Media</Overline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end">
            <h2
              id="press-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,3vw,38px)]"
            >
              What Others Are{" "}
              <em className="not-italic text-primary">Saying About JOAM.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
              As our work grows, so does the record of it. Below are citations,
              coverage, and mentions of the JOAM Foundation in press and public
              discourse.
            </p>
          </div>
        </motion.div>

        {/* Empty state */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          <div className="p-8 sm:p-6 bg-primary-light border border-primary/[0.08] rounded-[4px]">
            <h3 className="font-display font-bold text-primary text-[20px] leading-snug mb-3">
              We Are a New Foundation.{" "}
              <em className="not-italic text-ink">The Coverage Will Come.</em>
            </h3>
            <p className="font-body text-[14px] leading-[1.78] text-ink-secondary mb-6">
              JOAM Foundation launched in [year]. We do not have years of press
              clippings to show you yet. What we have is a clear mission,
              accountable leadership, and programmes that are beginning right
              now. If you are a journalist or media organisation interested in
              covering this work, we would welcome the conversation.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
                text-primary no-underline border-b border-primary/30
                hover:border-primary pb-px transition-colors duration-200"
            >
              Get In Touch →
            </a>
          </div>

          {/* Media contact card */}
          <div className="p-8 sm:p-6 bg-cream-surface border border-border rounded-[4px]">
            <p
              className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase
              text-accent mb-5"
            >
              Media Contact
            </p>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-full bg-primary-light border border-primary/[0.1]
                flex items-center justify-center shrink-0"
              >
                <span className="font-display text-[16px] font-bold text-primary leading-none">
                  J
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-ink text-[16px] leading-snug">
                  Jacob Adesina
                </p>
                <p className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase text-accent mt-0.5">
                  Founder & Executive Director
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              <a
                href="mailto:jacobgreat1@gmail.com"
                className="flex items-center gap-2 font-body text-[13px] text-ink-secondary
                  hover:text-primary no-underline transition-colors duration-200"
              >
                <span className="text-accent/60 text-[10px]">✉</span>
                jacobgreat1@gmail.com
              </a>
              <a
                href="https://wa.me/2348095900357"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-body text-[13px] text-ink-secondary
                  hover:text-primary no-underline transition-colors duration-200"
              >
                <span className="text-accent/60 text-[10px]">📱</span>
                +234 809 590 0357
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   5. CTA BLOCK
══════════════════════════════════════════════════ */
function GalleryCTA() {
  return (
    <section
      aria-label="Support the foundation"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-8 items-center">
        {/* Left */}
        <motion.div {...fadeLeft(0)}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-5 h-px bg-accent/60" />
            <span className="font-body text-[11px] font-semibold tracking-[0.14em] uppercase text-accent/80">
              Behind Every Photo
            </span>
          </div>

          <h2
            className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
            text-[clamp(24px,3vw,38px)] mb-1"
          >
            Behind Every Image
          </h2>
          <h2
            className="font-display italic font-normal text-accent leading-[1.1]
            text-[clamp(24px,3vw,38px)] mb-2"
          >
            Is a Life Changed.
          </h2>
          <p className="font-display italic text-primary-light/70 text-[18px] leading-snug mb-8">
            Be Part of the Next One.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" href="/donate">
              Donate Now
            </Button>
            <Button variant="ghost-dark" href="#">
              Share This Page
            </Button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div {...fadeRight(0.1)} className="space-y-4">
          <p className="font-body text-[15px] leading-[1.8] text-cream-surface/70">
            Every photograph on this page represents a programme that ran, a
            person who was served, and a donor who made it possible. The next
            image we publish  the next mother, the next scholar, the next elder
             starts with someone choosing to give today.
          </p>
          <p className="font-body text-[15px] leading-[1.8] text-cream-surface/70">
            You have seen the work. You know it is real. The next step is yours.
          </p>
          <div className="pt-4 border-t border-cream-surface/[0.07]">
            <p className="font-body text-[13px] leading-[1.65] text-cream-surface/40">
              The most powerful thing you can do for a new foundation is put it
              in front of people who care. Send this page to someone who should
              see it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
