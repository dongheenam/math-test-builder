import type * as Prisma from "@prisma/client";
import { YEAR_LEVELS } from "./constants";

/* Questions */
export type Topic = Prisma.Topic;

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
  topic: Question["topic"] | "";
  yearLevel: typeof YEAR_LEVELS[number] | "";
  tags: string[];
  content: Question["content"];
  solution: Question["solution"];
};
