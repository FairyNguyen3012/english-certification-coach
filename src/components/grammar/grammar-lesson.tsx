import type { GrammarTopic } from "@/types/learning";
import { Card, CardTitle } from "@/components/ui/card";

/** The "Learn" step: explanation, form, examples and common mistakes. */
export function GrammarLesson({ topic }: { topic: GrammarTopic }) {
  return (
    <div className="space-y-4">
      <Card as="section">
        <CardTitle>How it works</CardTitle>
        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          {topic.explanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {topic.form && (
          <ul className="mt-4 space-y-1.5 rounded-xl bg-surface-muted p-4 font-mono text-[13px]">
            {topic.form.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </Card>

      <Card as="section">
        <CardTitle>Examples</CardTitle>
        <ul className="mt-3 space-y-2 text-sm">
          {topic.examples.map((example) => (
            <li key={example.sentence} className="flex flex-wrap items-baseline gap-x-2">
              <span>{example.sentence}</span>
              {example.note && <span className="text-xs text-muted">({example.note})</span>}
            </li>
          ))}
        </ul>
      </Card>

      <Card as="section">
        <CardTitle>Common mistakes</CardTitle>
        <ul className="mt-3 space-y-4 text-sm">
          {topic.commonMistakes.map((mistake) => (
            <li key={mistake.incorrect} className="space-y-1">
              <p>
                <span className="mr-2 text-xs font-semibold text-danger" aria-label="Incorrect">
                  ✗
                </span>
                <span className="text-danger line-through decoration-1">{mistake.incorrect}</span>
              </p>
              <p>
                <span className="mr-2 text-xs font-semibold text-success" aria-label="Correct">
                  ✓
                </span>
                <span className="font-medium">{mistake.correct}</span>
              </p>
              <p className="pl-5 text-muted">Why: {mistake.why}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
