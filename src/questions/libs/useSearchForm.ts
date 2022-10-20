import { INITIAL_QUERY } from "questions/stores";
import { useState } from "react";
import useStore from "questions/stores";

export default function useSearchForm() {
  const [formValues, setFormValues] = useState(INITIAL_QUERY);

  const updateForm =
    <Key extends keyof typeof INITIAL_QUERY>(field: Key) =>
    (value: typeof INITIAL_QUERY[Key]) =>
      setFormValues((prev) => ({ ...prev, [field]: value }));

  const setQuery = useStore.use.setSearchQuery();
  const submitForm = () => setQuery(formValues);
  const resetForm = () => setFormValues(INITIAL_QUERY);

  return {
    yearControl: {
      year: formValues.year,
      setYear: updateForm("year"),
    },
    topicControl: {
      topic: formValues.topic,
      setTopic: updateForm("topic"),
    },
    tagsControl: {
      tags: formValues.tags,
      setTags: updateForm("tags"),
    },
    contentControl: {
      content: formValues.content,
      setContent: updateForm("content"),
    },
    submitForm,
    resetForm,
  };
}
