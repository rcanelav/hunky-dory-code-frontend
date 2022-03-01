import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getUserInfo = async(id) => {
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users/${id}`);
    return response.data.userData;
};
