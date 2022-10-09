import create from "zustand";

import createQuestionsSlice from "./questionsSlice";
import createQuestionFormSlice from "./questionFormSlice";
import createQuestionEditSlice from "./questionEditSlice";
import { createSelectors } from "./utils";
import { QuestionFormSlice, QuestionsSlice, QuestionEditSlice } from "./types";

export type StoreState = QuestionFormSlice & QuestionsSlice & QuestionEditSlice;
const useStoreBase = create<StoreState>()((...a) => ({
  ...createQuestionFormSlice(...a),
  ...createQuestionsSlice(...a),
  ...createQuestionEditSlice(...a),
}));

const useStore = createSelectors(useStoreBase);
export default useStore;
