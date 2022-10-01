import { useForm } from "@mantine/form";

import { TOPICS } from "types";

export interface QuestionForm {
  yearLevel: "7" | "8" | "9" | "10" | "11" | "12" | "";
  // topic: typeof valueof TOPICS
  topic: typeof TOPICS[keyof typeof TOPICS] | "";
  tags: string[];
  text: string;
  matchType: "any" | "all";
}
const INITIAL_VALUES: QuestionForm = {
  yearLevel: "",
  topic: "",
  tags: [],
  text: "",
  matchType: "any",
};
export default function useQuestionForm() {
  const form = useForm<QuestionForm>({
    initialValues: INITIAL_VALUES,
  });

  const getInputProps = form.getInputProps;
  const onSubmit = form.onSubmit;
  const insertListItem = form.insertListItem;
  const resetForm = () => form.setValues(INITIAL_VALUES);

  return { getInputProps, onSubmit, insertListItem, resetForm };
}
