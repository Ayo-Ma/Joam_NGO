import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Overline from "../ui/Overline";

const NEWS = [
  {
    date: "May 18, 2026",
    category: "Maternal Health",
    categoryColor: "text-primary",
    headline: "New maternal clinic opens in Ekiti State",
    body: "Our third clinic brings safe, free childbirth care to over 400 expectant mothers each year.",
    href: "/blog",
  },
  {
    date: "April 30, 2026",
    category: "Scholarships",
    categoryColor: "text-accent",
    headline: "120 students receive 2026 scholarship awards",
    body: "From primary to university, this year's cohort represents our largest class of scholars yet.",
    href: "/blog",
  },
  {
    date: "April 12, 2026",
    category: "Elderly Care",
    categoryColor: "text-primary-mid",
    headline: "Honouring our elders: the 2026 care drive",
    body: "Volunteers delivered provisions and health checks to 300 elders living without family support.",
    href: "/blog",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function LatestNews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      aria-labelledby="news-heading"
      className="bg-cream-surface py-16 lg:py-20 px-5 sm:px-8 lg:px-16"
    >
      <div ref={ref} className="max-w-container mx-auto">

        {/* Header row */}
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

          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill border border-border
              font-body font-semibold text-[13px] text-ink-secondary
              hover:border-primary/30 hover:text-primary hover:bg-primary/[0.04]
              transition-all duration-200 no-underline shrink-0"
          >
            All Stories →
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS.map((article, i) => (
            <motion.article
              key={article.headline}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.1 + 0.1}
              className="flex flex-col bg-cream border border-border/50 rounded-card overflow-hidden
                hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 group"
            >
              {/* Image placeholder */}
              <div className="w-full aspect-[16/9] bg-cream-alt/80 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-body text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted/35">
                    Article Image
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-body text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase">
                    {article.date}
                  </span>
                  <span className="text-ink-muted/40">·</span>
                  <span className={`font-body text-[11px] font-semibold tracking-[0.06em] uppercase ${article.categoryColor}`}>
                    {article.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-ink leading-[1.3] tracking-[-0.01em] mb-2.5
                  text-[clamp(17px,1.6vw,20px)] group-hover:text-primary transition-colors duration-200">
                  {article.headline}
                </h3>

                <p className="font-body text-[14px] leading-[1.75] text-ink-secondary mb-5 flex-1">
                  {article.body}
                </p>

                <a
                  href={article.href}
                  className="inline-flex items-center gap-1.5 font-body font-semibold text-[11px]
                    tracking-[0.1em] uppercase text-accent hover:text-accent-hover
                    no-underline transition-colors duration-200 group/link"
                >
                  Read More
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
