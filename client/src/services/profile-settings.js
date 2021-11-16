import api from './api';

export const uploadAvatar = (image) => {
  const body = new FormData();
  body.append('avatar', image);
  return api
    .post('/profile/upload-avatar', body)
    .then((response) => response.data.avatarUpdate);
};

/*
export const uploadAvatar = (body) => {
  api
    .post('/profile/upload-avatar', body)
    .then((response) => response.data.avatarUpdate);
};
*/

export const updateAccountSettings = (body) => {
  return api.post('/profile/edit', body).then((response) => response.data.user);
};
