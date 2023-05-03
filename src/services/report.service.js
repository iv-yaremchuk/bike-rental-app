import axios from 'axios';

const API_URL = 'https://sf-final-project-be.herokuapp.com/api/public/';

const createReport = async (
  licenseNumber,
  ownerFullName,
  type,
  clientId,
  color,
  date,
  description
) => {
  const response = await axios.post(API_URL + 'report', {
    licenseNumber,
    ownerFullName,
    type,
    clientId,
    color,
    date,
    description,
  });
  console.log(response.data);
};

export default { createReport };
