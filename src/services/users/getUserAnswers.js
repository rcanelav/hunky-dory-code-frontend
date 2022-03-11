import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getUserAnswers = async(id, page, limit) => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${id}/answers?page=${page}&limit=${limit}`);
        return response.data;
    } catch (err) {
      return err.response;
    }
};
