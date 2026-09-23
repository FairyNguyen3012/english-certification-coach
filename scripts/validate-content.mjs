import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const levels = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);
const sources = [
  ["vocabulary", "src/data/vocabulary/words.ts"],
  ["grammar", "src/data/grammar/topics.ts"],
  ["reading", "src/data/reading/passages.ts"],
  ["generated vocabulary", "src/data/generated/vocabulary.json"],
  ["generated grammar", "src/data/generated/grammar.json"],
];

const errors = [];

for (const [, relativePath] of sources) {
  const text = await readFile(resolve(root, relativePath), "utf8");
  const ids = [...text.matchAll(/\bid:\s*["']([^"']+)["']/g)].map((match) => match[1]);
  const seen = new Set();

  for (const id of ids) {
    if (seen.has(id)) errors.push(`${relativePath}: duplicate id "${id}"`);
    seen.add(id);
  }

  for (const match of text.matchAll(/\blevel:\s*["']([^"']+)["']/g)) {
    if (!levels.has(match[1])) errors.push(`${relativePath}: invalid CEFR level "${match[1]}"`);
  }

  for (const match of text.matchAll(/options:\s*\[([\s\S]*?)\],\s*correctIndex:\s*(\d+)/g)) {
    const optionCount = (match[1].match(/"[^"]*"|'[^']*'/g) ?? []).length;
    const correctIndex = Number(match[2]);
    if (optionCount < 2 || correctIndex >= optionCount) {
      errors.push(`${relativePath}: invalid question options near correctIndex ${correctIndex}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Content validation passed for vocabulary, grammar and reading.");
