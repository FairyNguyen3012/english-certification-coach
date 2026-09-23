import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function StreakCard({ streakDays, weekActivity }: { streakDays: number; weekActivity: boolean[] }) {
  return (
    <Card className="flex flex-col justify-between gap-6">
      <div>
        <p className="text-sm text-muted">Daily learning streak</p>
        <p className="mt-1 text-4xl font-semibold tabular-nums">
          {streakDays} <span className="text-base font-normal text-muted">days</span>
        </p>
      </div>
      <ul className="grid grid-cols-7 gap-1.5" aria-label="This week's activity">
        {DAYS.map((day, index) => {
          const studied = weekActivity[index] ?? false;
          return (
            <li key={day} className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "size-7 rounded-full border",
                  studied ? "border-accent bg-accent" : "border-border bg-surface-muted",
                )}
                aria-label={`${day}: ${studied ? "studied" : "no study"}`}
              />
              <span className="text-[11px] text-muted" aria-hidden>
                {day.slice(0, 2)}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
