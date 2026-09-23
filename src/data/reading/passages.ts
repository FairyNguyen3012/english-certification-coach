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
  {
    id: "the-morning-market",
    title: "The Morning Market",
    level: "A1",
    topic: "Daily life",
    paragraphs: [
      "Mai goes to the morning market with her father on Saturdays. They buy rice, fruit and fresh vegetables. The market is near their home, so they walk there together.",
      "Mai likes the market because it is busy and colourful. After shopping, she and her father have breakfast at a small noodle shop.",
    ],
    questions: [
      {
        id: "morning-market-1",
        prompt: "When does Mai go to the market?",
        options: ["On Mondays", "On Saturdays", "Every evening", "Before school"],
        correctIndex: 1,
        explanation: "The first sentence says Mai goes to the market on Saturdays.",
      },
      {
        id: "morning-market-2",
        prompt: "How do Mai and her father get to the market?",
        options: ["By bus", "By car", "On foot", "By train"],
        correctIndex: 2,
        explanation: "The market is near their home, so they walk there.",
      },
    ],
  },
  {
    id: "learning-a-new-skill",
    title: "Learning a New Skill",
    level: "B2",
    topic: "Education",
    paragraphs: [
      "When Minh decided to learn photography, he initially expected quick results. He bought a camera, watched several tutorials and tried to copy professional images. The photographs looked acceptable, but they did not have the feeling he wanted.",
      "A mentor suggested that Minh spend less time collecting equipment and more time observing light. He began taking one short walk each evening, making notes about shadows, colour and movement. After several weeks, he noticed that his photographs were becoming more intentional.",
      "The experience changed Minh's view of learning. Progress did not come from finding a perfect tool; it came from practising one small skill regularly and reviewing the results.",
    ],
    questions: [
      {
        id: "new-skill-1",
        prompt: "Why was Minh initially disappointed with his photographs?",
        options: [
          "His camera was broken.",
          "They looked acceptable but lacked the feeling he wanted.",
          "He could not find a mentor.",
          "He disliked walking outside.",
        ],
        correctIndex: 1,
        explanation: "The first paragraph says the images looked acceptable but did not have the feeling he wanted.",
      },
      {
        id: "new-skill-2",
        prompt: "What did the mentor advise Minh to observe?",
        options: ["Expensive cameras", "Light", "Other photographers", "Buildings"],
        correctIndex: 1,
        explanation: "The mentor advised Minh to spend more time observing light.",
      },
      {
        id: "new-skill-3",
        prompt: "What lesson did Minh learn?",
        options: [
          "The most expensive tool is always best.",
          "Professional images are impossible to copy.",
          "Regular focused practice supports progress.",
          "Learning should happen only with a mentor.",
        ],
        correctIndex: 2,
        explanation: "The final paragraph links his progress to regular practice and reviewing results.",
      },
    ],
  },
  {
    id: "designing-for-reuse",
    title: "Designing for Reuse",
    level: "C1",
    topic: "Technology",
    paragraphs: [
      "Many digital services are designed around replacement: a device becomes difficult to repair, an application stops supporting older hardware, or a user is encouraged to upgrade before the product is worn out. This model can be convenient, but it also shifts the environmental cost of production out of sight.",
      "A growing number of designers are exploring products that can be repaired, upgraded in parts and eventually disassembled. Their aim is not simply to make objects last longer. They want materials to remain useful after the original product has reached the end of its working life.",
      "Reuse is not a single technical solution. It requires manufacturers to provide information, customers to value maintenance and regulators to reward durable design. Without all three, a well-designed product may still be treated as disposable.",
    ],
    questions: [
      {
        id: "reuse-1",
        prompt: "What problem does the first paragraph describe?",
        options: [
          "Digital services are too difficult to use.",
          "Products are often replaced before they are worn out.",
          "Repair shops are becoming more popular.",
          "Customers refuse to buy new devices.",
        ],
        correctIndex: 1,
        explanation: "The paragraph describes replacement being encouraged even when products still work.",
      },
      {
        id: "reuse-2",
        prompt: "What do the designers want materials to do?",
        options: [
          "Remain useful after the original product ends its life",
          "Become more expensive each year",
          "Be hidden from customers",
          "Be used only in digital services",
        ],
        correctIndex: 0,
        explanation: "The second paragraph says materials should remain useful after the original product is finished.",
      },
      {
        id: "reuse-3",
        prompt: "What does the final paragraph imply?",
        options: [
          "Technology alone cannot guarantee reuse.",
          "Customers should never repair products.",
          "Regulators are not involved in design.",
          "Durable products are always disposable.",
        ],
        correctIndex: 0,
        explanation: "The writer says reuse requires coordinated action from manufacturers, customers and regulators.",
      },
    ],
  },
  {
    id: "the-value-of-slow-thinking",
    title: "The Value of Slow Thinking",
    level: "C2",
    topic: "Education",
    paragraphs: [
      "Fast decisions are often celebrated as evidence of competence. In many professional settings, however, speed can conceal a failure to define the problem properly. A quick answer may appear decisive while quietly relying on an assumption that nobody has tested.",
      "Slower thinking is not the same as indecision. It involves making assumptions visible, considering alternative explanations and identifying what evidence would change the conclusion. This process can feel inefficient, particularly when a group is under pressure, but it often prevents expensive corrections later.",
      "The most effective organisations therefore distinguish between decisions that are reversible and those that are not. They move quickly when the cost of experimentation is low, and they create deliberate pauses when a choice will shape future options.",
    ],
    questions: [
      {
        id: "slow-thinking-1",
        prompt: "What weakness of fast decisions does the passage identify?",
        options: [
          "They always require too much evidence.",
          "They may hide untested assumptions.",
          "They prevent professional work.",
          "They are impossible to explain.",
        ],
        correctIndex: 1,
        explanation: "The first paragraph warns that speed can hide an assumption that has not been tested.",
      },
      {
        id: "slow-thinking-2",
        prompt: "How does the writer define slower thinking?",
        options: [
          "Avoiding every difficult decision",
          "Waiting until other people decide",
          "Testing assumptions and considering alternatives",
          "Choosing the most expensive option",
        ],
        correctIndex: 2,
        explanation: "The second paragraph describes making assumptions visible and considering alternatives.",
      },
      {
        id: "slow-thinking-3",
        prompt: "What principle should organisations use when deciding how quickly to act?",
        options: [
          "The number of people in the group",
          "Whether the decision can be reversed",
          "The age of the organisation",
          "Whether the answer sounds confident",
        ],
        correctIndex: 1,
        explanation: "The final paragraph says organisations should distinguish between reversible and irreversible decisions.",
      },
    ],
  },
];

export function getReadingPassage(id: string): ReadingPassage | undefined {
  return readingPassages.find((passage) => passage.id === id);
}
