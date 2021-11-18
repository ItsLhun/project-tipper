import api from './api';

export const loadArtist = (id) => {
  api.get(`/artist/${id}`).then((response) => response.data.artist);
};

export const uploadArtistBackground = (image) => {
  const body = new FormData();
  body.append('avatar', image);
  return api
    .post('/artist/upload-background', body)
    .then((response) => response.data.backgroundUpdate);
};
