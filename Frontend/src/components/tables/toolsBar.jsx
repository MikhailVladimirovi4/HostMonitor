export default function ToolsBar() {

  return (
    <section className="toolsbar">
      <p>
        Фильтры:
        <select className="select" name="" id="">
          <option value="">По умолчанию</option>
          <option value="offline">Только недоступные</option>
        </select>
      </p>
      <p>
        Сортировка(НЕ РАБОТАЕТ):
        <select className="select" name="" id="">
          <option value="">По умолчанию</option>
          <option value="ip">По возрастанию ip-адреса</option>
          <option value="data">По возрастанию даты</option>
        </select>
      </p>
    </section>
  );
}
