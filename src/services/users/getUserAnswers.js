import axios from "axios";

export const getUserAnswers = async(id, page, limit) => {
  return (await axios.get(`/api/v1/users/${id}/answers?page=${page}&limit=${limit}`)).data;
};
