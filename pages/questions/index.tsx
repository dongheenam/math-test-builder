import { Title, Stack } from "@mantine/core";
import { getQuestionsLayout } from "components/layouts";
import QuestionsList from "components/questions/List";
import QuestionsSearch from "components/questions/Search";

const Questions = () => {
  return (
    <Stack spacing="md">
      <Title order={1}>Browse Questions</Title>
      <QuestionsSearch />
      <QuestionsList />
    </Stack>
  );
};
Questions.getLayout = getQuestionsLayout;
export default Questions;
