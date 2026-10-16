type SakuraMarkProps = {
  className?: string;
};

export function SakuraMark({ className }: SakuraMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={className}
      fill="none"
    >
      <path
        d="M32 8c1.6 6.4 3.2 10.4 8.8 14.4C46.4 26.4 50.4 28 56 32c-6.4 1.6-10.4 3.2-14.4 8.8C37.6 46.4 36 50.4 32 56c-1.6-6.4-3.2-10.4-8.8-14.4C17.6 37.6 13.6 36 8 32c6.4-1.6 10.4-3.2 14.4-8.8C26.4 17.6 28 13.6 32 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}
