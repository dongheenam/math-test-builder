import {
  Button,
  Card,
  Divider,
  Select,
  TextInput,
  Grid,
  Group,
  SegmentedControl,
} from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons";

import { topics, yearLevels } from "types";
import styles from "./Search.module.css";

const QuestionsSearch = () => {
  return (
    <Card withBorder radius="xs" p="md" style={{ overflow: "visible" }}>
      <Grid grow>
        <Grid.Col span={1}>
          <Select
            label="Year"
            searchable
            selectOnBlur
            allowDeselect
            maxDropdownHeight={240}
            data={yearLevels.map((e: number) => e.toString())}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Select
            label="Topic"
            searchable
            allowDeselect
            maxDropdownHeight={240}
            data={topics}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Group style={{ alignItems: "flex-end" }}>
            <Select
              label="Tags"
              searchable
              selectOnBlur
              allowDeselect
              creatable
              data={[]}
              style={{ flex: 1 }}
            />
            <SegmentedControl data={["all", "any"]} />
          </Group>
        </Grid.Col>
      </Grid>
      <TextInput label="Text" />
      <Card.Section>
        <Divider my="md" />
      </Card.Section>
      <Group style={{ justifyContent: "space-between" }}>
        <Button.Group>
          <Button leftIcon={<IconSearch stroke={1.5} />}>Search</Button>
          <Button color="gray" variant="outline">
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
    </Card>
  );
};
export default QuestionsSearch;
