import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrammarTopic, grammarTopics } from "@/data/grammar/topics";
import { PageHeader } from "@/components/ui/page-header";
import { LevelBadge } from "@/components/ui/level-badge";
import { Card, CardTitle } from "@/components/ui/card";
import { GrammarLesson } from "@/components/grammar/grammar-lesson";
import { MultipleChoiceQuiz } from "@/components/quiz/multiple-choice-quiz";

// Only the topics in src/data exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return grammarTopics.map((topic) => ({ topicId: topic.id }));
}

export async function generateMetadata(props: PageProps<"/grammar/[topicId]">): Promise<Metadata> {
  const { topicId } = await props.params;
  const topic = getGrammarTopic(topicId);
  return { title: topic ? `${topic.title} · Grammar` : "Grammar topic not found" };
}

export default async function GrammarTopicPage(props: PageProps<"/grammar/[topicId]">) {
  const { topicId } = await props.params;
  const topic = getGrammarTopic(topicId);
  if (!topic) notFound();

  const position = grammarTopics.findIndex((t) => t.id === topic.id);
  const next = grammarTopics[position + 1];

  return (
    <>
      <Link href="/grammar" className="mb-4 inline-block text-sm text-muted hover:text-accent">
        ← All grammar topics
      </Link>
      <PageHeader
        eyebrow={<LevelBadge level={topic.level} showLabel />}
        title={topic.title}
        description={topic.summary}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <GrammarLesson topic={topic} />
        <Card as="section" className="lg:sticky lg:top-24">
          <CardTitle className="mb-4">Practice</CardTitle>
          <MultipleChoiceQuiz questions={topic.questions} />
        </Card>
      </div>

      {next && (
        <div className="mt-8 text-right">
          <Link href={`/grammar/${next.id}`} className="text-sm font-medium text-accent hover:underline">
            Next topic: {next.title} →
          </Link>
        </div>
      )}
    </>
  );
}
