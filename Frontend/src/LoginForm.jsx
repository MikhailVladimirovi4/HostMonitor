import Button from "./components/buttons/button";
import useInput from "./components/services/useInput";
import { login } from "./components/services/user";

export default function LoginForm({ setToken, setUser, setRole }) {
  const inputLogin = useInput();
  const inputPassword = useInput();

  async function userAuthorize(loginStr, passwordStr) {
    try {
      const session = await login(loginStr, passwordStr);
      setToken(session.token);
      setUser(session.user.name);
      setRole(session.user.role);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="dark">
      <section className="themeLogin">
        <h4>Login:</h4>

        <input className="inputLogin" type="text" id="login" {...inputLogin} />
        <label htmlFor="login" />

        <h4>Password:</h4>
        <input
          className="inputLogin"
          type="text"
          id="password"
          {...inputPassword}
        />
        <label htmlFor="password" />

        <p>
          <Button
            onClick={() => userAuthorize(inputLogin.value, inputPassword.value)}
          >
            Войти...
          </Button>
        </p>
      </section>
    </div>
  );
}
