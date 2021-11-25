'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const routeGuardMiddleware = require('./../middleware/route-guard');

const router = new Router();

router.post('/sign-up', (req, res, next) => {
  console.log('signUp');
  const { firstName, lastName, email, password, role } = req.body;
  console.log(req.body);
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      if (!role) {
        return User.create({
          firstName,
          lastName,
          email,
          passwordHashAndSalt: hash
        });
      } else {
        return User.create({
          firstName,
          lastName,
          email,
          passwordHashAndSalt: hash,
          role
        });
      }
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      console.log('Error on signup');
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', routeGuardMiddleware, (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/me', (req, res, next) => {
  const user = req.user;
  res.json({ user });
});

// update last user location
router.post(
  '/update-location',
  routeGuardMiddleware,
  async (req, res, next) => {
    const { location } = req.body;
    const formatedLocation = {
      type: 'Point',
      coordinates: [location.lat, location.lng]
    };
    const user = await User.findByIdAndUpdate(req.session.userId, {
      lastLocation: formatedLocation
    });
    res.json({ user, message: 'Location updated', code: 200 });
  }
);

module.exports = router;
