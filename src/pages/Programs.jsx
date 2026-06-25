// src/pages/Programs.jsx — Sanity connected, no placeholders
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSanity } from "../hooks/useSanity";
import { urlFor } from "../lib/sanityClient";
import Skeleton from "../components/ui/Skeleton";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";

/**
 * JOAM Foundation — Programs Page
 * Pulls programme content from Sanity CMS.
 * Falls back to hardcoded copy for structure/copy that won't change.
 * Story sections show honest empty state until real beneficiary stories exist.
 */

const PROGRAMMES_QUERY = `
  *[_type == "programme"] | order(pillar asc) {
    _id,
    name,
    pillar,
    headline,
    headlineItalic,
    subheadline,
    whatWeDo,
    whoWeServe,
    donations,
    coverImage { asset ->{ _id, url }, alt },
    impactStats
  }
`;

const IMPACT_STORIES_BY_PROGRAMME_QUERY = `
  *[_type == "impactStory" && consentObtained == true] {
    _id,
    firstName,
    slug,
    programme,
    location,
    headline,
    excerpt,
    pullQuote,
    photo { asset ->{ _id, url }, alt }
  }
`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── Hardcoded structure — copy that won't change ── */
const PROGRAMME_STRUCTURE = [
  {
    id: "maternal",
    sanityName: "Maternal Healthcare",
    officialName: "Comprehensive Maternal Health Support Program",
    pillar: "Pillar One",
    headline: "No Mother Faces",
    ImageLink: "/maternalCare.jpg",
    italic: "Childbirth Alone.",
    subheadline:
      "In Nigeria, preventable complications during childbirth remain one of the leading causes of maternal death — almost always in communities where care is too far, too expensive, or simply absent. We go to where the gaps are.",
    whatWeDo:
      "The JOAM maternal healthcare programme provides free prenatal care, skilled birth attendance, postnatal support, and emergency referral services to mothers in underserved communities. We do not wait for women to find us. We build presence in the places that formal healthcare systems have not reached.",
    whoWeServe:
      "Financially disadvantaged pregnant women and new mothers — many of whom would otherwise deliver at home, without skilled support, without a safety net. Women for whom the nearest clinic is hours away or costs more than a month's income.",
    donations: [
      {
        amount: "₦5,000",
        covers: "Prenatal care for one mother for one month",
      },
      {
        amount: "₦15,000",
        covers: "Full antenatal support through a full-term pregnancy",
      },
      { amount: "₦25,000", covers: "Emergency delivery care for one mother" },
      {
        amount: "₦50,000",
        covers: "Postnatal care and support for two mothers and their newborns",
      },
    ],
    storyLabel: "From the Field",
    storyHeadline: "The first stories are being written right now.",
    storyBody:
      "As our maternal care programme launches, the women we serve will share their experiences here — with their consent, in their own words. Come back soon.",
    cta: "Support Maternal Care",
    reverse: false,
  },
  {
    id: "scholarships",
    sanityName: "Student Scholarships",
    officialName: "Educational Access and Scholarship Program",
    ImageLink: "/classroom.jpg",
    pillar: "Pillar Two",
    headline: "A Student's Future Should Not",
    italic: "Depend on Their Family's Means.",
    subheadline:
      "Across Nigeria, academically gifted students leave school every year — not because they failed, but because their families ran out of money. JOAM scholarships exist to make sure that never happens to a student we can reach.",
    whatWeDo:
      "The JOAM scholarship programme provides full and partial financial support to academically gifted students from low-income households. Coverage includes school fees, textbooks, examination registration, and mentorship. We follow our scholars — we do not fund one term and disappear.",
    whoWeServe:
      "Students at primary, secondary, and tertiary level who demonstrate academic ability but face financial barriers that would force them out of education. Selection prioritises students whose families have exhausted every available option.",
    donations: [
      { amount: "₦10,000", covers: "School fees for one student for one term" },
      {
        amount: "₦20,000",
        covers: "Full academic year support at primary level",
      },
      {
        amount: "₦35,000",
        covers: "Secondary school fees and textbooks for one year",
      },
      {
        amount: "₦75,000",
        covers: "University support — one semester, fees and materials",
      },
    ],
    storyLabel: "From the Classroom",
    storyHeadline: "Our first scholars are being selected.",
    storyBody:
      "The application process for our inaugural scholarship cohort is underway. When our first scholars share their stories, you will read them here.",
    cta: "Fund a Scholar",
    reverse: true,
  },
  {
    id: "elderly",
    sanityName: "Elderly Care",
    officialName: "Senior Care and Support Service Program",
    ImageLink: "/elder.jpg",
    pillar: "Pillar Three",
    headline: "The People Who Built This Country",
    italic: "Deserve Better Than Silence.",
    subheadline:
      "Old age should not mean isolation. It should not mean going without food, without medication, without someone who remembers your name. For too many elders in Nigeria, that is exactly what it means. We are here to change that.",
    whatWeDo:
      "The JOAM elderly care programme delivers regular healthcare checks, essential food provisions, and consistent human presence to elderly individuals living without adequate family support. We are not running a facility. We are bringing care to people where they already live — in their homes, in their communities, with their dignity intact.",
    whoWeServe:
      "Elderly men and women — particularly those without family nearby, living on inadequate income, or managing health conditions without access to consistent medical attention. People the system has stopped counting.",
    donations: [
      {
        amount: "₦5,000",
        covers: "Food provisions for one elder for two weeks",
      },
      {
        amount: "₦15,000",
        covers: "Monthly food and welfare support for one elder",
      },
      {
        amount: "₦25,000",
        covers: "Monthly healthcare check and medication for one elder",
      },
      {
        amount: "₦60,000",
        covers:
          "Full monthly support — healthcare, food, and welfare — for one elder",
      },
    ],
    storyLabel: "From the Community",
    storyHeadline: "We are going to them. Their stories will follow.",
    storyBody:
      "Our elderly care outreach is beginning in communities across Nigeria. As relationships form and trust is built, the people we serve will share their experiences here.",
    cta: "Support Elderly Care",
    reverse: false,
  },
];

const METHODOLOGY = [
  {
    num: "01",
    headline: "Community-Rooted",
    body: "Every programme we run is built in partnership with the communities we serve — not designed for them from the outside. We listen before we act. We stay after we start.",
  },
  {
    num: "02",
    headline: "Long-Term by Design",
    body: "We do not measure success by the number of one-time interventions we deliver. We measure it by what changes — and whether that change lasts.",
  },
  {
    num: "03",
    headline: "Honest About Outcomes",
    body: "We document what we do and report what we find — including when something does not work the way we intended. Transparency is not a marketing position for JOAM.",
  },
  {
    num: "04",
    headline: "Built to Scale Carefully",
    body: "We are a new foundation. Every community we enter, we enter properly — with the resources, the people, and the commitment to do the work right.",
  },
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Programs() {
  const { data: sanityProgrammes, loading: progLoading } =
    useSanity(PROGRAMMES_QUERY);
  const { data: stories, loading: storyLoading } = useSanity(
    IMPACT_STORIES_BY_PROGRAMME_QUERY,
  );

  return (
    <main className="overflow-x-hidden">
      <ProgramsHero />

      {PROGRAMME_STRUCTURE.map((prog, i) => {
        // Merge Sanity data if it exists for this programme
        const sanityData = sanityProgrammes?.find(
          (p) => p.name === prog.sanityName,
        );
        const progStories =
          stories?.filter((s) => s.programme === prog.sanityName) || [];

        return (
          <ProgrammeSection
            key={prog.id}
            prog={prog}
            sanityData={sanityData}
            story={progStories[0] || null}
            loading={progLoading || storyLoading}
            bg={i % 2 === 0 ? "cream" : "surface"}
          />
        );
      })}

      <HowWeDeliver />
      <ProgramsCTA />
    </main>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
function ProgramsHero() {
  return (
    <section
      aria-label="Programs hero"
      className="relative bg-primary overflow-hidden pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(45,106,79,0.38) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-16 lg:px-10 sm:px-6 py-20 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Overline color="cream">Our Work</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[560px] mb-5"
        >
          Three Pillars.
          <br />
          <em className="italic text-accent">One Promise.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[500px] mb-10"
        >
          Every programme JOAM runs exists to answer the same question: what
          does a person need to live with dignity? For a mother, it is safe
          care. For a student, it is a fighting chance. For an elder, it is not
          being forgotten.
        </motion.p>

        {/* Anchor links */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
          className="flex gap-3 flex-wrap"
        >
          {PROGRAMME_STRUCTURE.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="font-body text-[12px] font-semibold tracking-[0.08em]
                text-cream-surface/70 hover:text-cream-surface border border-cream-surface/20
                hover:border-cream-surface/50 rounded-pill px-4 py-2 no-underline
                transition-all duration-200"
            >
              {p.sanityName}
            </a>
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

/* ── Programme Section ─────────────────────────────────────── */
function ProgrammeSection({ prog, sanityData, story, loading, bg }) {
  const bgClass = bg === "surface" ? "bg-cream-surface" : "bg-cream";

  // Merge: Sanity overrides hardcoded if it exists
  const whatWeDo = sanityData?.whatWeDo || prog.whatWeDo;
  const whoWeServe = sanityData?.whoWeServe || prog.whoWeServe;
  const subheadline = sanityData?.subheadline || prog.subheadline;
  const donations = sanityData?.donations?.length
    ? sanityData.donations
    : prog.donations;

  return (
    <section
      id={prog.id}
      aria-labelledby={`${prog.id}-heading`}
      className={`${bgClass} py-20 md:py-14 px-16 lg:px-10 sm:px-6`}
    >
      <div className="max-w-container mx-auto">
        {/* ── Top: image + copy ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-start mb-14 md:mb-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: prog.reverse ? 28 : -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={
              prog.reverse ? "order-last md:order-first" : "order-first"
            }
          >
            <div
              className="w-full aspect-[4/3] bg-primary-light border border-primary/[0.08]
              rounded-[2px] relative overflow-hidden"
            >
              {sanityData?.coverImage?.asset?.url ? (
                <img
                  src={urlFor(sanityData.coverImage)
                    .width(800)
                    .auto("format")
                    .url()}
                  alt={sanityData.coverImage.alt || prog.sanityName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-px h-8 bg-primary/20" />
                 <img src={prog.ImageLink} alt={prog.sanityName} />
                </div>
              )}
              {/* Watermark number */}
              <div className="absolute bottom-4 right-5 opacity-[0.04]">
                <span className="font-display font-bold text-[64px] text-primary leading-none select-none">
                  {prog.id === "maternal"
                    ? "01"
                    : prog.id === "scholarships"
                      ? "02"
                      : "03"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: prog.reverse ? -28 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className={
              prog.reverse ? "order-first md:order-last" : "order-last"
            }
          >
            <Overline color="gold">
              {prog.pillar} — {prog.officialName}
            </Overline>

            <h2
              id={`${prog.id}-heading`}
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.015em]
                text-[clamp(24px,2.8vw,36px)] mb-4"
            >
              {prog.headline}
              <br />
              <em className="not-italic text-primary">{prog.italic}</em>
            </h2>

            <p className="font-body text-[15px] leading-[1.78] text-ink-secondary mb-6">
              {subheadline}
            </p>

            <div className="mb-5">
              <p
                className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase
                text-ink-muted mb-2"
              >
                What We Do
              </p>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {whatWeDo}
              </p>
            </div>

            <div>
              <p
                className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase
                text-ink-muted mb-2"
              >
                Who We Serve
              </p>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {whoWeServe}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Donation table ── */}
        <motion.div {...fadeUp(0.1)} className="mb-14 md:mb-10">
          <p
            className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase
            text-ink-muted mb-4"
          >
            What Your Donation Funds
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {donations.map((d, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                className="flex items-start gap-4 p-5 bg-primary-light border border-primary/[0.07]
                  rounded-[4px] hover:border-primary/20 transition-colors duration-200"
              >
                <span className="font-display font-bold text-primary text-[20px] leading-none shrink-0">
                  {d.amount}
                </span>
                <div className="w-px self-stretch bg-border shrink-0" />
                <p className="font-body text-[13px] leading-[1.65] text-ink-secondary">
                  {d.covers}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Impact story — real if exists, honest if not ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="bg-primary rounded-[4px] p-8 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-center"
        >
          {/* Story image */}
          <div
            className="w-full aspect-[4/3] bg-primary-mid/50 border border-cream-surface/[0.06]
            rounded-[2px] overflow-hidden flex items-center justify-center relative"
          >
            {story?.photo?.asset?.url ? (
              <img
                src={urlFor(story.photo).width(600).auto("format").url()}
                alt={story.photo.alt || story.firstName}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-center px-6">
                <div className="w-px h-7 bg-cream-surface/20" />
                <span className="font-body text-[9px] font-medium tracking-[0.12em] uppercase text-cream-surface/22">
                  {prog.storyLabel}
                </span>
              </div>
            )}
          </div>

          {/* Story copy */}
          <div>
            <span
              className="font-body text-[10px] font-semibold tracking-[0.14em] uppercase
              text-accent block mb-3"
            >
              {prog.storyLabel}
            </span>

            {story ? (
              <>
                <h3 className="font-display font-bold text-cream-surface text-[20px] leading-[1.25] mb-4">
                  {story.headline}
                </h3>
                <p className="font-body text-[13px] leading-[1.75] text-cream-surface/58 mb-5">
                  {story.excerpt}
                </p>
                {story.pullQuote && (
                  <figure className="border-l-2 border-accent/40 pl-4 mb-5">
                    <blockquote
                      className="font-display italic text-[15px] leading-[1.5]
                      text-cream-surface/75 m-0 mb-1.5"
                    >
                      "{story.pullQuote}"
                    </blockquote>
                    <figcaption className="font-body text-[11px] text-cream-surface/40">
                      — {story.firstName}, {story.location}
                    </figcaption>
                  </figure>
                )}
                <Link
                  to={`/impact/${story.slug?.current}`}
                  className="inline-flex items-center gap-2 font-body text-[12px] font-semibold
                    tracking-[0.08em] uppercase text-accent no-underline
                    border-b border-accent/30 hover:border-accent pb-px transition-colors duration-200"
                >
                  Read Their Story →
                </Link>
              </>
            ) : (
              <>
                <h3 className="font-display font-bold text-cream-surface text-[20px] leading-[1.25] mb-4">
                  {prog.storyHeadline}
                </h3>
                <p className="font-body text-[13px] leading-[1.75] text-cream-surface/55 mb-6">
                  {prog.storyBody}
                </p>
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 font-body text-[12px] font-semibold
                    tracking-[0.08em] uppercase text-accent no-underline
                    border-b border-accent/30 hover:border-accent pb-px transition-colors duration-200"
                >
                  {prog.cta} →
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── How We Deliver ────────────────────────────────────────── */
function HowWeDeliver() {
  return (
    <section className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6">
      <div className="max-w-container mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 items-end mb-12 md:mb-8"
        >
          <div>
            <Overline color="cream">Our Methodology</Overline>
            <h2
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.01em]
              text-[clamp(24px,3vw,38px)]"
            >
              We Do Not Parachute In.{" "}
              <em className="italic text-accent">We Stay.</em>
            </h2>
          </div>
          <p className="font-body text-[14px] leading-[1.75] text-cream-surface/55 md:hidden">
            The difference between aid that works and aid that doesn't is almost
            always the same thing: presence. We build it into everything we do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {METHODOLOGY.map((m, i) => (
            <motion.div
              key={m.num}
              {...fadeUp(i * 0.09)}
              className="p-7 sm:p-5 border border-cream-surface/[0.07] rounded-[4px]
                hover:border-cream-surface/20 transition-colors duration-250"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-7 h-7 rounded-full bg-accent/15 border border-accent/25
                  flex items-center justify-center shrink-0"
                >
                  <span className="font-display text-[11px] font-bold text-accent leading-none">
                    {m.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-cream-surface text-[18px] leading-snug">
                  {m.headline}
                </h3>
              </div>
              <p className="font-body text-[14px] leading-[1.78] text-cream-surface/55">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────────────── */
function ProgramsCTA() {
  return (
    <section className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6">
      <div className="max-w-container mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center
            p-10 sm:p-6 bg-primary rounded-[4px]"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-accent/60" />
              <span
                className="font-body text-[11px] font-semibold tracking-[0.14em]
                uppercase text-accent/80"
              >
                Every Programme Runs on Generosity
              </span>
            </div>
            <h2
              className="font-display font-bold text-cream-surface leading-[1.1]
              text-[clamp(22px,2.8vw,36px)] mb-2"
            >
              None of This Happens
            </h2>
            <h2
              className="font-display italic font-normal text-accent leading-[1.1]
              text-[clamp(22px,2.8vw,36px)] mb-6"
            >
              Without People Like You.
            </h2>
            <div className="flex gap-3 flex-wrap">
              <Button variant="primary" href="/donate">
                Donate Now
              </Button>
              <Button variant="ghost-dark" href="/partner">
                Become a Partner
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-body text-[15px] leading-[1.8] text-cream-surface/70">
              A mother does not deliver safely by accident. A student does not
              stay in school by luck. An elder does not receive care through
              wishful thinking. Every single outcome this foundation produces
              begins with someone choosing to give.
            </p>
            <p className="font-body text-[15px] leading-[1.8] text-cream-surface/70">
              You have read what we do. You know who we serve. The next step is
              yours.
            </p>
            <p className="font-display italic text-[17px] text-accent leading-snug">
              "The next step is yours."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
