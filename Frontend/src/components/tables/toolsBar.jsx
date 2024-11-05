import Button from "../buttons/button";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import { fetchUsers, addUser } from "../services/user";
import ShowUsers from "./showUsers";
import "./table.css";

export default function ToolsBar({
  setPingResponseTime,
  setNetCheckInterval,
  setSortParam,
  setSortDirection,
  setFilterOffline,
  setShowLog,
  token,
}) {
  const [userModal, setUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [getUsers, setGetUsers] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);

  function NewUser(newName, newUserName, newPassword, newRole) {
    actionUserComplete("Пользователь добавлен.");
    addUser(newName, newUserName, newPassword, newRole, token);
    setAddUserModal(false);
  }

const fetchDataUsers = async () => {
    try {
      const users = await fetchUsers(token);
      setUsers(users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDataUsers();
  }, [getUsers]);

  function actionUserComplete(text) {
    setGetUsers(!getUsers);
    setShowLog(text);
    setInterval(() => setShowLog(""), 10000);
  }

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
      <section>
        <p>
          Интервал опроса:
          <select
            className="select"
            onChange={(value) => setNetCheckInterval(value.target.value)}
          >
            <option value="300000">5 минут</option>
            <option value="60000">1 минута</option>
            <option value="600000">10 минут</option>
            <option value="1200000">20 минут</option>
            <option value="1800000">30 минут</option>
            <option value="10000">10 сек.</option>
          </select>
        </p>
        <p>
          Ожидание ответа (мс):
          <select
            className="select"
            onChange={(value) => setPingResponseTime(value.target.value)}
          >
            <option value="200">200 мс.</option>
            <option value="500">500 мс.</option>
            <option value="1000">1 сек.(1000 мс.)</option>
            <option value="1500 ">1500 мс.</option>
            <option value="2000">2 секунды!</option>
            <option value="1">1 mc.</option>
          </select>
        </p>
        <p>
          <Button onClick={() => (setUserModal(true), actionUserComplete(""))}>
            Пользователи
          </Button>
        </p>
      </section>

      <Modal open={userModal} action={"user"}>
        <table className="tableUser">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Логин</th>
              <th>Роль</th>
              <th>Del</th>
            </tr>
          </thead>
          {users.map(({ id, ...props }) => {
            return (
              <ShowUsers
                key={id}
                {...props}
                token={token}
                actionUserComplete={actionUserComplete}
              />
            );
          })}
        </table>
        <p>
          <Button onClick={() => setAddUserModal(true)}>Добавить</Button>
          <Button onClick={() => setUserModal(false)}>Назад</Button>
        </p>
      </Modal>
      <Modal
        open={addUserModal}
        action="newUser"
        newName="Ф.И.О."
        newUserName="Логин"
        newPassword="Пароль"
        newRole="admin/user"
      >
        <p>
          <Button
            onClick={() =>
              NewUser(
                newName.value,
                newUserName.value,
                newPassword.value,
                newRole.value
              )
            }
          >
            Добавить
          </Button>
          <Button onClick={() => setAddUserModal(false)}>Отмена</Button>
        </p>
      </Modal>
    </section>
  );
}
