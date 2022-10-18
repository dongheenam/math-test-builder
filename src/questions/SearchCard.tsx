import React, { useState } from "react";
import { IconSearch, IconFilePlus } from "@tabler/icons";

import { TopicForm, YearForm, TagsForm, TextForm } from "questions/components";
import useStore from "./stores";

import styles from "./SearchCard.module.scss";

export function SearchCard() {
  const query = useStore.use.searchQuery();
  const setQuery = useStore.use.setQuery();

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <div className={styles.yearBox}>
          <YearForm year={query.year} setYear={setQuery("year")} />
        </div>
        <div className={styles.topicBox}>
          <TopicForm topic={query.topic} setTopic={setQuery("topic")} />
        </div>
        <div className={styles.tagsBox}>
          <TagsForm tags={query.tags} setTags={setQuery("tags")} />
        </div>
        <div className={styles.textBox}>
          <TextForm text={query.content} setText={setQuery("content")} />
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
