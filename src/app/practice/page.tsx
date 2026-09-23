import type { Metadata } from "next";
import { dailyPracticePrompts } from "@/data/practice/daily-prompts";
import { getDailyPrompt } from "@/lib/practice";
import { PageHeader } from "@/components/ui/page-header";
import { DailyPractice } from "@/components/practice/daily-practice";

export const metadata: Metadata = { title: "Daily practice" };

export default function PracticePage() {
  const prompt = getDailyPrompt(dailyPracticePrompts);
  return (
    <>
      <PageHeader title="Daily practice" description="Read, type, listen, speak and talk with your coach about one useful topic every day." />
      <DailyPractice prompt={prompt} />
    </>
  );
}
