import api from './api';

export const loadArtist = (id) => {
  return api.get(`/artist/${id}`).then((response) => response.data.artist);
};

export const uploadArtistBackground = (image) => {
  const body = new FormData();
  body.append('avatar', image);
  return api
    .post('/artist/upload-background', body)
    .then((response) => response.data.backgroundUpdate);
};

// For now this will only get random artists limited to the specified quantity
export const getArtistList = (body) => {
  return api
    .get(`/artist/list`, { params: { limit: body?.limit || 0 } })
    .then((response) => response.data.artists);
};
