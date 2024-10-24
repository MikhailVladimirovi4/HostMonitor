
import { useEffect, useState } from "react";
import { fetchDevices } from "../../services/device";
import "./table.css";

export default function Table() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fechData = async () => {
      let devices = await fetchDevices();

      setDevices(devices);
    };

    fechData();
    console.log(devices)
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
        {devices.map((d) => {
          <section key={d.ipAddress}>
            <Notes
              ipAddress={d.ipAddress}
              title={d.title}
              description={d.description}
              note={d.note}
              createdAt={d.createdAt}
            />
            ;
          </section>;
        })}
      </tbody>
    </table>
  );
}
