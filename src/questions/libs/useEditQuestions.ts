import { useState } from "react";
import useStore, { EMPTY_QUESTION } from "questions/libs/stores";

export default function useEditQuestions() {
  const questionEdited = useStore.use.questionEdited();
  const [editorFields, setEditorFields] = useState(questionEdited);

  const updateForm =
    <Key extends keyof typeof questionEdited>(field: Key) =>
    (value: typeof questionEdited[Key]) =>
      setEditorFields((prev) => ({ ...prev, [field]: value }));

  const editQuestion = useStore.use.editQuestion();
  const submitQuestion = () => editQuestion(editorFields);
  const resetEditor = () => setEditorFields(EMPTY_QUESTION);

  return {
    yearState: {
      year: editorFields.yearLevel,
      setYear: updateForm("yearLevel"),
    },
    topicState: {
      topic: editorFields.topic,
      setTopic: updateForm("topic"),
    },
    tagsState: {
      tags: editorFields.tags,
      setTags: updateForm("tags"),
    },
    contentState: {
      content: editorFields.content,
      setContent: updateForm("content"),
    },
    solutionState: {
      solution: editorFields.solution,
      setSolution: updateForm("solution"),
    },
    submitQuestion,
    resetEditor,
  };
}
