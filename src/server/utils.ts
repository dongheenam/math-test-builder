import pluralize from "pluralize";
import { QuestionFetched, QuestionRaw } from "questions/types";

/** parseFloat the input if defined */
export function parseFloatIfDefined(input: any) {
  if (input === undefined) return;
  const parsed = Number(input);
  if (!isNaN(parsed)) return parsed;
}

/** converts QuestionRaw to QuestionFetched */
export function rawToFetched(raw: QuestionRaw): QuestionFetched {
  return {
    ...raw,
    tags: raw.tags.map((tag) => tag.name),
  } as QuestionFetched;
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
