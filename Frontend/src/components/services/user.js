import axios from "axios";

export const login = async ({ login, password }) => {
  try {
    return (await axios.post("http://localhost:5291/device", {})).data.users;
  } catch (e) {
    console.log(e);
    return null;
  }
};
