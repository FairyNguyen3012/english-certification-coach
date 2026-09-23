import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const root = resolve(import.meta.dirname, "..");
const generatedDirectory = resolve(root, "src/data/generated");
const vocabularyPath = resolve(generatedDirectory, "vocabulary.json");
const grammarPath = resolve(generatedDirectory, "grammar.json");
const countFlagIndex = process.argv.indexOf("--count");
const requestedCount = countFlagIndex === -1 ? 0 : Number(process.argv[countFlagIndex + 1]);

if (!Number.isInteger(requestedCount) || requestedCount < 0) {
  console.error("Usage: npm run content:populate -- [--count <positive integer>]");
  process.exit(1);
}

function createVocabulary(level, index) {
  const topics = ["Daily life", "Work", "Travel", "Education", "Health", "Environment", "Technology"];
  const topic = topics[(levels.indexOf(level) + index - 1) % topics.length];
  return {
    id: `auto-${level.toLowerCase()}-vocabulary-${index}`,
    word: `${level} study habit ${index}`,
    ipa: "/ˈstʌdi ˌhæbɪt/",
    partOfSpeech: "noun",
    definition: `a useful way to practise English at ${level} level, item ${index}`,
    vietnamese: `thói quen học ở trình độ ${level}`,
    example: `A regular ${level} study habit can improve your confidence.`,
    level,
    topic,
  };
}

function createGrammar(level, index) {
  return {
    id: `auto-${level.toLowerCase()}-lesson-${index}`,
    title: `${level} Study Strategy ${index}`,
    level,
    summary: `A short automated practice lesson ${index} for ${level} learners.`,
    explanation: [`Review one useful language pattern at ${level} level.`, "Use the example and question to check your understanding."],
    form: [`Pattern for ${level} practice → Review the rule, then use it in context.`],
    examples: [{ sentence: `This example supports ${level} practice.` }],
    commonMistakes: [{ incorrect: "Skipping the context.", correct: "Use the pattern in a complete sentence.", why: "Context helps learners remember meaning and form." }],
    questions: [{
      id: `auto-${level.toLowerCase()}-question-${index}`,
      prompt: `What should a ${level} learner do after reviewing a rule?`,
      options: ["Use it in context", "Ignore the example", "Remove the practice", "Memorise random letters"],
      correctIndex: 0,
      explanation: "Using a rule in context connects form and meaning.",
    }],
  };
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return [];
  }
}

async function populateJson(path, factory) {
  const current = await readJson(path);
  const usedIds = new Set(current.map((item) => item.id));
  const additions = [];

  for (const level of levels) {
    const existingAtLevel = current.filter((item) => item.level === level).length;
    const amount = requestedCount > 0 ? requestedCount : existingAtLevel === 0 ? 1 : 0;
    for (let offset = 1; offset <= amount; offset += 1) {
      let index = existingAtLevel + offset;
      let item = factory(level, index);
      while (usedIds.has(item.id)) {
        index += 1;
        item = factory(level, index);
      }
      usedIds.add(item.id);
      additions.push(item);
    }
  }

  const next = [...current, ...additions];
  await writeFile(path, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return additions;
}

async function updateMarkdown(level, section, lines) {
  const path = resolve(root, "data", level, `${section}.md`);
  const marker = "\n## Automated starters\n";
  let current = await readFile(path, "utf8");
  if (!current.includes(marker)) current += `${marker}\n`;
  for (const line of lines) {
    if (!current.includes(line)) current += `- ${line}\n`;
  }
  await writeFile(path, current, "utf8");
}

await mkdir(generatedDirectory, { recursive: true });
const vocabularyAdditions = await populateJson(vocabularyPath, createVocabulary);
const grammarAdditions = await populateJson(grammarPath, createGrammar);

for (const item of vocabularyAdditions) {
  await updateMarkdown(item.level, "vocabulary", [`${item.word} (${item.id}): ${item.definition}`]);
}
for (const item of grammarAdditions) {
  await updateMarkdown(item.level, "grammar", [`${item.title} (${item.id}): ${item.summary}`]);
}

console.log(`Vocabulary added: ${vocabularyAdditions.length}`);
console.log(`Grammar lessons added: ${grammarAdditions.length}`);
console.log("Run npm run content:validate and npm run typecheck before committing.");
