import {
  Card,
  Checkbox,
  Divider,
  Group,
  NativeSelect,
  Text,
} from "@mantine/core";
import React from "react";

import { TOPICS } from "types";
import QuestionBox from "./QuestionBox";

import styles from "./List.module.css";

const questions = [
  {
    id: 1,
    topic: TOPICS.NUM,
    yearLevel: 8,
    text: "What is 3 plus 5?",
    tags: ["arithmetic", "add"],
    solution: "8",
  },
  {
    id: 2,
    topic: TOPICS.NUM,
    yearLevel: 8,
    text: "What is 8 minus -2?",
    tags: ["arithmetic", "integer", "subtract"],
    solution: "10",
  },
  {
    id: 3,
    topic: TOPICS.STAT,
    yearLevel: 8,
    text: "What is the mean of 2, 3, 5, and 7?",
    tags: ["mean", "find"],
    solution: "The mean is 4.",
  },
];

const QuestionsList = () => {
  return (
    <div>
      <Card withBorder radius="sm" p="md">
        <Card.Section>
          <ListControl />
        </Card.Section>
        {questions.map((q, idx) => (
          <React.Fragment key={q.id}>
            {idx > 0 && <Divider my="sm" />}
            <QuestionBox q={q} />
          </React.Fragment>
        ))}
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
          <Text align="right" color="dimmed" size="sm">
            showing 3 results
          </Text>
          <NativeSelect
            size="sm"
            placeholder="Sort by"
            data={["newest first", "oldest first"]}
          />
        </Group>
      </Group>
    </>
  );
}
