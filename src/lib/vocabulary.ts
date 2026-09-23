import type { VocabularyFilterState, VocabularyItem } from "@/types/learning";

export const EMPTY_FILTERS: VocabularyFilterState = { search: "", level: "all", topic: "all" };
export const MAX_SEARCH_LENGTH = 50;

/** Case- and accent-insensitive text for search matching (handles Vietnamese diacritics). */
function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export function filterVocabulary(
  items: readonly VocabularyItem[],
  filters: VocabularyFilterState,
): VocabularyItem[] {
  const query = normalise(filters.search);
  return items.filter((item) => {
    if (filters.level !== "all" && item.level !== filters.level) return false;
    if (filters.topic !== "all" && item.topic !== filters.topic) return false;
    if (!query) return true;
    return [item.word, item.vietnamese, item.definition].some((field) =>
      normalise(field).includes(query),
    );
  });
}
