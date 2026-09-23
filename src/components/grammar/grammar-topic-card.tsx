import Link from "next/link";
import type { GrammarTopic } from "@/types/learning";
import { LevelBadge } from "@/components/ui/level-badge";

export function GrammarTopicCard({ topic, index }: { topic: GrammarTopic; index: number }) {
  return (
    <Link
      href={`/grammar/${topic.id}`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted tabular-nums">Topic {index + 1}</span>
        <LevelBadge level={topic.level} />
      </div>
      <h2 className="text-lg font-semibold group-hover:text-accent">{topic.title}</h2>
      <p className="text-sm text-muted">{topic.summary}</p>
      <p className="mt-auto pt-2 text-xs text-muted">
        {topic.examples.length} examples · {topic.commonMistakes.length} common mistakes ·{" "}
        {topic.questions.length} questions
      </p>
    </Link>
  );
}
