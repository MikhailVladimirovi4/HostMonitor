import moment from "moment";
import "./table.css";
import Button from "../buttons/button";
import { useState, Fragment } from "react";
import Modal from "../modal/modal";
import { deleteDevice } from "../services/device";

export default function Notes({
  ipAddress,
  title,
  description,
  note,
  createdAt,
  actionComplete,
}) {
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  function openDelModal() {
    setDelModal(true);
  }

  function DelNote(ipAddress) {
    const response = deleteDevice(ipAddress);
    setDelModal(false);
    response.then((value) => actionComplete(value));
  }

  function openEditModal() {
    setEditModal(true);
  }
  function closeEditModal() {
    setEditModal(false);
  }

  return (
    <Fragment>
      <Modal open={delModal} action="del">
        <Button onClick={() => DelNote(ipAddress)}>Удалить</Button>
        <Button onClick={() => setDelModal(false)}>Отмена</Button>
      </Modal>
      <Modal
        open={editModal}
        action="edit"
        ipAddress={ipAddress}
        title={title}
        description={description}
        note={note}
      >
        <Button onClick={() => closeEditModal()}>Изменить</Button>
        <Button onClick={() => setEditModal(false)}>Отмена</Button>
      </Modal>

      <tr>
        <td className="datatable">{moment(createdAt).format("DD/MM/YYYY")}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td>{ipAddress}</td>
        <td>{note}</td>
        <td>
          <Button onClick={openEditModal}>Edit</Button>
        </td>
        <td>
          <Button onClick={openDelModal}>X</Button>
        </td>
      </tr>
    </Fragment>
  );
}
