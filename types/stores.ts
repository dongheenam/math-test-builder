import { GetQuestionsQuery, QuestionDraft, QuestionFetched, Topic } from "./";

/* questionsSlice */
interface QuestionsStates {
  questions_fetched: Map<string, QuestionFetched>;
  questions_cache: Map<string, QuestionFetched>;
  questions_bucketedIds: string[];
  questions_selectedIds: string[];
  questions_countQueried: number;
  questions_countFetched: number;
}
interface QuestionsActions {
  questions_fetch: ({ append }: { append: boolean }) => Promise<void>;
  questions_addCache: (input: QuestionFetched | QuestionFetched[]) => void;
  questions_addCacheById: (input: string | string[]) => void;
  questions_addBucket: (input: string | string[]) => void;
  questions_removeBucket: (input: string | string[]) => void;
  questions_toggleBucket: (id: string) => void;
  // needed for drag-and-drop feature
  questions_shuffleBucket: (newBucket: string[]) => void;
  questions_resetBucket: () => void;
  questions_toggleSelected: (id: string) => void;
  questions_isAllSelected: () => boolean;
  questions_toggleAll: () => void;
  questions_selectedToBucket: () => void;
}
export type QuestionsSlice = QuestionsStates & QuestionsActions;

/* questionFormSlice */
export const SORT_DATA = [
  { value: "-updatedAt", label: "newest first" },
  { value: "updatedAt", label: "oldest first" },
];
export const MATCH_TYPE_DATA = ["any", "all"] as const;
interface QuestionFormStates {
  questionForm_yearLevel: QuestionDraft["yearLevel"];
  questionForm_topic: QuestionDraft["topic"];
  questionForm_tags: QuestionDraft["tags"];
  questionForm_content: QuestionDraft["content"];
  questionForm_tagMatch: GetQuestionsQuery["tagMatch"];
  questionForm_orderBy: GetQuestionsQuery["orderBy"];
  questionForm_take: GetQuestionsQuery["take"];
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
  questionEdit_id: QuestionDraft["id"];
  questionEdit_yearLevel: QuestionDraft["yearLevel"];
  questionEdit_topic: QuestionDraft["topic"];
  questionEdit_tags: QuestionDraft["tags"];
  questionEdit_content: QuestionDraft["content"];
  questionEdit_solution: QuestionDraft["solution"];
}
interface QuestionEditActions {
  questionEdit_toEdit: (id?: string) => void;
  questionEdit_set: <Key extends keyof QuestionEditStates>(
    field: Key
  ) => (value: QuestionEditStates[Key]) => void;
  questionEdit_save: ({ upload }: { upload: boolean }) => Promise<void>;
  questionEdit_reset: () => void;
}
export type QuestionEditSlice = QuestionEditStates & QuestionEditActions;
