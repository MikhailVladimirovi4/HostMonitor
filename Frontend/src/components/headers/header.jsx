import logo from "/monitoring.jpg";
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
      <img src={logo} alt="Графика" width="10%" />
      <span>
        <section className="colorwhite">Тут может быть ваша РЕКЛАМА...</section>
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
