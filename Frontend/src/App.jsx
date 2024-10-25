import { useState } from "react";
import Header from "./components/headers/header";
import ToolsBar from "./components/headers/toolsBar";
import Table from "./components/tables/table";
import Modal from "./components/modal/modal";

export default function App() {
  const [onModal, setOnModal] = useState(false);

  function OpenModal() {
    setOnModal(true);
  }

  return (
    <>
      <div>
        <Header />
        <div>
          <ToolsBar onClick={OpenModal} />
        </div>
        <main>
          {onModal && (
            <Modal open={onModal}>
              xxxxxxxxxxxxxxxxxxxxxfsffffffsdfdsdssdf
            </Modal>
          )}
          <Table onClick={OpenModal}/>
        </main>
        <footer className="footer">Автор: Михаил Владимирович Бибиков</footer>
      </div>
    </>
  );
}
