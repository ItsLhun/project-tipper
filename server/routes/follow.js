'use strict';

const express = require('express');
const router = express.Router();
const Artist = require('./../models/user');
const Follow = require('./../models/follow');
const routeGuardMiddleware = require('./../middleware/route-guard');

router.get(
  '/:artistId/follow',
  routeGuardMiddleware,
  async (req, res, next) => {
    const { artistId } = req.params;
    try {
      const follow = await Follow.findOne({ follower: req.user._id });
      res.json({ follow });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:artistId/count-followers',
  routeGuardMiddleware,
  async (req, res, next) => {
    const { artistId } = req.params;
    try {
      const follow = await Follow.countDocuments({ followed: artistId });
      res.json({ follow });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/follow', routeGuardMiddleware, async (req, res, next) => {
  const { id } = req.params;
  let follow;

  try {
    follow = await Follow.findOne({
      follower: req.user._id,
      followed: id
    });
    if (!follow) {
      follow = await Follow.create({
        follower: req.user._id,
        followed: id
      });
    } else {
      await Follow.findByIdAndDelete(follow._id);
    }
    res.json({ follow });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
