import api from './api';

export const tipArtist = (body) => {
  return api.post('/transaction/tip', body).then((response) => response.data);
};

export const getTransactions = (body) => {
  return api.get('/transaction/list', body).then((response) => response.data);
};
