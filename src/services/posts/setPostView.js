import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const setPostView = async(id) => {
    try {
        await axios.put(`${REACT_APP_API_URL}/api/v1/posts/${id}/view`);
    } catch (err) {
      return err.response;
    }
};
