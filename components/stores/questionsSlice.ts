import { StateCreator } from "zustand";
import produce, { enableMapSet } from "immer";
enableMapSet();

import { QuestionFormSlice, QuestionsSlice } from "types/stores";
import { callGetQuestions } from "lib/proxies/callApis";
import { Question, QuestionDoc } from "types";
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
  questions_chosen: [],

  // methods: questions
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

  // methods: cache
  questions_idToCache: (input) => {
    set(
      produce((prev: QuestionsSlice) => {
        const fetched = prev.questions_fetched;
        const newCache = new Map(prev.questions_cached);

        const _ids = Array.isArray(input) ? input : [input];
        for (const _id of _ids) {
          const q = fetched.get(_id);
          q && newCache.set(_id, q);
        }
        prev.questions_cached = newCache;
      })
    );
  },
  questions_toCache: (question) => {
    if (!("_id" in question)) {
      throw new ReferenceError("_id does not exist in the question!");
    }
    set((prev) => ({
      questions_cached: new Map(prev.questions_cached).set(
        question._id,
        question
      ),
    }));
  },

  // methods: bucket
  questions_toggleBucket: (toggledId) => {
    // add selected question to local cache
    get().questions_idToCache(toggledId);
    set(
      produce((prev: QuestionsSlice) => {
        const qBucket = prev.questions_bucket;
        if (qBucket.includes(toggledId)) {
          // remove
          prev.questions_bucket = qBucket.filter(
            (id: string) => id !== toggledId
          );
        } else {
          // add
          prev.questions_bucket.push(toggledId);
        }
      })
    );
  },
  questions_setBucket: (newBucket) => {
    // add selected question to local cache
    get().questions_idToCache(newBucket);
    set(
      produce((prev) => {
        prev.questions_bucket = newBucket;
      })
    );
  },
  questions_resetBucket: () => set({ questions_bucket: [] }),

  // methods: chosen
  questions_toggleChosen: (_id) =>
    set((prev) => ({
      questions_chosen: toggleItem(prev.questions_chosen, _id),
    })),
  questions_isAllChosen: () => {
    const numChosen = get().questions_chosen.length;
    return numChosen !== 0 && numChosen === get().questions_countFetched;
  },
  questions_toggleAll: () =>
    set(
      produce((prev) => {
        prev.questions_isAllChosen()
          ? (prev.questions_chosen = [])
          : (prev.questions_chosen = [...prev.questions_fetched.keys()]);
      })
    ),
  questions_chosenToBucket: () => {
    // send chosen to bucket; do not allow duplicated ID
    get().questions_setBucket([
      ...new Set([...get().questions_bucket, ...get().questions_chosen]),
    ]);
    // empty chosen
    set({ questions_chosen: [] });
  },
});
export default createQuestionsSlice;
