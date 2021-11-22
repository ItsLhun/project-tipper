import api from './api';

export const listEvents = (data) =>
  api.get('/events').then((res) => res.data.event);

export const listDetail = (id) =>
  api.get(`/event/${id}`).then((res) => res.data.event);

export const createEvent = (body) =>
  api.post('/event/create', body).then((res) => res.data.event);

export const listPlayingNowEvents = () =>
  api.get('/event/list/now').then((res) => res.data.events);

export const searchEvent = (body) => {
  return api
    .get(`/event/search`, {
      params: {
        q: body?.q || '',
        limit: body?.limit || 0,
        genres: body?.genres || [],
        mode: body?.mode || 'query',
        userLat: body?.userLat || 0,
        userLng: body?.userLng || 0
      }
    })
    .then((response) => response.data);
};
