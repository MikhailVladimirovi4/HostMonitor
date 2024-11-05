import { useState } from "react";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  return (
    <div>
      {token == "" ? (
        <LoginForm setToken={setToken} setUser={setUser} setRole={setRole} />
      ) : (
        <Dashboard user={user} role={role} token={token} />
      )}
    </div>
  );
}
