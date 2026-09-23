import type { Metadata } from "next";
import { vocabularyItems, vocabularyTopics } from "@/data/vocabulary/words";
import { PageHeader } from "@/components/ui/page-header";
import { VocabularyExplorer } from "@/components/vocabulary/vocabulary-explorer";

export const metadata: Metadata = { title: "Vocabulary" };

export default function VocabularyPage() {
  return (
    <>
      <PageHeader
        title="Vocabulary"
        description="Learn words from A1 to B2 with IPA, Vietnamese meanings and examples. Browse, practise with flashcards, then test yourself."
      />
      <VocabularyExplorer items={vocabularyItems} topics={vocabularyTopics} />
    </>
  );
}
