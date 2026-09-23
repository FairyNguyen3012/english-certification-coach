"use client";

import { useState } from "react";
import type { MultipleChoiceQuestion } from "@/types/learning";
import { countCorrect } from "@/lib/quiz";
import { cn, toPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ScoreSummary } from "@/components/quiz/score-summary";

interface MultipleChoiceQuizProps {
  questions: MultipleChoiceQuestion[];
  /** Called when the learner asks to try again; parent may rebuild/shuffle questions. */
  onRestart?: () => void;
}

/**
 * One-question-at-a-time quiz: choose → check → explanation → next → score.
 * Shared by Vocabulary and Grammar so answer validation and scoring live in one place.
 */
export function MultipleChoiceQuiz({ questions, onRestart }: MultipleChoiceQuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() => questions.map(() => null));
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return <p className="text-muted">There are no questions for this selection yet.</p>;
  }

  const question = questions[current];
  const isLast = current === questions.length - 1;
  const answeredCount = answers.filter((answer) => answer !== null).length;

  function restart() {
    setCurrent(0);
    setAnswers(questions.map(() => null));
    setSelected(null);
    setChecked(false);
    setFinished(false);
    onRestart?.();
  }

  function checkAnswer() {
    if (selected === null) return;
    setAnswers((previous) => previous.map((answer, i) => (i === current ? selected : answer)));
    setChecked(true);
  }

  function goNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((index) => index + 1);
    setSelected(null);
    setChecked(false);
  }

  if (finished) {
    const correct = countCorrect(questions, answers);
    const missed = questions.filter((q, i) => answers[i] !== q.correctIndex);
    return (
      <div className="space-y-6">
        <ScoreSummary correct={correct} total={questions.length} />
        {missed.length > 0 && (
          <section aria-labelledby="review-heading" className="space-y-3">
            <h3 id="review-heading" className="font-semibold">
              Review your mistakes
            </h3>
            <ul className="space-y-3">
              {missed.map((q) => {
                const answerIndex = answers[questions.indexOf(q)];
                return (
                  <li key={q.id} className="rounded-xl border border-border p-4 text-sm">
                    <p className="font-medium">{q.prompt}</p>
                    {answerIndex !== null && answerIndex !== undefined && (
                      <p className="mt-2 text-danger">Your answer: {q.options[answerIndex]}</p>
                    )}
                    <p className="text-success">Correct answer: {q.options[q.correctIndex]}</p>
                    <p className="mt-2 text-muted">{q.explanation}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        <Button onClick={restart}>Try again</Button>
      </div>
    );
  }

  const isCorrect = checked && selected === question.correctIndex;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{toPercent(answeredCount, questions.length)}% complete</span>
        </div>
        <ProgressBar value={toPercent(answeredCount, questions.length)} label="Quiz progress" />
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-3 text-lg font-medium">{question.prompt}</legend>
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const showCorrect = checked && index === question.correctIndex;
          const showWrong = checked && isSelected && index !== question.correctIndex;
          return (
            <label
              key={`${question.id}-${index}`}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition",
                !checked && isSelected && "border-accent bg-accent-soft",
                !checked && !isSelected && "border-border hover:bg-surface-muted",
                showCorrect && "border-success bg-success-soft",
                showWrong && "border-danger bg-danger-soft",
                checked && !showCorrect && !showWrong && "border-border opacity-60",
                checked && "cursor-default",
              )}
            >
              <input
                type="radio"
                name={question.id}
                value={index}
                checked={isSelected}
                disabled={checked}
                onChange={() => setSelected(index)}
                className="accent-[var(--accent)]"
              />
              <span className="flex-1">{option}</span>
              {showCorrect && <span className="text-xs font-semibold text-success">Correct</span>}
              {showWrong && <span className="text-xs font-semibold text-danger">Your answer</span>}
            </label>
          );
        })}
      </fieldset>

      {checked && (
        <div
          role="status"
          className={cn(
            "rounded-xl p-4 text-sm",
            isCorrect ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
          )}
        >
          <p className="font-semibold">{isCorrect ? "Correct!" : "Not quite."}</p>
          <p className="mt-1 text-foreground">{question.explanation}</p>
        </div>
      )}

      <div className="flex gap-2">
        {!checked ? (
          <Button onClick={checkAnswer} disabled={selected === null}>
            Check answer
          </Button>
        ) : (
          <Button onClick={goNext}>{isLast ? "See my score" : "Next question"}</Button>
        )}
      </div>
    </div>
  );
}
