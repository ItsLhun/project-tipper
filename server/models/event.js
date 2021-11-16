'use strict';

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    location: [
      {
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true }
      }
    ],
    date: {
      type: Date,
      default: Date.now
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
