"use client";

import { useState } from "react";
import type { VocabularyItem } from "@/types/learning";
import { cn, shuffle, toPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ScoreSummary } from "@/components/quiz/score-summary";
import { SpeakButton } from "@/components/vocabulary/speak-button";

interface FlashcardPracticeProps {
  words: VocabularyItem[];
}

/**
 * Flashcards: see the word, try to recall it, flip, then self-mark.
 * At the end, "Review missed words" starts a new round with only the words marked "Still learning".
 */
export function FlashcardPractice({ words }: FlashcardPracticeProps) {
  const [deck, setDeck] = useState<VocabularyItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [missed, setMissed] = useState<VocabularyItem[]>([]);
  const [isReviewRound, setIsReviewRound] = useState(false);

  function start(cards: VocabularyItem[], review: boolean) {
    setDeck(shuffle(cards));
    setIndex(0);
    setFlipped(false);
    setMissed([]);
    setIsReviewRound(review);
  }

  if (words.length === 0) {
    return <p className="text-muted">No words match your filters. Clear a filter to practise.</p>;
  }

  if (deck === null) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-muted">
          {words.length} {words.length === 1 ? "card" : "cards"} ready. Look at each word, say the
          meaning out loud, then flip the card to check.
        </p>
        <Button onClick={() => start(words, false)}>Start flashcards</Button>
      </div>
    );
  }

  if (index >= deck.length) {
    const known = deck.length - missed.length;
    return (
      <div className="space-y-6">
        <ScoreSummary correct={known} total={deck.length} />
        {missed.length > 0 && (
          <div>
            <p className="font-medium">Still learning</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {missed.map((word) => (
                <li key={word.id} className="rounded-full bg-surface-muted px-3 py-1 text-sm">
                  {word.word} — <span lang="vi">{word.vietnamese}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {missed.length > 0 && (
            <Button onClick={() => start(missed, true)}>Review missed words ({missed.length})</Button>
          )}
          <Button variant="secondary" onClick={() => start(words, false)}>
            Practise all again
          </Button>
        </div>
      </div>
    );
  }

  const card = deck[index];

  function mark(knewIt: boolean) {
    if (!knewIt) setMissed((previous) => [...previous, card]);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted">
          <span>
            {isReviewRound ? "Review round · " : ""}Card {index + 1} of {deck.length}
          </span>
          <span>{missed.length} still learning</span>
        </div>
        <ProgressBar value={toPercent(index, deck.length)} label="Flashcard progress" />
      </div>

      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        aria-pressed={flipped}
        aria-live="polite"
        className={cn(
          "flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center transition",
          flipped ? "border-accent bg-accent-soft" : "border-border bg-surface hover:bg-surface-muted",
        )}
      >
        {!flipped ? (
          <>
            <span className="text-3xl font-semibold">{card.word}</span>
            <span className="text-sm text-muted">{card.ipa}</span>
            <span className="mt-4 text-xs text-muted">Tap to flip</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-semibold text-accent" lang="vi">
              {card.vietnamese}
            </span>
            <span className="text-sm">{card.definition}</span>
            <span className="text-sm text-muted italic">{card.example}</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-between gap-2">
        <SpeakButton text={card.word} />
        {flipped ? (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => mark(false)}>
              Still learning
            </Button>
            <Button onClick={() => mark(true)}>I knew it</Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setFlipped(true)}>
            Flip card
          </Button>
        )}
      </div>
    </div>
  );
}
