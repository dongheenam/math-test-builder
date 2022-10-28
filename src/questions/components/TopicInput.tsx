import { Select, SelectItem } from "common/components";
import { TOPIC_VALUES, TOPIC_COLORS } from "questions/libs/constants";
import { Topic } from "questions/libs/types";

const inputLabel = "Topic";

export type TopicInputState = {
  topic: Topic | "";
  setTopic: (value: TopicInputState["topic"]) => void;
};
export function TopicInput({ topic, setTopic }: TopicInputState) {
  const data = Object.entries(TOPIC_VALUES).map(([key, description]) => ({
    label: description,
    value: key,
  }));
  data.unshift({ label: "", value: "" });
  return (
    <Select value={topic} setValue={setTopic} label={inputLabel}>
      {data.map((item, idx) => (
        <SelectItem
          key={idx}
          value={item.value}
          style={
            item.label !== ""
              ? { color: `var(--${TOPIC_COLORS[item.value as Topic]}11)` }
              : { color: "var(--text)" }
          }
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
