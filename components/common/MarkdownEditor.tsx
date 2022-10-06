import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ActionIcon, Divider, Group, Stack, Text } from "@mantine/core";
import {
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconTable,
  IconPhoto,
  IconMath,
  IconMathFunction,
} from "@tabler/icons";

import styles from "./Markdown.module.scss";

const MarkdownParser = dynamic(
  () => import("components/common/MarkdownParser"),
  { suspense: true }
);

const MarkdownEditor = ({
  text,
  setText,
  maxHeight = "30vh",
}: {
  text: string;
  setText: (text: string) => void;
  maxHeight?: string;
}) => {
  return (
    <div className={styles["editor"]}>
      <Group className={styles["editor-control"]}>
        <Stack spacing={4}>
          <Text color="gray" style={{ fontVariant: "small-caps" }}>
            text
          </Text>
          <Group spacing={6}>
            <ActionIcon color="dark" size="sm">
              <IconBold stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="dark" size="sm">
              <IconItalic stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="dark" size="sm">
              <IconList stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="dark" size="sm">
              <IconListNumbers stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
        <Divider orientation="vertical" />
        <Stack spacing={4}>
          <Text color="gray" style={{ fontVariant: "small-caps" }}>
            insert
          </Text>
          <Group spacing={6}>
            <ActionIcon color="dark" size="sm">
              <IconTable stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="dark" size="sm">
              <IconPhoto stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
        <Divider orientation="vertical" />
        <Stack spacing={4}>
          <Text color="gray" style={{ fontVariant: "small-caps" }}>
            math
          </Text>
          <Group spacing={6}>
            <ActionIcon color="dark" size="sm">
              <IconMath stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="dark" size="sm">
              <IconMathFunction stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
      <textarea
        className={styles["editor-write"]}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ maxHeight: maxHeight }}
      />
      <div
        className={styles["editor-preview"]}
        style={{ maxHeight: maxHeight }}
      >
        <Suspense fallback={text}>
          <MarkdownParser text={text} />
        </Suspense>
      </div>
    </div>
  );
};
export default MarkdownEditor;
