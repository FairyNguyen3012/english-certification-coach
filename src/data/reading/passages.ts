import type { ReadingPassage } from "@/types/learning";

export const readingPassages: ReadingPassage[] = [
  {
    id: "the-community-library",
    title: "The Community Library",
    level: "A2",
    topic: "Community",
    paragraphs: [
      "When a small library in Green Street lost some of its funding, local residents decided to help. They cleaned the building, painted the walls and collected books from their homes. A nearby cafe offered free drinks to people who volunteered on Saturday mornings.",
      "The library now opens six days a week. Children visit after school to read or do homework, while adults use the quiet tables to study and work. The library also has a weekly conversation club, where people from different countries practise English together.",
      "The project shows that a useful community space does not always need a large budget. It needs people who care about the place and are willing to share their time.",
    ],
    questions: [
      {
        id: "community-library-1",
        prompt: "Why did local residents help the library?",
        options: [
          "They wanted to open a cafe.",
          "The library had lost some funding.",
          "Children needed new schools.",
          "The building was moving to another street.",
        ],
        correctIndex: 1,
        explanation: "The first paragraph says the residents helped after the library lost some of its funding.",
      },
      {
        id: "community-library-2",
        prompt: "What do adults use the library for?",
        options: ["Cooking meals", "Playing sport", "Studying and working", "Selling books"],
        correctIndex: 2,
        explanation: "The second paragraph says adults use the quiet tables to study and work.",
      },
      {
        id: "community-library-3",
        prompt: "What is the main idea of the passage?",
        options: [
          "Libraries should only be used by children.",
          "A community can protect a useful place by working together.",
          "Cafes are more popular than libraries.",
          "People from different countries should work alone.",
        ],
        correctIndex: 1,
        explanation: "The final paragraph explains that shared time and care can support a community space.",
      },
    ],
  },
  {
    id: "a-quieter-city",
    title: "A Quieter City",
    level: "B1",
    topic: "Environment",
    paragraphs: [
      "Last year, the city of Luma introduced a car-free morning in its busiest shopping area. Between 7 a.m. and 11 a.m. on Sundays, private cars cannot enter the central streets. Residents can walk, cycle or use a free electric bus instead.",
      "At first, some shop owners were worried that fewer cars would mean fewer customers. After three months, however, most businesses reported that sales had stayed the same or increased. People spent more time looking at shop windows because the streets felt safer and less crowded.",
      "The city plans to collect more data before expanding the programme. Officials want to understand how it affects delivery workers and people with limited mobility. They say the next decision should be based on evidence as well as public opinion.",
    ],
    questions: [
      {
        id: "quieter-city-1",
        prompt: "When are private cars banned from the central streets?",
        options: ["Every morning", "On Sunday mornings", "On weekday afternoons", "Every evening"],
        correctIndex: 1,
        explanation: "The restriction operates between 7 a.m. and 11 a.m. on Sundays.",
      },
      {
        id: "quieter-city-2",
        prompt: "What happened to most businesses after three months?",
        options: [
          "They closed permanently.",
          "They moved outside the city.",
          "Their sales stayed the same or rose.",
          "They stopped accepting customers.",
        ],
        correctIndex: 2,
        explanation: "The passage reports that most businesses saw sales stay the same or increase.",
      },
      {
        id: "quieter-city-3",
        prompt: "Why will the city collect more data?",
        options: [
          "To choose a new shopping area",
          "To learn about effects on different groups before expanding",
          "To replace the electric buses",
          "To make the streets busier",
        ],
        correctIndex: 1,
        explanation: "Officials want to understand the programme's effect on delivery workers and people with limited mobility.",
      },
    ],
  },
];

export function getReadingPassage(id: string): ReadingPassage | undefined {
  return readingPassages.find((passage) => passage.id === id);
}
