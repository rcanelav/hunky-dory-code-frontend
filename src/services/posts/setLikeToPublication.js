import axios from "axios";

export const setLikeToPublication = async (type, publicationId, token) => {
    const response = await axios(
        {
            method: 'POST',
            url: `/api/v1/${type}/${publicationId}/likes`,
            headers: {'Authorization': `Bearer ${token}`}
        }
    );
    return response.data;
};
