import axios from "axios";

export const fetchDevices = async () => {
  return (await axios.get("http://localhost:5291/device")).data.devices;
};

export const deleteDevice = async (ipAddress) => {
  try {
    const str = await axios.delete(
      "http://localhost:5291/device?ipAddress=" + ipAddress
    );
    console.log(str.data);
    return str;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addDevice = async (ipAddress, title, description) => {
  try {
    const str = await axios.post(
      "http://localhost:5291/Device?ipAddress=" +
        ipAddress +
        "&title=" +
        title +
        "&description=" +
        description
    );
    console.log(str);
  } catch (e) {
    console.log(e);
    return null;
  }
};
