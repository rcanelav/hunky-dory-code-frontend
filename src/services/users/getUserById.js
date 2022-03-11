import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getUserById = async ( userId ) => {
  try {
    return (await axios.get(`${REACT_APP_API_URL}/api/v1/users/${userId}`)).data;
  } catch (err) {
    return err.response;
  }
};
