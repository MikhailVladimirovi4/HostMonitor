import axios from "axios";

export const fetchDevices = async () => {
  return (await axios.get("http://localhost:5291/device")).data.devices;
};

export const deleteDevice = async (ipAddress) => {
  const str = await axios.delete(
    "http://localhost:5291/device?ipAddress=" + ipAddress
  );
  return str.data;
};
