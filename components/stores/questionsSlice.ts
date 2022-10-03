import { StateCreator } from "zustand";
import produce, { enableMapSet } from "immer";
enableMapSet();

import { QuestionFormSlice, QuestionsSlice } from "types/stores";
import { callGetQuestions } from "lib/proxies/callApis";
import { QuestionDoc } from "types";
import { toggleItem } from "lib/util";

const createQuestionsSlice: StateCreator<
  QuestionsSlice & QuestionFormSlice,
  [],
  [],
  QuestionsSlice
> = (set, get) => ({
  // states
  questions_fetched: new Map(),
  questions_cached: new Map(),
  questions_countQueried: 0,
  questions_countFetched: 0,
  questions_bucket: [],

  // methods
  questions_fetch: async ({ append = false }) => {
    const res = await callGetQuestions({
      topic: get().questionForm_topic,
      yearLevel: get().questionForm_yearLevel,
      tags: [...get().questionForm_tags], // Set => Array
      text: get().questionForm_text,
      matchType: get().questionForm_matchType,
      sortBy: get().questionForm_sortBy,
      limit: get().questionForm_limit,
      skip: get().questionForm_skip,
    });
    if (res === undefined) return;
    const { docs, count }: { docs: QuestionDoc[]; count: number } = res.data;
    const newQs: QuestionsSlice["questions_fetched"] = new Map(
      docs.map((q) => [q._id, q])
    );

    set(
      produce((prev: QuestionsSlice) => {
        prev.questions_countQueried = count;
        if (append) {
          const prevQs = prev.questions_fetched;
          prev.questions_fetched = new Map([...prevQs, ...newQs]);
          prev.questions_countFetched += newQs.size;
        } else {
          prev.questions_fetched = newQs;
          prev.questions_countFetched = newQs.size;
        }
      })
    );
  },
  questions_toggleBucket: (toggledId) =>
    set(
      produce((prev: QuestionsSlice) => {
        const qBucket = prev.questions_bucket;
        if (qBucket.includes(toggledId)) {
          prev.questions_bucket = qBucket.filter(
            (id: string) => id !== toggledId
          );
        } else {
          prev.questions_bucket.push(toggledId);
          // add selected question to local cache as well
          prev.questions_cached = new Map(prev.questions_cached).set(
            toggledId,
            prev.questions_fetched.get(toggledId) as QuestionDoc
          );
        }
      })
    ),
  questions_setBucket: (newBucket) => set({ questions_bucket: newBucket }),
  questions_resetBucket: () => set({ questions_bucket: [] }),
});
export default createQuestionsSlice;
