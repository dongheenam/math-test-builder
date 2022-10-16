import React from "react";

import { SearchPanel } from "questions/SearchPanel";
import { getQuestionsLayout } from "layouts";

import styles from "./index.module.scss";

Questions.getLayout = getQuestionsLayout;
export default function Questions() {
  return (
    <div className={styles.root}>
      <h2>Search Questions</h2>
      <SearchPanel />
      <ListPanel />
    </div>
  );
}

function ListPanel() {
  return <></>;
}
