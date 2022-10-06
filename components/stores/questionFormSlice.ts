import { StateCreator } from "zustand";
import produce, { enableMapSet } from "immer";
enableMapSet();

import { QuestionFormSlice } from "types/stores";

// states reset by invoking resetForm()
const INITIAL_FORM_STATE: Pick<
  QuestionFormSlice,
  | "questionForm_yearLevel"
  | "questionForm_topic"
  | "questionForm_tags"
  | "questionForm_content"
  | "questionForm_tagMatch"
> = {
  questionForm_yearLevel: "",
  questionForm_topic: "",
  questionForm_tags: new Set(),
  questionForm_content: "",
  questionForm_tagMatch: "any",
};

// main slice
const createQuestionFormSlice: StateCreator<
  QuestionFormSlice,
  [],
  [],
  QuestionFormSlice
> = (set) => ({
  // states
  ...INITIAL_FORM_STATE,
  questionForm_orderBy: "-updatedAt",
  questionForm_take: 10,

  // methods
  questionForm_set: (field) => (value) => set({ [field]: value }),
  questionForm_addTag: (newTag) =>
    set(
      produce((draft: QuestionFormSlice) => {
        const tags = draft.questionForm_tags;
        draft.questionForm_tags = new Set(tags).add(newTag);
      })
    ),
  questionForm_reset: () => set({ ...INITIAL_FORM_STATE }),
});
export default createQuestionFormSlice;
