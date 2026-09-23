# Organized Learning Content

Content is organized by CEFR level and skill:

```text
data/
  A1/  A2/  B1/  B2/  C1/  C2/
    vocabulary.md
    grammar.md
    reading.md
    listening.md
    speaking.md
    writing.md
```

The Markdown files are the authoring and planning area. The current app runtime reads validated TypeScript data from `src/data`. When a new vocabulary, grammar or reading item is ready, add it to the matching runtime file and run:

```bash
npm run content:validate
```

Use `npm run content:new -- <type> <level> <slug>` to create a structured starter in `content/inbox`.

All learning content must be original and must not reproduce official exam material.
