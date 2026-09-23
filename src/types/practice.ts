import type { CefrLevel, VocabularyTopic } from "@/types/learning";

export type PracticeMode = "writing" | "listening" | "speaking";

export interface DailyPracticePrompt {
  id: string;
  topic: VocabularyTopic;
  level: CefrLevel;
  title: string;
  passage: string;
  writingTask: string;
  speakingPrompt: string;
  listeningQuestion: string;
  listeningOptions: string[];
  listeningAnswer: number;
  focusWords: string[];
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}
