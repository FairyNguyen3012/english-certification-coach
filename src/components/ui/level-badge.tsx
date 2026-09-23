import type { ReactNode } from "react";
import { CEFR_LABELS, type CefrLevel } from "@/types/learning";

export function LevelBadge({ level, showLabel = false }: { level: CefrLevel; showLabel?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent"
      title={CEFR_LABELS[level]}
    >
      {level}
      {showLabel && <span className="ml-1 font-normal">· {CEFR_LABELS[level]}</span>}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}
