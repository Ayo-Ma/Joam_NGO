/**
 * JOAM Foundation — Overline
 * Pure Tailwind. Zero inline styles.
 * color: "gold" | "green" | "muted" | "cream"
 */

const colorMap = {
  gold: { text: "text-accent", line: "bg-accent" },
  green: { text: "text-primary", line: "bg-primary" },
  muted: { text: "text-ink-muted", line: "bg-ink-muted" },
  cream: { text: "text-cream-surface/55", line: "bg-cream-surface/55" },
};

export default function Overline({
  children,
  color = "gold",
  withLine = true,
  centered = false,
}) {
  const c = colorMap[color] || colorMap.gold;
  return (
    <div
      className={`flex items-center gap-3 mb-[18px] ${centered ? "justify-center" : "justify-start"}`}
    >
      {withLine && <div className={`w-7 h-[1.5px] shrink-0 ${c.line}`} />}
      <span
        className={`font-body font-semibold text-overline uppercase tracking-[0.16em] leading-none ${c.text}`}
      >
        {children}
      </span>
    </div>
  );
}
