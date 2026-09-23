import type { MultipleChoiceQuestion, VocabularyItem } from "@/types/learning";
import { shuffle } from "@/lib/utils";

export const MIN_QUIZ_WORDS = 4;
const OPTIONS_PER_QUESTION = 4;

export type VocabularyQuizMode = "meaning" | "word";

/**
 * Build multiple-choice questions from a set of words.
 * - "meaning": show the word, choose the Vietnamese meaning.
 * - "word": show the English definition, choose the word.
 * Distractors come from `pool` (usually the full word list) so small filters still work.
 */
export function buildVocabularyQuiz(
  words: readonly VocabularyItem[],
  pool: readonly VocabularyItem[],
  mode: VocabularyQuizMode,
  maxQuestions = 10,
): MultipleChoiceQuestion[] {
  const answerOf = (item: VocabularyItem) =>
    mode === "meaning" ? item.vietnamese : item.word;

  return shuffle(words)
    .slice(0, maxQuestions)
    .map((item) => {
      const distractors = shuffle(
        pool.filter((other) => other.id !== item.id && answerOf(other) !== answerOf(item)),
      )
        .slice(0, OPTIONS_PER_QUESTION - 1)
        .map(answerOf);

      const options = shuffle([answerOf(item), ...distractors]);

      return {
        id: item.id,
        prompt:
          mode === "meaning"
            ? `What does “${item.word}” mean in Vietnamese?`
            : `Which word means: “${item.definition}”?`,
        options,
        correctIndex: options.indexOf(answerOf(item)),
        explanation: `${item.word} ${item.ipa} (${item.partOfSpeech}) — ${item.vietnamese}. Example: ${item.example}`,
      };
    });
}

export function countCorrect(
  questions: readonly MultipleChoiceQuestion[],
  answers: ReadonlyArray<number | null>,
): number {
  return questions.reduce(
    (total, question, index) => total + (answers[index] === question.correctIndex ? 1 : 0),
    0,
  );
}
