import Button from "../buttons/button.jsx";

export default function ToolsBar({onClick}) {
  return (
    <section className="toolsBar">
      <Button onClick={onClick}>Добавить устройство</Button>
    </section>
  );
}
