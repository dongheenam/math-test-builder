import { INITIAL_QUERY } from "questions/libs/stores";
import { useState } from "react";
import useStore from "questions/libs/stores";

export default function useSearchForm() {
  const [formFields, setFormFields] = useState(INITIAL_QUERY);

  const updateForm =
    <Key extends keyof typeof INITIAL_QUERY>(field: Key) =>
    (value: typeof INITIAL_QUERY[Key]) =>
      setFormFields((prev) => ({ ...prev, [field]: value }));

  const setQuery = useStore.use.setSearchQuery();
  const submitForm = () => setQuery(formFields);
  const resetForm = () => setFormFields(INITIAL_QUERY);

  return {
    yearControl: {
      year: formFields.yearLevel,
      setYear: updateForm("yearLevel"),
    },
    topicControl: {
      topic: formFields.topic,
      setTopic: updateForm("topic"),
    },
    tagsControl: {
      tags: formFields.tags,
      setTags: updateForm("tags"),
    },
    contentControl: {
      content: formFields.content,
      setContent: updateForm("content"),
    },
    submitForm,
    resetForm,
  };
}
