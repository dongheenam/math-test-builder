import { toQuery } from "lib/util";

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
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Response was not OK. Received: ${JSON.stringify(data)}`);
  }
  return data as ApiCallResult;
}

export async function callGetQuestions(
  query: Record<string | number | symbol, any>
) {
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
  });
}

export async function callCreateQuestions(
  query: Record<string | number | symbol, any>
) {
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
  });
}
export async function callEditQuestions(
  query: Record<string | number | symbol, any>
) {
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
  });
}
