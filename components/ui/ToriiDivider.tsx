import { cn } from "@/lib/utils";

export function ToriiDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-4 text-kabuki", className)}
      aria-hidden
    >
      <span className="h-px flex-1 bg-line" />
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
        <path
          d="M2 5h24M4 5V16M24 5V16M1 2h26"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
