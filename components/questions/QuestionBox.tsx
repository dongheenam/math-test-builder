import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconPlus, IconMinus } from "@tabler/icons";
import useStore from "components/stores/useStore";
import React, { useCallback } from "react";
import { QuestionDoc, TOPIC_COLORS } from "types";

const QuestionBox = ({ question }: { question: QuestionDoc }) => {
  const { topic, yearLevel, tags, text, _id } = question;

  return (
    <Group style={{ alignItems: "flex-start" }}>
      <Checkbox />
      <Stack style={{ flex: 1 }}>
        <Group spacing={0}>
          <Badge radius="xs" color="dark" px={4}>
            {yearLevel}
          </Badge>
          <Badge radius="xs" mr="xs" color={TOPIC_COLORS[topic]}>
            {topic}
          </Badge>
          {tags?.map((tag, idx) => (
            <Badge
              color="gray"
              key={idx}
              style={{ textTransform: "lowercase" }}
            >
              {tag}
            </Badge>
          ))}
        </Group>
        <Text>{text}</Text>
      </Stack>
      <Group spacing={0} mt={-4}>
        <BucketButton _id={_id} />
        <Tooltip label="Edit question">
          <ActionIcon>
            <IconEdit stroke={1} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};
export default QuestionBox;

function BucketButton({ _id }: { _id: string }) {
  const bucket = useStore.use.questions_bucket();
  const toggleBucket = useStore.use.questions_toggleBucket();

  return bucket.includes(_id) ? (
    <Tooltip label="Remove from bucket">
      <ActionIcon onClick={() => toggleBucket(_id)}>
        <IconMinus stroke={1} />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip label="Add to bucket">
      <ActionIcon onClick={() => toggleBucket(_id)}>
        <IconPlus stroke={1} />
      </ActionIcon>
    </Tooltip>
  );
}
