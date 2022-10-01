import { QuestionDoc, TOPICS } from "./";

export interface QFormState {
  qForm: {
    yearLevel: "7" | "8" | "9" | "10" | "11" | "12" | "";
    // topic: typeof valueof TOPICS
    topic: typeof TOPICS[keyof typeof TOPICS] | "";
    tags: string[];
    text: string;
    matchType: "any" | "all";
    sort: string;
    limit: number;
  };
}
export interface QFormSlice extends QFormState {
  /* methods */
  setQForm: <Key extends keyof QFormState["qForm"]>(
    field: Key
  ) => (value: QFormState["qForm"][Key]) => void;
  addTag: (newTag: string) => void;
  resetQForm: () => void;
}

export interface QuestionsState {
  questions: QuestionDoc[];
  qCount: number;
  qCountFetched: number;
}
export interface QuestionsSlice extends QuestionsState {
  /* methods */
  fetchQuestions: ({ append }: { append: boolean }) => Promise<void>;
}
