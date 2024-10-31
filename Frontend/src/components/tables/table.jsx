import "./table.css";
import { useEffect, useState } from "react";
import { addDevice, fetchDevices } from "../services/device.js";
import Notes from "./notes.jsx";
import useInput from "../services/useInput";
import moment from "moment";
import Modal from "../modal/modal";
import Button from "../buttons/button";
import ToolsBar from "./toolsBar.jsx";

export default function Table({}) {
  const [devices, setDevices] = useState([]);
  const [showLog, setShowLog] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const input = useInput();
  const [numberNotes, setNumberNotes] = useState(0);
  const [waitResponsePingTime, setWaitResponsePingTime] = useState("1000");
  const [timerRequestNetStatus, setTimerRequestNetStatus] = useState("60000");
  const [sortParam, setSortParam] = useState("ipAddress");
  const [sortDirection, setSortDirection] = useState("ascending");
  const [filterOffline, setFilterOffline] = useState("false");
  var numberOfflineNotes = "В  РАБОТЕ";

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
      {
        sortParam == "ipAddress"
          ? sortDirection == "ascending"
            ? devices.sort((a, b) => (a.ipAddress > b.ipAddress ? 1 : -1))
            : devices.sort((a, b) => (a.ipAddress > b.ipAddress ? -1 : 1))
          : null;
      }
      {
        sortParam == "createdAt"
          ? sortDirection == "ascending"
            ? devices.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
            : devices.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          : null;
      }
      {
        sortParam == "title"
          ? sortDirection == "ascending"
            ? devices.sort((a, b) => (a.title > b.title ? 1 : -1))
            : devices.sort((a, b) => (a.title > b.title ? -1 : 1))
          : null;
      }
      {
        sortParam == "description"
          ? sortDirection == "ascending"
            ? devices.sort((a, b) => (a.description > b.description ? 1 : -1))
            : devices.sort((a, b) => (a.description > b.description ? -1 : 1))
          : null;
      }
      setDevices(devices);
      setNumberNotes(devices.length);
    } catch (e) {
      console.log(e);
      setShowLog("ОШИБКА: Нет связи с базой данных...");
    }
  };

  useEffect(() => {
    console.log(
      "изменение " +
        sortDirection +
        " " +
        sortParam +
        " " +
        timerRequestNetStatus +
        " " +
        waitResponsePingTime
    );
  }, [timerRequestNetStatus, waitResponsePingTime]);

  useEffect(() => {
    fechData();
  }, [updateData, sortDirection, sortParam]);

  return (
    <section className="maintable">
      <span className="showlog">{showLog}</span>
      <section className="fixedNotes">
        {"Всего: " + numberNotes + ". Offline: " + numberOfflineNotes}
      </section>
      <label className="fixed" htmlFor="search">
        Поиск...
      </label>
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
      <ToolsBar
        setWaitResponsePingTime={setWaitResponsePingTime}
        setTimerRequestNetStatus={setTimerRequestNetStatus}
        setSortParam={setSortParam}
        setSortDirection={setSortDirection}
        setFilterOffline={setFilterOffline}
      />
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

        <tbody className="bodytabl">
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
                <Notes
                  key={id}
                  {...props}
                  actionComplete={actionComplete}
                  waitResponsePingTime={waitResponsePingTime}
                  timerRequestNetStatus={timerRequestNetStatus}
                  filterOffline={filterOffline}
                />
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
