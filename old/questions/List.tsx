import {
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Menu,
  NativeSelect,
  Text,
} from "@mantine/core";
import React from "react";
import ListQuestion from "./ListQuestion";

import styles from "./List.module.css";
import useStore from "stores/useStore";
import { SORT_DATA } from "./constants";

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
        <Group>
          <SelectControl />
        </Group>
        <Group style={{ alignItems: "baseline" }}>
          <CountText />
          <SortByForm />
        </Group>
      </Group>
    </>
  );
}

function SelectControl() {
  const chosen = useStore.use.questions_selectedIds();
  const isAllChosen = useStore.use.questions_isAllSelected();
  const toggleAll = useStore.use.questions_toggleAll();
  const toBucket = useStore.use.questions_selectedToBucket();

  const isChosenEmpty = chosen.length === 0;

  return (
    <>
      <Checkbox
        onChange={toggleAll}
        checked={isAllChosen()}
        indeterminate={!isChosenEmpty && !isAllChosen()}
        style={{ maxWidth: "40px" }}
      />
      <Text color="dimmed" size="sm">
        {chosen.length} selected
      </Text>
      <Button
        variant="outline"
        onClick={() => toBucket()}
        disabled={isChosenEmpty}
      >
        Add to bucket
      </Button>
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
  const orderBy = useStore.use.questionForm_orderBy();
  const setOrderBy = useStore.use.questionForm_set()("questionForm_orderBy");
  const fetchQuestions = useStore.use.questions_fetch();
  return (
    <NativeSelect
      size="sm"
      placeholder="Sort by"
      data={SORT_DATA}
      value={orderBy}
      onChange={(e) => {
        const value = e.currentTarget.value;
        setOrderBy(value);
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
          <ListQuestion question={q} />
        </React.Fragment>
      ))}
    </div>
  );
}
