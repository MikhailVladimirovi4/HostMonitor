import Button from '../buttons/button.jsx';

export default function ToolsBar() {
  return (
    <section className="toolsBar">
      <Button  onClick={() => handelClick()}>Добавить устройство</Button>
    </section>
  );
}