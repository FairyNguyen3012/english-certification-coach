"use client";

import { useState } from "react";
import type { MultipleChoiceQuestion, VocabularyItem } from "@/types/learning";
import { buildVocabularyQuiz, MIN_QUIZ_WORDS, type VocabularyQuizMode } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MultipleChoiceQuiz } from "@/components/quiz/multiple-choice-quiz";

interface VocabularyQuizProps {
  words: VocabularyItem[];
  /** Full word list, used for wrong answer options. */
  pool: VocabularyItem[];
}

const MODES: Array<{ id: VocabularyQuizMode; label: string; hint: string }> = [
  { id: "meaning", label: "Word → Vietnamese", hint: "See the English word, choose its meaning." },
  { id: "word", label: "Definition → Word", hint: "Read the English definition, choose the word." },
];

export function VocabularyQuiz({ words, pool }: VocabularyQuizProps) {
  const [mode, setMode] = useState<VocabularyQuizMode>("meaning");
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[] | null>(null);
  const [round, setRound] = useState(0);

  if (words.length < MIN_QUIZ_WORDS) {
    return (
      <p className="text-muted">
        A quiz needs at least {MIN_QUIZ_WORDS} words. Your filters match {words.length}. Try
        widening the level or topic.
      </p>
    );
  }

  // Questions are built on click (not during render) so shuffling can't cause hydration mismatches.
  function startQuiz() {
    setQuestions(buildVocabularyQuiz(words, pool, mode));
    setRound((r) => r + 1);
  }

  if (questions) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <MultipleChoiceQuiz key={round} questions={questions} onRestart={startQuiz} />
        <Button variant="ghost" onClick={() => setQuestions(null)}>
          ← Change quiz type
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="mb-3 font-medium">Choose a quiz type</legend>
        {MODES.map((option) => (
          <label
            key={option.id}
            className={cn(
              "cursor-pointer rounded-xl border p-4 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
              mode === option.id ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-muted",
            )}
          >
            <input
              type="radio"
              name="quiz-mode"
              value={option.id}
              checked={mode === option.id}
              onChange={() => setMode(option.id)}
              className="sr-only"
            />
            <span className="block font-medium">{option.label}</span>
            <span className="mt-1 block text-muted">{option.hint}</span>
          </label>
        ))}
      </fieldset>
      <p className="text-sm text-muted">
        Up to 10 questions from the {words.length} words that match your filters.
      </p>
      <Button onClick={startQuiz}>Start quiz</Button>
    </div>
  );
}
