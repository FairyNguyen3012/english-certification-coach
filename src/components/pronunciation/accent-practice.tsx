"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { SpeakButton, type SpeechAccent } from "@/components/ui/speak-button";

const ACCENTS: Array<{ id: SpeechAccent; label: string; language: string }> = [
  { id: "uk", label: "UK English", language: "en-GB" },
  { id: "us", label: "US English", language: "en-US" },
];

const PRACTICE_LINES = [
  "Could you send me the information by Friday?",
  "I would like to practise this sentence again.",
  "The train leaves at quarter past eight.",
];

export function AccentPractice() {
  const [accent, setAccent] = useState<SpeechAccent>("uk");
  const selected = ACCENTS.find((item) => item.id === accent) ?? ACCENTS[0];

  return (
    <Card as="section" className="mb-6 border-accent/30 bg-accent-soft/40">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <CardTitle>Listen and repeat</CardTitle>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Choose a model accent, listen to each line, then say it aloud. Your browser may use its
            closest installed voice for {selected.language}.
          </p>
        </div>
        <div className="flex rounded-xl border border-border bg-surface p-1" aria-label="Speech accent">
          {ACCENTS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setAccent(option.id)}
              aria-pressed={accent === option.id}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                accent === option.id ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="mt-5 space-y-3">
        {PRACTICE_LINES.map((line, index) => (
          <li key={line} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2">
            <span className="w-5 text-sm text-muted">{index + 1}</span>
            <span className="flex-1 text-sm">{line}</span>
            <SpeakButton text={line} accent={accent} label={`Listen in ${selected.label}: ${line}`} />
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted">
        Self-check: repeat once slowly, once naturally, and compare the stressed words. This tool
        does not score pronunciation.
      </p>
    </Card>
  );
}