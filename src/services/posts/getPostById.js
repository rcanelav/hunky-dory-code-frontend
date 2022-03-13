import axios from "axios";

export const getPostById = async(id) => {
  return (await axios.get(`/api/v1/posts/${id}`)).data;
};
