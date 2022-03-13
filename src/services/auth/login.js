import axios from "axios";

export const login = async (email, password) => {
  return (
    await axios.post(`/api/v1/auth/login`, {
      email,
      password,
    })
  ).data;
};
