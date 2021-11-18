'use strict';
const mongoose = require('mongoose');

const validateEmail = require('../helpers/validate-email');
const capitalizeFirstLetter = require('../helpers/capitalize');

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
    type: [String]
  },
  instruments: {
    type: [String]
  },
  backgroundImg: {
    type: String
  },
  paymentToken: {
    type: String,
    default: ''
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
