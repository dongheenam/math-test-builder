import { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Select,
  TextInput,
  Grid,
  Group,
  SegmentedControl,
  MultiSelect,
} from "@mantine/core";
import { IconSearch, IconPencilPlus } from "@tabler/icons";
import { QuestionFormSlice, MATCH_TYPE_DATA } from "stores/types";
import useStore from "stores/useStore";
import { YEAR_LEVELS, TOPIC_VALUES } from "./constants";

/* main */
const QuestionsSearch = () => {
  return (
    <Card withBorder radius="sm" p="md" style={{ overflow: "visible" }}>
      <SearchPanel />
      <Card.Section>
        <Divider my="md" />
      </Card.Section>
      <ButtonControls />
    </Card>
  );
};
export default QuestionsSearch;

/* SearchPanel */
type SetForm = QuestionFormSlice["questionForm_set"];
function SearchPanel() {
  const setForm: SetForm = useStore.use.questionForm_set();

  return (
    <>
      <Grid grow>
        <Grid.Col span={1}>
          <YearLevelForm setForm={setForm} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TopicForm setForm={setForm} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Group style={{ alignItems: "flex-end" }}>
            <TagsForm setForm={setForm} />
            <MatchTypeForm setForm={setForm} />
          </Group>
        </Grid.Col>
      </Grid>
      <TextForm setForm={setForm} />
    </>
  );
}
/* SearchPanel.Forms */
function YearLevelForm({ setForm }: { setForm: SetForm }) {
  const yearLevel = useStore.use.questionForm_yearLevel();
  const setYearLevel = setForm("questionForm_yearLevel");
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

function TopicForm({ setForm }: { setForm: SetForm }) {
  const topic = useStore.use.questionForm_topic();
  const setTopic = setForm("questionForm_topic");
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
function TagsForm({ setForm }: { setForm: SetForm }) {
  const tags = useStore.use.questionForm_tags();
  const setTags = setForm("questionForm_tags");
  const addTag = useStore.use.questionForm_addTag();
  const [tagData, setTagData] = useState<string[]>([...tags]);
  return (
    <MultiSelect
      label="Tags"
      searchable
      clearable
      creatable
      getCreateLabel={(newTag) => newTag}
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
function MatchTypeForm({ setForm }: { setForm: SetForm }) {
  const tagMatch = useStore.use.questionForm_tagMatch();
  const setTagMatch = setForm("questionForm_tagMatch");
  return (
    <SegmentedControl
      data={[...MATCH_TYPE_DATA]}
      value={tagMatch}
      onChange={(v: "any" | "all") => setTagMatch(v)}
    />
  );
}
function TextForm({ setForm }: { setForm: SetForm }) {
  const content = useStore.use.questionForm_content();
  const setContent = setForm("questionForm_content");
  return (
    <TextInput
      label="Text"
      value={content}
      onChange={(e) => setContent(e.currentTarget.value)}
    />
  );
}

/* Buttons */
function ButtonControls() {
  return (
    <Group style={{ justifyContent: "space-between" }}>
      <Button.Group>
        <SearchButton />
        <ResetButton />
      </Button.Group>
      <AddButton />
    </Group>
  );
}
function SearchButton() {
  const fetchQuestions = useStore.use.questions_fetch();
  return (
    <Button
      leftIcon={<IconSearch stroke={1.5} />}
      onClick={() => fetchQuestions({ append: false })}
    >
      Search
    </Button>
  );
}
function ResetButton() {
  const resetForm = useStore.use.questionForm_reset();
  return (
    <Button color="gray" variant="outline" onClick={() => resetForm()}>
      Reset Fields
    </Button>
  );
}
function AddButton() {
  const toEdit = useStore.use.questionEdit_toEdit();
  return (
    <Button
      leftIcon={<IconPencilPlus stroke={1.5} />}
      color="green"
      variant="outline"
      onClick={() => toEdit()}
    >
      New Question
    </Button>
  );
}
