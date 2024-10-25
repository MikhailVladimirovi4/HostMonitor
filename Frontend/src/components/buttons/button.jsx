import "./button.css";

export default function Button({ children, onClick }) {
  function renderStyle(param) {
    switch (param) {
      case "Edit":
        return "btnEdit";
      case "Dell":
        return "btnDell";
      case "Добавить устройство":
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
