import create from "zustand";
import produce from "immer";

import { createSelectors } from "common/utils";
import { YEAR_LEVELS } from "./constants";
import { Topic } from "./types";

export type QuestionsState = {
  searchQuery: {
    year: typeof YEAR_LEVELS[number] | "";
    topic: Topic | "";
    tags: string[];
    content: string;
    orderBy: string;
    take: number;
  };

  setQuery: <Key extends keyof QuestionsState["searchQuery"]>(
    field: Key
  ) => (value: QuestionsState["searchQuery"][Key]) => void;
};

const INITIAL_QUERY: Omit<QuestionsState["searchQuery"], "orderBy" | "take"> = {
  year: "",
  topic: "",
  tags: [],
  content: "",
};

const storeBase = create<QuestionsState>()((set, get) => ({
  searchQuery: {
    ...INITIAL_QUERY,
    orderBy: "-updatedAt",
    take: 10,
  },
  setQuery: (field) => (value) =>
    set(
      produce((prev) => {
        prev.searchQuery[field] = value;
      })
    ),
}));

const useStore = createSelectors(storeBase);
export default useStore;
