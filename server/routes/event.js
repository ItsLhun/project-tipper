'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const Event = require('./../models/event');

router.get('/list', (req, res, next) => {
  Event.find()
    .then((events) => {
      res.json({ events });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/create', routeGuard, async (req, res, next) => {
  try {
    const { title, date, time, duration, description, genres, location } =
      req.body;
    const formatedDate = new Date(date + 'T' + time);
    const formatedLocation = {
      type: 'Point',
      coordinates: [location.lat, location.lng]
    };

    console.log(
      title,
      formatedDate,
      duration,
      description,
      genres,
      formatedLocation
    );
    const event = await Event.create({
      title,
      date: formatedDate,
      duration,
      description,
      genres,
      location: formatedLocation,
      artist: req.user._id
    });
    console.log(event);
    res.json({ event });
  } catch (error) {
    next(error);
  }

  // Event.create(req.body.genres.map(({ title, url }) => ({ title, url })))
  //   .then((genres) => {
  //     const { title, duration, description } = req.body;
  //     return Event.create({
  //       creator: req.user._id,
  //       title,
  //       duration,
  //       description,
  //       genres: genres.map(({ _id }) => _id)
  //     });
  //   })
  //   .then((event) => {
  //     res.json({ event: event });
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });
});

module.exports = router;
