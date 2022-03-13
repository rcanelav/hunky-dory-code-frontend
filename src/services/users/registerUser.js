import axios from "axios";

export const registerUser = async (user) => {
  return (await axios.post( `/api/v1/users`, user )).data;
};
