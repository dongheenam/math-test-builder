import { toQuery } from "lib/util";
import { QFormState } from "types/stores";

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
  try {
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
  } catch (err) {
    console.error(err);
  }
}

export async function callGetQuestions(query: QFormState["qForm"]) {
  const URL = "/api/questions?" + toQuery(query);
  return callApi(URL, "GET", {
    headers: { "Content-Type": "application/json" },
  });
}
