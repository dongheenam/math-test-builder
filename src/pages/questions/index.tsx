import React from "react";

import { getQuestionsLayout } from "layouts";
import { SearchCard } from "questions/SearchCard";
import { ListCard } from "questions/ListCard";

import styles from "./index.module.scss";
import useFetchQuestions from "questions/libs/useFetchQuestions";

Questions.getLayout = getQuestionsLayout;
export default function Questions() {
  const { data } = useFetchQuestions();

  console.log(data);

  return (
    <div className={styles.root}>
      <h2>Search Questions</h2>
      <SearchCard />
      <ListCard />
    </div>
  );
}
