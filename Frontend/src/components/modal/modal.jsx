import "./modal.css";
import useInput from "../services/useInput";
import Button from "../buttons/button";

export default function Modal({ open, action, children, ...props }) {
  const inputIpAddress = useInput(props.ipAddress);
  const inputTitle = useInput(props.title);
  const inputDescription = useInput(props.description);
  const inputNote = useInput(props.note);
  const inputNewName = useInput(props.newName)
  const inputUserName = useInput(props.newUserName)
  const inputPassword = useInput(props.newPassword)
  const inputRole = useInput(props.newRole)

  return open ? (
    <div className="modal">
      <div className={action}>
        {action == "add" || action == "edit" ? (
          <p>
            IP-Адрес:{" "}
            {action == "edit" ? (
              <span>{props.ipAddress}</span>
            ) : (
              <input
                type="text"
                id="ipAddress"
                className="inputmodal"
                {...inputIpAddress}
              />
            )}
            <label htmlFor="ipAddress" />
          </p>
        ) : null}
        {action == "add" || action == "edit" ? (
          <p>
            Тип устройства:
            <input
              type="text"
              id="title"
              className="inputmodal"
              {...inputTitle}
            />
            <label htmlFor="title" />
          </p>
        ) : null}
        {action == "add" || action == "edit" ? (
          <p>
            Место размещения:
            <input
              type="text"
              id="description"
              className="inputmodal"
              {...inputDescription}
            />
            <label htmlFor="description" />
          </p>
        ) : null}
        {action == "edit" ? (
          <p>
            Дополнительная информация:
            <input
              type="text"
              id="note"
              className="inputmodal"
              {...inputNote}
            />
            <label htmlFor="note" />
          </p>
        ) : null}
        {action == "del" ? (
          <p className="centered">Подтвердить удаление записи!</p>
        ) : null}

        {action == "newUser" ? (
          <>
            <p>
              Ф.И.О. :
              <input
                type="text"
                id="newName"
                className="inputmodal"
                {...inputNewName}
              />
              <label htmlFor="newName" />
            </p>
            <p>
              Логин :
              <input
                type="text"
                id="newUserName"
                className="inputmodal"
                {...inputUserName}
              />
              <label htmlFor="newUserName" />
            </p>
            <p>
              Пароль :
              <input
                type="text"
                id="newPassword"
                className="inputmodal"
                {...inputPassword}
              />
              <label htmlFor="newPassword" />
            </p>
            <p>
              Роль :
              <input
                type="text"
                id="newRole"
                className="inputmodal"
                {...inputRole}
              />
              <label htmlFor="newRole" />
            </p>
          </>
        ) : null}

        {action == "edit" ? (
          <Button
            onClick={() =>
              props.editNote(
                props.ipAddress,
                inputTitle.value,
                inputDescription.value,
                inputNote.value
              )
            }
          >
            Изменить
          </Button>
        ) : null}
        {children}
      </div>
    </div>
  ) : null;
}
