import axios from "axios";

export const activateUserAccount = async ( code ) => {
    axios.get(`/api/v1/users/activation?code=${code}`);
}
