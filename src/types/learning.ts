/** Shared learning types. Content lives in src/data, UI in src/components. */

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export const CEFR_LABELS: Record<CefrLevel, string> = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
  B2: "Upper-intermediate",
  C1: "Advanced",
  C2: "Proficient",
};

export type VocabularyKind = "word" | "idiom";

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "phrasal verb";

export type VocabularyTopic =
  | "Daily life"
  | "Work"
  | "Travel"
  | "Education"
  | "Health"
  | "Environment"
  | "Technology";

export interface VocabularyItem {
  id: string;
  word: string;
  ipa: string;
  partOfSpeech: PartOfSpeech;
  definition: string;
  vietnamese: string;
  example: string;
  level: CefrLevel;
  topic: VocabularyTopic;
  synonyms?: string[];
  antonyms?: string[];
  kind?: VocabularyKind;
}

export interface VocabularyFilterState {
  search: string;
  level: CefrLevel | "all";
  topic: VocabularyTopic | "all";
}

export interface MultipleChoiceQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options`. */
  correctIndex: number;
  explanation: string;
}

export interface GrammarExample {
  sentence: string;
  note?: string;
}

export interface CommonMistake {
  incorrect: string;
  correct: string;
  why: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  level: CefrLevel;
  summary: string;
  explanation: string[];
  form?: string[];
  examples: GrammarExample[];
  commonMistakes: CommonMistake[];
  questions: MultipleChoiceQuestion[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  level: CefrLevel;
  topic: string;
  paragraphs: string[];
  questions: MultipleChoiceQuestion[];
}

export type SkillArea =
  | "vocabulary"
  | "grammar"
  | "reading"
  | "listening"
  | "speaking";

export interface QuizScore {
  id: string;
  skill: SkillArea;
  title: string;
  correct: number;
  total: number;
  /** ISO date, e.g. 2026-09-20 */
  date: string;
}

export interface LearnerProgress {
  learnerName: string;
  currentLevel: CefrLevel;
  targetLevel: CefrLevel;
  targetExam: string;
  streakDays: number;
  /** Mon..Sun for the current week; true if the learner studied that day. */
  weekActivity: boolean[];
  skills: Record<SkillArea, number>;
  recentScores: QuizScore[];
  weakAreas: string[];
}

export interface Recommendation {
  skill: SkillArea;
  title: string;
  reason: string;
  href: string;
}
