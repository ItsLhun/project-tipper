import api from './api';

export const listEvents = (data) =>
  api.get('/events').then((res) => res.data.event);

export const listDetail = (id) =>
  api.get(`/event/${id}`).then((res) => res.data.event);

export const createEvent = (data) => {
  api.post('/event/create', data).then((res) => res.data.event);