import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconEdit, IconMenu, IconMinus } from "@tabler/icons";
import useDrag, { DragHandlers } from "components/hooks/useDrag";

import useStore from "components/stores/useStore";
import { useRef } from "react";

import styles from "./Bucket.module.css";

const Bucket = () => {
  const bucket = useStore.use.questions_bucketedIds();
  const setBucket = useStore.use.questions_shuffleBucket();
  const dragHandlers = useDrag(bucket, setBucket);

  return (
    <Stack onDragOver={(e) => e.preventDefault()}>
      {bucket.map((id, idx) => (
        <BucketQuestion key={idx} id={id} dragHandlers={dragHandlers} />
      ))}
    </Stack>
  );
};
export default Bucket;

function BucketQuestion({
  id,
  dragHandlers,
}: {
  id: string;
  dragHandlers: DragHandlers;
}) {
  const ref = useRef(null);

  const question = useStore.use.questions_cache().get(id);
  if (!question) return <></>;
  const { content } = question;

  return (
    <Group ref={ref} className={styles["q-box"]} spacing="xs" mr="xs">
      <DragButton id={id} dragHandlers={dragHandlers} draggedRef={ref} />
      <QuestionText content={content} />
      <Group spacing={0} className={styles["q-control"]}>
        <RemoveButton id={id} />
        <EditButton id={id} />
      </Group>
    </Group>
  );
}

/* BucketQuestion.elements */
function DragButton({
  id,
  dragHandlers,
  draggedRef,
}: {
  id: string;
  dragHandlers: DragHandlers;
  draggedRef: React.RefObject<HTMLElement>;
}) {
  const { onDragStart, onDragOver, onDragEnd } = dragHandlers;
  return (
    <ActionIcon
      size="sm"
      draggable
      onDragStart={onDragStart(id, draggedRef)}
      onDragOver={onDragOver(id)}
      onDragEnd={onDragEnd()}
      style={{ cursor: "grab" }}
    >
      <IconMenu stroke={1} />
    </ActionIcon>
  );
}
function QuestionText({ content }: { content?: string }) {
  return (
    <Text size="sm" lineClamp={1} style={{ flex: 1 }}>
      {content}
    </Text>
  );
}
function RemoveButton({ id }: { id: string }) {
  const toggleBucket = useStore.use.questions_toggleBucket();
  return (
    <ActionIcon size="sm" onClick={() => toggleBucket(id)}>
      <IconMinus stroke={1} />
    </ActionIcon>
  );
}
function EditButton({ id }: { id: string }) {
  const toEdit = useStore.use.questionEdit_toEdit();
  return (
    <ActionIcon size="sm" onClick={() => toEdit(id)}>
      <IconEdit stroke={1} />
    </ActionIcon>
  );
}
