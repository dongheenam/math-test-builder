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
import { QuestionFetched, TOPIC_VALUES, TOPIC_COLORS, Topic } from "types";

const ListQuestion = ({ question }: { question: QuestionFetched }) => {
  const { topic, yearLevel, tags, content, id } = question;

  return (
    <Group style={{ alignItems: "flex-start" }}>
      <ChooseCheckbox id={id} />
      <Stack style={{ flex: 1 }}>
        <Badges topic={topic} yearLevel={yearLevel} tags={tags} />
        <Text>{content}</Text>
      </Stack>
      <Group spacing={0} mt={-4}>
        <BucketButton id={id} />
        <EditButton id={id} />
      </Group>
    </Group>
  );
};
export default ListQuestion;

function Badges({
  topic,
  yearLevel,
  tags,
}: {
  topic: Topic;
  yearLevel: number;
  tags: string[];
}) {
  return (
    <Group spacing={0}>
      <Badge radius="xs" color="dark" px={4}>
        {yearLevel}
      </Badge>
      <Badge radius="xs" mr="xs" color={TOPIC_COLORS[topic]}>
        {TOPIC_VALUES[topic]}
      </Badge>
      {tags?.map((tag, idx) => (
        <Badge color="gray" key={idx} style={{ textTransform: "lowercase" }}>
          {tag}
        </Badge>
      ))}
    </Group>
  );
}

function ChooseCheckbox({ id }: { id: string }) {
  const chosen = useStore.use.questions_selectedIds();
  const toggleChosen = useStore.use.questions_toggleSelected();
  return (
    <Checkbox checked={chosen.includes(id)} onChange={() => toggleChosen(id)} />
  );
}

function BucketButton({ id }: { id: string }) {
  const bucket = useStore.use.questions_bucketedIds();
  const toggleBucket = useStore.use.questions_toggleBucket();

  return bucket.includes(id) ? (
    <Tooltip label="Remove from bucket">
      <ActionIcon onClick={() => toggleBucket(id)}>
        <IconMinus stroke={1} />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip label="Add to bucket">
      <ActionIcon onClick={() => toggleBucket(id)}>
        <IconPlus stroke={1} />
      </ActionIcon>
    </Tooltip>
  );
}

function EditButton({ id }: { id: string }) {
  const toEdit = useStore.use.questionEdit_toEdit();

  return (
    <Tooltip label="Edit question">
      <ActionIcon onClick={() => toEdit(id)}>
        <IconEdit stroke={1} />
      </ActionIcon>
    </Tooltip>
  );
}
