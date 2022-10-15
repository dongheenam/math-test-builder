import { Select, SelectItem } from "common/components";
import { TOPIC_VALUES } from "questions/constants";

const formLabel = "Topic";

export function TopicForm({
  topic,
  setTopic,
}: {
  topic: string;
  setTopic: (value: string) => void;
}) {
  const data = Object.entries(TOPIC_VALUES).map(([key, description]) => ({
    label: description,
    value: key,
  }));
  return (
    <Select value={topic} setValue={setTopic} label={formLabel}>
      {data.map((item, idx) => (
        <SelectItem key={idx} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
