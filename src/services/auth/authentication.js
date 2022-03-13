import axios from "axios";

export const authentication = async(id_token, email) => {
    return  (await axios.post( `/api/v1/auth`, {
        id_token,
        email,
    })).data;
};
