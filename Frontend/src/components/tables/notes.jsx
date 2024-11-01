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
  pingResponseTime,
  netCheckInterval,
  filterOffline,
  changeTotalOffline,
  searchFilter,
  totalOffline,
  setTotalOffline,
}) {
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [netNoteStatus, setNetNoteStatus] = useState("");
  const [oldNetNoteStatus, setOldNetNoteStatus] = useState("old");

  function openDelModal() {
    setDelModal(true);
  }

  function delNote(ipAddress) {
    if (netNoteStatus == "offline") setTotalOffline(--totalOffline);

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
      const resultCheckNetStatus = netStatus(ipAddress, pingResponseTime);
      resultCheckNetStatus.then((value) => setNetNoteStatus(value));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (oldNetNoteStatus != netNoteStatus) {
      changeTotalOffline(oldNetNoteStatus, netNoteStatus);
      setOldNetNoteStatus(netNoteStatus);
    }
  }, [netNoteStatus]);

  useEffect(() => {
    const timeInterval = setInterval(
      () => checkNetNote(oldNetNoteStatus, netNoteStatus),
      netCheckInterval
    );
    return () => {
      clearInterval(timeInterval);
    };
  }, [netCheckInterval, pingResponseTime]);

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

      {ipAddress.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      title.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      description.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      note.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
      moment(createdAt)
        .format("DD/MM/YYYY")
        .toLowerCase()
        .includes(searchFilter.value.toLowerCase()) ? (
        filterOffline == "false" || netNoteStatus == "offline" ? (
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
        ) : null
      ) : null}
    </Fragment>
  );
}
