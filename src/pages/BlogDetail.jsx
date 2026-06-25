// src/pages/BlogDetail.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSanity } from "../hooks/useSanity";
import { BLOG_DETAIL_QUERY } from "../lib/queries";
import { urlFor } from "../lib/sanityClient";
import PortableTextRenderer from "../components/ui/PortableTextRenderer";
import Button from "../components/ui/Button";
import Overline from "../components/ui/Overline";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: post, loading, error } = useSanity(BLOG_DETAIL_QUERY, { slug });

  if (loading) return <BlogDetailSkeleton />;
  if (error || !post) return <NotFound />;

  return (
    <main className="overflow-x-hidden pt-[72px]">
      {/* ── HERO ── */}
      <section className="bg-primary py-16 md:py-12 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link
              to="/blog"
              className="font-body text-[12px] text-cream-surface/45
              hover:text-cream-surface no-underline transition-colors duration-200"
            >
              ← Blog
            </Link>
            <span className="text-cream-surface/25">/</span>
            <span className="font-body text-[12px] text-accent">
              {post.category}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase
              text-accent bg-accent/15 border border-accent/25 rounded-pill px-3 py-1.5 inline-block mb-5"
            >
              {post.category}
            </span>
            <h1
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.02em]
              text-[clamp(28px,4vw,52px)] max-w-[720px] mb-6"
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.photo?.asset?.url ? (
                    <img
                      src={urlFor(post.author.photo)
                        .width(32)
                        .height(32)
                        .auto("format")
                        .url()}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-cream-surface/20"
                    />
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full bg-primary-mid border border-accent/30
                      flex items-center justify-center"
                    >
                      <span className="font-display text-[11px] font-bold text-accent leading-none">
                        {post.author.name?.[0]}
                      </span>
                    </div>
                  )}
                  <span className="font-body text-[13px] font-medium text-cream-surface/70">
                    {post.author.name}
                  </span>
                </div>
              )}
              <span className="font-body text-[13px] text-cream-surface/45">
                {formatDate(post.publishedAt)}
              </span>
              {post.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-cream-surface/25" />
                  <span className="font-body text-[13px] text-cream-surface/45">
                    {post.readTime} min read
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      {post.coverImage?.asset?.url && (
        <div className="bg-primary-light">
          <img
            src={urlFor(post.coverImage).width(1200).auto("format").url()}
            alt={post.coverImage.alt || post.title}
            className="w-full max-h-[480px] object-cover"
          />
          {post.coverImage.caption && (
            <p className="font-body text-[12px] text-ink-muted text-center py-3 italic">
              {post.coverImage.caption}
            </p>
          )}
        </div>
      )}

      {/* ── BODY ── */}
      <section className="bg-cream py-16 md:py-12 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-[1fr_280px] gap-16 md:gap-0 items-start">
          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
          >
            <PortableTextRenderer value={post.body} />
          </motion.div>

          {/* Sidebar */}
          <aside className="md:hidden sticky top-28 pl-12 border-l border-border">
            <SidebarDonationCTA />
            <ShareBlock title={post.title} />
          </aside>
        </div>
      </section>

      {/* ── MOBILE DONATION CTA ── */}
      <div className="hidden md:block bg-cream px-6 pb-14">
        <SidebarDonationCTA />
      </div>

      {/* ── END OF POST CTA ── */}
      <section className="bg-primary py-16 md:py-12 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container-narrow mx-auto text-center">
          <Overline color="cream" centered>
            If This Story Moved You
          </Overline>
          <h2
            className="font-display font-bold text-cream-surface leading-[1.1]
            text-[clamp(24px,3vw,38px)] mb-2"
          >
            Be the Reason
          </h2>
          <h2
            className="font-display italic font-normal text-accent leading-[1.1]
            text-[clamp(24px,3vw,38px)] mb-6"
          >
            There Is a Next One.
          </h2>
          <p className="font-body text-[15px] leading-[1.8] text-cream-surface/60 mb-8">
            Every story on this blog exists because a programme ran — and every
            programme runs because people chose to fund it. If you read this
            far, you already care.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="primary" href="/donate">
              Donate Now
            </Button>
            <Button variant="ghost-dark" href="#">
              Share This Story
            </Button>
          </div>
          <p className="font-body text-[13px] text-cream-surface/35 mt-5">
            Know someone who should read this? Send it to them.
          </p>
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {post.relatedPosts?.length > 0 && (
        <section className="bg-cream-surface py-16 px-16 lg:px-10 sm:px-6">
          <div className="max-w-container mx-auto">
            <Overline color="gold">Read Next</Overline>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
              {post.relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  to={`/blog/${related.slug.current}`}
                  className="no-underline group"
                >
                  <div
                    className="bg-cream border border-border rounded-[4px] overflow-hidden
                    hover:border-primary/20 hover:shadow-card transition-all duration-250"
                  >
                    <div className="h-[140px] bg-primary-light relative overflow-hidden">
                      {related.coverImage?.asset?.url ? (
                        <img
                          src={urlFor(related.coverImage)
                            .width(500)
                            .auto("format")
                            .url()}
                          alt={related.coverImage.alt || related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <span className="font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-accent block mb-2">
                        {related.category}
                      </span>
                      <h3
                        className="font-display font-bold text-ink text-[16px] leading-snug
                        group-hover:text-primary transition-colors duration-200"
                      >
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function SidebarDonationCTA() {
  return (
    <div className="bg-primary rounded-[4px] p-6 mb-6">
      <h3 className="font-display font-bold text-cream-surface text-[18px] leading-snug mb-2">
        Every Story Here
      </h3>
      <h3 className="font-display italic font-normal text-accent text-[18px] leading-snug mb-4">
        Started With a Donation.
      </h3>
      <p className="font-body text-[13px] leading-[1.7] text-cream-surface/55 mb-5">
        The mothers, students, and elders in these posts received care because
        someone chose to give. If what you are reading is moving you to act —
        this is the moment.
      </p>
      <a
        href="/donate"
        className="w-full flex items-center justify-center gap-2 font-body text-[13px]
          font-semibold text-ink bg-accent hover:bg-accent-hover py-3 rounded-btn
          no-underline transition-all duration-200"
      >
        Donate Now →
      </a>
      <p className="font-body text-[11px] text-cream-surface/35 text-center mt-3">
        Even ₦5,000 changes something real.
      </p>
    </div>
  );
}

function ShareBlock({ title }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="p-5 border border-border rounded-[4px]">
      <p className="font-body text-[12px] font-semibold tracking-[0.1em] uppercase text-ink-muted mb-3">
        Share this story
      </p>
      <div className="flex gap-2 flex-wrap">
        {[
          {
            label: "Twitter/X",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          },
          {
            label: "WhatsApp",
            href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
          },
          {
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="font-body text-[11px] font-semibold text-primary no-underline
              border border-primary/25 hover:border-primary rounded-pill px-3 py-1.5
              transition-colors duration-200"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function BlogDetailSkeleton() {
  return (
    <div className="pt-[72px]">
      <div className="bg-primary py-16 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto space-y-4">
          <div className="h-4 w-24 bg-primary-mid/60 rounded animate-pulse" />
          <div className="h-12 w-3/4 bg-primary-mid/60 rounded animate-pulse" />
          <div className="h-4 w-40 bg-primary-mid/60 rounded animate-pulse" />
        </div>
      </div>
      <div className="bg-cream py-16 px-16 lg:px-10 sm:px-6">
        <div className="max-w-container mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-4 bg-primary-light rounded animate-pulse"
              style={{ width: `${70 + Math.random() * 30}%` }}
            />
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
        <h1 className="font-display font-bold text-ink text-[48px] mb-4">
          Post Not Found
        </h1>
        <p className="font-body text-[16px] text-ink-secondary mb-8">
          This post doesn't exist or may have been removed.
        </p>
        <Link
          to="/blog"
          className="font-body text-[14px] font-semibold text-primary
          no-underline border-b border-primary/30 hover:border-primary pb-px transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
