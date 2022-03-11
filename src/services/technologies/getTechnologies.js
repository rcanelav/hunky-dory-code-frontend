import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const getTechnologies = async () => {
  const response = await axios.get(`${REACT_APP_API_URL}/api/v1/technologies`);
  return response.data.technologies;
};
