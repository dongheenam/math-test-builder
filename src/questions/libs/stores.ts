import create from "zustand";
import { persist } from "zustand/middleware";

import { createSelectors } from "common/utils";
import { YEAR_LEVELS } from "./constants";
import { QuestionDraft, QuestionFetched, Topic } from "./types";

export type QuestionsState = {
  // search questions
  searchQuery: {
    yearLevel: typeof YEAR_LEVELS[number] | "";
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

  // question editor
  isEditorOpen: boolean;
  questionEdited: QuestionDraft;
  editQuestion: (next: Partial<QuestionDraft>) => void;
  openEditor: (question?: QuestionFetched) => void;
  closeEditor: () => void;
};

export const INITIAL_QUERY: Omit<
  QuestionsState["searchQuery"],
  "orderBy" | "take"
> = {
  topic: "",
  yearLevel: "",
  tags: [],
  content: "",
};

export const EMPTY_QUESTION: QuestionDraft = {
  topic: "",
  yearLevel: "",
  tags: [],
  content: "",
  solution: "",
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

      isEditorOpen: false,
      questionEdited: EMPTY_QUESTION,
      editQuestion: (next) =>
        set((prev) => ({
          questionEdited: { ...prev.questionEdited, ...next },
        })),
      openEditor: (question) => {
        let questionEdited: QuestionDraft = EMPTY_QUESTION;
        if (question) {
          questionEdited = {
            ...questionEdited,
            topic: question.topic,
            yearLevel:
              question.yearLevel.toString() as QuestionDraft["yearLevel"],
            tags: question.tags,
            content: question.content,
            solution: question.solution,
          };
        }
        set({ isEditorOpen: true, questionEdited: questionEdited });
      },
      closeEditor: () =>
        set((prev) => ({
          isEditorOpen: false,
          questionEdited: EMPTY_QUESTION,
        })),
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
