import "./modal.css";

export default function Modal({ open, action, children }) {

  function showContent(action) {
    switch (action) {
      case "del":
        return <p>Подтвердить удаление записи!</p>;
      case "edit":
        return <p>Подтвердить изменение записи!</p>;
      case "add":
        return <p>Подтвердить добавление записи!</p>;
      default:
        return "Подтвердить";
    }
  }

  return open ? (
    <div className="modal">
      <div className={action}>
        {showContent(action)} {children}
      </div>
    </div>
  ) : null;
}
