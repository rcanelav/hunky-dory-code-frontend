import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const searchPublication = async (url) => {
  try {
    return (await axios.get(`${REACT_APP_API_URL}/api/v1/${url}`)).data;
  } catch (err) {
    return err.response;
  }
};
