import type { GrammarTopic } from "@/types/learning";

/**
 * Mock grammar content: the eight starter topics from the project spec.
 * Original practice items — not taken from any official exam paper.
 */
export const grammarTopics: GrammarTopic[] = [
  {
    id: "present-simple",
    title: "Present Simple",
    level: "A1",
    summary: "Habits, routines and facts that are always true.",
    explanation: [
      "Use the present simple for things that happen regularly (habits and routines) and for facts.",
      "With he, she and it, add -s or -es to the verb. Use do / does to make questions and negatives.",
    ],
    form: [
      "I / you / we / they + verb → I work in recruitment.",
      "he / she / it + verb-s → She works in a bank.",
      "Negative: don't / doesn't + verb → He doesn't drink coffee.",
      "Question: Do / Does + subject + verb? → Does she like tea?",
    ],
    examples: [
      { sentence: "I get up at 6:30 every day.", note: "routine" },
      { sentence: "Water boils at 100°C.", note: "fact" },
      { sentence: "My brother doesn't live in Ho Chi Minh City." },
    ],
    commonMistakes: [
      {
        incorrect: "I am work in recruitment.",
        correct: "I work in recruitment.",
        why: "Don't add am/is/are before the main verb in the present simple.",
      },
      {
        incorrect: "She like coffee.",
        correct: "She likes coffee.",
        why: "Add -s to the verb after he, she or it.",
      },
      {
        incorrect: "Does he works here?",
        correct: "Does he work here?",
        why: "After does, the verb goes back to its base form.",
      },
    ],
    questions: [
      {
        id: "ps-1",
        prompt: "My sister ___ in a hospital.",
        options: ["work", "works", "is work", "working"],
        correctIndex: 1,
        explanation: "\"My sister\" = she, so the verb takes -s: works.",
      },
      {
        id: "ps-2",
        prompt: "___ you usually walk to school?",
        options: ["Are", "Does", "Do", "Is"],
        correctIndex: 2,
        explanation: "Questions with you use Do + base verb.",
      },
      {
        id: "ps-3",
        prompt: "He ___ like spicy food.",
        options: ["don't", "doesn't", "isn't", "not"],
        correctIndex: 1,
        explanation: "The negative with he/she/it is doesn't + base verb.",
      },
      {
        id: "ps-4",
        prompt: "The sun ___ in the east.",
        options: ["rise", "is rising", "rises", "rised"],
        correctIndex: 2,
        explanation: "This is a fact, so use the present simple; \"the sun\" = it → rises.",
      },
      {
        id: "ps-5",
        prompt: "Which sentence is correct?",
        options: [
          "I am work in recruitment.",
          "I working in recruitment.",
          "I work in recruitment.",
          "I works in recruitment.",
        ],
        correctIndex: 2,
        explanation: "With I, use the base verb with no am and no -s: I work.",
      },
    ],
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    level: "A1",
    summary: "Actions happening now or around now, and temporary situations.",
    explanation: [
      "Use the present continuous for actions happening at the moment of speaking, or around this time.",
      "It is also used for temporary situations and for fixed future arrangements.",
      "Some verbs are not normally used in the continuous form (stative verbs), e.g. know, like, want, believe.",
    ],
    form: [
      "am / is / are + verb-ing → I am studying now.",
      "Negative: am not / isn't / aren't + verb-ing",
      "Question: Am / Is / Are + subject + verb-ing?",
    ],
    examples: [
      { sentence: "Look! It's raining.", note: "happening now" },
      { sentence: "I'm staying with my cousin this month.", note: "temporary" },
      { sentence: "We're meeting the client on Friday.", note: "arrangement" },
    ],
    commonMistakes: [
      {
        incorrect: "I studying English now.",
        correct: "I am studying English now.",
        why: "The present continuous needs am/is/are before the -ing verb.",
      },
      {
        incorrect: "I am knowing the answer.",
        correct: "I know the answer.",
        why: "Know is a stative verb, so it normally uses the simple form.",
      },
    ],
    questions: [
      {
        id: "pc-1",
        prompt: "Be quiet, please. The baby ___.",
        options: ["sleeps", "is sleeping", "sleep", "are sleeping"],
        correctIndex: 1,
        explanation: "The action is happening now, and \"the baby\" = it → is sleeping.",
      },
      {
        id: "pc-2",
        prompt: "What ___ you doing at the moment?",
        options: ["do", "are", "is", "does"],
        correctIndex: 1,
        explanation: "Present continuous question: Are + you + verb-ing.",
      },
      {
        id: "pc-3",
        prompt: "I ___ what you mean.",
        options: ["am understanding", "understanding", "understand", "am understand"],
        correctIndex: 2,
        explanation: "Understand is a stative verb, so use the present simple.",
      },
      {
        id: "pc-4",
        prompt: "This week Nam ___ from home because his office is closed.",
        options: ["works", "is working", "work", "are working"],
        correctIndex: 1,
        explanation: "\"This week\" shows a temporary situation → is working.",
      },
      {
        id: "pc-5",
        prompt: "They ___ TV right now; they're playing football.",
        options: ["aren't watching", "don't watch", "isn't watching", "not watching"],
        correctIndex: 0,
        explanation: "\"Right now\" + they → aren't watching.",
      },
    ],
  },
  {
    id: "past-simple",
    title: "Past Simple",
    level: "A2",
    summary: "Finished actions at a specific time in the past.",
    explanation: [
      "Use the past simple for completed actions at a known time in the past (yesterday, last year, in 2020, two days ago).",
      "Regular verbs add -ed. Many common verbs are irregular (go → went, see → saw).",
      "Use did / didn't + base verb for questions and negatives.",
    ],
    form: [
      "subject + verb-ed / irregular past → She visited Hue last year.",
      "Negative: didn't + base verb → I didn't see him.",
      "Question: Did + subject + base verb? → Did you enjoy it?",
    ],
    examples: [
      { sentence: "We went to the beach last weekend." },
      { sentence: "I didn't finish the report yesterday." },
      { sentence: "Did you watch the match?" },
    ],
    commonMistakes: [
      {
        incorrect: "I didn't went to class.",
        correct: "I didn't go to class.",
        why: "After did / didn't, use the base form of the verb.",
      },
      {
        incorrect: "Yesterday I buyed a new phone.",
        correct: "Yesterday I bought a new phone.",
        why: "Buy is irregular: buy → bought.",
      },
    ],
    questions: [
      {
        id: "pst-1",
        prompt: "We ___ a great film last night.",
        options: ["see", "saw", "seen", "have seen"],
        correctIndex: 1,
        explanation: "\"Last night\" is a finished time → past simple. See → saw.",
      },
      {
        id: "pst-2",
        prompt: "___ she call you yesterday?",
        options: ["Does", "Was", "Did", "Has"],
        correctIndex: 2,
        explanation: "Past simple question: Did + subject + base verb.",
      },
      {
        id: "pst-3",
        prompt: "I didn't ___ your message.",
        options: ["got", "get", "gets", "getting"],
        correctIndex: 1,
        explanation: "After didn't, use the base verb: get.",
      },
      {
        id: "pst-4",
        prompt: "They ___ in Da Lat from 2018 to 2021.",
        options: ["live", "have lived", "lived", "are living"],
        correctIndex: 2,
        explanation: "A finished period in the past → past simple: lived.",
      },
      {
        id: "pst-5",
        prompt: "What time ___ the meeting start this morning?",
        options: ["did", "does", "was", "is"],
        correctIndex: 0,
        explanation: "\"This morning\" has finished, so ask with did.",
      },
    ],
  },
  {
    id: "present-perfect",
    title: "Present Perfect",
    level: "B1",
    summary: "Past actions connected to now: experience, results and unfinished time.",
    explanation: [
      "Use the present perfect when the time is not stated or not finished, and the past action matters now.",
      "Common uses: life experience (ever / never), recent results (just / already / yet), and situations continuing to now (for / since).",
      "Do not use it with a finished time expression such as yesterday or last year — use the past simple instead.",
    ],
    form: [
      "have / has + past participle → I have visited Singapore.",
      "Negative: haven't / hasn't + past participle",
      "Question: Have / Has + subject + past participle?",
    ],
    examples: [
      { sentence: "Have you ever taken an IELTS test?", note: "experience" },
      { sentence: "I've just finished my homework.", note: "recent result" },
      { sentence: "She has worked here since 2022.", note: "continues to now" },
    ],
    commonMistakes: [
      {
        incorrect: "I have seen him yesterday.",
        correct: "I saw him yesterday.",
        why: "Yesterday is a finished time, so use the past simple.",
      },
      {
        incorrect: "I live here since 2019.",
        correct: "I have lived here since 2019.",
        why: "For a situation that started in the past and continues now, use the present perfect.",
      },
    ],
    questions: [
      {
        id: "pp-1",
        prompt: "I ___ to Japan three times.",
        options: ["went", "have been", "am going", "was"],
        correctIndex: 1,
        explanation: "Life experience with no specific time → present perfect.",
      },
      {
        id: "pp-2",
        prompt: "She has worked for this company ___ five years.",
        options: ["since", "for", "during", "ago"],
        correctIndex: 1,
        explanation: "Use for with a period of time; since with a starting point.",
      },
      {
        id: "pp-3",
        prompt: "___ you finished the report yet?",
        options: ["Did", "Have", "Are", "Has"],
        correctIndex: 1,
        explanation: "Yet is common with the present perfect; you → Have.",
      },
      {
        id: "pp-4",
        prompt: "We ___ the museum last Sunday.",
        options: ["have visited", "visited", "has visited", "visit"],
        correctIndex: 1,
        explanation: "\"Last Sunday\" is a finished time → past simple, not present perfect.",
      },
      {
        id: "pp-5",
        prompt: "He has lived in Hanoi ___ 2015.",
        options: ["for", "from", "since", "ago"],
        correctIndex: 2,
        explanation: "2015 is a starting point → since.",
      },
    ],
  },
  {
    id: "future-forms",
    title: "Future forms",
    level: "A2",
    summary: "will, be going to and the present continuous for the future.",
    explanation: [
      "will: decisions made at the moment of speaking, promises, offers and predictions based on opinion.",
      "be going to: plans decided before speaking, and predictions based on present evidence.",
      "Present continuous: fixed arrangements with a time and place (often in a calendar).",
    ],
    form: [
      "will + base verb → I'll help you.",
      "am / is / are going to + base verb → I'm going to study tonight.",
      "am / is / are + verb-ing → We're flying to Hue on Monday.",
    ],
    examples: [
      { sentence: "The phone's ringing — I'll answer it.", note: "instant decision" },
      { sentence: "Look at those clouds. It's going to rain.", note: "evidence" },
      { sentence: "I'm seeing the dentist at 3 pm tomorrow.", note: "arrangement" },
    ],
    commonMistakes: [
      {
        incorrect: "I will to call you later.",
        correct: "I will call you later.",
        why: "Will is followed by the base verb without to.",
      },
      {
        incorrect: "I going to study tonight.",
        correct: "I'm going to study tonight.",
        why: "Be going to needs am/is/are.",
      },
    ],
    questions: [
      {
        id: "ff-1",
        prompt: "\"It's cold in here.\" \"OK, I ___ close the window.\"",
        options: ["am going to", "will", "am closing", "close"],
        correctIndex: 1,
        explanation: "A decision made at the moment of speaking → will.",
      },
      {
        id: "ff-2",
        prompt: "Look at that car! It ___ crash.",
        options: ["will", "is going to", "crashes", "is crash"],
        correctIndex: 1,
        explanation: "A prediction based on what you can see now → be going to.",
      },
      {
        id: "ff-3",
        prompt: "We ___ our grandparents this Saturday. It's all arranged.",
        options: ["visit", "will visit", "are visiting", "visited"],
        correctIndex: 2,
        explanation: "A fixed arrangement → present continuous.",
      },
      {
        id: "ff-4",
        prompt: "I think Vietnam ___ win the match.",
        options: ["will", "is winning", "wins", "going to"],
        correctIndex: 0,
        explanation: "A prediction based on opinion (I think) → will.",
      },
      {
        id: "ff-5",
        prompt: "She has bought the books. She ___ study for the TOEIC test.",
        options: ["will to", "is going to", "going to", "goes to"],
        correctIndex: 1,
        explanation: "A plan decided before speaking → is going to.",
      },
    ],
  },
  {
    id: "articles",
    title: "Articles",
    level: "A2",
    summary: "a / an, the, or no article.",
    explanation: [
      "a / an: one singular countable thing mentioned for the first time, or a job. Use an before a vowel sound (an hour, an umbrella).",
      "the: something specific, already mentioned, or unique (the sun, the internet).",
      "No article: plural or uncountable nouns in general (Cats are clever. Water is important.), and most cities and countries.",
    ],
    examples: [
      { sentence: "I saw a dog. The dog was very big.", note: "first → second mention" },
      { sentence: "She is an engineer.", note: "job" },
      { sentence: "Money doesn't buy happiness.", note: "general, uncountable" },
    ],
    commonMistakes: [
      {
        incorrect: "She is engineer.",
        correct: "She is an engineer.",
        why: "Use a / an with jobs.",
      },
      {
        incorrect: "I waited for a hour.",
        correct: "I waited for an hour.",
        why: "Hour starts with a vowel sound (the h is silent), so use an.",
      },
      {
        incorrect: "The life is beautiful.",
        correct: "Life is beautiful.",
        why: "Don't use the with uncountable nouns in a general sense.",
      },
    ],
    questions: [
      {
        id: "ar-1",
        prompt: "My father is ___ doctor.",
        options: ["a", "an", "the", "—"],
        correctIndex: 0,
        explanation: "Use a with jobs; doctor starts with a consonant sound.",
      },
      {
        id: "ar-2",
        prompt: "It takes ___ hour to get there.",
        options: ["a", "an", "the", "—"],
        correctIndex: 1,
        explanation: "The h in hour is silent, so it starts with a vowel sound → an.",
      },
      {
        id: "ar-3",
        prompt: "___ moon looks beautiful tonight.",
        options: ["A", "An", "The", "—"],
        correctIndex: 2,
        explanation: "There is only one moon → the.",
      },
      {
        id: "ar-4",
        prompt: "I love ___ music.",
        options: ["a", "the", "an", "—"],
        correctIndex: 3,
        explanation: "Music in general is uncountable → no article.",
      },
      {
        id: "ar-5",
        prompt: "She studied at ___ university in Canada.",
        options: ["an", "a", "the", "—"],
        correctIndex: 1,
        explanation: "University starts with a /j/ (\"you\") sound, a consonant sound → a.",
      },
    ],
  },
  {
    id: "prepositions",
    title: "Prepositions",
    level: "A2",
    summary: "in, on and at for time and place.",
    explanation: [
      "Time: at for exact times and festivals (at 7 pm, at night, at Tet); on for days and dates (on Monday, on 2 September); in for months, years, seasons and parts of the day (in May, in 2025, in the morning).",
      "Place: at for a point (at the bus stop, at work); on for a surface or line (on the table, on the second floor); in for an enclosed space or area (in the room, in Vietnam).",
    ],
    examples: [
      { sentence: "The class starts at 8:30 on Monday." },
      { sentence: "I was born in 2001." },
      { sentence: "Your keys are on the desk in my office." },
    ],
    commonMistakes: [
      {
        incorrect: "I'll see you in Monday.",
        correct: "I'll see you on Monday.",
        why: "Use on with days of the week.",
      },
      {
        incorrect: "She arrived to the airport.",
        correct: "She arrived at the airport.",
        why: "Use arrive at a place (arrive in a city or country).",
      },
    ],
    questions: [
      {
        id: "pr-1",
        prompt: "The meeting is ___ 10 o'clock.",
        options: ["in", "on", "at", "by"],
        correctIndex: 2,
        explanation: "Use at with exact clock times.",
      },
      {
        id: "pr-2",
        prompt: "My birthday is ___ July.",
        options: ["on", "in", "at", "to"],
        correctIndex: 1,
        explanation: "Use in with months.",
      },
      {
        id: "pr-3",
        prompt: "We have English class ___ Tuesdays.",
        options: ["in", "at", "on", "for"],
        correctIndex: 2,
        explanation: "Use on with days of the week.",
      },
      {
        id: "pr-4",
        prompt: "There's a picture ___ the wall.",
        options: ["in", "on", "at", "over"],
        correctIndex: 1,
        explanation: "A wall is a surface → on.",
      },
      {
        id: "pr-5",
        prompt: "I'll meet you ___ the bus stop.",
        options: ["at", "in", "on", "to"],
        correctIndex: 0,
        explanation: "A bus stop is a point or meeting place → at.",
      },
    ],
  },
  {
    id: "modal-verbs",
    title: "Modal verbs",
    level: "B1",
    summary: "can, could, must, have to, should and might.",
    explanation: [
      "Modal verbs are followed by the base verb without to, and they don't take -s: She can swim (not She cans swim / She can to swim).",
      "can / could: ability and permission. should: advice. must / have to: obligation. mustn't: prohibition. don't have to: no obligation. might / may: possibility.",
    ],
    examples: [
      { sentence: "You should practise speaking every day.", note: "advice" },
      { sentence: "Candidates must bring their ID card.", note: "obligation" },
      { sentence: "You don't have to wear a uniform.", note: "not necessary" },
      { sentence: "It might rain later.", note: "possibility" },
    ],
    commonMistakes: [
      {
        incorrect: "You should to study more.",
        correct: "You should study more.",
        why: "Modal verbs are followed by the base verb without to.",
      },
      {
        incorrect: "She cans speak French.",
        correct: "She can speak French.",
        why: "Modal verbs never take -s.",
      },
    ],
    questions: [
      {
        id: "mv-1",
        prompt: "You look tired. You ___ go to bed early.",
        options: ["should", "must to", "can to", "might to"],
        correctIndex: 0,
        explanation: "Should gives advice and is followed by the base verb.",
      },
      {
        id: "mv-2",
        prompt: "You ___ use your phone during the exam. It's not allowed.",
        options: ["don't have to", "mustn't", "shouldn't to", "might not"],
        correctIndex: 1,
        explanation: "Mustn't = it is not allowed (prohibition).",
      },
      {
        id: "mv-3",
        prompt: "Tomorrow is Sunday, so I ___ get up early.",
        options: ["mustn't", "don't have to", "can't", "shouldn't to"],
        correctIndex: 1,
        explanation: "Don't have to = it is not necessary.",
      },
      {
        id: "mv-4",
        prompt: "When I was five, I ___ swim.",
        options: ["can", "could", "must", "should"],
        correctIndex: 1,
        explanation: "Could is the past form of can for ability.",
      },
      {
        id: "mv-5",
        prompt: "Take an umbrella. It ___ rain this afternoon.",
        options: ["might", "must to", "has", "should to"],
        correctIndex: 0,
        explanation: "Might expresses possibility.",
      },
    ],
  },
];

export function getGrammarTopic(id: string): GrammarTopic | undefined {
  return grammarTopics.find((topic) => topic.id === id);
}
