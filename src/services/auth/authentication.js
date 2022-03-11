import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const authentication = async(id_token, email) => {
    try{
        return  (await axios.post( `${REACT_APP_API_URL}/api/v1/auth`, {
            id_token,
            email,
        })).data;
    }catch(err){
        return err.response;
    }
};
