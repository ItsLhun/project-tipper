'use strict';

const { Router } = require('express');
const upload = require('../middleware/file-upload');
const User = require('./../models/user');
const routeGuardMiddleware = require('./../middleware/route-guard');
const bcryptjs = require('bcryptjs');
const stripeApi = require('./../helpers/stripe-api');

const router = new Router();

router.post(
  '/upload-avatar',
  upload.single('avatar'),
  async (req, res, next) => {
    const url = req.file.path;
    console.log(req.user);
    try {
      console.log('Session ID', req.session, req.user);
      const avatarUpdate = await User.findByIdAndUpdate(req.user._id, {
        avatarUrl: url
      });
      res.json({ avatarUpdate });
    } catch (err) {
      next(err);
    }
  }
);

router.post('/card', routeGuardMiddleware, async (req, res, next) => {
  const { paymentMethodToken } = req.body;
  console.log(paymentMethodToken);
  try {
    const newStripeCustomer = await stripeApi.customers.create({
      name: req.user.firstName,
      email: req.user.email,
      paymentToken: paymentMethodToken
    });
    console.log(newStripeCustomer);
    const payment = await User.findByIdAndUpdate(req.user._id, {
      paymentToken: paymentMethodToken
    });
    // console.log(payment);
    res.json({ payment });
  } catch (error) {
    next(error);
  }
});

router.post('/edit', routeGuardMiddleware, async (req, res, next) => {
  console.log('Profile edit');
  const { email, password, confirmPassword, bio, genre, instruments } =
    req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      email,
      password: bcryptjs.hashSync(password, 10),
      bio,
      genre: [...genre],
      instruments
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
