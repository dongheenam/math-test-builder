import mongoose, { Schema, ObjectId } from "mongoose";
import type { Model, Document } from "mongoose";
import pluralize from "pluralize";

import { QuestionDoc, TOPICS } from "types";

/* Schema */
const questionSchema = new Schema(
  {
    topic: {
      type: String,
      index: true,
      required: true,
      lowercase: true,
      enum: Object.values(TOPICS),
    },
    yearLevel: { type: Number, index: true, required: true, min: 7, max: 12 },
    tags: {
      type: [String],
      lowercase: true,
    },
    text: { type: String, required: true },
    solution: { type: String, required: true },
    // createdBy: ObjectId, (userID; to be implemented)
  },
  { collection: "questions", timestamps: true }
);
const Question =
  (mongoose.models["questions"] as Model<QuestionDoc>) ||
  mongoose.model<QuestionDoc>("questions", questionSchema);
export default Question;
