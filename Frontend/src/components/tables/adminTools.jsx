import Button from "../buttons/button";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import { fetchUsers, addUser } from "../services/user";
import ShowUsers from "./showUsers";

export default function AdminTools({
  setShowLog,
  token,
}) {
  const [userModal, setUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [getUsers, setGetUsers] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);

  function actionUserComplete(text) {
    setGetUsers(!getUsers);
    setGetUsers(!getUsers);
    setShowLog(text);
    setInterval(() => setShowLog(""), 10000);
  }

  function NewUser(newName, newUserName, newPassword, newRole) {
    setGetUsers(!getUsers);
    setGetUsers(!getUsers);
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

  return (
    <>
        <p>
          <Button onClick={() => (setUserModal(true), actionUserComplete(""))}>
            Пользователи
          </Button>
        </p>
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
    </>
  );
}
