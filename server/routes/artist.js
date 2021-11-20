'use strict';

const express = require('express');
const router = express.Router();
const Artist = require('./../models/user');
const upload = require('../middleware/file-upload');
const routeGuardMiddleware = require('./../middleware/route-guard');
const Follow = require('./../models/follow');

router.get('/list', async (req, res, next) => {
  try {
    const artists = await Artist.find({ role: 'artist' }).limit(
      req.query.limit
    );
    res.json({ artists });
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  const query = req.query.q;
  const limit = req.query.limit;
  // const genres = req.query.genres;
  try {
    // use text mongooose to search for text
    // console.log(genres);
    const artists = await Artist.find(
      {
        $or: [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } }
        ],
        role: 'artist'
      },
      { firstName: 1, lastName: 1, _id: 1, avatarUrl: 1, bio: 1, genre: 1 }
    ).limit(limit);
    res.json({ artists });
  } catch (error) {
    next(error);
  }
});

// Get search document count
router.get('/search/count', async (req, res, next) => {
  const query = req.query.q;
  // const genres = req.query.genres;
  try {
    const artistsCount = await Artist.countDocuments(
      {
        $or: [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } }
        ],
        role: 'artist'
      },
      { firstName: 1, lastName: 1, _id: 1, avatarUrl: 1, bio: 1, genre: 1 }
    );
    res.json({ count: artistsCount });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/follow', routeGuardMiddleware, async (req, res, next) => {
  const { id } = req.params;
  let follow;
  try {
    const alreadyFollowing = await Follow.findOne({
      follower: req.user._id,
      followed: id
    });
    console.log(alreadyFollowing);
    if (!alreadyFollowing) {
      const newFollowing = await Follow.create({
        follower: req.user._id,
        followed: id
      });
      console.log(follow);
      Artist.findByIdAndUpdate(id, { $inc: { followerCount: 1 } });
      follow = newFollowing;
    } else {
      await Follow.findByIdAndDelete(alreadyFollowing._id);
      const update = await Artist.findByIdAndUpdate(id, {
        $inc: { followerCount: -1 }
      });
      if (update.followerCount < 0) {
        Artist.findByIdAndUpdate(id, { followerCount: 0 });
      } else {
        Artist.findById(id);
      }
      follow = alreadyFollowing;
    }
    res.json({ follow });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/upload-background',
  upload.single('avatar'),
  async (req, res, next) => {
    const url = req.file.path;
    console.log(req.user);
    try {
      // console.log('Session ID', req.session, req.user);
      const backgroundUpdate = await Artist.findByIdAndUpdate(req.user._id, {
        backgroundImg: url
      });
      res.json({ backgroundUpdate });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    console.log(artist);
    res.json({ artist });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
