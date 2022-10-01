import { ActionIcon, Badge, Checkbox, Group, Stack, Text } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons";
import React from "react";
import { TOPIC_COLORS } from "types";

const QuestionBox = ({
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
}) => {
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
};
export default QuestionBox;
