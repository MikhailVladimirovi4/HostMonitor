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

export const fetchUsers = async (token) => {
  try {
    const str = await axios.get("http://localhost:5291/User", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return str.data.users;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteUser = async (userName, token) => {
  try {
    const str = await axios.delete(
      "http://localhost:5291/User?userName=" + userName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addUser = async (newName, newUserName, password, role, token) => {
  try {
    const str = await axios.post(
      "http://localhost:5291/User/register",
      {
        UserName: newUserName,
        Name: newName,
        Password: password,
        Role: role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
