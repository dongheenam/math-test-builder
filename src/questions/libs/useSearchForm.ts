import { INITIAL_QUERY, QuestionsState } from "questions/stores";
import { useState } from "react";
import useStore from "questions/stores";

export default function useSearchForms() {
  const [year, setYear] = useState(INITIAL_QUERY.year);
  const [topic, setTopic] = useState(INITIAL_QUERY.topic);
  const [tags, setTags] = useState(INITIAL_QUERY.tags);
  const [text, setText] = useState(INITIAL_QUERY.content);

  const setQuery = useStore.use.setSearchQuery();
  const submit = () => {
    setQuery({
      year,
      topic,
      tags,
      content: text,
    });
  };

  const reset = () => {
    setYear(INITIAL_QUERY.year);
    setTopic(INITIAL_QUERY.topic);
    setTags(INITIAL_QUERY.tags);
    setText(INITIAL_QUERY.content);
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
