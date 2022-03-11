import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const registerUser = async (user) => {
    await axios.post( `${REACT_APP_API_URL}/api/v1/users`, user );
};
