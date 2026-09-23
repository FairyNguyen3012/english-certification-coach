import type { Metadata } from "next";
import { grammarTopics } from "@/data/grammar/topics";
import { PageHeader } from "@/components/ui/page-header";
import { GrammarTopicCard } from "@/components/grammar/grammar-topic-card";

export const metadata: Metadata = { title: "Grammar" };

export default function GrammarPage() {
  return (
    <>
      <PageHeader
        title="Grammar"
        description="Each topic follows the same loop: learn the rule, study examples and common mistakes, then test yourself with instant explanations."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grammarTopics.map((topic, index) => (
          <li key={topic.id}>
            <GrammarTopicCard topic={topic} index={index} />
          </li>
        ))}
      </ul>
    </>
  );
}
