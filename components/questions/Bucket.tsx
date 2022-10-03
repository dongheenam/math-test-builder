import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconEdit, IconMenu, IconMinus } from "@tabler/icons";
import useDrag, { DragHandlers } from "components/hooks/useDrag";

import useStore from "components/stores/useStore";
import { useRef } from "react";

import styles from "./Bucket.module.css";

const Bucket = () => {
  const bucket = useStore.use.questions_bucket();
  const setBucket = useStore.use.questions_setBucket();
  const dragHandlers = useDrag(bucket, setBucket);

  return (
    <Stack onDragOver={(e) => e.preventDefault()}>
      {bucket.map((_id, idx) => (
        <BucketQuestion key={idx} _id={_id} dragHandlers={dragHandlers} />
      ))}
    </Stack>
  );
};
export default Bucket;

function BucketQuestion({
  _id,
  dragHandlers,
}: {
  _id: string;
  dragHandlers: DragHandlers;
}) {
  const ref = useRef(null);

  const question = useStore.use.questions_cached().get(_id);
  if (!question) return <></>;
  const { text } = question;

  return (
    <Group ref={ref} key={_id} className={styles["q-box"]} spacing="xs" mr="xs">
      <DragButton _id={_id} dragHandlers={dragHandlers} draggedRef={ref} />
      <QuestionText text={text} />
      <Group spacing={0} className={styles["q-control"]}>
        <RemoveButton _id={_id} />
        <EditButton _id={_id} />
      </Group>
    </Group>
  );
}

/* BucketQuestion.elements */
function DragButton({
  _id,
  dragHandlers,
  draggedRef,
}: {
  _id: string;
  dragHandlers: DragHandlers;
  draggedRef: React.RefObject<HTMLElement>;
}) {
  const { onDragStart, onDragOver, onDragEnd } = dragHandlers;
  return (
    <ActionIcon
      size="sm"
      draggable
      onDragStart={onDragStart(_id, draggedRef)}
      onDragOver={onDragOver(_id)}
      onDragEnd={onDragEnd()}
      style={{ cursor: "grab" }}
    >
      <IconMenu stroke={1} />
    </ActionIcon>
  );
}
function QuestionText({ text }: { text: string }) {
  return (
    <Text size="sm" lineClamp={1} style={{ flex: 1 }}>
      {text}
    </Text>
  );
}
function RemoveButton({ _id }: { _id: string }) {
  const toggleBucket = useStore.use.questions_toggleBucket();
  return (
    <ActionIcon size="sm" onClick={() => toggleBucket(_id)}>
      <IconMinus stroke={1} />
    </ActionIcon>
  );
}
function EditButton({ _id }: { _id: string }) {
  return (
    <ActionIcon size="sm">
      <IconEdit stroke={1} />
    </ActionIcon>
  );
}
