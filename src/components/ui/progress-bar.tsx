import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label: string;
  className?: string;
}

/** Accessible horizontal meter, 0–100. */
export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-muted", className)}
    >
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${clamped}%` }} />
    </div>
  );
}
