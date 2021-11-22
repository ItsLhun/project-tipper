'use strict';

const express = require('express');
const router = express.Router();
const Artist = require('./../models/user');
const upload = require('../middleware/file-upload');
const routeGuardMiddleware = require('./../middleware/route-guard');
const Follow = require('./../models/follow');
const Rating = require('./../models/rating');

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
  const mode = req.query.mode;
  // const genres = req.query.genres;
  try {
    // use text mongooose to search for text
    // console.log(genres);
    if (mode === 'query') {
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
    } else if (mode === 'count') {
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
      console.log(artistsCount);
      res.json({ count: artistsCount });
    }
  } catch (error) {
    next(error);
  }
});

// Get search document count
// router.get('/search/count', async (req, res, next) => {
//   const query = req.query.q;
//   // const genres = req.query.genres;
//   try {
//     const artistsCount = await Artist.countDocuments(
//       {
//         $or: [
//           { firstName: { $regex: query, $options: 'i' } },
//           { lastName: { $regex: query, $options: 'i' } }
//         ],
//         role: 'artist'
//       },
//       { firstName: 1, lastName: 1, _id: 1, avatarUrl: 1, bio: 1, genre: 1 }
//     );
//     res.json({ count: artistsCount });
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/:id/follow', routeGuardMiddleware, async (req, res, next) => {
  const { id } = req.params;
  let newFollowing;
  let alreadyFollowing;
  try {
    alreadyFollowing = await Follow.findOne({
      follower: req.user._id,
      followed: id
    });
    console.log('Already following?:', alreadyFollowing);
    if (!alreadyFollowing) {
      newFollowing = await Follow.create({
        follower: req.user._id,
        followed: id
      });
      // follow = newFollowing;
      console.log('newFollowing?:', newFollowing);
      Artist.findByIdAndUpdate(id, { $inc: { followerCount: 1 } });
    } else {
      await Follow.findByIdAndDelete(alreadyFollowing._id);
      await Artist.findByIdAndUpdate(id, {
        $inc: { followerCount: -1 }
      });
      Artist.findByIdAndUpdate(
        { _id: id, followerCount: { $lt: 0 } },
        { $set: { followerCount: 0 } }
      );
      // console.log(update);
      // if (update.followerCount < 0) {
      //   await Artist.findByIdAndUpdate(id, { followerCount: 0 });
      // } else {
      //   await Artist.findById(id);
      // }
      // follow = alreadyFollowing;
    }
    const follow = {
      alreadyFollowing,
      newFollowing
    };
    res.json({ follow });
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
  let artistDetail;
  let follow;
  let rating;
  try {
    artistDetail = await Artist.findById(id);
    // console.log(artistDetail);
    follow = await Follow.findOne({ follower: req.user._id });
    rating = await Rating.findOne({ userRating: req.user._id });
    console.log(follow);
    const artist = {
      artistDetail,
      follow,
      rating
    };
    res.json({ artist });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
