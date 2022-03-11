import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const registerUser = async (user) => {
    try {
        await axios.post( `${REACT_APP_API_URL}/api/v1/users`, user );
    } catch (err) {
      return err.response;
    }
};
