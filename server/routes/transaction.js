'use strict';

const express = require('express');
const router = express.Router();
const routeGuardMiddleware = require('./../middleware/route-guard');
const stripeApi = require('./../utils/stripe-api');
const Transaction = require('./../models/transaction');

// route to create a new transaction
router.post('/tip', routeGuardMiddleware, async (req, res, next) => {
  const { token, amount, artistId } = req.body;
  //   const name = `${req.user.firstName} ${req.user.lastName}`;
  await stripeApi.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method: token,
    confirm: true,
    error_on_requires_action: true
  });
  const transaction = await Transaction.create({
    userId: req.user.id,
    artistTipped: artistId,
    amount
  });

  // stripeApi.customers.create({
  //     name: name,
  //     email: req.user.email,
  //     payment_method: token
  // }).then(customer => {
  //     return
});
