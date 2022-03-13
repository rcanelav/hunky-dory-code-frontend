import axios from "axios";

export const getCurrentProfile = async (token) => {
  return (
    await axios({
      method: "GET",
      url: `/api/v1/auth/current`,
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
