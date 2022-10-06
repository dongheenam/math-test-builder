import {
  Button,
  Divider,
  Grid,
  Group,
  MultiSelect,
  Select,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import MarkdownEditor from "components/common/MarkdownEditor";
import useStore from "components/stores/useStore";
import { useState } from "react";
import { QuestionEditSlice, TOPIC_VALUES, YEAR_LEVELS } from "types";

type SetEdit = QuestionEditSlice["questionEdit_setEdit"];

const Editor = () => {
  const setEdit = useStore.use.questionEdit_setEdit();
  return (
    <Stack style={{ maxHeight: "80vh" }}>
      <InputControls setEdit={setEdit} />
      <ContentEditor setEdit={setEdit} />
      <SolutionEditor setEdit={setEdit} />
      <Divider />
      <ButtonControls />
    </Stack>
  );
};
export default Editor;

function InputControls({ setEdit }: { setEdit: SetEdit }) {
  return (
    <Grid grow style={{ maxWidth: "600px" }}>
      <Grid.Col span={1}>
        <YearLevelForm setEdit={setEdit} />
      </Grid.Col>
      <Grid.Col span={2}>
        <TopicForm setEdit={setEdit} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Group style={{ alignItems: "flex-end" }}>
          <TagsForm setEdit={setEdit} />
        </Group>
      </Grid.Col>
    </Grid>
  );
}
function YearLevelForm({ setEdit }: { setEdit: SetEdit }) {
  const yearLevel = useStore.use.questionEdit_yearLevel();
  const setYearLevel = setEdit("questionEdit_yearLevel");
  return (
    <Select
      label="Year"
      searchable
      allowDeselect
      maxDropdownHeight={240}
      value={yearLevel}
      onChange={setYearLevel}
      data={[...YEAR_LEVELS]}
    />
  );
}

const TOPIC_DATA = Object.entries(TOPIC_VALUES).map(([key, value]) => ({
  value: key,
  label: value,
}));

function TopicForm({ setEdit }: { setEdit: SetEdit }) {
  const topic = useStore.use.questionEdit_topic();
  const setTopic = setEdit("questionEdit_topic");
  return (
    <Select
      label="Topic"
      searchable
      allowDeselect
      value={topic}
      onChange={setTopic}
      maxDropdownHeight={240}
      data={TOPIC_DATA}
    />
  );
}
function TagsForm({ setEdit }: { setEdit: SetEdit }) {
  const tags = useStore.use.questionEdit_tags();
  const setTags = setEdit("questionEdit_tags");
  const addTag = useStore.use.questionEdit_addTag();
  const [tagData, setTagData] = useState<string[]>([...tags]);
  return (
    <MultiSelect
      label="Tags"
      searchable
      clearable
      creatable
      getCreateLabel={(newTag) => newTag}
      value={[...tags]}
      onCreate={(newTag) => {
        addTag(newTag);
        setTagData((tags) => [...tags, newTag].sort());
        return newTag;
      }}
      onChange={(value) => setTags(new Set(value))}
      data={tagData}
      style={{ flex: 1 }}
    />
  );
}

/* Content Editor */
function ContentEditor({ setEdit }: { setEdit: SetEdit }) {
  const content = useStore.use.questionEdit_content();
  const setContent = setEdit("questionEdit_content");
  return (
    <div>
      <Text weight="500" size="sm">
        Question
      </Text>
      <MarkdownEditor text={content} setText={setContent} />
    </div>
  );
}
/* Solution Editor */
function SolutionEditor({ setEdit }: { setEdit: SetEdit }) {
  const solution = useStore.use.questionEdit_solution();
  const setSolution = setEdit("questionEdit_solution");
  return (
    <>
      <div>
        <Text weight="500" size="sm">
          Solution
        </Text>
        <MarkdownEditor
          text={solution}
          setText={setSolution}
          maxHeight="15vh"
        />
      </div>
    </>
  );
}

/* Buttons */
function ButtonControls() {
  const reset = useStore.use.questionEdit_reset();
  const save = useStore.use.questionEdit_save();
  return (
    <Group>
      <Button variant="outline" color="gray" ml="auto" onClick={() => reset()}>
        Clear
      </Button>
      <Button variant="outline" onClick={() => save({ upload: false })}>
        Save
      </Button>
      <Button onClick={() => save({ upload: true })}>Save and Upload</Button>
    </Group>
  );
}
