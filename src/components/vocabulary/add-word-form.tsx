"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  CEFR_LEVELS,
  PARTS_OF_SPEECH,
  VOCABULARY_TOPICS,
} from "@/types/learning";
import type { DictionaryResult, DictionarySense } from "@/lib/dictionary";
import {
  buildNewWord,
  isValidWordInput,
  MY_WORD_ID_PREFIX,
  normaliseWord,
  type NewWordDraft,
  type NewWordErrors,
} from "@/lib/new-word";
import { saveMyWord } from "@/lib/my-words";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; result: DictionaryResult }
  | { status: "failed"; message: string };

const EMPTY_DRAFT: NewWordDraft = {
  word: "",
  ipa: "",
  partOfSpeech: "",
  definition: "",
  example: "",
  vietnamese: "",
  level: "",
  topic: "",
};

const FIELD =
  "min-h-10 w-full rounded-xl border bg-surface px-3 py-2 text-sm placeholder:text-muted";

interface FieldProps {
  id: keyof NewWordDraft;
  label: string;
  error?: string;
  hint?: string;
  children: (props: { id: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}

function Field({ id, label, error, hint, children }: FieldProps) {
  const inputId = `new-word-${id}`;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>
      {children({
        id: inputId,
        className: cn(FIELD, error ? "border-danger" : "border-border"),
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${inputId}-hint`} className="text-xs text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/**
 * "Add a word": look the word up in an online dictionary, pick a meaning,
 * add the Vietnamese meaning, level and topic, then save it to My words (this browser).
 */
export function AddWordForm({ existingWords }: { existingWords: ReadonlySet<string> }) {
  const [query, setQuery] = useState("");
  const [lookup, setLookup] = useState<LookupState>({ status: "idle" });
  const [draft, setDraft] = useState<NewWordDraft | null>(null);
  const [errors, setErrors] = useState<NewWordErrors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const update = (field: keyof NewWordDraft, value: string) =>
    setDraft((current) => (current ? { ...current, [field]: value } : current));

  async function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);
    setErrors({});
    const word = normaliseWord(query);
    if (!isValidWordInput(word)) {
      setLookup({ status: "failed", message: "Please type one English word or short phrase (letters only)." });
      setDraft(null);
      return;
    }
    if (existingWords.has(word)) {
      setLookup({ status: "failed", message: `“${word}” is already in the word list. Try searching for it above.` });
      setDraft(null);
      return;
    }

    setLookup({ status: "loading" });
    try {
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(word)}`);
      const data: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
            ? data.error
            : "The dictionary isn't available right now.";
        setLookup({
          status: "failed",
          message: `${message} We filled starter details below; please check and edit them before saving.`,
        });
        setDraft(makeOfflineDraft(word));
        return;
      }
      const result = data as DictionaryResult;
      setLookup({ status: "found", result });
      setDraft(applySense({ ...EMPTY_DRAFT, word, ipa: result.ipa ?? "" }, result.senses[0]));
    } catch {
      setLookup({
        status: "failed",
        message: "We couldn't reach the dictionary. We filled starter details below; please check and edit them before saving.",
      });
      setDraft(makeOfflineDraft(word));
    }
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    // Only credit the dictionary if the learner kept one of its definitions.
    const found = lookup.status === "found" ? lookup.result : null;
    const keptDictionaryDefinition = found?.senses.some((sense) => sense.definition === draft.definition.trim());
    const result = buildNewWord(
      { ...draft, source: keptDictionaryDefinition ? found?.source : undefined },
      existingWords,
      MY_WORD_ID_PREFIX,
    );
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    if (!saveMyWord(result.item)) {
      setErrors({ word: "Your browser didn't let us save. Check that site storage is allowed." });
      return;
    }
    setNotice(`Added “${result.item.word}” to My words. It now appears in the word list, flashcards and quiz.`);
    setQuery("");
    setDraft(null);
    setErrors({});
    setLookup({ status: "idle" });
  }

  const senses = lookup.status === "found" ? lookup.result.senses : [];

  return (
    <div className="space-y-5">
      <form onSubmit={handleLookup} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1">
          <label htmlFor="new-word-query" className="block text-sm font-medium">
            Word or phrase
          </label>
          <input
            id="new-word-query"
            type="text"
            value={query}
            maxLength={40}
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. resilient, look after"
            className={cn(FIELD, "border-border")}
          />
        </div>
        <Button type="submit" disabled={lookup.status === "loading" || query.trim() === ""}>
          {lookup.status === "loading" ? "Looking up…" : "Look up"}
        </Button>
      </form>

      <div aria-live="polite" className="space-y-2">
        {notice && <p className="rounded-xl bg-success-soft p-3 text-sm text-success">{notice}</p>}
        {lookup.status === "failed" && (
          <p className="rounded-xl bg-warning-soft p-3 text-sm text-warning">{lookup.message}</p>
        )}
      </div>

      {draft && (
        <form onSubmit={handleSave} noValidate className="space-y-4 rounded-2xl border border-border p-4 sm:p-5">
          {senses.length > 1 && (
            <fieldset className="space-y-2">
              <legend className="mb-1 text-sm font-medium">Choose the meaning you want to learn</legend>
              {senses.map((sense, index) => {
                const selected = draft.definition === sense.definition && draft.partOfSpeech === sense.partOfSpeech;
                return (
                  <label
                    key={`${sense.partOfSpeech}-${index}`}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border p-3 text-sm transition",
                      selected ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-muted",
                    )}
                  >
                    <input
                      type="radio"
                      name="sense"
                      checked={selected}
                      onChange={() => setDraft((current) => (current ? applySense(current, sense, senses) : current))}
                      className="mt-0.5 accent-[var(--accent)]"
                    />
                    <span>
                      <span className="text-xs text-muted italic">{sense.partOfSpeech}</span> {sense.definition}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="word" label="Word" error={errors.word}>
              {(props) => <input {...props} value={draft.word} readOnly />}
            </Field>
            <Field id="ipa" label="Pronunciation (IPA, optional)" error={errors.ipa}>
              {(props) => (
                <input {...props} value={draft.ipa} onChange={(event) => update("ipa", event.target.value)} />
              )}
            </Field>
            <Field id="partOfSpeech" label="Part of speech" error={errors.partOfSpeech}>
              {(props) => (
                <select
                  {...props}
                  value={draft.partOfSpeech}
                  onChange={(event) => update("partOfSpeech", event.target.value)}
                >
                  <option value="">Choose…</option>
                  {PARTS_OF_SPEECH.map((part) => (
                    <option key={part} value={part}>
                      {part}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field id="vietnamese" label="Vietnamese meaning" error={errors.vietnamese}>
              {(props) => (
                <input
                  {...props}
                  lang="vi"
                  value={draft.vietnamese}
                  maxLength={200}
                  placeholder="e.g. kiên cường"
                  onChange={(event) => update("vietnamese", event.target.value)}
                />
              )}
            </Field>
          </div>

          <Field id="definition" label="English definition" error={errors.definition}>
            {(props) => (
              <textarea
                {...props}
                rows={2}
                maxLength={200}
                value={draft.definition}
                onChange={(event) => update("definition", event.target.value)}
              />
            )}
          </Field>
          <Field
            id="example"
            label="Example sentence"
            error={errors.example}
            hint="Write a sentence that helps you remember the word."
          >
            {(props) => (
              <textarea
                {...props}
                rows={2}
                maxLength={200}
                value={draft.example}
                onChange={(event) => update("example", event.target.value)}
              />
            )}
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="level" label="Level" error={errors.level}>
              {(props) => (
                <select {...props} value={draft.level} onChange={(event) => update("level", event.target.value)}>
                  <option value="">Choose…</option>
                  {CEFR_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field id="topic" label="Topic" error={errors.topic}>
              {(props) => (
                <select {...props} value={draft.topic} onChange={(event) => update("topic", event.target.value)}>
                  <option value="">Choose…</option>
                  {VOCABULARY_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>

          {lookup.status === "found" && (
            <p className="text-xs text-muted">
              Definitions from{" "}
              <a href={lookup.result.source.url} target="_blank" rel="noreferrer" className="underline">
                {lookup.result.source.name}
              </a>{" "}
              ({lookup.result.source.license}).
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="submit">Save to My words</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setDraft(null);
                setErrors({});
                setLookup({ status: "idle" });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function makeOfflineDraft(word: string): NewWordDraft {
  return {
    ...EMPTY_DRAFT,
    word,
    partOfSpeech: "noun",
    definition: `A useful English word or phrase: ${word}.`,
    example: `I am learning how to use “${word}” in English.`,
    vietnamese: "Bổ sung nghĩa tiếng Việt",
    level: "A1",
    topic: "Daily life",
  };
}

function applySense(
  draft: NewWordDraft,
  sense: DictionarySense | undefined,
  senses: readonly DictionarySense[] = [],
): NewWordDraft {
  if (!sense) return draft;
  // Keep the learner's own example; replace one that came from another dictionary meaning.
  const ownExample = draft.example !== "" && !senses.some((other) => other.example === draft.example);
  return {
    ...draft,
    partOfSpeech: sense.partOfSpeech,
    definition: sense.definition,
    example: ownExample ? draft.example : (sense.example ?? ""),
  };
}
