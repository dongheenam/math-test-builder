import { StateCreator } from "zustand";
import produce, { enableMapSet } from "immer";
enableMapSet();

import {
  callCreateQuestion,
  callEditQuestion,
} from "lib/proxies/callQuestions";
import { draftToFetched, fetchedToDraft, generateId } from "lib/util";
import {
  QuestionFetched,
  QuestionDraft,
  QuestionEditSlice,
  QuestionFormSlice,
  QuestionsSlice,
} from "types";

const INITIAL_EDIT_STATE: Pick<
  QuestionEditSlice,
  | "questionEdit_id"
  | "questionEdit_topic"
  | "questionEdit_yearLevel"
  | "questionEdit_tags"
  | "questionEdit_content"
  | "questionEdit_solution"
  | "questionEdit_isDirty"
> = {
  questionEdit_id: "",
  questionEdit_topic: "",
  questionEdit_yearLevel: "",
  questionEdit_tags: new Set(),
  questionEdit_content: "",
  questionEdit_solution: "",
  questionEdit_isDirty: false,
};

const createQuestionEditSlice: StateCreator<
  QuestionEditSlice & QuestionsSlice & QuestionFormSlice,
  [],
  [],
  QuestionEditSlice
> = (set, get) => ({
  // states
  ...INITIAL_EDIT_STATE,
  questionEdit_isOpen: false,

  // methods: modal
  questionEdit_open: () => set({ questionEdit_isOpen: true }),
  questionEdit_close: () => {
    if (!get().questionEdit_isDirty || confirm("Confirm leave before saving")) {
      set({
        ...INITIAL_EDIT_STATE,
        questionEdit_isOpen: false,
      });
    }
  },

  // methods: editor
  questionEdit_reset: () => {
    if (!get().questionEdit_isDirty || confirm("Clear all fields?")) {
      set({
        ...INITIAL_EDIT_STATE,
      });
    }
  },
  questionEdit_toEdit: (id) => {
    let fetched: QuestionFetched | undefined;
    let draft: QuestionDraft;
    if (id) {
      // prefer local copy
      fetched =
        get().questions_cache.get(id) || get().questions_fetched.get(id);
    }
    if (fetched !== undefined) {
      draft = fetchedToDraft(fetched);
    } else {
      // new question; fetch values from the question form
      draft = {
        topic: get().questionForm_topic,
        yearLevel: get().questionForm_yearLevel,
        tags: get().questionForm_tags,
        content: "",
        solution: "",
        id: generateId(4, "temp-"),
      };
    }
    set({
      questionEdit_isOpen: true,
      questionEdit_isDirty: false,
      questionEdit_id: draft.id,
      questionEdit_yearLevel: draft.yearLevel,
      questionEdit_topic: draft.topic,
      questionEdit_tags: draft.tags,
      questionEdit_content: draft.content,
      questionEdit_solution: draft.solution,
    });
  },
  questionEdit_setEdit: (field) => (value) =>
    set({ [field]: value, questionEdit_isDirty: true }),
  questionEdit_addTag: (newTag) =>
    set(
      produce((draft: QuestionEditSlice) => {
        const tags = draft.questionEdit_tags;
        draft.questionEdit_tags = new Set(tags).add(newTag);
      })
    ),

  // methods: export
  questionEdit_save: async ({ upload = false }) => {
    const draft: QuestionDraft = {
      id: get().questionEdit_id,
      yearLevel: get().questionEdit_yearLevel,
      topic: get().questionEdit_topic,
      tags: get().questionEdit_tags,
      content: get().questionEdit_content,
      solution: get().questionEdit_solution,
    };
    // clears out falsy values
    const toFetch = draftToFetched(draft);
    if (
      ["yearLevel", "topic", "content", "solution"].some(
        (key) => !Object.hasOwn(toFetch, key)
      )
    ) {
      throw new Error("Some mandatory fields are missing!");
    }

    if (!upload) {
      // save a local copy
      get().questions_addCache(toFetch);
      set({ questionEdit_isDirty: false });
      return;
    }

    // upload to main
    let qUploaded: QuestionFetched;
    const isTemp = toFetch.id.substring(0, 4) === "temp";
    if (isTemp) {
      qUploaded = await callCreateQuestion(toFetch);
    } else {
      qUploaded = await callEditQuestion(toFetch);
    }
    get().questions_addCache(qUploaded);
    set({ questionEdit_isDirty: false });
  },
});
export default createQuestionEditSlice;
