import { Modal } from "@mantine/core";
import useStore from "components/stores/useStore";
import Editor from "./Editor";

import styles from "./Editor.module.css";

const EditContainer = () => {
  const isOpen = useStore.use.questionEdit_isOpen();
  const close = useStore.use.questionEdit_close();

  return (
    <Modal opened={isOpen} onClose={close} size="90vw" title="Edit question">
      <Editor />
    </Modal>
  );
};
export default EditContainer;
