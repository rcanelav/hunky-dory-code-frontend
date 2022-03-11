import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const login = async (email, password) => {
  try {
    return (
      await axios.post(`${REACT_APP_API_URL}/api/v1/auth/login`, {
        email,
        password,
      })
    ).data;
  } catch (err) {
    return err.response;
  }
};
