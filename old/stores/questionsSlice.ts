import { StateCreator } from "zustand";
import produce, { enableMapSet } from "immer";
enableMapSet();

import { removeFalsyValues, toggleItem } from "./utils";
import { callGetQuestions } from "questions/callApi";
import { QuestionFetched } from "questions/types";
import { QuestionsSlice, QuestionFormSlice } from "./types";

const createQuestionsSlice: StateCreator<
  QuestionsSlice & QuestionFormSlice,
  [],
  [],
  QuestionsSlice
> = (set, get) => ({
  // states
  questions_fetched: new Map(),
  questions_cache: new Map(),
  questions_countQueried: 0,
  questions_countFetched: 0,
  questions_bucketedIds: [],
  questions_selectedIds: [],

  // methods: questions
  questions_fetch: async ({ append = false }) => {
    const res = await callGetQuestions(
      removeFalsyValues({
        topic: get().questionForm_topic,
        yearLevel: parseFloat(get().questionForm_yearLevel),
        tags: [...get().questionForm_tags], // Set => Array
        content: get().questionForm_content,
        tagMatch: get().questionForm_tagMatch,
        orderBy: get().questionForm_orderBy,
        take: get().questionForm_take,
      })
    );
    if (res.questions === undefined) return;
    const { questions, count } = res;
    const newQs: QuestionsSlice["questions_fetched"] = new Map(
      questions.map((q) => [q.id, q])
    );

    set(
      produce((prev: QuestionsSlice) => {
        if (count !== undefined) prev.questions_countQueried = count;
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
  questions_addCache: (input) => {
    const questions = Array.isArray(input) ? input : [input];
    if (questions.some((q) => q.id === undefined)) {
      throw new ReferenceError("id does not exist in the question!");
    }
    const qEntries = questions.map(
      (q) => [q.id, q] as [string, QuestionFetched]
    );
    set((prev) => ({
      questions_cache: new Map([...prev.questions_cache, ...qEntries]),
    }));
  },
  questions_addCacheById: (input) => {
    const ids = Array.isArray(input) ? input : [input];
    const fetched = get().questions_fetched;

    get().questions_addCache(
      ids
        .map((id) => fetched.get(id))
        .filter((q) => q !== undefined) as QuestionFetched[]
    );
  },

  // methods: bucket
  questions_addBucket: (input) => {
    const ids = Array.isArray(input) ? input : [input];
    // add the questions to local cache (override)
    get().questions_addCacheById(ids);
    // do not allow duplicates in the bucket
    set((prev) => ({
      questions_bucketedIds: [
        ...new Set([...prev.questions_bucketedIds, ...ids]),
      ],
    }));
  },
  questions_removeBucket: (input) => {
    const ids = Array.isArray(input) ? input : [input];
    set((prev) => ({
      questions_bucketedIds: prev.questions_bucketedIds.filter(
        (id) => !ids.includes(id)
      ),
    }));
  },
  questions_toggleBucket: (id) => {
    const qBucket = get().questions_bucketedIds;
    const inBucket = qBucket.includes(id);
    if (inBucket) {
      get().questions_removeBucket(id);
    } else {
      get().questions_addBucket(id);
    }
  },
  questions_shuffleBucket: (newBucket) =>
    set({ questions_bucketedIds: newBucket }),
  questions_resetBucket: () => set({ questions_bucketedIds: [] }),

  // methods: chosen
  questions_toggleSelected: (_id) =>
    set((prev) => ({
      questions_selectedIds: toggleItem(prev.questions_selectedIds, _id),
    })),
  questions_isAllSelected: () => {
    const numChosen = get().questions_selectedIds.length;
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
  questions_selectedToBucket: () => {
    get().questions_addBucket(get().questions_selectedIds);
    // empty chosen
    set({ questions_selectedIds: [] });
  },
});
export default createQuestionsSlice;
