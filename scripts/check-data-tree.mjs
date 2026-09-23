import { access } from "node:fs/promises";
import { resolve } from "node:path";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const sections = ["vocabulary", "grammar", "reading", "listening", "speaking", "writing"];
const missing = [];

for (const level of levels) {
  for (const section of sections) {
    const path = resolve("data", level, `${section}.md`);
    try {
      await access(path);
    } catch {
      missing.push(path);
    }
  }
}

if (missing.length > 0) {
  console.error("Learning data tree is incomplete:");
  for (const path of missing) console.error(`- ${path}`);
  process.exit(1);
}

console.log(`Learning data tree is complete: ${levels.length} levels x ${sections.length} sections.`);
