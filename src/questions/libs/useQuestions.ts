import { useQuery } from "@tanstack/react-query";

import useStore from "questions/libs/stores";
import { toSearchParams, callApi } from "common/utils";
import type { GetQuestionsData } from "server/questions/types";
import { Topic } from "@prisma/client";
import { YEAR_LEVELS } from "questions/libs/constants";

export type SearchQuery = {
  yearLevel: typeof YEAR_LEVELS[number] | "";
  topic: Topic | "";
  tags: string[];
  content: string;
  orderBy: string;
  take: number;
};

export function fetchQuestions(searchQuery: SearchQuery) {
  const params = toSearchParams(searchQuery);
  const url = "/api/questions?" + params.toString();

  return callApi(url, "GET", {
    headers: { "Content-Type": "application/json" },
  }) as Promise<GetQuestionsData>;
}

export default function useQuestions() {
  const searchQuery = useStore.use.searchQuery();

  return useQuery(["questions", searchQuery], () =>
    fetchQuestions(searchQuery)
  );
}
