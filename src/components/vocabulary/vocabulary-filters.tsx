"use client";

import { CEFR_LEVELS, type VocabularyFilterState, type VocabularyTopic } from "@/types/learning";
import { MAX_SEARCH_LENGTH } from "@/lib/vocabulary";

interface VocabularyFiltersProps {
  value: VocabularyFilterState;
  topics: VocabularyTopic[];
  onChange: (next: VocabularyFilterState) => void;
}

const FIELD =
  "min-h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm placeholder:text-muted";

export function VocabularyFilters({ value, topics, onChange }: VocabularyFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
      <label className="block">
        <span className="sr-only">Search words</span>
        <input
          type="search"
          value={value.search}
          maxLength={MAX_SEARCH_LENGTH}
          onChange={(event) =>
            onChange({ ...value, search: event.target.value.slice(0, MAX_SEARCH_LENGTH) })
          }
          placeholder="Search English or Vietnamese…"
          className={FIELD}
        />
      </label>
      <label className="block">
        <span className="sr-only">Difficulty level</span>
        <select
          value={value.level}
          onChange={(event) => onChange({ ...value, level: event.target.value as VocabularyFilterState["level"] })}
          className={FIELD}
        >
          <option value="all">All levels</option>
          {CEFR_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Topic</span>
        <select
          value={value.topic}
          onChange={(event) => onChange({ ...value, topic: event.target.value as VocabularyFilterState["topic"] })}
          className={FIELD}
        >
          <option value="all">All topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
