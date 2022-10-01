import { StateCreator } from "zustand";
import produce from "immer";

import { QFormSlice } from "types/stores";

// states reset by invoking resetForm()
const INITIAL_FORM_STATE: Omit<QFormSlice["qForm"], "sort" | "limit"> = {
  yearLevel: "",
  topic: "",
  tags: [],
  text: "",
  matchType: "any",
};

// main slice
const createQuestionFormSlice: StateCreator<QFormSlice, [], [], QFormSlice> = (
  set
) => ({
  // states
  qForm: { ...INITIAL_FORM_STATE, sort: "-updatedAt", limit: 10 },

  // methods
  setQForm: (field) => (value) =>
    set(
      produce((draft) => {
        const qForm = draft.qForm;
        qForm[field] = value;
      })
    ),
  addTag: (newTag) =>
    set(
      produce((draft) => {
        draft.qForm.tags.push(newTag);
      })
    ),
  resetQForm: () =>
    set(
      produce((draft) => {
        draft.qForm = INITIAL_FORM_STATE;
      })
    ),
});
export default createQuestionFormSlice;
