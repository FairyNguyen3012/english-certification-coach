import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const [, , type, level, slug] = process.argv;
const allowedTypes = new Set(["vocabulary", "grammar", "reading", "idiom"]);
const allowedLevels = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

if (!allowedTypes.has(type) || !allowedLevels.has(level) || !slug) {
  console.error("Usage: npm run content:new -- <vocabulary|grammar|reading|idiom> <A1|A2|B1|B2|C1|C2> <slug>");
  process.exit(1);
}

const templates = {
  vocabulary: {
    id: slug,
    word: "",
    ipa: "",
    partOfSpeech: "noun",
    definition: "",
    vietnamese: "",
    example: "",
    level,
    topic: "Education",
  },
  idiom: {
    id: slug,
    word: "",
    ipa: "",
    partOfSpeech: "phrasal verb",
    definition: "",
    vietnamese: "",
    example: "",
    level,
    topic: "Daily life",
    kind: "idiom",
  },
  grammar: {
    id: slug,
    title: "",
    level,
    summary: "",
    explanation: [],
    form: [],
    examples: [],
    commonMistakes: [],
    questions: [],
  },
  reading: {
    id: slug,
    title: "",
    level,
    topic: "Education",
    paragraphs: [],
    questions: [],
  },
};

const directory = resolve("content", "inbox");
await mkdir(directory, { recursive: true });
const path = resolve(directory, `${type}-${slug}.json`);
await writeFile(path, `${JSON.stringify(templates[type], null, 2)}\n`, "utf8");
console.log(`Created ${path}. Complete it, then copy the item into the matching src/data file and run npm run content:validate.`);
