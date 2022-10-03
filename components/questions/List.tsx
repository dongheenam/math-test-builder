import {
  Card,
  Checkbox,
  Divider,
  Group,
  NativeSelect,
  Text,
} from "@mantine/core";
import React from "react";
import QuestionBox from "./QuestionBox";

import styles from "./List.module.css";
import useStore from "components/stores/useStore";
import { SORT_DATA } from "types";

/* main */
const QuestionsList = () => {
  return (
    <div>
      <Card withBorder radius="sm" p="md">
        <Card.Section>
          <ListControl />
        </Card.Section>
        <QuestionsContainer />
      </Card>
    </div>
  );
};
export default QuestionsList;

function ListControl() {
  return (
    <>
      <Group className={styles["list-ctrl"]}>
        <Checkbox />
        <Group style={{ alignItems: "baseline" }}>
          <CountText />
          <SortByForm />
        </Group>
      </Group>
    </>
  );
}

/* ListControl.elements */
function CountText() {
  const countQueried = useStore.use.questions_countQueried();
  const countFetched = useStore.use.questions_countFetched();
  const countText =
    countQueried === 0
      ? "no results"
      : `showing ${countFetched} of ${countQueried} results`;
  return (
    <Text align="right" color="dimmed" size="sm">
      {countText}
    </Text>
  );
}
function SortByForm() {
  const sortBy = useStore.use.questionForm_sortBy();
  const setSortBy = useStore.use.questionForm_set()("questionForm_sortBy");
  const fetchQuestions = useStore.use.questions_fetch();
  return (
    <NativeSelect
      size="sm"
      placeholder="Sort by"
      data={SORT_DATA}
      value={sortBy}
      onChange={(e) => {
        const value = e.currentTarget.value;
        setSortBy(value);
        fetchQuestions({ append: false });
      }}
    />
  );
}

function QuestionsContainer() {
  const questions = useStore.use.questions_fetched();
  return (
    <div>
      {Array.from(questions, ([_q_id, q], idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <Divider my="sm" />}
          <QuestionBox question={q} />
        </React.Fragment>
      ))}
    </div>
  );
}
