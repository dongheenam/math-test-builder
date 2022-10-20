import React, { useState } from "react";
import { IconSearch, IconFilePlus } from "@tabler/icons";

import {
  TopicInput,
  YearInput,
  TagsInput,
  TextInput,
} from "questions/components";
import useSearchForms from "questions/libs/useSearchForm";

import styles from "./SearchCard.module.scss";

export function SearchCard() {
  const { yearControl, topicControl, tagsControl, textControl, submit, reset } =
    useSearchForms();

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
          <TextInput {...textControl} />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btnSearch} onClick={() => submit()}>
          <IconSearch stroke={2} size="1em" />
          <span>Search questions</span>
        </button>
        <button className={styles.btnReset} onClick={() => reset()}>
          Reset form
        </button>
        <button className={styles.btnNew}>
          <IconFilePlus stroke={2} size="1em" />
          <span>New question</span>
        </button>
      </div>
    </div>
  );
}
