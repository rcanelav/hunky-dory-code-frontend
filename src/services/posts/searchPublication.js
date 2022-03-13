import axios from "axios";

export const searchPublication = async (url) => {
    return (await axios.get(`/api/v1/${url}`)).data;
};
