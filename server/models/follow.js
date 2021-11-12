'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Follow = mongoose.model('Follow', schema);

module.exports = Follow;
