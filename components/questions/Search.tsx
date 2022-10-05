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

import useStore from "components/stores/useStore";
import { MATCH_TYPE_DATA, QuestionFormSlice, TOPICS, YEAR_LEVELS } from "types";

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
      data={YEAR_LEVELS.map((v: number) => v.toString())}
    />
  );
}
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
      data={Object.values(TOPICS)}
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
  const matchType = useStore.use.questionForm_tagMatch();
  const setMatchType = setForm("questionForm_matchType");
  return (
    <SegmentedControl
      data={MATCH_TYPE_DATA}
      value={matchType}
      onChange={setMatchType}
    />
  );
}
function TextForm({ setForm }: { setForm: SetForm }) {
  const text = useStore.use.questionForm_content();
  const setText = setForm("questionForm_text");
  return (
    <TextInput
      label="Text"
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
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
  return (
    <Button
      leftIcon={<IconPencilPlus stroke={1.5} />}
      color="green"
      variant="outline"
    >
      New Question
    </Button>
  );
}
