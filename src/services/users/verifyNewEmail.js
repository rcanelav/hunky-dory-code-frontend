import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const verifyNewEmail = async ( code ) => {
    try{
        return axios.get(`${REACT_APP_API_URL}/api/v1/users/confirmation?code=${code}`);
    }catch( error ){
        return error.response;
    }
}
