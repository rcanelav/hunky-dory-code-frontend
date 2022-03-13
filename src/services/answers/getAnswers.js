import axios from "axios";

export const getAnswers = async (postId, page, limit) => {
    return (await axios.get(`api/v1/posts/${postId}/answers?page=${page}&limit=${limit}`)).data;
};
