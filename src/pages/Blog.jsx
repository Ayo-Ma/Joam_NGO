// src/pages/Blog.jsx  — Sanity-connected version
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSanity } from "../hooks/useSanity";
import Skeleton from "../components/ui/Skeleton";
import { BLOG_LIST_QUERY, BLOG_FEATURED_QUERY } from "../lib/queries";
import { urlFor } from "../lib/sanityClient";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

const FILTERS = [
  "All",
  "Maternal Health",
  "Scholarships",
  "Elderly Care",
  "Foundation News",
  "Field Report",
  "Impact Story",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { data: posts, loading: postsLoading } = useSanity(BLOG_LIST_QUERY);
  const { data: featured, loading: featuredLoading } =
    useSanity(BLOG_FEATURED_QUERY);

  const filtered = !posts
    ? []
    : activeFilter === "All"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
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
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
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
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.32,
            }}
            className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[460px]"
          >
            This is where we report back. No polished press releases, no
            donor-friendly abstractions. Just honest accounts of what we are
            doing, who we are serving, and what we are learning.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.55,
            }}
            className="mt-14 md:mt-10 h-px bg-cream-surface/10 origin-left"
          />
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="bg-cream py-20 md:py-14 px-4 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto">
          <motion.div {...fadeUp(0)} className="mb-6">
            <Overline color="gold">Latest from JOAM</Overline>
          </motion.div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-primary rounded-[4px] overflow-hidden">
              <Skeleton className="h-[320px] md:h-[200px]" />
              <div className="p-10 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          ) : featured ? (
            <motion.div
              {...fadeUp(0.1)}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-primary rounded-[4px] overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-[320px] md:h-[200px] bg-primary-mid/60 relative overflow-hidden">
                {featured.coverImage?.asset?.url ? (
                  <img
                    src={urlFor(featured.coverImage)
                      .width(800)
                      .auto("format")
                      .url()}
                    alt={featured.coverImage.alt || featured.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-body text-[9px] uppercase tracking-[0.12em] text-cream-surface/22">
                      Article Image
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span
                    className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase
                    text-ink bg-accent rounded-pill px-3 py-1.5"
                  >
                    {featured.category}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-10 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="font-body text-[12px] text-cream-surface/45">
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-cream-surface/25" />
                    <span className="font-body text-[12px] text-cream-surface/45">
                      {featured.readTime} min read
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-cream-surface leading-[1.2] text-[clamp(20px,2.4vw,28px)] mb-4">
                    {featured.title}
                  </h2>
                  <p className="font-body text-[14px] leading-[1.78] text-cream-surface/58 mb-8">
                    {featured.excerpt}
                  </p>
                </div>
                <Link
                  to={`/blog/${featured.slug.current}`}
                  className="inline-flex items-center gap-2 font-body text-[13px] font-semibold
                    text-ink bg-accent hover:bg-accent-hover px-6 py-3 rounded-btn no-underline w-fit
                    shadow-btn transition-all duration-200"
                >
                  Read the Full Post →
                </Link>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* ── ALL POSTS ── */}
      <section className="bg-cream-surface py-20 md:py-14 px-4 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <Overline color="gold">All Stories</Overline>
            <h2
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
              text-[clamp(22px,2.8vw,34px)]"
            >
              Every Post Is a Report.{" "}
              <em className="not-italic text-primary">We Owe You Honesty.</em>
            </h2>
          </motion.div>

          {/* Filters */}
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

          {/* Grid */}
          {postsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-cream border border-border rounded-[4px] overflow-hidden"
                >
                  <Skeleton className="h-[160px] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10"
              >
                {filtered.map((post, i) => (
                  <BlogCard key={post._id} post={post} index={i} />
                ))}
                {filtered.length === 0 && (
                  <p className="font-body text-[14px] text-ink-muted col-span-3 py-12 text-center">
                    No posts in this category yet.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-primary py-20 md:py-14 px-4 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-center">
          <div>
            <Overline color="cream">Stay Close to the Work</Overline>
            <h2
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.015em]
              text-[clamp(24px,3vw,38px)] mb-4"
            >
              Get Our Stories{" "}
              <em className="italic text-accent">In Your Inbox.</em>
            </h2>
            <p className="font-body text-[14px] leading-[1.78] text-cream-surface/55 max-w-[380px]">
              We send one email when something worth reporting happens. No
              newsletters for the sake of newsletters. Only what matters.
            </p>
          </div>
          <div>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-primary-mid/40 border border-cream-surface/[0.07] rounded-[4px]"
              >
                <div
                  className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30
                  flex items-center justify-center mb-5"
                >
                  <span className="text-accent text-[16px]">✓</span>
                </div>
                <h3 className="font-display font-bold text-cream-surface text-[22px] mb-2">
                  You're in.
                </h3>
                <p className="font-body text-[14px] text-cream-surface/55">
                  We will be in touch the next time something worth reporting
                  happens.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="bg-primary-mid/40 border border-cream-surface/[0.07] rounded-[4px] p-8 sm:p-6 flex flex-col gap-4"
              >
                <div>
                  <label
                    className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase
                    text-cream-surface/55 block mb-2"
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
                      rounded-btn font-body text-[13px] text-cream-surface placeholder:text-cream-surface/22
                      focus:outline-none focus:border-accent/40 transition-colors duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 font-body text-[14px]
                    font-semibold text-ink bg-accent hover:bg-accent-hover py-3.5 rounded-btn
                    border-none cursor-pointer shadow-btn transition-all duration-200"
                >
                  Send Me the Stories →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream py-20 md:py-14 px-4 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center
              p-10 sm:p-6 bg-primary rounded-[4px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-accent/60" />
                <span className="font-body text-[11px] font-semibold tracking-[0.14em] uppercase text-accent/80">
                  If This Story Moved You
                </span>
              </div>
              <h2 className="font-display font-bold text-cream-surface leading-[1.1] text-[clamp(22px,2.8vw,36px)] mb-2">
                Be the Reason
              </h2>
              <h2 className="font-display italic font-normal text-accent leading-[1.1] text-[clamp(22px,2.8vw,36px)] mb-6">
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
            <div className="space-y-4">
              <p className="font-body text-[15px] leading-[1.8] text-cream-surface/70">
                Every story on this blog exists because a programme ran — and
                every programme runs because people chose to fund it. If you
                read this far, you already care.
              </p>
              <p className="font-display italic text-[16px] text-accent leading-snug">
                "Every story here started with a donation. Even ₦5,000 changes
                something real."
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function BlogCard({ post, index }) {
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
        hover:border-primary/20 hover:shadow-card transition-all duration-250
        flex flex-col group cursor-pointer"
      whileHover={{ y: -3 }}
    >
      {/* Image */}
      <div className="w-full h-[160px] bg-primary-light relative overflow-hidden">
        {post.coverImage?.asset?.url ? (
          <img
            src={urlFor(post.coverImage).width(600).auto("format").url()}
            alt={post.coverImage.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-body text-[9px] uppercase tracking-[0.1em] text-primary/22">
              Article Image
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className="font-body text-[9px] font-semibold tracking-[0.1em] uppercase
            text-primary bg-primary-light border border-primary/15 rounded-pill px-2.5 py-1"
          >
            {post.category}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-body text-[11px] text-ink-muted">
            {formatDate(post.publishedAt)}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="font-body text-[11px] text-ink-muted">
            {post.readTime} min
          </span>
        </div>
        <h3
          className="font-display font-bold text-ink text-[17px] leading-[1.3] mb-3
          group-hover:text-primary transition-colors duration-200 flex-1"
        >
          {post.title}
        </h3>
        <p className="font-body text-[13px] leading-[1.7] text-ink-secondary mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.slug.current}`}
          className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase
            text-primary no-underline inline-flex items-center gap-1.5
            group-hover:gap-2.5 transition-all duration-200"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}
