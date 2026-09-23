"use client";

import { useMemo, useState } from "react";
import type { VocabularyFilterState, VocabularyItem, VocabularyTopic } from "@/types/learning";
import { EMPTY_FILTERS, filterVocabulary } from "@/lib/vocabulary";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VocabularyFilters } from "@/components/vocabulary/vocabulary-filters";
import { VocabularyCard } from "@/components/vocabulary/vocabulary-card";
import { FlashcardPractice } from "@/components/vocabulary/flashcard-practice";
import { VocabularyQuiz } from "@/components/vocabulary/vocabulary-quiz";

type Mode = "browse" | "flashcards" | "quiz";

const MODES: Array<{ id: Mode; label: string }> = [
  { id: "browse", label: "Word list" },
  { id: "flashcards", label: "Flashcards" },
  { id: "quiz", label: "Quiz" },
];

interface VocabularyExplorerProps {
  items: VocabularyItem[];
  topics: VocabularyTopic[];
}

export function VocabularyExplorer({ items, topics }: VocabularyExplorerProps) {
  const [filters, setFilters] = useState<VocabularyFilterState>(EMPTY_FILTERS);
  const [mode, setMode] = useState<Mode>("browse");

  const filtered = useMemo(() => filterVocabulary(items, filters), [items, filters]);
  // Changing filters restarts any flashcard round or quiz in progress.
  const practiceKey = `${filters.level}|${filters.topic}|${filters.search.trim()}`;
  const hasFilters = filters.search !== "" || filters.level !== "all" || filters.topic !== "all";

  return (
    <div className="space-y-6">
      <VocabularyFilters value={filters} topics={topics} onChange={setFilters} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Practice mode" className="inline-flex rounded-xl bg-surface-muted p-1">
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={mode === option.id}
              onClick={() => setMode(option.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition sm:px-4",
                mode === option.id ? "bg-surface font-medium shadow-sm" : "text-muted hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {filtered.length} of {items.length} words
          {hasFilters && (
            <Button variant="ghost" className="ml-2 min-h-8 px-2" onClick={() => setFilters(EMPTY_FILTERS)}>
              Clear filters
            </Button>
          )}
        </p>
      </div>

      <div role="tabpanel">
        {mode === "browse" &&
          (filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
              No words match your search. Try another word or clear the filters.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <li key={item.id}>
                  <VocabularyCard item={item} />
                </li>
              ))}
            </ul>
          ))}
        {mode === "flashcards" && <FlashcardPractice key={practiceKey} words={filtered} />}
        {mode === "quiz" && <VocabularyQuiz key={practiceKey} words={filtered} pool={items} />}
      </div>
    </div>
  );
}
