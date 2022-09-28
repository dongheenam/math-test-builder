import type { Document } from "mongoose";

export interface IQuestion extends Document {
  topic: string;
  yearLevel: string;
  tags?: string[];
  text: string;
  solution: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
