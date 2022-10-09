import { Modal } from "@mantine/core";
import useStore from "stores/useStore";
import Editor from "./Editor";

const Edit = () => {
  const isOpen = useStore.use.questionEdit_isOpen();
  const close = useStore.use.questionEdit_close();

  return (
    <Modal opened={isOpen} onClose={close} size="90vw" title="Edit question">
      <Editor />
    </Modal>
  );
};
export default Edit;
