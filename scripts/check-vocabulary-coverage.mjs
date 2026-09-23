import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const topics = ["Daily life", "Work", "Travel", "Education", "Health", "Environment", "Technology"];
const path = resolve("src/data/generated/topic-vocabulary.json");
const items = JSON.parse(await readFile(path, "utf8"));
const counts = new Map();

for (const item of items) {
  const key = `${item.level}:${item.topic}`;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

const missing = [];
console.log("Vocabulary coverage by level and topic:");
for (const level of levels) {
  const row = topics.map((topic) => {
    const count = counts.get(`${level}:${topic}`) ?? 0;
    if (count === 0) missing.push(`${level} / ${topic}`);
    return `${topic}: ${count}`;
  });
  console.log(`${level} | ${row.join(" | ")}`);
}

if (missing.length > 0) {
  console.error(`Missing vocabulary coverage: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`Complete: ${items.length} generated entries cover ${levels.length} levels x ${topics.length} topics.`);
