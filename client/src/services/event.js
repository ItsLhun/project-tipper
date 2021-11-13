import api from './api';

export const createEvent = (data) => {
  return api.post('/events', data).then((res) => res.data.event);
};
