import type * as Prisma from "@prisma/client";

/* Questions */
export type Topic = Prisma.Topic;
export const TOPIC_VALUES: Record<Prisma.Topic, string> = {
  NUM: "number",
  ALG: "algebra",
  MEAS: "measurement",
  GEO: "geometry",
  STAT: "statistics",
  PROB: "probability",
  CALC: "calculus",
} as const;
export const TOPIC_COLORS: Record<Prisma.Topic, string> = {
  NUM: "yellow",
  ALG: "pink",
  MEAS: "indigo",
  GEO: "blue",
  STAT: "green",
  PROB: "lime",
  CALC: "red",
};
type Test = {
  [x in keyof Prisma.Question]?: string;
};
const test: Test = {
  id: "123",
};

export const YEAR_LEVELS = ["7", "8", "9", "10", "11", "12"] as const;
export type QuestionModel = Prisma.Question;
export type QuestionFetched = Prisma.Question & {
  tags: string[];
};
export type QuestionDraft = Partial<QuestionFetched>;
