import useInput from "./components/services/useInput";

export default function LoginForm() {
  const inputLogin = useInput();
  const inputPassword = useInput();

  return (
    <div>

        Login:
        <input type="text" id="login" {...inputLogin} />
        <label htmlFor="login" />

        Password:
        <input type="text" id="password" {...inputPassword} />
        <label htmlFor="password" />

    </div>
  );
}
