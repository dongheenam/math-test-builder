/** objects to query strings */
export function toQuery(obj: Object) {
  const params = new URLSearchParams();
  for (let [key, value] of Object.entries(obj)) {
    // if the value is falsy, skip the key
    if (!value) continue;

    if (Array.isArray(value)) {
      // if the value is an array, we need multiple params with the same key
      value.map((e) => params.append(key, e));
    } else {
      params.append(key, value);
    }
  }
  return params.toString();
}

export type HTTP_METHOD =
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
export async function callApi(
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
