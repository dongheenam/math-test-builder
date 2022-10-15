import { getQuestionsLayout } from "layouts";
import styles from "./index.module.scss";
import React, { useState } from "react";
import { TopicForm, YearForm, TagsForm } from "questions/components";

Questions.getLayout = getQuestionsLayout;
export default function Questions() {
  return (
    <div className={styles.root}>
      <SearchPanel />
      <ListPanel />
    </div>
  );
}

function SearchPanel() {
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>(["arithmetic", "add", "subtract"]);
  const yearControl = { year, setYear };
  const topicControl = { topic, setTopic };
  const tagsControl = { tags, setTags };

  console.log({ year, topic, tags: JSON.stringify(tags) });

  return (
    <div className={styles.search}>
      <YearForm {...yearControl} />
      <TopicForm {...topicControl} />
      <TagsForm {...tagsControl} />
    </div>
  );
}

function ListPanel() {
  return <></>;
}
