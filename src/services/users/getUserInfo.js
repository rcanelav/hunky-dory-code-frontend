import axios from "axios";

export const getUserInfo = async(id) => {
  return (await axios.get(`/api/v1/users/${id}`)).data.userData;
};
