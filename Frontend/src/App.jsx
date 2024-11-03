import { useState } from "react";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

export default function App() {
  const [token, setToken] = useState("");

  return <div>{token == "" ? <LoginForm /> : <Dashboard />}</div>;
}
