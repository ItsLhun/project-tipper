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

// router.get('event/list', (req, res, next) => {
//   Event.find()
//     .then((events) => {
//       res.json({ events });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = router;
