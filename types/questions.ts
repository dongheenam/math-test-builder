import type * as Prisma from "@prisma/client";

/* Questions */
export type Topic = Prisma.Topic;
export const TOPIC_VALUES: Record<Topic, string> = {
  NUM: "number",
  ALG: "algebra",
  MEAS: "measurement",
  GEO: "geometry",
  STAT: "statistics",
  PROB: "probability",
  CALC: "calculus",
} as const;
export const TOPIC_COLORS: Record<Topic, string> = {
  NUM: "yellow",
  ALG: "pink",
  MEAS: "indigo",
  GEO: "blue",
  STAT: "green",
  PROB: "lime",
  CALC: "red",
};

export const YEAR_LEVELS = ["7", "8", "9", "10", "11", "12"] as const;
// base model from Prisma
export type Question = Prisma.Question;
// raw result of prisma.question.find(), ...
export type QuestionRaw = Question & {
  tags: { name: string }[];
};
// questions sent to/received from API calls
export type QuestionFetched = Question & {
  tags: string[];
};
// questions in forms
export type QuestionDraft = {
  id: string;
  topic: Question["topic"] | "";
  yearLevel: typeof YEAR_LEVELS[number] | "";
  tags: Set<string>;
  content: Question["content"];
  solution: Question["solution"];
};
