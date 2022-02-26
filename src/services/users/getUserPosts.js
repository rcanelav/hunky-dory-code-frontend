import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getUserPosts = async(id, page, limit) => {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${id}/posts?page=${page}&limit=${limit}`);
    return response.data;
};
