import { FaInstagram, FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const FOUNDATION_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Partners", href: "/partner" },
  { label: "Blog", href: "/blog" },
];

const GET_INVOLVED_LINKS = [
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Become a Partner", href: "/partner" },
  { label: "Gallery", href: "/gallery" },
];

const SOCIAL = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-primary">

      {/* Main content */}
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column — full width on sm, 1 col on lg */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-3 no-underline group w-fit">
              <div className="w-9 h-9 rounded-full border border-accent/60 flex items-center justify-center shrink-0">
                <span className="font-display text-[16px] font-bold text-accent leading-none">J</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[16px] text-cream-surface leading-none tracking-[-0.01em]">
                  JOAM Foundation
                </span>
                <span className="font-body text-[9px] font-semibold tracking-[0.14em] uppercase text-cream-surface/35 mt-0.5">
                  Janet Oluwaremilekun Adesina Memorial
                </span>
              </div>
            </a>

            <p className="font-body text-[14px] leading-[1.75] text-cream-surface/50 max-w-[240px]">
              Restoring dignity to Nigeria&apos;s mothers, students, and elders
              — one life at a time.
            </p>

            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-cream-surface/20 flex items-center justify-center
                    text-cream-surface/45 hover:text-cream-surface hover:border-cream-surface/45
                    transition-all duration-200 no-underline"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Foundation links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body font-semibold text-[11px] tracking-[0.16em] uppercase text-cream-surface/40">
              Foundation
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {FOUNDATION_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-[14px] text-cream-surface/55 hover:text-cream-surface
                      no-underline transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body font-semibold text-[11px] tracking-[0.16em] uppercase text-cream-surface/40">
              Get Involved
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {GET_INVOLVED_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-[14px] text-cream-surface/55 hover:text-cream-surface
                      no-underline transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body font-semibold text-[11px] tracking-[0.16em] uppercase text-cream-surface/40">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-3">
              <p className="font-body text-[14px] text-cream-surface/55 leading-relaxed m-0">
                12 Adesina Close,<br />Ado-Ekiti, Nigeria
              </p>
              <a
                href="mailto:hello@joamfoundation.org"
                className="font-body text-[14px] text-cream-surface/55 hover:text-cream-surface
                  no-underline transition-colors duration-200"
              >
                hello@joamfoundation.org
              </a>
              <a
                href="tel:+2348000000000"
                className="font-body text-[14px] text-cream-surface/55 hover:text-cream-surface
                  no-underline transition-colors duration-200"
              >
                +234 800 000 0000
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-surface/[0.08]">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-16 py-5 flex items-center justify-between flex-wrap gap-3">
          <p className="font-body text-[13px] text-cream-surface/30 m-0">
            © 2026 JOAM Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="font-body text-[13px] text-cream-surface/30 hover:text-cream-surface/55 no-underline transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-cream-surface/20">·</span>
            <a href="/terms" className="font-body text-[13px] text-cream-surface/30 hover:text-cream-surface/55 no-underline transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
