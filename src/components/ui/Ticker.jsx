/**
 * JOAM Foundation — Ticker
 * animate-ticker keyframe injected via style tag — Tailwind JIT
 * strips translateX(-50%) from purged CSS so we define it here.
 */

const ITEMS = [
  "Maternal Healthcare",
  "Student Scholarships",
  "Elderly Care",
  "Community-Rooted",
  "Transparent by Design",
  "Built on Purpose",
  "Dignity for All",
  "Nigeria-Wide",
  "Founded in Honour",
  "Care That Lasts",
];

export default function Ticker() {
  const items = [...ITEMS, ...ITEMS];

  return (
    <>
      <style>{`
        @keyframes joam-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .joam-ticker-track {
          animation: joam-ticker 32s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .joam-ticker-track { animation: none; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="relative bg-primary border-y border-accent/20 py-4 overflow-hidden z-10"
      >
        {/* Left fade */}
        <div
          className="absolute top-0 left-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #1B4332, transparent)" }}
        />

        {/* Right fade */}
        <div
          className="absolute top-0 right-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #1B4332, transparent)" }}
        />

        {/* Track */}
        <div className="joam-ticker-track flex w-max">
          {items.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-accent/60 text-[6px] px-5">◆</span>
              <span className="font-body font-semibold text-[11px] uppercase tracking-[0.16em] text-cream-surface/75 whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}