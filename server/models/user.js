'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String
  }
  // avatar: {
  //   type: String,
  //   default: ''
  // },
  // role: {
  //   type: String,
  //   enum: ['defaultUser', 'artist'],
  //   default: 'defaultUser',
  //   required: true
  // },
  // bio: {
  //   type: String,
  //   default: '',
  //   trim: true
  // },
  // genre: {
  //   type: [String]
  // },
  // instruments: {
  //   type: [String]
  // },
  // backgroundImg: {
  //   type: String
  // }
  // paymentToken: {
  //   type: String,
  //   default: ''
  // }
});

const User = mongoose.model('User', schema);

module.exports = User;
