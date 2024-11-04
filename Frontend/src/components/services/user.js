import axios from "axios";

export const login = async (strLogin, password) => {
  try {
    return (
      await axios.post("http://localhost:5291/User/login", {
        UserName: strLogin,
        Password: password,
      })
    ).data.result;

  } catch (e) {
    console.log(e);
    return null;
  }
};
