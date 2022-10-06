import create from "zustand";

import {
  QuestionEditSlice,
  QuestionFormSlice,
  QuestionsSlice,
} from "types/stores";
import createQuestionsSlice from "./questionsSlice";
import createQuestionFormSlice from "./questionFormSlice";
import createQuestionEditSlice from "./questionEditSlice";
import { createSelectors } from "lib/util";

export type StoreState = QuestionFormSlice & QuestionsSlice & QuestionEditSlice;
const useStoreBase = create<StoreState>()((...a) => ({
  ...createQuestionFormSlice(...a),
  ...createQuestionsSlice(...a),
  ...createQuestionEditSlice(...a),
}));

const useStore = createSelectors(useStoreBase);
export default useStore;
