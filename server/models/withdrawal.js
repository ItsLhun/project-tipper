'use strict';

const mongoose = require('mongoose');

// Withdrawal schema
const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Withdrawal = mongoose.model('Withdrawal', schema);

module.exports = Withdrawal;
