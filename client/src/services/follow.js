import api from './api';

export const countFollow = (id) => {
  return api
    .get(`artist/${id}/count-followers`, id)
    .then((response) => response.data.follow);
};

export const checkFollow = (id) => {
  return api
    .get(`/artist/${id}/follow`, id)
    .then((response) => response.data.follow);
};

export const followArtist = (id) => {
  return api
    .post(`/artist/${id}/follow`, id)
    .then((response) => response.data.follow);
};
