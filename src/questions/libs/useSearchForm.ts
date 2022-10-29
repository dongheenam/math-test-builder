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
    yearState: {
      year: formFields.yearLevel,
      setYear: updateForm("yearLevel"),
    },
    topicState: {
      topic: formFields.topic,
      setTopic: updateForm("topic"),
    },
    tagsState: {
      tags: formFields.tags,
      setTags: updateForm("tags"),
    },
    contentState: {
      content: formFields.content,
      setContent: updateForm("content"),
    },
    submitForm,
    resetForm,
  };
}
