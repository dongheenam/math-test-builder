import create from "zustand";
import produce from "immer";

import { createSelectors } from "common/utils";
import { YEAR_LEVELS } from "./constants";
import { Topic } from "./types";

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
  bucket: string[];
  setBucket: (next: string[]) => void;
  addToBucket: (items: string[]) => void;
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

const storeBase = create<QuestionsState>()((set) => ({
  searchQuery: {
    ...INITIAL_QUERY,
    orderBy: "-updatedAt",
    take: 10,
  },
  setSearchQuery: (next) =>
    set((prev) => ({ searchQuery: { ...prev.searchQuery, ...next } })),

  bucket: [],
  setBucket: (next) => set({ bucket: next }),
  addToBucket: (items) =>
    set((prev) => ({ bucket: [...new Set([...prev.bucket, ...items])] })),
  emptyBucket: () => set({ bucket: [] }),
}));

const useStore = createSelectors(storeBase);
export default useStore;
