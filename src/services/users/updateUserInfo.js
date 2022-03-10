import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const updateUserInfo = async( userData, token ) => {
    try{
        const updatedUser = await axios({
            method: "PUT",
            url: `${REACT_APP_API_URL}/api/v1/users/${userData.userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data: userData
          });
    }catch( error ){
        return error.response;
    }
};

export const updateUserRole = async( userData, token ) => {
    try{
        const updatedUser = await axios({
            method: "PUT",
            url: `${REACT_APP_API_URL}/api/v1/users/${userData.userId}/role`,
            headers: { Authorization: `Bearer ${token}` },
            data: userData
          });
    }catch( error ){
        return error.response;
    }
};

export const updateProfilePicture = async( userData, token ) => {
    try{
        const updatedUser = await axios({
            method: "PUT",
            url: `${REACT_APP_API_URL}/api/v1/users/${userData.userId}/image`,
            headers: { Authorization: `Bearer ${token}` },
            data: userData.formData
            
        });
        return updatedUser.data.image;
    }catch( error ){
        return error.response;
    }
};
