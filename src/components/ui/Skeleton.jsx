// src/components/ui/Skeleton.jsx

/**
 * JOAM Foundation — Skeleton loading placeholder
 * Usage: <Skeleton className="h-6 w-full" />
 */
export default function Skeleton({ className = "h-4 w-full" }) {
  return (
    <div className={`bg-primary-light/60 rounded animate-pulse ${className}`} />
  );
}