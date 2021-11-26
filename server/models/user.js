'use strict';
const mongoose = require('mongoose');

const validateEmail = require('../helpers/validate-email');
const capitalizeFirstLetter = require('../helpers/capitalize');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    get: capitalizeFirstLetter
  },
  lastName: {
    type: String,
    trim: true,
    get: capitalizeFirstLetter
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  passwordHashAndSalt: {
    type: String
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['defaultUser', 'artist'],
    default: 'defaultUser',
    required: true
  },
  bio: {
    type: String,
    required: false,
    trim: true
  },
  genre: {
    type: [String],
    default: []
  },
  instruments: {
    type: [String]
  },
  backgroundImg: {
    type: String
  },
  lastLocation: {
    type: pointSchema
  },
  paymentDetails: {
    stripeCustomerId: String,
    paymentToken: String,
    last4: String,
    brand: String,
    exp_month: String,
    exp_year: String
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
