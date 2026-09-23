@AGENTS.md

# English Certification Coach

## Project Goal

Build an English certification preparation platform for learners from A1 to B2.
The learner practises vocabulary, grammar, reading, listening and speaking, takes
quizzes, gets AI feedback and tracks progress.

## Target Users

English learners (many Vietnamese speakers) preparing for:
- IELTS
- TOEIC
- Cambridge English
- General English certification

Practice content must be original. Never copy official exam materials.

## Technology

- Next.js 16 (App Router, `src/` dir, Turbopack) — read `node_modules/next/dist/docs/` before using unfamiliar APIs
- React 19, TypeScript (strict)
- Tailwind CSS v4 (tokens in `src/app/globals.css`)
- Supabase (Phase 4 — not added yet)
- Claude API (Phase 5 — not added yet, server-side only)

## Current Status

Milestone 1 is done, using mock data only (no database):
- `/dashboard` — level, overall and per-skill progress, streak, recent scores, recommended next activity, weak areas
- `/vocabulary` — word list, search (accent-insensitive), level and topic filters, flashcards with review round, multiple-choice quiz
- `/grammar` and `/grammar/[topicId]` — 8 topics with explanation, form, examples, common mistakes and a scored quiz

Next: Reading → Listening → Speaking (AI) → Progress → Supabase → Claude API.

## Project Structure

```
src/
  app/                 routes (pages stay thin: load data, compose components)
  components/
    ui/                generic building blocks (Card, Button, ProgressBar, LevelBadge, PageHeader)
    quiz/              MultipleChoiceQuiz + ScoreSummary — reuse for every skill's quiz
    layout/            SiteHeader
    dashboard/ vocabulary/ grammar/
  data/                learning content + mock data, separate from UI
    vocabulary/words.ts  grammar/topics.ts  progress/mock-progress.ts
  lib/                 pure logic: utils, quiz building/scoring, filtering, progress/recommendation
  types/learning.ts    shared types (CefrLevel, VocabularyItem, GrammarTopic, MultipleChoiceQuestion, …)
```

## Coding Rules

- Use TypeScript. No `any`.
- Use reusable React components. Keep components small.
- Prefer Server Components; add `"use client"` only where state or browser APIs are needed.
- Keep learning content in `src/data`, business logic in `src/lib`, presentation in `src/components`.
- Reuse `MultipleChoiceQuiz` for new quizzes instead of writing another quiz UI.
- Use clear variable names. Avoid duplicated code.
- Validate user input. Handle loading and error states (see `app/loading.tsx`, `app/error.tsx`).
- Randomise (shuffle) only in event handlers, never during render (avoids hydration mismatches).
- Never expose API keys in client-side code. Secrets live in `.env.local` (git-ignored).
- Use the colour tokens (`bg-surface`, `text-muted`, `text-accent`, …), not raw Tailwind colours, so dark mode keeps working.

## Product Rules

Vocabulary items include: word, IPA, part of speech, Vietnamese meaning, English definition,
example sentence, difficulty level (CEFR), topic; optional synonyms and antonyms.

Every activity follows: Learn → Practice → Test → Feedback → Review → Repeat.
Feedback explains *why*, gives the correction and an example — not just the answer.

A text-only AI evaluation must not claim to measure pronunciation.

## UX

Simple, clean, mobile-friendly, beginner-friendly. Accessible: labelled inputs,
visible focus, `role="progressbar"` meters, keyboard-usable quizzes.

## Commands

```
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Development Workflow

Before implementing a major feature:

1. Understand the requirement.
2. Inspect existing code.
3. Propose the implementation.
4. Wait for approval when the change is architectural or high-risk.
5. Implement the feature.
6. Run `npm run typecheck` and `npm run lint`.
7. Run the app and test the page (including mobile width).
8. Summarize changes.
