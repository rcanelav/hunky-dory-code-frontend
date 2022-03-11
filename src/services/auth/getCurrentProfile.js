import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getCurrentProfile = async (token) => {
  try {
    return (
      await axios({
        method: "GET",
        url: `${REACT_APP_API_URL}/api/v1/auth/current`,
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
  } catch (err) {
    return err.response;
  }
};
