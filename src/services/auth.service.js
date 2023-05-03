import axios from 'axios';

const API_URL = 'https://sf-final-project-be.herokuapp.com/api/auth/';

const signUp = (email, password, clientId, firstName, lastName, aproved) => {
  return axios.post(API_URL + 'sign_up', {
    email,
    password,
    clientId,
    firstName,
    lastName,
    aproved,
  });
};

const signIn = async (email, password) => {
  const response = await axios
    .post(API_URL + 'sign_in', {
      email,
      password,
    });
  if (response.statusText === 'OK') {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const signOut = () => {
  localStorage.removeItem('user');
};


export default {
  signUp,
  signIn,
  signOut,
};
