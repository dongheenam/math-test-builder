import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons";

import styles from "./Editor.module.scss";

export default function Editor() {
  return (
    <>
      <div className={styles.titleRow}>
        <Dialog.Title className={styles.title}>Edit Question</Dialog.Title>
        <Dialog.Close className={styles.closeIcon}>
          <IconX size="1em" />
        </Dialog.Close>
      </div>
      <div className={styles.metaForm}>tags</div>
      <div className={styles.contentForm}>content</div>
      <div className={styles.solutionForm}>solution</div>
      <div className={styles.buttons}>save</div>
    </>
  );
}
