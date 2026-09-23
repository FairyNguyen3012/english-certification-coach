import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const root = resolve(import.meta.dirname, "..");
const generatedDirectory = resolve(root, "src/data/generated");
const vocabularyPath = resolve(generatedDirectory, "vocabulary.json");
const grammarPath = resolve(generatedDirectory, "grammar.json");

const fallbackVocabulary = Object.fromEntries(
  levels.map((level) => [level, {
    id: `auto-${level.toLowerCase()}-vocabulary`,
    word: `${level} study habit`,
    ipa: "/ˈstʌdi ˌhæbɪt/",
    partOfSpeech: "noun",
    definition: `a useful way to practise English at ${level} level`,
    vietnamese: `thói quen học ở trình độ ${level}`,
    example: `A regular ${level} study habit can improve your confidence.`,
    level,
    topic: "Education",
  }]),
);

const fallbackGrammar = Object.fromEntries(
  levels.map((level) => [level, {
    id: `auto-${level.toLowerCase()}-lesson`,
    title: `${level} Study Strategy`,
    level,
    summary: `A short automated starter lesson for ${level} learners.`,
    explanation: [`Review one useful language pattern at ${level} level.`, "Use the example and question to check your understanding."],
    form: [`Pattern for ${level} practice → Review the rule, then use it in context.`],
    examples: [{ sentence: `This example supports ${level} practice.` }],
    commonMistakes: [{ incorrect: "Skipping the context.", correct: "Use the pattern in a complete sentence.", why: "Context helps learners remember meaning and form." }],
    questions: [{
      id: `auto-${level.toLowerCase()}-question`,
      prompt: `What should a ${level} learner do after reviewing a rule?`,
      options: ["Use it in context", "Ignore the example", "Remove the practice", "Memorise random letters"],
      correctIndex: 0,
      explanation: "Using a rule in context connects form and meaning.",
    }],
  }]),
);

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return [];
  }
}

async function populateJson(path, fallbackByLevel) {
  const current = await readJson(path);
  const covered = new Set(current.map((item) => item.level));
  const additions = levels.filter((level) => !covered.has(level)).map((level) => fallbackByLevel[level]);
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
const vocabularyAdditions = await populateJson(vocabularyPath, fallbackVocabulary);
const grammarAdditions = await populateJson(grammarPath, fallbackGrammar);

for (const item of vocabularyAdditions) {
  await updateMarkdown(item.level, "vocabulary", [`${item.word} (${item.id}): ${item.definition}`]);
}
for (const item of grammarAdditions) {
  await updateMarkdown(item.level, "grammar", [`${item.title} (${item.id}): ${item.summary}`]);
}

console.log(`Vocabulary added: ${vocabularyAdditions.length}`);
console.log(`Grammar lessons added: ${grammarAdditions.length}`);
console.log("Run npm run content:validate and npm run typecheck before committing.");
