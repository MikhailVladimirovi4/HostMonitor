import { Fragment, useEffect, useState } from "react";
import { fetchDevices } from "../services/device.js";
import Notes from "./notes.jsx";
import Button from "../buttons/button.jsx";
import Modal from "../modal/modal.jsx";
import "./table.css";

export default function Table({}) {
  const [devices, setDevices] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [showLog, setShowLog] = useState("");

  function actionComplete(text) {
    setShowLog(text);
    const timeInterval = setInterval(() => setShowLog(""), 10000);
    clearInterval(timeInterval);
  }

  const fechData = async () => {
    try {
      const devices = await fetchDevices();

      setDevices(devices);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fechData();
  }, [actionComplete]);
  return (
    <Fragment>
      <Modal open={addModal} action="add">
        <Button onClick={() => setAddModal(false)}>Выполнить</Button>
        <Button onClick={() => setAddModal(false)}>Отмена</Button>
      </Modal>
      <Button onClick={() => setAddModal(true)}>Добавить</Button>
      <span className="showlog">{showLog}</span>
      <table className="table">
        <thead>
          <tr>
            <th className="datatable">Создано</th>
            <th className="titletable">Тип</th>
            <th className="descriptiontable">Место размещения</th>
            <th className="ipaddresstable">IP-адрес</th>
            <th>Дополнительная информация</th>
            <th className="buttontable">Edit</th>
            <th className="buttontable">Del</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(({ id, ...props }) => {
            return (
              <Notes key={id} {...props} actionComplete={actionComplete} />
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
}
