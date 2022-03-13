import axios from "axios";

export const getUserRating = async(id) => {
  return (await axios.get(`/api/v1/users/${id}/rating`)).data.rating;
};
