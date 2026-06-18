import { motion } from "framer-motion";
import Overline from "../components/ui/Overline";
import Button from "../components/ui/Button";
import { image } from "framer-motion/client";

/**
 * JOAM Foundation  About Us Page
 * Tighter layout, normal font sizes, editorial image treatment
 */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

export default function About() {
  return (
    <main className="overflow-x-hidden">
      <AboutHero />
      <JanetStory />
      <MissionValues />
      <Leadership />
      <Timeline />
      <TransparencyCommitment />
      <AboutCTA />
    </main>
  );
}

/* ══════════════════════════════════════════
   1. HERO
══════════════════════════════════════════ */
function AboutHero() {
  return (
    <section
      aria-label="About hero"
      className="relative bg-primary overflow-hidden pt-[72px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 30%, rgba(45,106,79,0.38) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-16 lg:px-10 sm:px-6 py-20 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Overline color="cream">About the Foundation</Overline>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-display font-bold text-cream-surface leading-[1.08] tracking-[-0.02em]
            text-[clamp(36px,5vw,64px)] max-w-[600px] mb-5"
        >
          Built from Grief.
          <br />
          <em className="italic text-accent">Sustained by Purpose.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          className="font-body text-[16px] leading-[1.75] text-cream-surface/70 max-w-[480px]"
        >
          The JOAM Foundation did not begin in a boardroom. It began with a loss
           and a decision that the life of Janet Oluwaremilekun Adesina would
          mean something long after she was gone.
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

/* ══════════════════════════════════════════
   2. JANET'S STORY
══════════════════════════════════════════ */
function JanetStory() {
  return (
    <section
      aria-labelledby="janet-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 items-start">
        {/* LEFT  small editorial image */}
        <motion.div {...fadeLeft(0)}>
          <Overline color="gold">Who We Honour</Overline>

          <h2
            id="janet-heading"
            className="font-display font-bold text-ink leading-[1.12] tracking-[-0.015em]
              text-[clamp(24px,2.8vw,36px)] mb-6"
          >
            She lived with care.
            <br />
            <em className="not-italic text-primary">We carry it forward.</em>
          </h2>

          {/* Editorial image  contained, not full-column */}
          <div className="mb-7">
            <div
              className="w-[220px] md:w-[180px] aspect-[3/4] bg-primary-light border border-primary/[0.1]
                rounded-[2px] relative overflow-hidden float-left mr-6 mb-2"
            >
             <img src="/JOAM LAdy.jpeg" className=" w-100% h-full object-cover" alt="" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-primary/[0.04] border-t border-primary/[0.05]">
                <span className="font-body text-[8px] tracking-[0.08em] text-primary/30">
                  In her memory
                </span>
              </div>
            </div>

            <p className="font-body text-[15px] leading-[1.8] text-ink-secondary">
              Janet Oluwaremilekun Adesina was [relationship to founder]. She
              spent her life [what she did / how she served / what she
              believed]. She believed that [her core conviction about people,
              dignity, or care].
            </p>
            <p className="font-body text-[15px] leading-[1.8] text-ink-secondary mt-4 clear-left">
              When she passed, [founder's name] faced the kind of grief that
              either breaks a person or builds something. He chose to build.
            </p>
            <p className="font-body text-[15px] leading-[1.8] text-ink-secondary mt-4">
              The JOAM Foundation exists because one person's life was too
              meaningful to be mourned quietly. Every mother we support, every
              student we keep in school, every elder we sit with  that is
              Janet, still present. Still caring. Still showing up.
            </p>
          </div>
        </motion.div>

        {/* RIGHT  pull quote + context */}
        <motion.div {...fadeRight(0.12)} className="pt-12 md:pt-0">
          {/* Large pull quote */}
          <figure className="border-l-[2px] border-accent pl-6 mb-10">
            <blockquote
              className="font-display italic text-[clamp(18px,2vw,24px)]
              leading-[1.45] text-ink font-normal m-0 mb-4"
            >
              "We did not build this foundation to remember her. We built it to
              continue her."
            </blockquote>
            <figcaption className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-display text-[11px] font-bold text-accent leading-none">
                  J
                </span>
              </div>
              <span className="font-body text-[12px] font-semibold text-primary">
                Jacob Adesina
                <span className="font-normal text-ink-muted ml-1">
                  · Founder
                </span>
              </span>
            </figcaption>
          </figure>

          {/* Foundation name card */}
          <div className="p-6 bg-primary-light border border-primary/[0.08] rounded-[4px]">
            <p className="font-body text-[11px] font-semibold tracking-[0.12em] uppercase text-accent mb-2">
              Full Name
            </p>
            <p className="font-display font-bold text-primary text-[18px] leading-snug mb-3">
              Janet Oluwaremilekun Adesina
              <br />
              Memorial Foundation
            </p>
            <p className="font-body text-[13px] leading-[1.7] text-ink-secondary">
              Named in honour of a life that embodied the values this foundation
              now carries  compassion, presence, and the belief that every
              person deserves care.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. MISSION & VALUES
══════════════════════════════════════════ */
const VALUES = [
  {
    num: "01",
    headline: "Dignity is Non-Negotiable.",
    body: "We do not believe in charity that diminishes. Every person we serve  every mother, student, and elder  is treated as a full human being with full rights. Our programmes are built around that conviction, not the convenience of the giver.",
  },
  {
    num: "02",
    headline: "Presence Over Promises.",
    body: "Anyone can make a commitment from a distance. We believe in showing up  physically, consistently, and without condition. Our work happens in communities, not in offices. That is the only way to do it right.",
  },
  {
    num: "03",
    headline: "Transparency is the Foundation of Trust.",
    body: "We are a new organisation asking people to believe in something they cannot yet see fully. Every naira we receive is tracked, every programme is documented, and every donor deserves to know exactly what their support made possible.",
  },
];

function MissionValues() {
  return (
    <section
      aria-labelledby="values-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="gold">What We Believe</Overline>
          <h2
            id="values-heading"
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.01em]
              text-[clamp(24px,3vw,38px)] max-w-[440px]"
          >
            Three Beliefs That Drive Everything We Do.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.num}
              {...fadeUp(i * 0.1)}
              className="p-7 sm:p-5 border-t-[2px] border-border
                hover:border-accent transition-colors duration-250 cursor-default"
            >
              <span className="font-display italic text-[14px] text-accent block mb-3">
                {v.num}
              </span>
              <h3 className="font-display font-bold text-ink text-[19px] leading-[1.3] mb-3">
                {v.headline}
              </h3>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. LEADERSHIP
══════════════════════════════════════════ */
const LEADERS = [
  {
    name: "Jacob Adesina",
    title: "Founder & Executive Director",
    bio: "Jacob Adesina founded JOAM in honour of [Janet's relationship  to be confirmed]. He brings [professional background] to the work of building an organisation that is as accountable as it is compassionate. His conviction: that the people most overlooked by systems deserve the most deliberate attention. Jacob oversees strategy, partnerships, and programme delivery.",
    email: "jacobgreat1@gmail.com",
    phone: "08095900357",
    initial: "JA",
    image: "/jacob.jpeg",
  },
  {
    name: "Abubakar Abdulbasit",
    title: "Programme Director",
    bio: "Abubakar Abdulbasit leads the design and delivery of JOAM's three programme pillars  maternal healthcare, student scholarships, and elderly care. He ensures that what the foundation promises in its communications is what actually happens on the ground. [Additional background to be filled by client.]",
    email: null,
    phone: "08168166347",
    initial: "AA",
    image: "/lateef.jpeg",
  },
];

function Leadership() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <Overline color="cream">The People Accountable to You</Overline>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              id="leadership-heading"
              className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.01em]
                text-[clamp(24px,3vw,38px)]"
            >
              Accountability Starts With Names.
            </h2>
            <p className="font-body text-[14px] leading-[1.7] text-cream-surface/55 max-w-[320px] md:hidden">
              Two people lead this foundation. You should know who they are and
              how to reach them directly.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEADERS.map((leader, i) => (
            <motion.div
              key={leader.name}
              {...fadeUp(i * 0.12)}
              className="bg-primary-mid/35 border border-cream-surface/[0.07]
                rounded-[4px] overflow-hidden"
            >
              {/* Photo area  taller, feels like a real photo slot */}
              <div
                className="w-full  aspect-[4/3] bg-primary-mid/60 border-b border-cream-surface/[0.06]
                flex flex-col items-center justify-center gap-2 relative"
              >
                {/* Large monogram */}
              
               <img src={leader.image} className=" w-full object-top h-full object-cover" alt={leader.name} />
              </div>

              {/* Info */}
              <div className="p-7 sm:p-5">
                <div className="mb-5">
                  <h3 className="font-display font-bold text-cream-surface text-[20px] leading-snug">
                    {leader.name}
                  </h3>
                  <p className="font-body text-[11px] font-semibold tracking-[0.1em] uppercase text-accent mt-1">
                    {leader.title}
                  </p>
                </div>

                <p className="font-body text-[14px] leading-[1.78] text-cream-surface/70 mb-6">
                  {leader.bio}
                </p>

                <div className="pt-5 border-t border-cream-surface/[0.07] flex flex-col gap-2.5">
                  {leader.email && (
                    <a
                      href={`mailto:${leader.email}`}
                      className="font-body text-[13px] text-accent/75 hover:text-accent
                        no-underline transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="text-accent/40 text-[10px]">✉</span>
                      {leader.email}
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${leader.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-[13px] text-cream-surface/45 hover:text-cream-surface/80
                      no-underline transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-cream-surface/30 text-[10px]">
                      📱
                    </span>
                    WhatsApp: {leader.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. TIMELINE
══════════════════════════════════════════ */
const MILESTONES = [
  {
    year: "[Year]",
    label: "The Decision",
    body: "Janet's passing  and the moment the decision to build something in her name was made.",
  },
  {
    year: "[Year]",
    label: "Foundation Registered",
    body: "JOAM Foundation formally established with three programme pillars.",
  },
  {
    year: "[Year]",
    label: "First Programme Launches",
    body: "First maternal care, scholarship, or elderly support activity  to be filled.",
  },
  {
    year: "[Year]",
    label: "First Beneficiaries",
    body: "Real people reached. Real outcomes documented. The work begins.",
  },
  {
    year: "2026",
    label: "Website Launch",
    body: "JOAM goes online  open to donors, partners, and communities across Nigeria and the diaspora.",
  },
];

function Timeline() {
  return (
    <section
      aria-labelledby="timeline-heading"
      className="bg-cream py-20 md:py-14 px-16 lg:px-10 sm:px-6 overflow-hidden"
    >
      <div className="max-w-container mx-auto">
        <motion.div {...fadeUp(0)} className="mb-12">
          <Overline color="gold">Our Journey</Overline>
          <h2
            id="timeline-heading"
            className="font-display font-bold text-ink leading-[1.1] tracking-[-0.01em]
              text-[clamp(24px,3vw,38px)] max-w-[440px]"
          >
            Every Foundation Has a Starting Point.{" "}
            <em className="not-italic text-primary">This Is Ours.</em>
          </h2>
        </motion.div>

        {/* Desktop horizontal */}
        <div className="md:hidden relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1.3,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="absolute top-[10px] left-0 right-0 h-px bg-border origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5 relative">
            {MILESTONES.map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="pt-10">
                {/* Dot */}
                <div className="absolute top-[5px] w-2.5 h-2.5 rounded-full bg-accent border-2 border-cream" />

                <span className="font-display italic text-[13px] text-accent block mb-1.5">
                  {m.year}
                </span>
                <h3 className="font-display font-bold text-ink text-[15px] leading-[1.3] mb-2">
                  {m.label}
                </h3>
                <p className="font-body text-[12px] leading-[1.65] text-ink-secondary">
                  {m.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-12 p-6 bg-primary-light border border-primary/[0.08] rounded-[4px]
              flex items-start gap-5"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent text-[12px]">→</span>
            </div>
            <div>
              <h4 className="font-display font-bold text-primary text-[16px] leading-snug mb-1.5">
                Where We Are Going
              </h4>
              <p className="font-body text-[13px] leading-[1.7] text-ink-secondary">
                [One sentence on the foundation's 3–5 year ambition  to be
                filled by Jacob Adesina.]
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile vertical */}
        <div className="hidden md:block relative pl-7">
          <div className="absolute top-0 left-2 bottom-0 w-px bg-border" />
          <div className="flex flex-col gap-8">
            {MILESTONES.map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="relative">
                <div className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-cream" />
                <span className="font-display italic text-[13px] text-accent block mb-1">
                  {m.year}
                </span>
                <h3 className="font-display font-bold text-ink text-[16px] leading-snug mb-1.5">
                  {m.label}
                </h3>
                <p className="font-body text-[13px] leading-[1.65] text-ink-secondary">
                  {m.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-8 p-5 bg-primary-light border border-primary/[0.08] rounded-[4px]"
          >
            <h4 className="font-display font-bold text-primary text-[16px] leading-snug mb-1.5">
              Where We Are Going
            </h4>
            <p className="font-body text-[13px] leading-[1.7] text-ink-secondary">
              [One sentence on the foundation's 3–5 year ambition  to be filled
              by Jacob Adesina.]
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6. TRANSPARENCY COMMITMENT
══════════════════════════════════════════ */
const TRANSPARENCY = [
  {
    num: "01",
    headline: "Every Naira Is Tracked.",
    body: "All donations are received into a dedicated foundation account. No personal accounts. No informal transfers. Every inflow is recorded against the programme it was allocated to.",
  },
  {
    num: "02",
    headline: "Every Programme Is Documented.",
    body: "Our field teams document every beneficiary interaction  anonymised where necessary, detailed enough to be meaningful. Impact reports are available to every donor on request.",
  },
  {
    num: "03",
    headline: "Every Donor Deserves an Update.",
    body: "When you give to JOAM, you will hear from us  not with a generic newsletter, but with a specific account of what your contribution made possible. That is a commitment, not a courtesy.",
  },
  {
    num: "04",
    headline: "Our Leadership Is Contactable.",
    body: "Jacob Adesina and Abubakar Abdulbasit are reachable by email and WhatsApp. If you have a question about how this foundation operates, ask it directly. We will answer.",
    link: { label: "Contact Us", href: "/contact" },
  },
];

function TransparencyCommitment() {
  return (
    <section
      aria-labelledby="transparency-heading"
      className="bg-cream-surface py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-container mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-end mb-10"
        >
          <div>
            <Overline color="gold">How We Operate</Overline>
            <h2
              id="transparency-heading"
              className="font-display font-bold text-ink leading-[1.1] tracking-[-0.01em]
                text-[clamp(24px,3vw,38px)]"
            >
              Here Is Exactly How We Work.
            </h2>
          </div>
          <p className="font-body text-[14px] leading-[1.75] text-ink-secondary md:hidden">
            You are not being asked to give blindly. Here is what happens to
            every donation from the moment it arrives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TRANSPARENCY.map((pt, i) => (
            <motion.div
              key={pt.num}
              {...fadeUp(i * 0.08)}
              className="p-7 sm:p-5 bg-cream border border-border rounded-[4px]
                hover:border-primary/20 transition-colors duration-250"
            >
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="font-display text-[11px] font-bold text-accent leading-none">
                  {pt.num}
                </span>
              </div>
              <h3 className="font-display font-bold text-ink text-[18px] leading-[1.25] mb-3">
                {pt.headline}
              </h3>
              <p className="font-body text-[14px] leading-[1.78] text-ink-secondary mb-3">
                {pt.body}
              </p>
              {pt.link && (
                <a
                  href={pt.link.href}
                  className="font-body text-[12px] font-semibold text-primary no-underline
                    border-b border-primary/30 hover:border-primary pb-px
                    transition-colors duration-200"
                >
                  {pt.link.label} →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   7. CTA BLOCK
══════════════════════════════════════════ */
function AboutCTA() {
  return (
    <section
      aria-label="Support the foundation"
      className="bg-primary py-20 md:py-14 px-16 lg:px-10 sm:px-6"
    >
      <div className="max-w-[600px] mx-auto text-center">
        <motion.div {...fadeUp(0)}>
          <Overline color="cream" centered>
            You Have Seen Who We Are
          </Overline>
        </motion.div>

        <motion.h2
          {...fadeUp(0.1)}
          className="font-display font-bold text-cream-surface leading-[1.1] tracking-[-0.01em]
            text-[clamp(26px,3.5vw,44px)] mb-1"
        >
          Now See What Your Support
        </motion.h2>

        <motion.h2
          {...fadeUp(0.18)}
          className="font-display italic font-normal text-accent leading-[1.15]
            text-[clamp(26px,3.5vw,44px)] mb-6"
        >
          Makes Possible.
        </motion.h2>

        <motion.p
          {...fadeUp(0.26)}
          className="font-body text-[15px] leading-[1.8] text-cream-surface/70
            mb-8"
        >
          A foundation is only as strong as the people who believe in it early.
          You are here at the beginning  and that matters more than you know.
          Every programme we build, every life we reach, starts with someone
          deciding this work is worth funding.{" "}
          <em className="not-italic font-semibold text-cream-surface/85">
            Be that person.
          </em>
        </motion.p>

        <motion.div
          {...fadeUp(0.34)}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <Button variant="primary" href="/donate">
            Donate Now
          </Button>
          <Button variant="ghost-dark" href="/programs">
            See Our Programs
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
