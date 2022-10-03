import { QuestionDoc, Topic } from "./";

/* questionFormSlice */
export const SORT_DATA = [
  { value: "-updatedAt", label: "newest first" },
  { value: "+updatedAt", label: "oldest first" },
];
export const MATCH_TYPE_DATA = ["any", "all"];
export interface QuestionFormState {
  questionForm_yearLevel: "7" | "8" | "9" | "10" | "11" | "12" | "";
  questionForm_topic: Topic | "";
  questionForm_tags: Set<string>;
  questionForm_text: string;
  questionForm_matchType: "any" | "all";
  questionForm_sortBy: string;
  questionForm_limit: number;
  questionForm_skip: number;
}
export interface QuestionFormSlice extends QuestionFormState {
  /* methods */
  questionForm_set: <Key extends keyof QuestionFormSlice>(
    field: Key
  ) => (value: QuestionFormSlice[Key]) => void;
  questionForm_addTag: (newTag: string) => void;
  questionForm_reset: () => void;
}

/* questionsSlice */
export interface QuestionsState {
  questions_fetched: Map<string, QuestionDoc>;
  questions_cached: Map<string, QuestionDoc>;
  questions_bucket: string[];
  questions_chosen: string[];
  questions_countQueried: number;
  questions_countFetched: number;
}
export interface QuestionsSlice extends QuestionsState {
  /* methods */
  questions_fetch: ({ append }: { append: boolean }) => Promise<void>;
  questions_toCache: (_id: string | string[]) => void;
  questions_toggleBucket: (_id: string) => void;
  questions_setBucket: (newBucket: string[]) => void;
  questions_resetBucket: () => void;
  questions_toggleChosen: (_id: string) => void;
  questions_isAllChosen: () => boolean;
  questions_toggleAll: () => void;
  questions_chosenToBucket: () => void;
}
