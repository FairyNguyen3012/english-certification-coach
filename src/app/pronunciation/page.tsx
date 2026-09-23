import type { Metadata } from "next";
import { lessonSections } from "@/data/lesson-sections";
import { LessonCatalog } from "@/components/lesson/lesson-catalog";
import { AccentPractice } from "@/components/pronunciation/accent-practice";

export const metadata: Metadata = { title: "Pronunciation" };

export default function PronunciationPage() {
  return (
    <>
      <AccentPractice />
      <LessonCatalog section={lessonSections["pronunciation"]} />
    </>
  );
}
