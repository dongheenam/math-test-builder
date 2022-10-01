import { StateCreator } from "zustand";
import produce from "immer";

import { QFormSlice, QuestionsSlice } from "types/stores";
import { callGetQuestions } from "lib/apiCalls";
import { QuestionDoc } from "types";

// main slice
const createQuestionsSlice: StateCreator<
  QuestionsSlice & QFormSlice,
  [],
  [],
  QuestionsSlice
> = (set, get) => ({
  // states
  questions: [],
  qCount: 0,
  qCountFetched: 0,

  // methods
  fetchQuestions: async ({ append = false }) => {
    const res = await callGetQuestions(get().qForm);
    if (res === undefined) return;

    const newQs: QuestionDoc[] = res.data.docs;
    const count: number = res.data.count;
    set(
      produce((prev) => {
        prev.qCount = count;
        if (append) {
          prev.questions.push(newQs);
          prev.qCountFetched += newQs.length;
        } else {
          prev.questions = newQs;
          prev.qCountFetched = newQs.length;
        }
      })
    );
  },
});
export default createQuestionsSlice;
