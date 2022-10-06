import dynamic from "next/dynamic";
import { Title, Stack } from "@mantine/core";

import { getQuestionsLayout } from "components/layouts";
import QuestionsSearch from "components/questions/Search";
import { Suspense } from "react";

const QuestionsList = dynamic(() => import("components/questions/List"), {
  suspense: true,
});
const EditContainer = dynamic(
  () => import("components/questions/EditContainer"),
  { ssr: false }
);

const Questions = () => {
  return (
    <>
      <Stack spacing="md">
        <Title order={1}>Browse Questions</Title>
        <QuestionsSearch />
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </Stack>
      <EditContainer />
    </>
  );
};
Questions.getLayout = getQuestionsLayout;
export default Questions;
