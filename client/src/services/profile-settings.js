import api from './api';

export const uploadAvatar = (body) => {
  return api
    .post('/profile/upload-avatar', body)
    .then((response) => response.data.user);
};
