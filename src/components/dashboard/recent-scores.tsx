import type { QuizScore } from "@/types/learning";
import { SKILL_LABELS } from "@/lib/progress";
import { cn, formatShortDate, toPercent } from "@/lib/utils";
import { Card, CardTitle } from "@/components/ui/card";

function scoreTone(percent: number): string {
  if (percent >= 80) return "bg-success-soft text-success";
  if (percent >= 60) return "bg-warning-soft text-warning";
  return "bg-danger-soft text-danger";
}

export function RecentScores({ scores }: { scores: QuizScore[] }) {
  return (
    <Card>
      <CardTitle>Recent quiz scores</CardTitle>
      {scores.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No quizzes yet. Take one to see your scores here.</p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {scores.map((score) => {
            const percent = toPercent(score.correct, score.total);
            return (
              <li key={score.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{score.title}</p>
                  <p className="text-xs text-muted">
                    {SKILL_LABELS[score.skill]} · {formatShortDate(score.date)} · {score.correct}/
                    {score.total}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
                    scoreTone(percent),
                  )}
                >
                  {percent}%
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
