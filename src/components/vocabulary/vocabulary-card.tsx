import type { VocabularyItem } from "@/types/learning";
import { Card } from "@/components/ui/card";
import { LevelBadge, Tag } from "@/components/ui/level-badge";
import { SpeakButton } from "@/components/vocabulary/speak-button";

export function VocabularyCard({ item }: { item: VocabularyItem }) {
  return (
    <Card as="article" className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold">{item.word}</h3>
          <p className="text-sm text-muted">
            {item.ipa} · <span className="italic">{item.kind === "idiom" ? "idiom" : item.partOfSpeech}</span>
          </p>
        </div>
        <SpeakButton text={item.word} />
      </div>

      <p className="text-sm">{item.definition}</p>
      <p className="text-sm font-medium text-accent" lang="vi">
        {item.vietnamese}
      </p>
      <p className="border-l-2 border-border pl-3 text-sm text-muted italic">{item.example}</p>

      {(item.synonyms?.length || item.antonyms?.length) && (
        <dl className="grid gap-1 text-xs text-muted">
          {item.synonyms?.length ? (
            <div>
              <dt className="inline font-medium text-foreground">Synonyms: </dt>
              <dd className="inline">{item.synonyms.join(", ")}</dd>
            </div>
          ) : null}
          {item.antonyms?.length ? (
            <div>
              <dt className="inline font-medium text-foreground">Antonyms: </dt>
              <dd className="inline">{item.antonyms.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
      )}

      <div className="mt-auto flex gap-2 pt-2">
        <LevelBadge level={item.level} />
        <Tag>{item.topic}</Tag>
      </div>
    </Card>
  );
}
