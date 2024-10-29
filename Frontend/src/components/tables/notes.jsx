import moment from "moment";
import "./table.css";
import Button from "../buttons/button";
import { useState, Fragment } from "react";
import Modal from "../modal/modal";
import { editDevice, deleteDevice } from "../services/device";

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
  const [sortNotes, setSortNotes] = useState("online");
  //const ping = pingDevice(ipAddress);

  function openDelModal() {
    setDelModal(true);
  }

  function delNote(ipAddress) {
    const response = deleteDevice(ipAddress);
    setDelModal(false);
    response.then((value) => actionComplete(value));
  }

  function editNote(ipAddress, title, description, note) {
    const response = editDevice(ipAddress, title, description, note);
    setEditModal(false);
    response.then((value) => actionComplete(value));
  }

  function openEditModal() {
    setEditModal(true);
  }

  return (
    <Fragment>
      <Modal open={delModal} action="del">
        <Button onClick={() => delNote(ipAddress)}>Удалить</Button>
        <Button onClick={() => setDelModal(false)}>Отмена</Button>
      </Modal>
      <Modal
        open={editModal}
        action="edit"
        ipAddress={ipAddress}
        title={title}
        description={description}
        note={note}
        editNote={editNote}
      >
        <Button onClick={() => setEditModal(false)}>Отмена</Button>
      </Modal>
      <tr>
        <td>{moment(createdAt).format("DD/MM/YYYY")}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td className={sortNotes}>{ipAddress}</td>
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
