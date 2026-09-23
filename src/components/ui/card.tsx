import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag className={cn("rounded-2xl border border-border bg-surface p-5 sm:p-6", className)}>
      {children}
    </Tag>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-base font-semibold", className)}>{children}</h2>;
}
