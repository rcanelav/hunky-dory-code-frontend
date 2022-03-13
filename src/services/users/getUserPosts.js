import axios from "axios";

export const getUserPosts = async(id, page, limit) => {
  return (await axios.get(`/api/v1/users/${id}/posts?page=${page}&limit=${limit}`)).data;
};
