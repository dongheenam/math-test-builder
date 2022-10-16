import React from "react";

import { SearchCard } from "questions/SearchCard";
import { getQuestionsLayout } from "layouts";

import styles from "./index.module.scss";
import { ListCard } from "../../questions/ListCard";

Questions.getLayout = getQuestionsLayout;
export default function Questions() {
  return (
    <div className={styles.root}>
      <h2>Search Questions</h2>
      <SearchCard />
      <ListCard />
    </div>
  );
}
