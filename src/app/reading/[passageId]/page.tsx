import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReadingPassage, readingPassages } from "@/data/reading/passages";
import { PageHeader } from "@/components/ui/page-header";
import { LevelBadge } from "@/components/ui/level-badge";
import { Card, CardTitle } from "@/components/ui/card";
import { ReadingPassage } from "@/components/reading/reading-passage";
import { MultipleChoiceQuiz } from "@/components/quiz/multiple-choice-quiz";

export const dynamicParams = false;

export function generateStaticParams() {
  return readingPassages.map((passage) => ({ passageId: passage.id }));
}

export async function generateMetadata(props: PageProps<"/reading/[passageId]">): Promise<Metadata> {
  const { passageId } = await props.params;
  const passage = getReadingPassage(passageId);
  return { title: passage ? `${passage.title} · Reading` : "Reading passage not found" };
}

export default async function ReadingPassagePage(props: PageProps<"/reading/[passageId]">) {
  const { passageId } = await props.params;
  const passage = getReadingPassage(passageId);
  if (!passage) notFound();

  const position = readingPassages.findIndex((item) => item.id === passage.id);
  const next = readingPassages[position + 1];

  return (
    <>
      <Link href="/reading" className="mb-4 inline-block text-sm text-muted hover:text-accent">
        ← All reading passages
      </Link>
      <PageHeader
        eyebrow={<LevelBadge level={passage.level} showLabel />}
        title={passage.title}
        description={`Topic: ${passage.topic}. Read carefully, then answer the questions using evidence from the passage.`}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <ReadingPassage passage={passage} />
        <Card as="section" className="lg:sticky lg:top-24">
          <CardTitle className="mb-4">Check your understanding</CardTitle>
          <MultipleChoiceQuiz questions={passage.questions} />
        </Card>
      </div>

      {next && (
        <div className="mt-8 text-right">
          <Link href={`/reading/${next.id}`} className="text-sm font-medium text-accent hover:underline">
            Next passage: {next.title} →
          </Link>
        </div>
      )}
    </>
  );
}
