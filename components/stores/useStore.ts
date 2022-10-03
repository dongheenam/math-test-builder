import create from "zustand";

import { QuestionFormSlice, QuestionsSlice } from "types/stores";
import createQuestionFormSlice from "./questionFormSlice";
import createQuestionsSlice from "./questionsSlice";
import { createSelectors } from "lib/util";

export type StoreState = QuestionFormSlice & QuestionsSlice;
const useStoreBase = create<StoreState>()((...a) => ({
  ...createQuestionFormSlice(...a),
  ...createQuestionsSlice(...a),
}));

const useStore = createSelectors(useStoreBase);
export default useStore;
