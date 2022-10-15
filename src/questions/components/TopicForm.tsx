import { Select, SelectItem } from "common/components";
import { TOPIC_VALUES, TOPIC_COLORS } from "questions/constants";
import { Topic } from "questions/types";

const formLabel = "Topic";

export type TopicFormState = {
  topic: string;
  setTopic: (value: string) => void;
};
export function TopicForm({ topic, setTopic }: TopicFormState) {
  const data = Object.entries(TOPIC_VALUES).map(([key, description]) => ({
    label: description,
    value: key,
  }));
  return (
    <Select value={topic} setValue={setTopic} label={formLabel}>
      {data.map((item, idx) => (
        <SelectItem
          key={idx}
          value={item.value}
          style={{ color: `var(--${TOPIC_COLORS[item.value as Topic]}11)` }}
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
