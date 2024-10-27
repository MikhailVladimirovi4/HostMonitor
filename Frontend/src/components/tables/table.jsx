import "./table.css";
import { Fragment, useEffect, useState } from "react";
import { fetchDevices } from "../services/device.js";
import Notes from "./notes.jsx";
import useInput from "../services/useInput";
import moment from "moment";
import Modal from "../modal/modal";
import Button from "../buttons/button";

export default function Table({}) {
  const [devices, setDevices] = useState([]);
  const [showLog, setShowLog] = useState("");
  const input = useInput();
  const [addModal, setAddModal] = useState(false);

  function AddNote() {
    setAddModal(false);
  }

  function actionComplete(text) {
    setShowLog(text);
    setInterval(() => setShowLog(""), 10000);
  }

  const fechData = async () => {
    try {
      const devices = await fetchDevices();

      setDevices(devices);
    } catch (e) {
      console.log(e);
      setShowLog("ОШИБКА: Нет связи с базой данных...");
    }
  };

  useEffect(() => {
    fechData();
  }, [actionComplete]);
  return (
    <section className="main-table">
      <span className="showlog">{showLog}</span>
      <Fragment>
        <input type="text" id="search" className="control" {...input} />
        <label htmlFor="search" className="poisk">
          Поиск...
        </label>
      </Fragment>
      <Modal open={addModal} action="add">
        <Button onClick={() => AddNote()}>Выполнить</Button>
        <Button onClick={() => setAddModal(false)}>Отмена</Button>
      </Modal>
      <Button onClick={() => setAddModal(true)}>Добавить</Button>
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
          {devices
            .filter(
              (device) =>
                device.ipAddress
                  .toLowerCase()
                  .includes(input.value.toLowerCase()) ||
                device.title
                  .toLowerCase()
                  .includes(input.value.toLowerCase()) ||
                device.description
                  .toLowerCase()
                  .includes(input.value.toLowerCase()) ||
                device.note.toLowerCase().includes(input.value.toLowerCase()) ||
                moment(device.createdAt)
                  .format("DD/MM/YYYY")
                  .toLowerCase()
                  .includes(input.value.toLowerCase())
            )
            .map(({ id, ...props }) => {
              return (
                <Notes key={id} {...props} actionComplete={actionComplete} />
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
