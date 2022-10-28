import React from "react";
import { IconSearch, IconFilePlus } from "@tabler/icons";

import {
  TopicInput,
  YearInput,
  TagsInput,
  ContentInput,
} from "questions/components";
import useSearchForms from "questions/libs/useSearchForm";

import styles from "./SearchCard.module.scss";
import useStore from "./libs/stores";

export function SearchCard() {
  const {
    yearControl,
    topicControl,
    tagsControl,
    contentControl,
    submitForm,
    resetForm,
  } = useSearchForms();
  const openEditor = useStore.use.openEditor();

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <div className={styles.yearBox}>
          <YearInput {...yearControl} />
        </div>
        <div className={styles.topicBox}>
          <TopicInput {...topicControl} />
        </div>
        <div className={styles.tagsBox}>
          <TagsInput {...tagsControl} />
        </div>
        <div className={styles.textBox}>
          <ContentInput {...contentControl} />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btnSearch} onClick={() => submitForm()}>
          <IconSearch stroke={2} size="1em" />
          <span>Search questions</span>
        </button>
        <button className={styles.btnReset} onClick={() => resetForm()}>
          Reset form
        </button>
        <button className={styles.btnNew} onClick={() => openEditor()}>
          <IconFilePlus stroke={2} size="1em" />
          <span>New question</span>
        </button>
      </div>
    </div>
  );
}
