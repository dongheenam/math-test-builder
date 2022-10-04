import { StateCreator } from "zustand";
import produce from "immer";

import { callCreateQuestions } from "lib/proxies/callApis";
import { generateId } from "lib/util";
import {
  QuestionDoc,
  QuestionDraft,
  QuestionEditSlice,
  QuestionFormSlice,
  QuestionsSlice,
} from "types";

const createQuestionEditSlice: StateCreator<
  QuestionEditSlice & QuestionsSlice & QuestionFormSlice,
  [],
  [],
  QuestionEditSlice
> = (set, get) => ({
  // states
  questionEdit_current: undefined,

  // methods: editor
  questionEdit_toEditor: (_id) => {
    let qEditing: QuestionDraft | QuestionDoc | undefined;
    if (_id) {
      qEditing =
        // prefer local copy
        get().questions_cached.get(_id) || get().questions_fetched.get(_id);
    }
    if (!!qEditing) {
      set({ questionEdit_current: qEditing });
      return;
    }

    // new question; fetch values from the question form
    qEditing = {
      topic: get().questionForm_topic,
      yearLevel: get().questionForm_yearLevel,
      tags: [],
      text: "",
      solution: "",
      _id: generateId(4, "temp-"),
    } as QuestionDraft;
    set({ questionEdit_current: qEditing });
  },
  questionEdit_edit: (field) => (value) =>
    set(
      produce((prev: QuestionEditSlice) => {
        if (prev.questionEdit_current !== undefined) {
          prev.questionEdit_current[field] = value;
        }
      })
    ),
  questionEdit_reset: () => {
    set({ questionEdit_current: undefined });
  },

  // methods: export
  questionEdit_save: async ({ upload = false }) => {
    const qEditing = get().questionEdit_current;
    if (!qEditing) return;
    if (!upload) {
      // save a local copy
      get().questions_toCache(qEditing);
      return;
    }

    // upload to main
    const res = await callCreateQuestions(qEditing);
    const qUploaded: QuestionDoc = res.data;
    get().questions_toCache(qUploaded);
  },
});
export default createQuestionEditSlice;

// let qEditing: Question | QuestionDoc | undefined;
//     if (_id) {
//       // prefer local copy
//
//     }
//     const isNew = !!qEditing;
//     if (isNew) {
//       qEditing = {
//         tags: [],
//         text: "",
//         solution: "",
//       };
//     }
