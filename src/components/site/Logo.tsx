import { cn } from "@/lib/utils";

/** Encircled "A" mark, redrawn from the brand cap embroidery. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
      />
      <path
        d="M16.5 34 24 14l7.5 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19.6 27.6h8.8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.22em]">
        Your Brand
      </span>
    </span>
  );
}
