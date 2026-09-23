import type { LearnerProgress, Recommendation, SkillArea } from "@/types/learning";

export const SKILL_LABELS: Record<SkillArea, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
  listening: "Listening",
  speaking: "Speaking",
};

/** Skills that have a working page in the current milestone. */
export const AVAILABLE_SKILLS: SkillArea[] = ["vocabulary", "grammar"];

export function getOverallProgress(progress: LearnerProgress): number {
  const values = Object.values(progress.skills);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

/**
 * Pick the next activity: the weakest skill that has a page today,
 * pointing at a matching weak-area topic when one exists.
 */
export function getRecommendation(progress: LearnerProgress): Recommendation {
  const weakest = [...AVAILABLE_SKILLS].sort(
    (a, b) => progress.skills[a] - progress.skills[b],
  )[0];

  if (weakest === "grammar") {
    const topic = progress.weakAreas.find((area) =>
      ["Prepositions", "Present Perfect", "Articles"].includes(area),
    );
    if (topic) {
      return {
        skill: "grammar",
        title: `${topic} practice`,
        reason: `Grammar is at ${progress.skills.grammar}% and ${topic} is one of your weak areas.`,
        href: `/grammar/${topic.toLowerCase().replace(/\s+/g, "-")}`,
      };
    }
  }

  return {
    skill: weakest,
    title: `${SKILL_LABELS[weakest]} review`,
    reason: `${SKILL_LABELS[weakest]} is your lowest available skill at ${progress.skills[weakest]}%.`,
    href: `/${weakest}`,
  };
}
