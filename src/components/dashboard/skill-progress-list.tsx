import Link from "next/link";
import type { SkillArea } from "@/types/learning";
import { AVAILABLE_SKILLS, SKILL_LABELS } from "@/lib/progress";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function SkillProgressList({ skills }: { skills: Record<SkillArea, number> }) {
  const entries = Object.entries(skills) as Array<[SkillArea, number]>;

  return (
    <Card>
      <CardTitle>Skills</CardTitle>
      <ul className="mt-5 space-y-5">
        {entries.map(([skill, value]) => {
          const available = AVAILABLE_SKILLS.includes(skill);
          return (
            <li key={skill} className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-sm">
                {available ? (
                  <Link href={`/${skill}`} className="font-medium hover:text-accent hover:underline">
                    {SKILL_LABELS[skill]}
                  </Link>
                ) : (
                  <span className="font-medium">
                    {SKILL_LABELS[skill]}
                    <span className="ml-2 rounded-full bg-surface-muted px-2 py-0.5 text-[11px] font-normal text-muted">
                      Coming soon
                    </span>
                  </span>
                )}
                <span className="tabular-nums text-muted">{value}%</span>
              </div>
              <ProgressBar value={value} label={`${SKILL_LABELS[skill]} progress`} />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
