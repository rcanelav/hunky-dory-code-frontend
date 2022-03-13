import axios from "axios";

export const createAnswer = async (postId, content, token) => {
  return axios({
    method: "POST",
    url: `/api/v1/posts/${postId}/answers`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      content
    },
  });
};
