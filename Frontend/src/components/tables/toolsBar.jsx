import "./table.css";
import AdminTools from "./adminTools";

export default function ToolsBar({
  setPingResponseTime,
  setNetCheckInterval,
  setSortParam,
  setSortDirection,
  setFilterOffline,
  setShowLog,
  token,
  role,
}) {
  return (
    <section className="toolsbar">
      <section>
        <p>
          Фильтры:
          <select
            className="select"
            onChange={(value) => setFilterOffline(value.target.value)}
          >
            <option value="false">По умолчанию</option>
            <option value="true">Только недоступные</option>
          </select>
        </p>
        <p>
          Параметр сортировки:
          <select
            className="select"
            onChange={(value) => setSortParam(value.target.value)}
          >
            <option value="ipAddress">IP-Адрес</option>
            <option value="createdAt">Дата создания</option>
            <option value="title">Тип устройства</option>
            <option value="description">Место размещения</option>
          </select>
        </p>
        <p>
          Атрибут сортировки:
          <select
            className="select"
            onChange={(value) => setSortDirection(value.target.value)}
          >
            <option value="ascending">По возрастанию</option>
            <option value="descending ">По убыванию</option>
          </select>
        </p>
      </section>
      {role == "admin" && (
        <AdminTools
          setPingResponseTime={setPingResponseTime}
          setNetCheckInterval={setNetCheckInterval}
          setShowLog={setShowLog}
          token={token}
        />
      )}
    </section>
  );
}
