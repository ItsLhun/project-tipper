'use strict';

const express = require('express');
const router = express.Router();
const routeGuardMiddleware = require('./../middleware/route-guard');
const stripeApi = require('./../helpers/stripe-api');
const Transaction = require('./../models/transaction');
const Withdrawal = require('./../models/withdrawal');
const User = require('./../models/user');

// route to create a new transaction
router.post('/tip', routeGuardMiddleware, async (req, res, next) => {
  const { token, customerId, amount, artistId } = req.body;
  //   const name = `${req.user.firstName} ${req.user.lastName}`;
  try {
    await stripeApi.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: token,
      customer: customerId,
      confirm: true,
      error_on_requires_action: true
    });
    const transaction = await Transaction.create({
      user: req.user.id,
      artistTipped: artistId,
      amount: amount
    });
    // add balance to artist account minus app fee
    const artist = await User.findByIdAndUpdate(artistId, {
      $inc: {
        balance: amount * 0.85
      }
    });
    res.json({ transaction, message: 'Transaction successful', code: 200 });
  } catch (err) {
    next(err);
  }
});

// endpoint for artists funds withdrawal
router.post('/withdraw', routeGuardMiddleware, async (req, res, next) => {
  const { token, amount } = req.body;
  try {
    const withdrawal = await Withdrawal.create({
      user: req.user.id,
      amount: amount
    });
    // this requires a bank account token
    await stripeApi.payouts.create({
      amount: amount * 100,
      currency: 'usd',
      source_type: 'bank_account',
      source: token,
      statement_descriptor: `Withdrawal by ${req.user.firstName} ${req.user.lastName}`
    });

    res.json({ withdrawal, message: 'Withdrawal successful', code: 200 });
  } catch (err) {
    next(err);
  }
});

router.get('/list', routeGuardMiddleware, async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    }).populate('artistTipped');
    res.json({ transactions, code: 200 });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
