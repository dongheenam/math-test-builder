import * as Dialog from "@radix-ui/react-dialog";
import Editor from "./Editor";

import styles from "./Editor.module.scss";

export default function EditorContainer() {
  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content className={styles.content}>
            <Editor />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
