import "./table.css";
import { useEffect, useState } from "react";
import { addDevice, fetchDevices } from "../services/device.js";
import Notes from "./notes.jsx";
import useInput from "../services/useInput";
import Modal from "../modal/modal";
import Button from "../buttons/button";
import ToolsBar from "./toolsBar.jsx";

export default function Table({ token }) {
  const [devices, setDevices] = useState([]);
  const [showLog, setShowLog] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const searchFilter = useInput();
  const [numberNotes, setNumberNotes] = useState(0);
  const [pingResponseTime, setPingResponseTime] = useState("200");
  const [netCheckInterval, setNetCheckInterval] = useState("300000");
  const [sortParam, setSortParam] = useState("ipAddress");
  const [sortDirection, setSortDirection] = useState("ascending");
  const [filterOffline, setFilterOffline] = useState("false");
  var [totalOffline, setTotalOffline] = useState(0);

  function AddNote(ipAddress, title, description) {
    const response = addDevice(ipAddress, title, description, token);
    setAddModal(false);
    response.then((value) => actionComplete(value));
  }

  function actionComplete(text) {
    setUpdateData(!updateData);
    setShowLog(text);
    setInterval(() => setShowLog(""), 10000);
  }

  function changeTotalOffline(oldNetNoteStatus, netNoteStatus) {
    if (oldNetNoteStatus != "offline" && netNoteStatus == "offline") {
      totalOffline++;
    } else if (oldNetNoteStatus == "offline" && netNoteStatus != "offline") {
      {
        totalOffline--;
      }
    }
    setTotalOffline(totalOffline);
  }

  const fechData = async () => {
    try {
      const devices = await fetchDevices(token);
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
    fechData();
  }, [updateData, sortDirection, sortParam]);

  return (
    <section className="maintable">
      <span className="showlog">{showLog}</span>
      <h1 className="fixedNotes">
        {"Всего: " + numberNotes + ". Offline: " + totalOffline}
      </h1>
      <label className="fixed" htmlFor="search">
        Поиск...
      </label>
      <input type="text" id="search" className="control" {...searchFilter} />

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
        setPingResponseTime={setPingResponseTime}
        setNetCheckInterval={setNetCheckInterval}
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
          {devices.map(({ id, ...props }) => {
            return (
              <Notes
                key={id}
                {...props}
                actionComplete={actionComplete}
                pingResponseTime={pingResponseTime}
                netCheckInterval={netCheckInterval}
                filterOffline={filterOffline}
                changeTotalOffline={changeTotalOffline}
                searchFilter={searchFilter}
                totalOffline={totalOffline}
                setTotalOffline={setTotalOffline}
                token={token}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
