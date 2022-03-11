import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const createAnswer = async (postId, content, token) => {
  try {
    return await axios({
      method: "POST",
      url: `${REACT_APP_API_URL}/api/v1/posts/${postId}/answers`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        content
      },
    });
  } catch (err) {
    return err.response;
  }
};
