'use strict';

const express = require('express');
const router = express.Router();
const Artist = require('./../models/user');
const Follow = require('./../models/follow');
const Rating = require('./../models/rating');
const routeGuardMiddleware = require('./../middleware/route-guard');

router.get('/:id/rate', routeGuardMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const rate = await Rating.findOne({ userRating: req.user._id });
    res.json({ rate });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/rate', routeGuardMiddleware, async (req, res, next) => {
  const { id } = req.params;
  let rate;
  try {
    const findRate = await Rating.findOne({
      userRating: req.user._id,
      artistRating: id
    });
    if (!findRate) {
      rate = await Rating.create({
        userRating: req.user._id,
        artistRating: id,
        score: req.body
      });
    } else {
      rate = findRate;
    }
    console.log(rate);
    res.json({ rate });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
