import { getQuestionsLayout } from "layouts";
import styles from "./index.module.scss";
import React, { useState } from "react";
import { TopicForm, YearForm } from "questions/components";

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
  const yearControl = { year, setYear };
  const topicControl = { topic, setTopic };

  console.log({ year });

  return (
    <div className={styles.search}>
      <YearForm {...yearControl} />
      <TopicForm {...topicControl} />
    </div>
  );
}

function ListPanel() {
  return <></>;
}
