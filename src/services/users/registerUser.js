import axios from "axios";

export const registerUser = async (user) => {
  await axios.post( `/api/v1/users`, user );
};
