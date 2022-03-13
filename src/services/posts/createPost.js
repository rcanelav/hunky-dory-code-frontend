import axios from "axios";

export const createPost = async (title, content, technology, token) => {
  return axios({
    method: "POST",
    url: `/api/v1/posts`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      title,
      content,
      technology,
    },
  });
};
