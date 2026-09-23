import type { DailyPracticePrompt } from "@/types/practice";

export function getDailyPrompt(prompts: readonly DailyPracticePrompt[], date = new Date()): DailyPracticePrompt {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return prompts[((day % prompts.length) + prompts.length) % prompts.length];
}

export function getPromptByTopic(prompts: readonly DailyPracticePrompt[], topic: string): DailyPracticePrompt {
  return prompts.find((prompt) => prompt.topic === topic) ?? prompts[0];
}
