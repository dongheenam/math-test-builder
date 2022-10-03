import { StateCreator } from "zustand";
import produce from "immer";

import { QuestionFormSlice } from "types/stores";

// states reset by invoking resetForm()
const INITIAL_FORM_STATE: Pick<
  QuestionFormSlice,
  | "questionForm_yearLevel"
  | "questionForm_topic"
  | "questionForm_tags"
  | "questionForm_text"
  | "questionForm_matchType"
> = {
  questionForm_yearLevel: "",
  questionForm_topic: "",
  questionForm_tags: new Set(),
  questionForm_text: "",
  questionForm_matchType: "any",
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
  questionForm_sortBy: "-updatedAt",
  questionForm_limit: 10,
  questionForm_skip: 0,

  // methods
  questionForm_set: (field) => (value) =>
    set(
      produce((draft: QuestionFormSlice) => {
        draft[field] = value;
      })
    ),
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
