import axios from "axios";

export const fetchDevices = async () => {
  return (await axios.get("http://localhost:5291/device")).data.devices;
};
