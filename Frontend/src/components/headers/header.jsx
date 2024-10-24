import logo from "/monitoring.jpg";
import './headers.css'

const nowTime = new Date();

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Графика" width="150" />
      <span>
        <section className="colorwhite">Контроль - залог Успеха!</section>
      </span>
      <span>
        <time>
          <section className="colorwhite">
            {nowTime.toLocaleTimeString()}
          </section>
        </time>
      </span>
    </header>
  );
}