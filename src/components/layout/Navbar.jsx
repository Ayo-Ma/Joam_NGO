import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events",   href: "/events" },
  { label: "Blog",     href: "/blog" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Contact",  href: "/contact" },
  { label: "Partner",  href: "/partner" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999] h-[72px]
          transition-all duration-300
          ${scrolled
            ? "bg-primary/[0.97] backdrop-blur-md border-b border-cream-surface/[0.08] shadow-[0_2px_24px_rgba(0,0,0,0.18)]"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-container-wide mx-auto px-5 sm:px-8 lg:px-16 h-full flex items-center justify-between gap-8">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 no-underline shrink-0 group">
            <div className="w-9 h-9 rounded-full border border-accent/70 group-hover:border-accent flex items-center justify-center transition-colors duration-200">
              <span className="font-display text-[17px] font-bold text-accent leading-none">
                J
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-[15px] text-cream-surface leading-none tracking-wide">
                JOAM Foundation
              </span>
              <span className="font-body text-[8.5px] font-medium tracking-[0.13em] uppercase text-cream-surface/40 mt-0.5">
                Janet Oluwaremilekun Adesina Memorial
              </span>
            </div>
          </a>

          {/* Desktop nav — centered */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-6 flex-1 justify-center"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={label} href={href}>{label}</NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Donate CTA — desktop only */}
            <a
              href="/donate"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-btn
                bg-accent hover:bg-accent-hover border border-accent hover:border-accent-hover
                font-body font-semibold text-[13px] text-ink
                shadow-btn hover:shadow-btn-hover hover:-translate-y-px
                transition-all duration-200 no-underline"
            >
              Donate Now
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-none cursor-pointer p-2 rounded-[4px] hover:bg-cream-surface/10 transition-colors duration-200"
            >
              <span
                className={`block w-5 h-[1.5px] bg-cream-surface transition-all duration-250
                  ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-cream-surface transition-all duration-250
                  ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-cream-surface transition-all duration-250
                  ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[997] bg-black/40 lg:hidden"
              onClick={close}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[998] w-full max-w-[320px] bg-primary flex flex-col lg:hidden shadow-float-lg"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-cream-surface/[0.08] shrink-0">
                <a href="/" onClick={close} className="flex items-center gap-2.5 no-underline">
                  <div className="w-8 h-8 rounded-full border border-accent/60 flex items-center justify-center">
                    <span className="font-display text-[15px] font-bold text-accent leading-none">J</span>
                  </div>
                  <span className="font-display font-bold text-[14px] text-cream-surface tracking-wide">
                    JOAM Foundation
                  </span>
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-cream-surface/20 text-cream-surface/60 hover:text-cream-surface hover:border-cream-surface/40 transition-all duration-200 bg-transparent cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col flex-1 overflow-y-auto px-6 pt-6 pb-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={close}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 + 0.1 }}
                    className="flex items-center justify-between py-4 border-b border-cream-surface/[0.07]
                      font-display font-bold text-[22px] text-cream-surface/80 hover:text-cream-surface
                      no-underline transition-colors duration-200 group"
                  >
                    {label}
                    <span className="text-accent text-[18px] italic opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 pb-8 pt-4 border-t border-cream-surface/[0.08] shrink-0">
                <motion.a
                  href="/donate"
                  onClick={close}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-btn
                    bg-accent hover:bg-accent-hover text-ink font-body font-semibold text-[14px]
                    no-underline transition-all duration-200 shadow-btn"
                >
                  Donate Now →
                </motion.a>
                <p className="font-body text-[12px] text-cream-surface/35 mt-4 leading-relaxed text-center">
                  Restoring dignity to Nigeria&apos;s mothers,<br />
                  students, and elders.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="group relative font-body text-[13px] font-medium text-cream-surface/75
        hover:text-cream-surface no-underline tracking-[0.01em]
        pb-0.5 transition-colors duration-200"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-accent/80 transition-all duration-250" />
    </a>
  );
}
