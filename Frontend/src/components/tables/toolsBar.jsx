export default function ToolsBar({
  setWaitResponsePingTime,
  setTimerRequestNetStatus,
  setSortParam,
  setSortDirection,
}) {
  return (
    <section className="toolsbar">
      <section>
        <p>
          Фильтры:
          <select className="select">
            <option value="">По умолчанию</option>
            <option value="offline">Только недоступные</option>
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
      <section>
        <p>
          Интервал опроса:
          <select
            className="select"
            onChange={(value) => setTimerRequestNetStatus(value.target.value)}
          >
            <option value="300000">5 минут</option>
            <option value="60000 ">1 минута</option>
            <option value="600000 ">10 минут</option>
            <option value="1200000 ">20 минут</option>
            <option value="1800000 ">30 минут</option>
          </select>
        </p>
        <p>
          Ожидание ответа (мс):
          <select
            className="select"
            onChange={(value) => setWaitResponsePingTime(value.target.value)}
          >
            <option value="1000">1 сек.(1000 мс.)</option>
            <option value="200">200 мс.</option>
            <option value="500">500 мс.</option>
            <option value="1500 ">1500 мс.</option>
            <option value="2000">2 секунды!</option>
          </select>
        </p>
      </section>
    </section>
  );
}
