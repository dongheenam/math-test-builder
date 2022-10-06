import pluralize from "pluralize";
import { QuestionDraft, QuestionFetched, QuestionRaw } from "types";
import { StoreApi, UseBoundStore } from "zustand";

type Key = string | number | symbol;

/**
 * JAVASCRIPT HELPERS - ARRAYS AND OBJECTS
 */

/** toggle an item in an array */
export function toggleItem<T>(array: T[], item: T) {
  let newArray = [...array];
  newArray.includes(item)
    ? (newArray = newArray.filter((elem) => elem !== item))
    : newArray.push(item);
  return newArray;
}

/** return the first object if the input is an array */
type NestedArray<T> = Array<T> | Array<NestedArray<T>>;
export function stripArray<T>(maybeArray: T | NestedArray<T>): T {
  if (Array.isArray(maybeArray)) return maybeArray.flat(1)[0] as T;
  else return maybeArray;
}

/** returns if the input is an object
 *  ref: https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
 */
export function isObject(input: any) {
  return input === Object(input);
}

/**
 * check if an iterable (array, object, ...) is empty
 * caution: isEmpty(new Date()) returns true */
export function isEmpty(
  iterable: any[] | Record<Key, any> | Iterable<any>
): boolean {
  for (let key in iterable) return false;
  return true;
}

/** from objects to maps */
export function toMap<K extends Key, V>(obj: Record<K, V>): Map<K, V> {
  return new Map(Object.entries(obj) as Array<[K, V]>);
}

/** from maps to objects */
export function fromMap<K extends Key, V>(map: Map<K, V>): Record<K, V> {
  return Object.fromEntries([...map]) as Record<K, V>;
}

/** get the value of an object from a path string
 *  getPath(obj, "data.targets[0].value") returns obj.data.targets[0].value
 *  ref: https://www.30secondsofcode.org/js/s/get
 */
export function getFrom(from: Object, path: string) {
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
 * CALLING/RECEIVING API REQUESTS
 */

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
  if (!isNaN(Number(val))) {
    return Number(val);
  }

  // value is a string
  return val;
}

/** remove the property in an object if its value is falsy
 *  specify the specific keys to ignore
 */
type Falsy = false | 0 | "" | null | undefined;
const isTruthy = <T>(x: T | Falsy): x is T => !!x;

export function removeFalsyValues<T extends object>(input: {
  [K in keyof T]: T[K] | Falsy;
}): T {
  let result = { ...input };
  // seems Typescript cannot cast types through Object.entries() yet
  for (const key in result) {
    const value = result[key];
    if (!isTruthy(value)) {
      delete result[key];
    }
  }
  return result as T;
}

/** parseFloat the input if defined */
export function parseFloatIfDefined(input: any) {
  if (input === undefined) return;
  const parsed = Number(input);
  if (!isNaN(parsed)) return parsed;
}

/** by default, query parameters are parsed as string or string[]
 *  this function forces the tags parameter to be string[]
 */
export function handleTagsQuery(
  tags: string | string[] | undefined
): string[] | undefined {
  if (tags === undefined) return;
  let tagArray = Array.isArray(tags) ? tags : [tags];

  // force singular form for the tags
  return tagArray.map((tag) => pluralize(tag, 1));
}

/** generates Prisma orderBy option from a string
 *  e.g. parseOrderBy("-updatedAt") returns { updatedAt: "desc" } and
 *       parseOrderBy("topic") returns { topic: "asc" }
 */
export function parseOrderBy<Model extends Record<string, any>>(str: string) {
  let field: keyof Model;
  let direction: "asc" | "desc";

  if (str.substring(0, 1) === "-") {
    field = str.substring(1);
    direction = "desc";
  } else {
    field = str;
    direction = "asc";
  }
  return { [field]: direction } as { [x in keyof Model]?: "asc" | "desc" };
}

/**
 * APP-SPECIFIC UTILS
 */
/** tags query */
export const includeTagsQuery = {
  include: {
    tags: { select: { name: true } },
  },
};
export function createTagsQuery(tags: string[]) {
  return {
    tags: {
      connectOrCreate: tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      })),
    },
  };
}

/** converts between QuestionRaw, QuestionDraft, QuestionFetched */
export function draftToFetched(draft: QuestionDraft): QuestionFetched {
  // draft may contain empty values
  const cleaned = removeFalsyValues({
    ...draft,
    yearLevel: parseFloatIfDefined(draft.yearLevel),
    tags: [...draft.tags],
  });
  return cleaned as QuestionFetched;
}
export function fetchedToDraft(fetched: QuestionFetched): QuestionDraft {
  return {
    ...fetched,
    yearLevel: fetched.yearLevel.toString(),
    tags: new Set(fetched.tags),
  } as QuestionDraft;
}
export function rawToFetched(raw: QuestionRaw): QuestionFetched {
  return {
    ...raw,
    tags: raw.tags.map((tag) => tag.name),
  } as QuestionFetched;
}

/**
 * MISC
 */

/** creates a pseudo-random ID. Cannot guarantee uniqueness
 *  but should be good enough for simple situations
 *  ref: https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript/
 * */
export function generateId(length: number = 4, prefix: string = "") {
  if (length < 0 || length > 100) throw new RangeError("length out of range!");

  let id = prefix;
  for (let i = 0; i < length; i++) {
    id += s4();
  }
  return id;
}
// returns a random string from "0000" to "ffff"
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * FOR THIRD PARTY LIBRARIES
 */

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
