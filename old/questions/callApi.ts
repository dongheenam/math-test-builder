import { toQuery } from "common/utils";
import {
  CreateQuestionData,
  CreateQuestionQuery,
  EditQuestionQuery,
  GetQuestionsData,
  GetQuestionsQuery,
} from "server/questions/types";
import { callApi } from "common/utils";

export async function callGetQuestions(query: GetQuestionsQuery) {
  const parsedQuery = {
    topic: query.topic,
    yearLevel: query.yearLevel,
    tags: query.tags,
    content: query.content,
    tagMatch: query.tagMatch,
    orderBy: query.orderBy,
    take: query.take,
  };
  const URL = "/api/questions?" + toQuery(parsedQuery);
  return callApi(URL, "GET", {
    headers: { "Content-Type": "application/json" },
  }) as Promise<GetQuestionsData>;
}

export async function callCreateQuestion(query: CreateQuestionQuery) {
  const URL = "/api/questions";
  return callApi(URL, "POST", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: query.topic,
      yearLevel: query.yearLevel,
      tags: query.tags,
      content: query.content,
      solution: query.solution,
    }),
  }) as Promise<CreateQuestionData>;
}
export async function callEditQuestion(query: EditQuestionQuery) {
  const URL = `/api/questions/${query.id}`;
  return callApi(URL, "PATCH", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: query.topic,
      yearLevel: query.yearLevel,
      tags: query.tags,
      content: query.content,
      solution: query.solution,
    }),
  }) as Promise<CreateQuestionData>;
}
