import { QuestionDraft, QuestionFetched, Topic } from "./";

/* questionsSlice */
interface QuestionsStates {
  questions_fetched: Map<string, QuestionFetched>;
  questions_cached: Map<string, QuestionDraft | QuestionFetched>;
  questions_bucket: string[];
  questions_chosen: string[];
  questions_countQueried: number;
  questions_countFetched: number;
}
interface QuestionsActions {
  questions_fetch: ({ append }: { append: boolean }) => Promise<void>;
  questions_idToCache: (input: string | string[]) => void;
  questions_toCache: (question: QuestionDraft | QuestionFetched) => void;
  questions_toggleBucket: (id: string) => void;
  questions_setBucket: (newBucket: string[]) => void;
  questions_resetBucket: () => void;
  questions_toggleChosen: (id: string) => void;
  questions_isAllChosen: () => boolean;
  questions_toggleAll: () => void;
  questions_chosenToBucket: () => void;
}
export type QuestionsSlice = QuestionsStates & QuestionsActions;

/* questionFormSlice */
export const SORT_DATA = [
  { value: "-updatedAt", label: "newest first" },
  { value: "updatedAt", label: "oldest first" },
];
export const MATCH_TYPE_DATA = ["any", "all"];
interface QuestionFormStates {
  questionForm_yearLevel: string;
  questionForm_topic: Topic | "";
  questionForm_tags: Set<string>;
  questionForm_content: string;
  questionForm_tagMatch: "any" | "all";
  questionForm_orderBy: string;
  questionForm_take: number;
}
interface QuestionFormActions {
  questionForm_set: <Key extends keyof QuestionFormStates>(
    field: Key
  ) => (value: QuestionFormStates[Key]) => void;
  questionForm_addTag: (newTag: string) => void;
  questionForm_reset: () => void;
}
export type QuestionFormSlice = QuestionFormStates & QuestionFormActions;

/* questionEditSlice */
interface QuestionEditStates {
  questionEdit_current: QuestionDraft | QuestionFetched | undefined;
}
interface QuestionEditActions {
  questionEdit_toEditor: (_id?: string) => void;
  questionEdit_edit: <Key extends keyof QuestionFetched>(
    field: Key
  ) => (value: QuestionFetched[Key]) => void;
  questionEdit_save: ({ upload }: { upload: boolean }) => Promise<void>;
  questionEdit_reset: () => void;
}
export type QuestionEditSlice = QuestionEditStates & QuestionEditActions;
