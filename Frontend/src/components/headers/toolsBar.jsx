import Button from "../buttons/button.jsx";
import { useState } from "react";
import Modal from "../modal/modal.jsx";

export default function ToolsBar() {
  const [addModal, setAddModal] = useState(false);

  return (
    <>
      <Modal open={addModal} action="add">
        <Button onClick={() => setAddModal(false)}>Выполнить</Button>
        <Button onClick={() => setAddModal(false)}>Отмена</Button>
      </Modal>
      <section className="toolsBar">
        <Button onClick={() => setAddModal(true)}>Добавить</Button>
      </section>
    </>
  );
}
