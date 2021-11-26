import api from './api';

export const tipArtist = (body) => {
  return api.post('/transaction/tip', body).then((response) => response.data);
};
