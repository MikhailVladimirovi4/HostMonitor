import "./table.css";
import { useEffect, useState } from "react";
import { addDevice, fetchDevices } from "../services/device.js";
import Notes from "./notes.jsx";
import useInput from "../services/useInput";
import moment from "moment";
import Modal from "../modal/modal";
import Button from "../buttons/button";

export default function Table({}) {
  const [devices, setDevices] = useState([]);
  const [showLog, setShowLog] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const input = useInput();

  function AddNote(ipAddress, title, description) {
    const response = addDevice(ipAddress, title, description);
    setAddModal(false);
    response.then((value) => actionComplete(value));
  }

  function actionComplete(text) {
    setUpdateData(!updateData);
    setShowLog(text);
    setInterval(() => setShowLog(""), 10000);
  }

  const fechData = async () => {
    try {
      const devices = await fetchDevices();
      // {
      //   group == "offline"
      //     ? (devices = devices.sort((a, b) => a.localeCompare(b)))
      //     : null;
      // }

      setDevices(devices);
    } catch (e) {
      console.log(e);
      setShowLog("ОШИБКА: Нет связи с базой данных...");
    }
  };

  useEffect(() => {
    fechData();
  }, [updateData]);

  return (
    <section className="maintable">
      <span className="showlog">{showLog}</span>
      <label className="fixed" htmlFor="search">Поиск...</label>
      <input type="text" id="search" className="control" {...input} />

      <Modal
        open={addModal}
        action="add"
        ipAddress="1-255.1-255.1-255.1-255"
        title="Тип устройства"
        description="Описание места размещения"
      >
        <p>
          <Button
            onClick={() =>
              AddNote(ipAddress.value, title.value, description.value)
            }
          >
            Добавить
          </Button>
          <Button onClick={() => setAddModal(false)}>Отмена</Button>
        </p>
      </Modal>

      <Button onClick={() => setAddModal(true)}>Добавить...</Button>

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

        <tbody className='bodytabl'>
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
