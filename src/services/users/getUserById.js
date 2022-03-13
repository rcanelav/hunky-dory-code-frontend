import axios from "axios";

export const getUserById = async ( userId ) => {
    return (await axios.get(`/api/v1/users/${userId}`)).data;
};
