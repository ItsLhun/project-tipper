'use strict';

const mongoose = require('mongoose');

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

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    location: {
      type: pointSchema
    },
    date: {
      type: Date,
      default: Date.now
    },
    duration: {
      type: Number,
      default: 1
    },
    description: {
      type: String
    },
    genre: {
      type: [String]
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
