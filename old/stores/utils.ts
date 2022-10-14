import { QuestionDraft, QuestionFetched } from "questions/types";
import { parseFloatIfDefined } from "server/utils";
import { UseBoundStore, StoreApi } from "zustand";

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

/** converts between QuestionDraft and QuestionFetched */
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

/** remove the property in an object if its value is falsy */
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

/** toggle an item in an array */
export function toggleItem<T>(array: T[], item: T) {
  let newArray = [...array];
  newArray.includes(item)
    ? (newArray = newArray.filter((elem) => elem !== item))
    : newArray.push(item);
  return newArray;
}
