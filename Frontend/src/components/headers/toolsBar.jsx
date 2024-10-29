import { useState } from "react";

export default function ToolsBar() {
  const [sortNites,setSortNotes] = useState('')
  const [group,setGroup] = useState('')
  
  return (
    <section className="maintoolsbar">
      <p>
        <p>Группировка</p>
        <select name="" id="">
          <option value="">По умолчанию</option>
          <option value="offline">Сначала недоступные</option>
        </select>
      </p>
      <p>
        <p>Сортировка</p>
        <select name="" id="">
          <option value="">По умолчанию</option>
          <option value="ip">По возсрастанию ip-адреса</option>
          <option value="data">По возсрастанию даты</option>
        </select>
      </p>
    </section>
  );
}
