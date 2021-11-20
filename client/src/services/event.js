import api from './api';

export const listEvents = (data) =>
  api.get('/events').then((res) => res.data.event);

export const listDetail = (id) =>
  api.get(`/event/${id}`).then((res) => res.data.event);

export const createEvent = (body) =>
  api.post('/event/create', body).then((res) => res.data.event);
