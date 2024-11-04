import Button from "./components/buttons/button";
import useInput from "./components/services/useInput";

export default function LoginForm(setToken, setUser, setRole) {
  const inputLogin = useInput();
  const inputPassword = useInput();

  const userAuthorize = async ({ inputLogin, inputPassword }) => {
    try {
      const users = await login();
      // setDevices(devices);
      // setNumberNotes(devices.length);
    } catch (e) {
      console.log(e);
      setShowLog("ОШИБКА: Нет связи с базой данных...");
    }
  };

  return (
    <div className="dark">
      <section className="themeLogin">
        <p>
          <h4>Login:</h4>
          <input
            className="inputLogin"
            type="text"
            id="login"
            {...inputLogin}
          />
          <label htmlFor="login" />
        </p>
        <p>
          <h4>Password:</h4>
          <input
            className="inputLogin"
            type="text"
            id="password"
            {...inputPassword}
          />
          <label htmlFor="password" />
        </p>
        <p>
          <Button onClick={userAuthorize}>Войти...</Button>
        </p>
      </section>
    </div>
  );
}
