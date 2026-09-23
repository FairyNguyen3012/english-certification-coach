import type { Metadata } from "next";
import { mockProgress } from "@/data/progress/mock-progress";
import { getOverallProgress, getRecommendation } from "@/lib/progress";
import { PageHeader } from "@/components/ui/page-header";
import { LevelOverview } from "@/components/dashboard/level-overview";
import { StreakCard } from "@/components/dashboard/streak-card";
import { SkillProgressList } from "@/components/dashboard/skill-progress-list";
import { RecentScores } from "@/components/dashboard/recent-scores";
import { NextActivity } from "@/components/dashboard/next-activity";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  // Mock data for now; replace with a Supabase query in Phase 4.
  const progress = mockProgress;
  const overall = getOverallProgress(progress);
  const recommendation = getRecommendation(progress);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${progress.learnerName}`}
        description="Here's where you are on the way to your certification goal."
      />
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <LevelOverview progress={progress} overall={overall} />
        <StreakCard streakDays={progress.streakDays} weekActivity={progress.weekActivity} />
        <NextActivity recommendation={recommendation} weakAreas={progress.weakAreas} />
        <div className="lg:col-span-2">
          <SkillProgressList skills={progress.skills} />
        </div>
        <RecentScores scores={progress.recentScores} />
      </div>
    </>
  );
}
