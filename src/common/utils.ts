import { UseBoundStore, StoreApi } from "zustand";

/** parse object into a URLSearchParams instance */
export function toSearchParams<
  K extends string | number | symbol,
  V extends any
>(options: Record<K, V>) {
  let params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    if (!value) {
      continue;
    } else if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else {
      params.append(key, (value as any).toString());
    }
  }
  return params;
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
  url: string,
  method: HTTP_METHOD,
  { headers, body }: { headers?: HeadersInit; body?: BodyInit }
) {
  const res = await fetch(url, {
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

/** selector generator for Zustand
 *  ref: https://github.com/pmndrs/zustand/blob/main/docs/guides/auto-generating-selectors.md
 */
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;
export const createSelectors = <S extends UseBoundStore<StoreApi<any>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
