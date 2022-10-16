import React, { useState } from "react";
import { TopicForm, YearForm, TagsForm, TextForm } from "questions/components";
import { IconSearch, IconFilePlus } from "@tabler/icons";
import styles from "./SearchPanel.module.scss";

export function SearchPanel() {
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>(["arithmetic", "add", "subtract"]);
  const [text, setText] = useState("");
  const yearControl = { year, setYear };
  const topicControl = { topic, setTopic };
  const tagsControl = { tags, setTags };
  const textControl = { text, setText };

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <div className={styles.yearBox}>
          <YearForm {...yearControl} />
        </div>
        <div className={styles.topicBox}>
          <TopicForm {...topicControl} />
        </div>
        <div className={styles.tagsBox}>
          <TagsForm {...tagsControl} />
        </div>
        <div className={styles.textBox}>
          <TextForm {...textControl} />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btnSearch}>
          <IconSearch stroke={2} size="1em" />
          <span>Search questions</span>
        </button>
        <button className={styles.btnReset}>Reset form</button>
        <button className={styles.btnNew}>
          <IconFilePlus stroke={2} size="1em" />
          <span>New question</span>
        </button>
      </div>
    </div>
  );
}
