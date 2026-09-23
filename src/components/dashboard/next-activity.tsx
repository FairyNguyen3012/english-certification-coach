import type { Recommendation } from "@/types/learning";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

interface NextActivityProps {
  recommendation: Recommendation;
  weakAreas: string[];
}

export function NextActivity({ recommendation, weakAreas }: NextActivityProps) {
  return (
    <Card className="border-accent/40 bg-accent-soft">
      <p className="text-xs font-semibold tracking-wide text-accent uppercase">Recommended next</p>
      <h2 className="mt-2 text-xl font-semibold">{recommendation.title}</h2>
      <p className="mt-1 text-sm text-muted">{recommendation.reason}</p>
      <ButtonLink href={recommendation.href} className="mt-4">
        Start practice
      </ButtonLink>
      {weakAreas.length > 0 && (
        <div className="mt-6 border-t border-accent/20 pt-4">
          <p className="text-sm font-medium">Weak areas</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {weakAreas.map((area) => (
              <li key={area} className="rounded-full bg-surface px-3 py-1 text-xs">
                {area}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
