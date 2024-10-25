import logo from "/monitoring.jpg";
import "./headers.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => setNowTime(new Date()), 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

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
