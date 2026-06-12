/**
 * JOAM Foundation — SectionWrapper
 * Pure Tailwind. Zero inline styles.
 *
 * bg: "cream" | "surface" | "alt" | "dark" | "gold" | "white"
 * width: "standard" | "wide" | "narrow" | "full"
 */

const bgMap = {
  cream: "bg-cream",
  surface: "bg-cream-surface",
  alt: "bg-cream-alt",
  dark: "bg-primary",
  gold: "bg-accent",
  white: "bg-white",
};

const widthMap = {
  standard: "max-w-container",
  wide: "max-w-container-wide",
  narrow: "max-w-container-narrow",
  full: "max-w-full",
};

export default function SectionWrapper({
  children,
  bg = "cream",
  width = "standard",
  id,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`w-full py-100 md:py-100 ${bgMap[bg] || "bg-cream"} ${className}`}
    >
      <div
        className={`${widthMap[width] || "max-w-container"} mx-auto px-16 md:px-10 sm:px-6`}
      >
        {children}
      </div>
    </section>
  );
}
