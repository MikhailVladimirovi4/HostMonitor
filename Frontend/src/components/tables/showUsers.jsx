import Button from "../buttons/button";
import { useState } from "react";
import { deleteUser } from "../services/user";
import Modal from "../modal/modal";
import "./table.css";

export default function ShowUsers({
  name,
  userName,
  role,
  token,
  actionUserComplete,
}) {
  const [delModal, setDelModal] = useState(false);

  function delUser(userName) {
    deleteUser(userName, token);
    setDelModal(false);
    actionUserComplete("Пользователь удален.");
  }

  return (
    <>
      <tbody>
        <>
          <tr>
            <td>{name}</td>
            <td>{userName}</td>
            <td>{role}</td>
            <td>
              <Button onClick={() => setDelModal(true)}>X</Button>
            </td>
          </tr>
        </>
      </tbody>
      <Modal open={delModal} action="del">
        <Button onClick={() => delUser(userName)}>Удалить</Button>
        <Button onClick={() => setDelModal(false)}>Отмена</Button>
      </Modal>
    </>
  );
}
