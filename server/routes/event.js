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

router.post('/create', routeGuard, (req, res, next) => {
  Event.create(req.body.genres.map(({ title, url }) => ({ title, url })))
    .then((genres) => {
      const { title, duration, description } = req.body;
      return Event.create({
        creator: req.user._id,
        title,
        duration,
        description,
        genres: genres.map(({ _id }) => _id)
      });
    })
    .then((event) => {
      res.json({ event: event });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
