import type { Document } from "mongoose";

/* Questions */
export const TOPICS = {
  NUM: "number",
  ALG: "algebra",
  MEAS: "measurement",
  GEO: "geometry",
  STAT: "statistics",
  PROB: "probability",
  CALC: "calculus",
} as const;
export type Topic = typeof TOPICS[keyof typeof TOPICS];
export const TOPIC_COLORS: Record<Topic, string> = {
  [TOPICS.NUM]: "yellow",
  [TOPICS.ALG]: "pink",
  [TOPICS.MEAS]: "indigo",
  [TOPICS.GEO]: "blue",
  [TOPICS.STAT]: "green",
  [TOPICS.PROB]: "lime",
  [TOPICS.CALC]: "red",
};
export const YEAR_LEVELS = [7, 8, 9, 10, 11, 12] as const;
// export const COURSES = {
//   AC: "AC",
//   HSC: "HSC",
//   IB: "IB",
// };
export type Question = {
  topic: Topic;
  yearLevel: number;
  tags: string[];
  text: string;
  solution: string;
};
export type QuestionDraft = {
  topic: Question["topic"] | "";
  yearLevel: "7" | "8" | "9" | "10" | "11" | "12" | "";
  tags: Question["tags"];
  text: Question["text"];
  solution: Question["solution"];
  _id: string;
};
export interface QuestionDoc extends Document, Question {
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
