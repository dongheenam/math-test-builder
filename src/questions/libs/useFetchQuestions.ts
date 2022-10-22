import { useQuery } from "@tanstack/react-query";

import useStore from "questions/stores";
import { toSearchParams, callApi } from "common/utils";
import type { GetQuestionsData } from "server/questions/types";
import { Topic } from "@prisma/client";
import { YEAR_LEVELS } from "questions/constants";

export type SearchQuery = {
  year: typeof YEAR_LEVELS[number] | "";
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

export default function useFetchQuestions() {
  const searchQuery = useStore.use.searchQuery();

  return useQuery(["questions", searchQuery], () =>
    fetchQuestions(searchQuery)
  );
}
