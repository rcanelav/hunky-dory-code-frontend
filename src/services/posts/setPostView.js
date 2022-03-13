import axios from "axios";

export const setPostView = async(id) => {
  await axios.put(`/api/v1/posts/${id}/view`);
};
