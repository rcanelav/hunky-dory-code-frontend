import axios from "axios";

export const verifyNewEmail = async ( code ) => {
    return axios.get(`/api/v1/users/confirmation?code=${code}`);
}
