import type { Document } from "mongoose";

/* Questions */
export const TOPICS = {
  NUM: "Number",
  ALG: "Algebra",
  MEAS: "Measurement",
  GEO: "Geometry",
  STAT: "Statistics",
  PROB: "Probability",
  CALC: "Calculus",
};
export const TOPIC_COLORS = {
  [TOPICS.NUM]: "yellow",
  [TOPICS.ALG]: "pink",
  [TOPICS.MEAS]: "indigo",
  [TOPICS.GEO]: "blue",
  [TOPICS.STAT]: "green",
  [TOPICS.PROB]: "lime",
  [TOPICS.CALC]: "red",
};
export const YEAR_LEVELS = [7, 8, 9, 10, 11, 12];
export const COURSES = {
  AC: "AC",
  HSC: "HSC",
  IB: "IB",
};
export interface IQuestion extends Document {
  topic: string;
  yearLevel: number;
  course?: string;
  tags?: string[];
  text: string;
  solution: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
