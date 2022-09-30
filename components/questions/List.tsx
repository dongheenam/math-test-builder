import {
  ActionIcon,
  Badge,
  Card,
  Checkbox,
  Divider,
  Group,
  NativeSelect,
  Stack,
  Text,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons";
import React from "react";
import { TOPICS, TOPIC_COLORS } from "types";

import styles from "./List.module.css";

const questions = [
  {
    id: 1,
    topic: TOPICS.NUM,
    yearLevel: 8,
    text: "What is 3 plus 5?",
    tags: ["arithmetic"],
    solution: "8",
  },
  {
    id: 2,
    topic: TOPICS.NUM,
    yearLevel: 8,
    text: "What is 8 minus -2?",
    tags: ["arithmetic", "integer"],
    solution: "10",
  },
  {
    id: 3,
    topic: TOPICS.STAT,
    yearLevel: 8,
    text: "What is the mean of 2, 3, 5, and 7?",
    tags: ["mean"],
    solution: "The mean is 4.",
  },
];

const QuestionsList = () => {
  return (
    <div>
      <Text align="right" color="dimmed" size="sm">
        showing 0 results
      </Text>
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
        <NativeSelect
          size="sm"
          placeholder="Sort by"
          data={["newest first", "oldest first"]}
        />
      </Group>
    </>
  );
}

function QuestionBox({
  q,
}: {
  q: {
    id: number;
    topic: string;
    yearLevel: number;
    text: string;
    tags: string[];
    solution: string;
  };
}) {
  return (
    <Group style={{ alignItems: "flex-start" }}>
      <Checkbox />
      <Stack style={{ flex: 1 }}>
        <Group spacing={0}>
          <Badge radius="xs" color="dark" px={4}>
            {q.yearLevel}
          </Badge>
          <Badge radius="xs" mr="xs" color={TOPIC_COLORS[q.topic]}>
            {q.topic}
          </Badge>
          {q.tags.map((t, idx) => (
            <Badge
              color="gray"
              key={idx}
              style={{ textTransform: "lowercase" }}
            >
              {t}
            </Badge>
          ))}
        </Group>
        <Text>{q.text}</Text>
      </Stack>
      <Group spacing={0} mt={-4}>
        <ActionIcon>
          <IconPlus stroke={1} />
        </ActionIcon>
        <ActionIcon>
          <IconEdit stroke={1} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
