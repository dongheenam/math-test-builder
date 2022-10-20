import { QuestionsState } from "questions/stores";
import { useState } from "react";
import useStore from "questions/stores";

type YearField = QuestionsState["searchQuery"]["year"];
type TopicField = QuestionsState["searchQuery"]["topic"];
type TagsField = QuestionsState["searchQuery"]["tags"];
type ContentField = QuestionsState["searchQuery"]["content"];

const INITIAL_VALUES: {
  year: YearField;
  topic: TopicField;
  tags: TagsField;
  text: ContentField;
} = {
  year: "",
  topic: "",
  tags: [],
  text: "",
};

export default function useSearchForms() {
  const [year, setYear] = useState<YearField>(INITIAL_VALUES.year);
  const [topic, setTopic] = useState<TopicField>(INITIAL_VALUES.topic);
  const [tags, setTags] = useState<TagsField>(INITIAL_VALUES.tags);
  const [text, setText] = useState<ContentField>(INITIAL_VALUES.text);

  const submitForm = useStore.use.submitQueryForm();
  const submit = () => {
    submitForm({
      year,
      topic,
      tags,
      content: text,
    });
  };

  const reset = () => {
    setYear(INITIAL_VALUES.year);
    setTopic(INITIAL_VALUES.topic);
    setTags(INITIAL_VALUES.tags);
    setText(INITIAL_VALUES.text);
  };

  return {
    yearControl: { year, setYear },
    topicControl: { topic, setTopic },
    tagsControl: { tags, setTags },
    textControl: { text, setText },
    submit,
    reset,
  };
}
