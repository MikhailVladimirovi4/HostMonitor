import "./modal.css";
import useInput from "../services/useInput";
export default function Modal({ open, action, children, ...props }) {
  const inputIpAddress = useInput(props.ipAddress);
  const inputTitle = useInput(props.title);
  const inputDescription = useInput(props.description);
  const inputNote = useInput(props.note);

  return open ? (
    <div className="modal">
      <div className={action}>
        {action == "add" || action == "edit" ? (
          <p>
            IP-Адрес:{" "}
            {action == "edit" ? (
              <section>{props.ipAddress}</section>
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
        {children}
      </div>
    </div>
  ) : null;
}
