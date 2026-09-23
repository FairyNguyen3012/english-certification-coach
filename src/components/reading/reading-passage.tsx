import type { ReadingPassage } from "@/types/learning";
import { Card } from "@/components/ui/card";

export function ReadingPassage({ passage }: { passage: ReadingPassage }) {
  return (
    <Card as="article">
      <div className="space-y-5 text-[1.02rem] leading-8">
        {passage.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Card>
  );
}
