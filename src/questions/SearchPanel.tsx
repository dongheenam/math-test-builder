import React, { useState } from "react";
import { TopicForm, YearForm, TagsForm } from "questions/components";
import styles from "./SearchPanel.module.scss";

export function SearchPanel() {
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>(["arithmetic", "add", "subtract"]);
  const yearControl = { year, setYear };
  const topicControl = { topic, setTopic };
  const tagsControl = { tags, setTags };

  return (
    <div className={styles.search}>
      <YearForm {...yearControl} />
      <TopicForm {...topicControl} />
      <TagsForm {...tagsControl} />
    </div>
  );
}
