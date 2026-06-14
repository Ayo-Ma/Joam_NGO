import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation — Blog / News Page
 * Sections: Hero → Featured Post → All Posts Grid →
 *           Newsletter Sign-Up → CTA Block
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── Data ─────────────────────────────────────────────────── */
const FEATURED_POST = {
  category: "Foundation News",
  headline: "We Are Here. Here Is What We Are Building.",
  excerpt:
    "The JOAM Foundation is open. This is our first post — not a press release, not a mission statement, but a direct account of what we are doing, why we are doing it, and what we need from the people who believe in this work. Read it before you give. Read it before you volunteer. We want you to know exactly who you are partnering with.",
  date: "[Launch date]",
  readTime: "[X] min read",
};

const POSTS = [
  {
    category: "Foundation News",
    headline: "Why We Named It JOAM: The Story Behind the Foundation",
    excerpt:
      "Every name carries a history. This one carries a person — and a promise that her values would outlast her absence. Jacob Adesina on why he built this, and what he intends to build.",
    date: "[To be filled]",
    readTime: "[X] min",
  },
  {
    category: "Maternal Health",
    headline:
      "What Maternal Care Actually Looks Like in an Underserved Community",
    excerpt:
      "Not what the textbooks say. What our team saw on the first day in the field — the gaps, the need, and the women who have been waiting longer than they should have had to.",
    date: "[To be filled]",
    readTime: "[X] min",
  },
  {
    category: "Scholarships",
    headline:
      "We Selected Our First Scholarship Cohort. Here Is How We Did It.",
    excerpt:
      "The applications came in. The need was everywhere. This is an honest account of how we made decisions, what criteria guided us, and what it felt like to tell a student they were staying in school.",
    date: "[To be filled]",
    readTime: "[X] min",
  },
  {
    category: "Elderly Care",
    headline:
      "Meeting Our First Elderly Beneficiaries: What We Found and What We Promised",
    excerpt:
      "We went into three communities to assess need before launching the elderly care programme. What we found was not surprising — but it was sobering. This is what we saw.",
    date: "[To be filled]",
    readTime: "[X] min",
  },
  {
    category: "Foundation News",
    headline:
      "How JOAM Tracks and Reports Every Naira — Our Transparency Framework",
    excerpt:
      "We built our accountability system before we built our programmes. This post explains exactly how donations are received, allocated, tracked, and reported — so you never have to wonder.",
    date: "[To be filled]",
    readTime: "[X] min",
  },
  {
    category: "Maternal Health",
    headline:
      "[First real field story — to be written after first programme activity]",
    excerpt:
      "[To be filled with real content — first named story from the maternal care programme.]",
    date: "[To be filled]",
    readTime: "[X] min",
  },
];

const FILTERS = [
  "All",
  "Maternal Health",
  "Scholarships",
  "Elderly Care",
  "Foundation News",
];

const CATEGORY_COLORS = {
  "Foundation News": "text-primary bg-primary-light border-primary/15",
  "Maternal Health": "text-accent bg-accent-light border-accent/20",
  Scholarships: "text-primary bg-primary-light border-primary/15",
  "Elderly Care": "text-accent bg-accent-light border-accent/20",
};

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeFilter === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeFilter);

  return (
    <main className="overflow-x-hidden">
      <BlogHero />
      <FeaturedPost />
      <AllPostsGrid
        posts={filtered}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <NewsletterSignUp
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        subscribed={subscribed}
        setSubscribed={setSubscribed}
      />
      <BlogCTA />
    </main>
  );
}

/* ══════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════ */
function BlogHero() {
  return (
    <section
      aria-label="Blog hero"
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
          <Overline color="cream">Blog & News</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[480px] mb-5"
        >
          From the Field.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/62 max-w-[460px]"
        >
          This is where we report back. No polished press releases, no
          donor-friendly abstractions. Just honest accounts of what we are
          doing, who we are serving, and what we are learning along the way.
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
   2. FEATURED POST
══════════════════════════════════════════════════ */
function FeaturedPost() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-6">
          <Overline color="gold">Latest from JOAM</Overline>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-primary rounded-[4px] overflow-hidden"
        >
          {/* Image */}
          <div
            className="w-full h-[320px] md:h-[200px] bg-primary-mid/60
            flex items-center justify-center relative"
          >
            <div className="flex flex-col items-center gap-2 text-center px-8">
              <div className="w-px h-8 bg-cream-surface/20" />
              <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-cream-surface/22">
                Article Image
              </span>
            </div>
            {/* Category */}
            <div className="absolute top-4 left-4">
              <span
                className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase
                text-ink bg-accent rounded-pill px-3 py-1.5"
              >
                {FEATURED_POST.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-10 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="font-body text-[12px] text-cream-surface/45">
                  {FEATURED_POST.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-cream-surface/25" />
                <span className="font-body text-[12px] text-cream-surface/45">
                  {FEATURED_POST.readTime}
                </span>
              </div>

              <h2
                id="featured-heading"
                className="font-display font-bold text-cream-surface leading-[1.2] tracking-[-0.01em]
                  text-[clamp(20px,2.4vw,28px)] mb-4"
              >
                {FEATURED_POST.headline}
              </h2>

              <p className="font-body text-[14px] leading-[1.78] text-cream-surface/58 mb-8">
                {FEATURED_POST.excerpt}
              </p>
            </div>

            <motion.a
              href="/blog/we-are-here"
              className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
                text-ink bg-accent hover:bg-accent-hover
                px-6 py-3 rounded-btn no-underline w-fit
                shadow-btn transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Read the Full Post →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   3. ALL POSTS GRID
══════════════════════════════════════════════════ */
function AllPostsGrid({ posts, activeFilter, setActiveFilter }) {
  return (
    <section
      aria-labelledby="posts-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">All Stories</Overline>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2
              id="posts-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(22px,2.8vw,34px)]"
            >
              Every Post Is a Report.{" "}
              <em className="not-italic text-primary">We Owe You Honesty.</em>
            </h2>
          </div>
          <p className="font-body text-[14px] leading-[1.7] text-ink-secondary mt-3 max-w-[500px]">
            Filter by the programme you care about most — or read everything.
            Either way, you will always know what this foundation is doing and
            why.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div {...fadeUp(0.1)} className="flex gap-2 flex-wrap mb-10">
          {FILTERS.map((f) => (
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

        {/* Posts grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10"
          >
            {posts.map((post, i) => (
              <PostCard key={i} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load more */}
        <motion.div {...fadeUp(0.1)} className="text-center">
          <button
            className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
              text-ink-secondary hover:text-ink
              border border-border hover:border-primary/30
              px-7 py-3 rounded-btn cursor-pointer bg-transparent
              transition-all duration-200"
          >
            Load More Stories →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Post Card ───────────────────────────────── */
function PostCard({ post, index }) {
  const tagClass =
    CATEGORY_COLORS[post.category] || CATEGORY_COLORS["Foundation News"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      className="bg-cream border border-border rounded-[4px] overflow-hidden
        hover:border-primary/20 hover:shadow-card
        transition-all duration-250 flex flex-col group cursor-pointer"
      whileHover={{ y: -3 }}
    >
      {/* Image */}
      <div className="w-full h-[160px] bg-primary-light relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-px h-6 bg-primary/15" />
          <span className="font-body text-[9px] font-medium tracking-[0.1em] uppercase text-primary/22">
            Article Image
          </span>
        </div>
        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span
            className={`font-body text-[9px] font-semibold tracking-[0.1em] uppercase
            rounded-pill px-2.5 py-1 border ${tagClass}`}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-body text-[11px] text-ink-muted">
            {post.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="font-body text-[11px] text-ink-muted">
            {post.readTime}
          </span>
        </div>

        <h3
          className="font-display font-bold text-ink text-[17px] leading-[1.3] mb-3
          group-hover:text-primary transition-colors duration-200"
        >
          {post.headline}
        </h3>

        <p className="font-body text-[13px] leading-[1.7] text-ink-secondary mb-4 flex-1">
          {post.excerpt}
        </p>

        <span
          className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase
          text-primary inline-flex items-center gap-1.5
          group-hover:gap-2.5 transition-all duration-200"
        >
          Read More →
        </span>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════
   4. NEWSLETTER SIGN-UP
══════════════════════════════════════════════════ */
function NewsletterSignUp({
  email,
  setEmail,
  firstName,
  setFirstName,
  subscribed,
  setSubscribed,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Overline color="cream">Stay Close to the Work</Overline>
          <h2
            id="newsletter-heading"
            className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-4"
          >
            Get Our Stories{" "}
            <em className="italic text-accent">In Your Inbox.</em>
          </h2>
          <p className="font-body text-[14px] leading-[1.78] text-cream-surface/55 max-w-[380px]">
            We send one email when something worth reporting happens — a
            programme milestone, a beneficiary story, an honest update from the
            field. No newsletters for the sake of newsletters. Only what
            matters.
          </p>

          {/* Trust signals */}
          <div className="mt-7 space-y-2.5">
            {[
              "We send when there is something real to say.",
              "No weekly digests. No promotional emails.",
              "Unsubscribe any time.",
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-full bg-accent/15 border border-accent/25
                  flex items-center justify-center shrink-0"
                >
                  <span className="text-accent text-[9px]">✓</span>
                </div>
                <span className="font-body text-[13px] text-cream-surface/50">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-primary-mid/40 border border-cream-surface/[0.07] rounded-[4px]"
              >
                <div
                  className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30
                  flex items-center justify-center mb-5"
                >
                  <span className="text-accent text-[16px]">✓</span>
                </div>
                <h3 className="font-display font-bold text-cream-surface text-[22px] leading-snug mb-2">
                  You're in.
                </h3>
                <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55">
                  We will be in touch the next time something worth reporting
                  happens. Thank you for staying close to this work.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-primary-mid/40 border border-cream-surface/[0.07]
                  rounded-[4px] p-8 sm:p-6 flex flex-col gap-4"
              >
                {/* First name */}
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-cream-surface/50 block mb-2"
                  >
                    First Name{" "}
                    <span className="text-cream-surface/28 normal-case font-normal tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="What should we call you?"
                    className="w-full px-4 py-3 bg-primary/40 border border-cream-surface/[0.1]
                      rounded-btn font-body text-[13px] text-cream-surface
                      placeholder:text-cream-surface/22
                      focus:outline-none focus:border-accent/40
                      transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-cream-surface/50 block mb-2"
                  >
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 bg-primary/40 border border-cream-surface/[0.1]
                      rounded-btn font-body text-[13px] text-cream-surface
                      placeholder:text-cream-surface/22
                      focus:outline-none focus:border-accent/40
                      transition-colors duration-200"
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
                    py-3.5 rounded-btn border-none cursor-pointer
                    shadow-btn transition-all duration-200 mt-1"
                >
                  Send Me the Stories →
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   5. CTA BLOCK
══════════════════════════════════════════════════ */
function BlogCTA() {
  return (
    <section
      aria-label="Support the foundation"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center
            p-10 sm:p-6 bg-primary rounded-[4px]"
        >
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-accent" />
              <span className="font-body text-[11px] font-semibold tracking-[0.14em] uppercase text-accent">
                If This Story Moved You
              </span>
            </div>

            <h2
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
              text-[clamp(22px,2.8vw,36px)] mb-2"
            >
              Be the Reason
            </h2>
            <h2
              className="font-display italic font-normal text-accent leading-[1.1]
              text-[clamp(22px,2.8vw,36px)] mb-6"
            >
              There Is a Next One.
            </h2>

            <div className="flex gap-3 flex-wrap">
              <Button variant="primary" href="/donate">
                Donate Now
              </Button>
              <Button variant="ghost-dark" href="#">
                Share This Story
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <p className="font-body text-[15px] leading-[1.8] text-cream-surface/58">
              Every story on this blog exists because a programme ran — and
              every programme runs because people chose to fund it. If you read
              this far, you already care. The next step is simple.
            </p>
            <p className="font-body text-[14px] leading-[1.75] text-cream-surface/45">
              Know someone who should read this? Send it to them. The most
              powerful thing you can do for this foundation right now is put it
              in front of people who care.
            </p>

            {/* Every ₦5,000 note */}
            <div className="pt-4 border-t border-cream-surface/[0.07]">
              <p className="font-display italic text-[16px] text-accent leading-snug">
                "Every story here started with a donation. Even ₦5,000 changes
                something real."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
