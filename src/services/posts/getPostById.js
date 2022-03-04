import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getPostById = async(id) => {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/posts/${id}`);
    return response.data;
};