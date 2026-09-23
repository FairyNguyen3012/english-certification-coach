import { CEFR_LABELS, type LearnerProgress } from "@/types/learning";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

interface LevelOverviewProps {
  progress: LearnerProgress;
  overall: number;
}

export function LevelOverview({ progress, overall }: LevelOverviewProps) {
  return (
    <Card className="flex flex-col justify-between gap-6">
      <div>
        <p className="text-sm text-muted">Current level</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-semibold">{progress.currentLevel}</span>
          <span className="text-muted">{CEFR_LABELS[progress.currentLevel]}</span>
        </p>
        <p className="mt-2 text-sm text-muted">
          Goal: {progress.targetLevel} for {progress.targetExam}
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall progress</span>
          <span className="font-semibold tabular-nums">{overall}%</span>
        </div>
        <ProgressBar value={overall} label="Overall progress" />
      </div>
    </Card>
  );
}
