import * as Dialog from "@radix-ui/react-dialog";
import Editor from "./Editor";

import styles from "./Editor.module.scss";
import useStore from "./libs/stores";

export default function EditorContainer() {
  const open = useStore.use.isEditorOpen();
  const closeEditor = useStore.use.closeEditor();

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content className={styles.content}>
            <Editor closeEditor={closeEditor} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
