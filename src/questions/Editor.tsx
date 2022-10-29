import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX, IconDeviceFloppy } from "@tabler/icons";

import { YearInput, TopicInput, TagsInput, MarkdownEditor } from "./components";
import useEditQuestions from "./libs/useEditQuestions";
import styles from "./Editor.module.scss";

export default function Editor({ closeEditor }: { closeEditor: () => void }) {
  const {
    yearState,
    topicState,
    tagsState,
    contentState,
    solutionState,
    submitQuestion,
    resetEditor,
  } = useEditQuestions();

  return (
    <>
      <div className={styles.titleRow}>
        <Dialog.Title className={styles.title}>Edit Question</Dialog.Title>
        <Dialog.Close
          className={styles.closeIcon}
          onClick={() => closeEditor()}
        >
          <IconX size="1em" />
        </Dialog.Close>
      </div>
      <div className={styles.metaFields}>
        <div className={styles.yearBox}>
          <YearInput {...yearState} />
        </div>
        <div className={styles.topicBox}>
          <TopicInput {...topicState} />
        </div>
        <div className={styles.tagsBox}>
          <TagsInput {...tagsState} />
        </div>
      </div>
      <div className={styles.contentField}>
        <span className={styles.label}>Content</span>
        <MarkdownEditor
          text={contentState.content}
          setText={contentState.setContent}
        />
      </div>
      <div className={styles.solutionField}>
        <span className={styles.label}>Solution</span>
        <MarkdownEditor
          text={solutionState.solution}
          setText={solutionState.setSolution}
        />
      </div>
      <div className={styles.control}>
        <button className={styles.btnEmpty}>Empty all</button>
        <button className={styles.btnSave}>
          <IconDeviceFloppy stroke={2} size="1em" />
          <span>Save question</span>
        </button>
      </div>
    </>
  );
}
