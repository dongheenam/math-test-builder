import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons";

import { YearInput, TopicInput, TagsInput, MarkdownEditor } from "./components";
import useEditQuestions from "./libs/useEditQuestions";
import styles from "./Editor.module.scss";

export default function Editor({ closeEditor }: { closeEditor: () => void }) {
  const {
    yearControl,
    topicControl,
    tagsControl,
    contentControl,
    solutionControl,
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
          <YearInput {...yearControl} />
        </div>
        <div className={styles.topicBox}>
          <TopicInput {...topicControl} />
        </div>
        <div className={styles.tagsBox}>
          <TagsInput {...tagsControl} />
        </div>
      </div>
      <div className={styles.contentField}>
        <span>Content</span>
        <MarkdownEditor
          text={contentControl.content}
          setText={contentControl.setContent}
        />
      </div>
      <div className={styles.solutionField}>
        <span>Solution</span>
        <MarkdownEditor
          text={solutionControl.solution}
          setText={solutionControl.setSolution}
        />
      </div>
      <div className={styles.buttons}>save</div>
    </>
  );
}
