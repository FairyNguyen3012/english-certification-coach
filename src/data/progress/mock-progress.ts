import type { LearnerProgress } from "@/types/learning";

/** Mock learner progress until Supabase persistence is added (Phase 4). */
export const mockProgress: LearnerProgress = {
  learnerName: "Learner",
  currentLevel: "B1",
  targetLevel: "B2",
  targetExam: "IELTS",
  streakDays: 12,
  weekActivity: [true, true, true, false, true, true, false],
  skills: {
    vocabulary: 72,
    grammar: 68,
    reading: 81,
    listening: 63,
    speaking: 65,
  },
  recentScores: [
    { id: "s1", skill: "grammar", title: "Present Perfect", correct: 3, total: 5, date: "2026-09-22" },
    { id: "s2", skill: "vocabulary", title: "Work vocabulary quiz", correct: 9, total: 10, date: "2026-09-21" },
    { id: "s3", skill: "reading", title: "B1 · A day at the market", correct: 4, total: 5, date: "2026-09-20" },
    { id: "s4", skill: "listening", title: "B1 · Train announcements", correct: 3, total: 6, date: "2026-09-19" },
    { id: "s5", skill: "grammar", title: "Prepositions", correct: 2, total: 5, date: "2026-09-18" },
  ],
  weakAreas: ["Prepositions", "Listening for details", "Present Perfect"],
};
