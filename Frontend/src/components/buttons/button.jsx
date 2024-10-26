import "./button.css";

export default function Button({ children, onClick }) {
  function renderStyle(param) {
    switch (param) {
      case "Edit":
        return "btnEdit";
      case "X":
        return "btnDel";
      case "Добавить":
        return "btnAdd";
      default:
        return "btn";
    }
  }

  return (
    <button className={renderStyle(children)} onClick={onClick}>
      {children}
    </button>
  );
}
