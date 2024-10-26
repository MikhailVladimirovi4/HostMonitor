import { useEffect, useState } from "react";
import { fetchDevices } from "../services/device.js";
import Notes from "./notes.jsx";
import "./table.css";

export default function Table({}) {
  //const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);


  const fechData = async () => {
    // setLoading(true);

    try {
      const devices = await fetchDevices();

      setDevices(devices);
    } catch (e) {
      console.log(e);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fechData();
  }, []);
  return (
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
          return <Notes key={id} {...props} />;
        })}
      </tbody>
    </table>
  );
}
