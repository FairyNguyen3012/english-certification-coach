import type { Metadata } from "next";
import Link from "next/link";
import { readingPassages } from "@/data/reading/passages";
import { PageHeader } from "@/components/ui/page-header";
import { LevelBadge } from "@/components/ui/level-badge";

export const metadata: Metadata = { title: "Reading" };

export default function ReadingPage() {
  return (
    <>
      <PageHeader
        title="Reading practice"
        description="Read an original passage, identify the key ideas and check your understanding with relevant questions."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {readingPassages.map((passage, index) => (
          <li key={passage.id}>
            <Link
              href={`/reading/${passage.id}`}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-accent"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted tabular-nums">Passage {index + 1}</span>
                <LevelBadge level={passage.level} />
              </div>
              <div>
                <h2 className="text-lg font-semibold group-hover:text-accent">{passage.title}</h2>
                <p className="mt-1 text-sm text-muted">Topic: {passage.topic}</p>
              </div>
              <p className="mt-auto text-sm text-muted">{passage.questions.length} comprehension questions</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
