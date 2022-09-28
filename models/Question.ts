import mongoose, { Schema, ObjectId } from "mongoose";
import type { Model } from "mongoose";

import { IQuestion } from "types";

/* Questions */
const questionSchema = new Schema(
  {
    topic: { type: String, index: true, required: true },
    yearLevel: { type: String, index: true, required: true },
    tags: [String],
    text: { type: String, required: true },
    solution: { type: String, required: true },
    // createdBy: ObjectId, (userID; to be implemented)
  },
  { collection: "questions", timestamps: true }
);
const Question =
  (mongoose.models["questions"] as Model<IQuestion>) ||
  mongoose.model<IQuestion>("questions", questionSchema);
export default Question;
