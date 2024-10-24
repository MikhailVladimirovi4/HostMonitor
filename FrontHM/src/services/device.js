import axios from "axios";

export const fetchDevices = async () => {
  try {
    var response = await axios.get("http://localhost:5291/device");

    return response.data.devices;
  } catch (e) {
    console.error(e);
  }
};
