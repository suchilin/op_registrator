import axios from 'axios';

export const login = (username, pass) => {
  if (loggedIn()) {
    return true;
  }
  return getToken(username, pass);
};

export const logout = () => {
  delete localStorage.token;
};

export const loggedIn = () => {
  return !!localStorage.token;
};

export const getToken = (username, pass) => {
  var resp = 0;
  let data = {
    username: username,
    password: pass,
  };
  return axios
    .post('http://localhost:8000/api/signin/', data)
    .then(response => {
      localStorage.token = response.data.token;
    });
};

export const getUser = () => {
  var user = '';
  let config = {
    headers: {
      authorization: 'Token ' + localStorage.token,
    },
  };

  return axios.get('http://localhost:8000/rest-auth/user/', config);
};

export const registration = user => {
  return axios.post('http://localhost:8000/api/signup/', user);
};
