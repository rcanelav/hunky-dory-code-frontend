import axios from "axios";

export const getTechnologies = async () => {
  return (await axios.get(`/api/v1/technologies`)).data.technologies;
};
