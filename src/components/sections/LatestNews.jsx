import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useSanity } from "../../hooks/useSanity";
import { urlFor } from "../../lib/sanityClient";
import Overline from "../ui/Overline";

const LATEST_NEWS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    readTime,
    excerpt,
    coverImage { asset ->{ _id, url }, alt }
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const CATEGORY_COLOR = {
  "Maternal Health": "text-primary",
  Scholarships: "text-accent",
  "Elderly Care": "text-primary-mid",
  "Foundation News": "text-primary",
  "Field Report": "text-accent",
  "Impact Story": "text-primary-mid",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function LatestNews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { data: posts, loading } = useSanity(LATEST_NEWS_QUERY);

  return (
    <section
      aria-labelledby="news-heading"
      className="bg-cream-surface py-16 lg:py-20 px-5 sm:px-8 lg:px-16"
    >
      <div ref={ref} className="max-w-container mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="flex items-end justify-between gap-6 flex-wrap mb-10"
        >
          <div>
            <Overline color="gold">Latest News</Overline>
            <h2
              id="news-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.02em]
                text-[clamp(28px,3.5vw,46px)] m-0"
            >
              From the field
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill border border-border
              font-body font-semibold text-[13px] text-ink-secondary
              hover:border-primary/30 hover:text-primary hover:bg-primary/[0.04]
              transition-all duration-200 no-underline shrink-0"
          >
            All Stories →
          </Link>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-cream border border-border/50 rounded-card overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[16/9] bg-primary-light/60" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-32 bg-primary-light/60 rounded" />
                  <div className="h-5 w-full bg-primary-light/60 rounded" />
                  <div className="h-5 w-3/4 bg-primary-light/60 rounded" />
                  <div className="h-12 w-full bg-primary-light/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state — no posts yet */}
        {!loading && (!posts || posts.length === 0) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            className="py-16 text-center border border-dashed border-primary/15 rounded-[4px]"
          >
            <div className="w-px h-10 bg-primary/15 mx-auto mb-5" />
            <h3 className="font-display font-bold text-ink text-[20px] leading-snug mb-3">
              Our first stories are coming.
            </h3>
            <p
              className="font-body text-[14px] leading-[1.75] text-ink-secondary
              max-w-[380px] mx-auto mb-6"
            >
              As the foundation's work begins, every milestone will be
              documented here — honestly, specifically, and without abstraction.
            </p>
            <Link
              to="/blog"
              className="font-body text-[13px] font-semibold text-primary no-underline
                border-b border-primary/30 hover:border-primary pb-px transition-colors duration-200"
            >
              Visit the Blog →
            </Link>
          </motion.div>
        )}

        {/* Posts grid */}
        {!loading && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <motion.article
                key={post._id}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i * 0.1 + 0.1}
                className="flex flex-col bg-cream border border-border/50 rounded-card overflow-hidden
                  hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {/* Cover image */}
                <div className="w-full aspect-[16/9] bg-primary-light relative overflow-hidden">
                  {post.coverImage?.asset?.url ? (
                    <img
                      src={urlFor(post.coverImage)
                        .width(600)
                        .auto("format")
                        .url()}
                      alt={post.coverImage.alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105
                        transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-body text-[10px] font-medium tracking-[0.14em]
                        uppercase text-ink-muted/35"
                      >
                        Article Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="font-body text-[11px] font-semibold tracking-[0.06em]
                      text-ink-muted uppercase"
                    >
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-ink-muted/40">·</span>
                    <span
                      className={`font-body text-[11px] font-semibold tracking-[0.06em] uppercase
                      ${CATEGORY_COLOR[post.category] || "text-primary"}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-ink leading-[1.3] tracking-[-0.01em]
                    mb-2.5 text-[clamp(17px,1.6vw,20px)]
                    group-hover:text-primary transition-colors duration-200"
                  >
                    {post.title}
                  </h3>

                  <p
                    className="font-body text-[14px] leading-[1.75] text-ink-secondary mb-5 flex-1
                    line-clamp-3"
                  >
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug.current}`}
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-[11px]
                      tracking-[0.1em] uppercase text-accent hover:text-accent-hover
                      no-underline transition-colors duration-200 group/link"
                  >
                    Read More
                    <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
