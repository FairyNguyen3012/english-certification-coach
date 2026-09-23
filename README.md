# English Certification Coach

A web app for learning English from A1 to C2 and getting ready for IELTS, TOEIC,
Cambridge and similar exams. Built with Next.js, React, TypeScript and Tailwind CSS.

## What works now (Milestone 1, mock data)

| Page | Features |
| --- | --- |
| `/dashboard` | CEFR level, overall and per-skill progress, learning streak, recent quiz scores, recommended next activity, weak areas |
| `/vocabulary` | Words and idioms from A1–C2 with IPA, Vietnamese meaning, definition and example. Search (works without Vietnamese accents too), level and topic filters, listen button, flashcards with a review round for missed words, and a multiple-choice quiz (two types) with score |
| `/grammar` | 8 topics: explanation, form, examples, common mistakes, 5-question quiz with answer checking, explanations and score |

There is no database yet. Data is in `src/data`.

## Getting started

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev         # development server
npm run lint        # ESLint
npm run typecheck   # TypeScript check
npm run build       # production build
npm run content:validate # Validate content IDs, levels and quiz questions
npm run content:populate  # Add a starter word and grammar lesson for missing levels
npm run data:check  # Check the A1-C2 authoring tree
```

`content:populate` is safe to run repeatedly. It checks the generated runtime
content and adds a starter vocabulary item and grammar lesson only for levels
that are missing. It also records the generated starters in the matching
`data/<level>/vocabulary.md` and `data/<level>/grammar.md` files.

Create a starter for new content with:

```bash
npm run content:new -- vocabulary C1 academic-writing
npm run content:new -- grammar C2 advanced-inversion
npm run content:new -- reading B2 sustainable-travel
npm run content:new -- idiom B1 break-the-ice
```

Complete the generated file in `content/inbox`, copy the item into the matching
file under `src/data`, and run `npm run content:validate` before committing.

## Project structure

```
src/
  app/          pages (dashboard, vocabulary, grammar)
  components/   ui/, quiz/, layout/, dashboard/, vocabulary/, grammar/
  data/         learning content and mock progress
  lib/          quiz building and scoring, filters, progress logic
  types/        shared TypeScript types
```

## Adding content

- New word: add an object to `src/data/vocabulary/words.ts`. TypeScript checks the fields.
- New grammar topic: add an object to `src/data/grammar/topics.ts`. The page is created automatically at `/grammar/<id>`.

## Next steps

Reading → Listening → Speaking with AI feedback → Progress page → Supabase → Claude API.
See `CLAUDE.md` for rules to follow when working with Claude Code.

## Secrets

Copy `.env.example` to `.env.local` when you add Supabase or the Claude API.
`.env.local` is git-ignored. Never put API keys in client-side code.
