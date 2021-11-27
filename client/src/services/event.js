import api from './api';

export const listEvents = (body) => {
  return api
    .get('/event/list', { params: { limit: body?.limit || 0 } })
    .then((res) => res.data.events);
};

export const listEventDetail = (id) => {
  return api.get(`/event/${id}`, id).then((response) => response.data.event);
};

export const createEvent = (body) =>
  api.post('/event/create', body).then((res) => res.data.event);

export const listPlayingNowEvents = () =>
  api.get('/event/list/now').then((res) => res.data.events);

export const listPlayingTodayEvents = () =>
  api.get('/event/list/today').then((res) => res.data.events);

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
