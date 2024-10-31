import moment from "moment";
import "./table.css";
import Button from "../buttons/button";
import { useEffect, useState, Fragment } from "react";
import Modal from "../modal/modal";
import { editDevice, deleteDevice, netStatus } from "../services/device";

export default function Notes({
  ipAddress,
  title,
  description,
  note,
  createdAt,
  actionComplete,
  waitResponsePingTime,
  timerRequestNetStatus,
  filterOffline,
}) {
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [netNoteStatus, setNetNoteStatus] = useState("");

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

  const checkNetNote = async () => {
    try {
      const resultCheckNetStatus = netStatus(ipAddress, waitResponsePingTime);
      resultCheckNetStatus.then((value) => setNetNoteStatus(value));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timeInterval = setInterval(
      () => checkNetNote(),
      timerRequestNetStatus
    );

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

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
      {filterOffline == "false" || netNoteStatus== "offline" ? (
        <>
          <tr>
            <td>{moment(createdAt).format("DD/MM/YYYY")}</td>
            <td>{title}</td>
            <td>{description}</td>
            <td className={netNoteStatus}>{ipAddress}</td>
            <td>{note}</td>
            <td>
              <Button onClick={openEditModal}>Edit</Button>
            </td>
            <td>
              <Button onClick={openDelModal}>X</Button>
            </td>
          </tr>
        </>
      ) : null }
    </Fragment>
  );
}
