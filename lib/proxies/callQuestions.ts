import { toQuery } from "lib/util";
import {
  CreateQuestionData,
  CreateQuestionQuery,
  EditQuestionQuery,
  GetQuestionsData,
  GetQuestionsQuery,
} from "types";

type HTTP_METHOD =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";
export interface ApiCallResult {
  status: string;
  error?: string;
  data: any;
}

/** boilerplate for calling an API */
async function callApi(
  URL: string,
  method: HTTP_METHOD,
  { headers, body }: { headers?: HeadersInit; body?: BodyInit }
) {
  const res = await fetch(URL, {
    method: method,
    headers: headers,
    body: body,
  });
  const data = (await res.json()) as ApiCallResult;
  if (!res.ok || data.status !== "ok" || data.error !== undefined) {
    throw new Error(`Response was not OK. Received: ${JSON.stringify(data)}`);
  }
  return data.data;
}

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
