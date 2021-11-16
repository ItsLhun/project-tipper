'use strict';

const User = require('./../models/user');

module.exports = (req, res, next) => {
  console.log(req.user ? req.user : 'no user');
  console.log(
    req.session.userId ? req.session.userId : 'no userId in the session'
  );
  const userId = req.session.userId;
  if (userId) {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};
