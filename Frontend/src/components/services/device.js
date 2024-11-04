import axios from "axios";

export const fetchDevices = async (token) => {
  try {
    return (
      await axios.get("http://localhost:5291/device", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data.devices;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteDevice = async (ipAddress, token) => {
  try {
    const str = await axios.delete(
      "http://localhost:5291/device?ipAddress=" + ipAddress,
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

export const addDevice = async (ipAddress, title, description, token) => {
  try {
    const str = await axios.post(
      "http://localhost:5291/Device",
      {
        ipAddress,
        title,
        description,
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

export const editDevice = async (ipAddress, title, description, note) => {
  try {
    const str = await axios.put(
      "http://localhost:5291/Device?ipAddress=" +
        ipAddress +
        "&title=" +
        title +
        "&description=" +
        description +
        "&note=" +
        note
      // {
      //   headers: {
      //     Authorization:
      //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjljODIxZTRjLWU2ZmUtNDAwNy1iYjUwLWExYmJiZDY1YjAxMyIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTczMDY1OTk0NSwiZXhwIjoxNzMwNzQ2MzQ1LCJpYXQiOjE3MzA2NTk5NDV9.BeKFw40gw2j3B1S7N6IdvPPnYUcoA_ACc6g4CX2vo6A",
      //   },
      // }
    );
    console.log(str.data);
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const netStatus = async (ipAddress, waitTime, token) => {
  try {
    const response = (
      await axios.get(
        "http://localhost:5291/Tools/ping?host=" +
          ipAddress +
          "&waitTime=" +
          waitTime,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};
