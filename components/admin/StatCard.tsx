import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forge-gradient/20 ring-1 ring-white/[0.08]">
          <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
        </div>
      </div>
      <p className="mt-5 font-display text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-mist-500">{label}</p>
      {hint && <p className="mt-1 text-xs text-mist-700">{hint}</p>}
    </div>
  );
}
