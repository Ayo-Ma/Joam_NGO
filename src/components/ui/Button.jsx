import { useState } from "react";

/**
 * JOAM Foundation — Button
 * Pure Tailwind. Zero inline styles.
 *
 * variants: "primary" | "ghost-dark" | "ghost-light" | "text"
 */

const base =
  "inline-flex items-center gap-2.5 font-body font-semibold text-body-sm rounded-btn transition-all duration-200 ease-spring cursor-pointer no-underline leading-none whitespace-nowrap border border-transparent";

const variants = {
  primary:
    "bg-accent hover:bg-accent-hover text-cream-surface/70 border-accent hover:border-accent-hover shadow-btn hover:text-ink hover:shadow-btn-hover hover:-translate-y-0.5 px-9 py-4",
  "ghost-dark":
    "bg-transparent text-cream-surface border-cream-surface/30 hover:border-cream-surface/70 hover:bg-cream-surface/10 hover:-translate-y-0.5 px-9 py-4",
  "ghost-light":
    "bg-transparent text-ink-secondary border-black/15 hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary hover:-translate-y-0.5 px-9 py-4",
  text: "bg-transparent text-accent hover:text-accent-hover border-transparent p-0 text-caption font-semibold tracking-widest uppercase",
};

const Arrow = ({ hovered }) => (
  <span
    className={`inline-block transition-transform duration-200 ease-spring ${hovered ? "translate-x-1" : "translate-x-0"}`}
  >
    →
  </span>
);

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  const classes = `${base} ${variants[variant] || variants.primary} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  const shared = {
    className: classes,
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href)
    return (
      <a href={href} {...shared}>
        {children}
        <Arrow hovered={hovered} />
      </a>
    );

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...shared}>
      {children}
      <Arrow />
    </button>
  );
}
