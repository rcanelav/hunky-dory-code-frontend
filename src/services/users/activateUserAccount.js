import axios from "axios";

export const activateUserAccount = async ( code ) => {
    return axios.get(`/api/v1/users/activation?code=${code}`);
}
