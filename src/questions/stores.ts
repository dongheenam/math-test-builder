import create from "zustand";
import { persist } from "zustand/middleware";

import { createSelectors } from "common/utils";
import { YEAR_LEVELS } from "./constants";
import { QuestionFetched, Topic } from "./types";

export type QuestionsState = {
  // search questions
  searchQuery: {
    year: typeof YEAR_LEVELS[number] | "";
    topic: Topic | "";
    tags: string[];
    content: string;
    orderBy: string;
    take: number;
  };
  setSearchQuery: (next: Partial<QuestionsState["searchQuery"]>) => void;

  // question bucket
  bucket: { [id: string]: QuestionFetched };
  bucketIds: string[];
  setBucketIds: (ids: string[]) => void;
  addToBucket: (questions: QuestionFetched[]) => void;
  removeFromBucket: (id: string) => void;
  emptyBucket: () => void;
};

export const INITIAL_QUERY: Omit<
  QuestionsState["searchQuery"],
  "orderBy" | "take"
> = {
  year: "",
  topic: "",
  tags: [],
  content: "",
};

const storeBase = create<QuestionsState>()(
  persist(
    (set) => ({
      searchQuery: {
        ...INITIAL_QUERY,
        orderBy: "-updatedAt",
        take: 10,
      },
      setSearchQuery: (next) =>
        set((prev) => ({ searchQuery: { ...prev.searchQuery, ...next } })),

      bucket: {},
      bucketIds: [],
      setBucketIds: (ids) => set({ bucketIds: ids }),
      addToBucket: (questions) => {
        let newIds: string[] = [];
        let newBucket: { [key: string]: QuestionFetched } = {};
        for (const question of questions) {
          newIds.push(question.id);
          newBucket[question.id] = question;
        }
        set((prev) => ({
          bucketIds: [...new Set([...prev.bucketIds, ...newIds])],
          bucket: { ...prev.bucket, ...newBucket },
        }));
      },
      removeFromBucket: (id) =>
        set((prev) => ({
          bucketIds: prev.bucketIds.filter((item) => item !== id),
        })),
      emptyBucket: () => set({ bucketIds: [], bucket: {} }),
    }),

    // persist options
    {
      name: "math-builder",
      getStorage: () => localStorage,
      partialize: (state) => ({
        bucket: state.bucket,
        bucketIds: state.bucketIds,
      }),
    }
  )
);

const useStore = createSelectors(storeBase);
export default useStore;
