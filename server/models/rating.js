'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userRating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artistRating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

const Rating = mongoose.model('Rating', schema);

module.exports = Rating;
