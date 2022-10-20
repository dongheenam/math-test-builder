import { useQuery } from "@tanstack/react-query";

import useStore, { QuestionsState } from "questions/stores";
import { toSearchParams, callApi } from "common/utils";
import type { GetQuestionsData } from "server/questions/types";

export function fetchQuestions(searchQuery: QuestionsState["searchQuery"]) {
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
