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
import { IconSearch, IconPlus } from "@tabler/icons";

import useStore from "components/stores/useStore";
import { TOPICS, YEAR_LEVELS } from "types";

let render = 1;

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

function SearchPanel() {
  const form = useStore.use.qForm();
  const setForm = useStore.use.setQForm();

  const addTag = useStore.use.addTag();
  const [tagData, setTagData] = useState(form["tags"]);

  return (
    <>
      <Grid grow>
        <Grid.Col span={1}>
          <Select
            label="Year"
            searchable
            allowDeselect
            maxDropdownHeight={240}
            value={form["yearLevel"]}
            onChange={setForm("yearLevel")}
            data={YEAR_LEVELS.map((v: number) => v.toString())}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Select
            label="Topic"
            searchable
            allowDeselect
            value={form["topic"]}
            onChange={setForm("topic")}
            maxDropdownHeight={240}
            data={Object.values(TOPICS)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Group style={{ alignItems: "flex-end" }}>
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
              onChange={setForm("tags")}
              data={tagData}
              style={{ flex: 1 }}
            />
            <SegmentedControl
              data={["any", "all"]}
              value={form["matchType"]}
              onChange={setForm("matchType")}
            />
          </Group>
        </Grid.Col>
      </Grid>
      <TextInput
        label="Text"
        value={form["text"]}
        onChange={(e) => setForm("text")(e.currentTarget.value)}
      />
    </>
  );
}

function ButtonControls() {
  const fetchQuestions = useStore.use.fetchQuestions();
  const resetForm = useStore.use.resetQForm();

  return (
    <Group style={{ justifyContent: "space-between" }}>
      <Button.Group>
        <Button
          leftIcon={<IconSearch stroke={1.5} />}
          onClick={() => fetchQuestions({ append: false })}
        >
          Search
        </Button>
        <Button color="gray" variant="outline" onClick={() => resetForm()}>
          Reset Fields
        </Button>
      </Button.Group>
      <Button
        leftIcon={<IconPlus stroke={1.5} />}
        color="green"
        variant="outline"
      >
        New
      </Button>
    </Group>
  );
}
