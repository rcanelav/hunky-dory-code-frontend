import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getAnswers = async (postId, page, limit) => {
  try {
    return (await axios.get(`${REACT_APP_API_URL}/api/v1/posts/${postId}/answers?page=${page}&limit=${limit}`)).data;
  } catch (err) {
    console.log(err);
  }
};
