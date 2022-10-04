import { Modal } from "@mantine/core";
import useModal from "components/hooks/useModal";
import Editor from "./Editor";

const EditContainer = () => {
  const [opened, modalHandlers] = useModal(false);
  const { close } = modalHandlers;
  return (
    <Modal opened={opened} onClose={close} size="xl" title="Edit question">
      <Editor />
    </Modal>
  );
};
export default EditContainer;
