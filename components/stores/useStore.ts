import create from "zustand";

import { QFormSlice, QuestionsSlice } from "types/stores";
import createQuestionFormSlice from "./questionFormSlice";
import createQuestionsSlice from "./questionsSlice";
import { createSelectors } from "lib/util";

const useStoreBase = create<QFormSlice & QuestionsSlice>()((...a) => ({
  ...createQuestionFormSlice(...a),
  ...createQuestionsSlice(...a),
}));

const useStore = createSelectors(useStoreBase);
export default useStore;
