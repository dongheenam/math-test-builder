import { Question, QuestionFetched } from "questions/libs/types";

/** POST /api/questions */
export type CreateQuestionQuery = Pick<
  QuestionFetched,
  "topic" | "yearLevel" | "tags" | "content" | "solution" | "authorId"
>;
export type CreateQuestionData = QuestionFetched;

/** GET /api/questions */
export type GetQuestionsQuery = Partial<
  Pick<QuestionFetched, "topic" | "yearLevel" | "content" | "authorId">
> & {
  tags?: string[];
  tagMatch?: "any" | "all";
  orderBy?: string;
  cursor?: Question["id"];
  take?: number;
  count?: boolean;
};
export type GetQuestionsData = {
  questions: QuestionFetched[];
  count?: number;
};

/** PUT /api/questions/[id] */
export type EditQuestionQuery = Pick<QuestionFetched, "id"> &
  Partial<
    Pick<
      QuestionFetched,
      "topic" | "yearLevel" | "tags" | "content" | "solution" | "authorId"
    >
  >;
