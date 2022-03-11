import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const createPost = async (title, content, technology, token) => {
  try {
    return axios({
      method: "POST",
      url: `${REACT_APP_API_URL}/api/v1/posts`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        title,
        content,
        technology,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
