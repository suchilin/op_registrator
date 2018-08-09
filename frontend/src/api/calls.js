import axios from 'axios';
import {loggedIn} from '~/src/auth/authCalls';

let url = 'http://localhost:8000/api/';

export const addClient = client => {
  if (loggedIn()) {
    return axios.post(url + 'client/', client, {
      headers: {Authorization: localStorage.token},
    });
  }
};

export const deleteClient = id => {
  if (loggedIn()) {
    return axios({
      method: 'delete',
      url: url + 'client/',
      data: {
        id: id,
      },
      headers: {
        Authorization: localStorage.token,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
};

export const updateClient = client => {
  if (loggedIn()) {
    return axios.put(url + 'client/', client, {
      headers: {Authorization: localStorage.token},
    });
  }
};

export const fetchOneClient = id => {
  if (loggedIn()) {
    return axios.get(url + 'client/' + id, {
      headers: {Authorization: localStorage.token},
    });
  }
};

export const fetchClientsData = () => {
  if (loggedIn()) {
    return axios.get(url + 'client/', {
      headers: {Authorization: localStorage.token},
    });
  }
};
