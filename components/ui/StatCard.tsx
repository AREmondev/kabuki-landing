type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="border-t border-line pt-6">
      <p className="font-display text-h2 text-navy tabular-nums">{value}</p>
      <p className="mt-2 text-[15px] text-ink-muted">{label}</p>
    </div>
  );
}
