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

// add payment method details to user
router.post('/card', routeGuardMiddleware, async (req, res, next) => {
  const { token, card } = req.body;
  const name = req.user.firstName + ' ' + req.user.lastName;
  console.log('session: ', req.session.userId);
  try {
    const newStripeCustomer = await stripeApi.customers.create({
      name: name,
      email: req.user.email,
      payment_method: token
    });
    console.log(newStripeCustomer);
    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      {
        paymentDetails: {
          stripeCustomerId: newStripeCustomer.id,
          paymentToken: token,
          last4: card.last4,
          brand: card.brand,
          exp_month: card.exp_month,
          exp_year: card.exp_year
        }
      },
      { new: true }
    );
    console.log(updatedUser);
    res.json({ updatedUser, message: 'Card added successfully', status: 200 });
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
