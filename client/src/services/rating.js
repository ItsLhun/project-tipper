import api from './api';

export const checkRating = (id) => {
  return api.get(`/artist/${id}/rate`).then((response) => response.data.rate);
};

export const enterRating = (id, body) => {
  return api
    .post(`/artist/${id}/rate`, body)
    .then((response) => response.data.rate);
};
