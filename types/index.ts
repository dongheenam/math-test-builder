import type { Document } from "mongoose";

/* Questions */
export const topics = [
  "Number",
  "Algebra",
  "Measurement",
  "Geometry",
  "Statistics",
  "Probability",
  "Calculus",
];
export const yearLevels = [7, 8, 9, 10, 11, 12];
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
