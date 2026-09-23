import { cn, toPercent } from "@/lib/utils";

function feedbackFor(percent: number): { message: string; tone: string } {
  if (percent >= 80) return { message: "Excellent work — you're ready for harder material.", tone: "text-success" };
  if (percent >= 60) return { message: "Good effort. Review the mistakes below and try again.", tone: "text-warning" };
  return { message: "Keep practising. Read the explanations, then have another go.", tone: "text-danger" };
}

export function ScoreSummary({ correct, total }: { correct: number; total: number }) {
  const percent = toPercent(correct, total);
  const { message, tone } = feedbackFor(percent);
  return (
    <div className="rounded-2xl bg-surface-muted p-6 text-center" role="status">
      <p className="text-sm text-muted">Your score</p>
      <p className={cn("mt-1 text-5xl font-semibold tabular-nums", tone)}>{percent}%</p>
      <p className="mt-1 text-sm text-muted">
        {correct} of {total} correct
      </p>
      <p className="mt-3 text-sm">{message}</p>
    </div>
  );
}
