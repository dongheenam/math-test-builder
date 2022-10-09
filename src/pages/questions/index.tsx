import dynamic from "next/dynamic";
import { Title, Stack } from "@mantine/core";

import { getQuestionsLayout } from "layouts";
import { Suspense } from "react";

const QuestionsList = dynamic(() => import("questions/List"), {
  suspense: true,
});
const QuestionsSearch = dynamic(() => import("questions/Search"), {
  suspense: true,
});
const Edit = dynamic(() => import("questions/Edit"), {
  ssr: false,
});

const Questions = () => {
  return (
    <>
      <Stack spacing="md">
        <Title order={1}>Browse Questions</Title>
        <Suspense fallback={<div>Loading search panel...</div>}>
          <QuestionsSearch />
        </Suspense>
        <Suspense fallback={<div>Loading question view...</div>}>
          <QuestionsList />
        </Suspense>
      </Stack>
      <Suspense>
        <Edit />
      </Suspense>
    </>
  );
};
Questions.getLayout = getQuestionsLayout;
export default Questions;
