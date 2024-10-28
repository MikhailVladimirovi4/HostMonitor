import axios from "axios";

export const fetchDevices = async () => {
  return (await axios.get("http://localhost:5291/device")).data.devices;
};

export const deleteDevice = async (ipAddress) => {
  try {
    const str = await axios.delete(
      "http://localhost:5291/device?ipAddress=" + ipAddress
    );
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addDevice = async (ipAddress, title, description) => {
  try {
    const str = await axios.post("http://localhost:5291/Device", {
      ipAddress,
      title,
      description,
    });
    console.log(str.data);
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const editDevice = async (ipAddress, title, description, note) => {

  //console.log(ipAddress,title,description,note)
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
    );
    console.log(str.data);
    return str.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
