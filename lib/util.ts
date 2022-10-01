import { StoreApi, UseBoundStore } from "zustand";

/** return the first object if the input is an array */
type NestedArray<T> = Array<T> | Array<NestedArray<T>>;
export function stripArray<T>(maybeArray: T | NestedArray<T>): T {
  if (Array.isArray(maybeArray)) return maybeArray.flat(1)[0] as T;
  else return maybeArray;
}

/**
 * check if an iterable (array, object, ...) is empty
 * caution: isEmpty(new Date()) returns true */
export function isEmpty(
  iterable: any[] | Record<string | number | symbol, any> | Iterable<any>
): boolean {
  for (let key in iterable) return false;
  return true;
}

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

/** objects from query strings */
type Value = string | string[] | undefined;
export function fromQuery<K extends string>(
  query: Record<K, Value>
): Record<K, unknown> {
  let parsedQuery = { ...query };

  for (const key in parsedQuery) {
    const val = parsedQuery[key];
    if (val !== undefined) {
      parsedQuery[key] = parseVal(val);
    }
  }

  return parsedQuery;
}

function parseVal(val: Value): any {
  // empty value
  if (val === undefined) return;

  // value is an array
  if (Array.isArray(val)) {
    // empty array
    if (val.length === 0) return;

    // one element only
    if (val.length === 1) return val[0];

    // many elements
    return val.map((v: Value) => parseVal(v));
  }

  // value can be parsed as number
  if (!isNaN(parseFloat(val))) {
    return parseFloat(val);
  }

  // value is a string
  return val;
}

/**
 * get the value of an object from a path string
 * getPath(obj, "data.targets[0].value") returns obj.data.targets[0].value
 * ref: https://www.30secondsofcode.org/js/s/get
 */
export function getFromPath(from: Object, path: string) {
  return (
    path
      .replace(/\[([^\[\]]*)\]/g, ".$1.")
      .split(".")
      .filter((t) => t !== "")
      // @ts-ignore
      .reduce((prev, cur) => prev && prev[cur], from)
  );
}

/**
 * selector generator for Zustand
 * ref: https://github.com/pmndrs/zustand/blob/main/docs/guides/auto-generating-selectors.md
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
