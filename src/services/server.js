import axios from "axios";
const ServerURL = "https://jsonplaceholder.typicode.com";

const getData = async (url) => {
  try {
    var response = await axios.get(`${ServerURL}/${url}`);

    var result = await response.data;
    return result;
  } catch (e) {
    return e.response.data;
  }
};

const postData = async (url, body) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, body);

    var result = await response.data;
    return result;
  } catch (e) {
    return e.response.data;
  }
};

const patchData = async (url, body) => {
  try {
    var response = await axios.patch(`${ServerURL}/${url}`, body);

    var result = await response.data;
    return result;
  } catch (e) {
    return e.response.data;
  }
};

const deleteData = async (url) => {
  try {
    var response = await axios.delete(`${ServerURL}/${url}`);

    var result = await response.data;
    return result;
  } catch (e) {
    return e.response.data;
  }
};

export { ServerURL, getData, postData, patchData, deleteData };
