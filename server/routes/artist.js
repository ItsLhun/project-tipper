'use strict';

const express = require('express');
const router = express.Router();
const Artist = require('./../models/user');
const upload = require('../middleware/file-upload');
const routeGuardMiddleware = require('./../middleware/route-guard');
const Rating = require('./../models/rating');
const Event = require('./../models/event');

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
        {
          firstName: 1,
          lastName: 1,
          _id: 1,
          avatarUrl: 1,
          bio: 1,
          genre: 1,
          lastLocation: 1
        }
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

router.post(
  '/upload-background',
  upload.single('avatar'),
  async (req, res, next) => {
    const url = req.file.path;
    console.log(req.user);
    try {
      const backgroundUpdate = await Artist.findByIdAndUpdate(req.user._id, {
        backgroundImg: url
      });
      res.json({ backgroundUpdate });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id/events', async (req, res, next) => {
  const { id } = req.params;
  try {
    const events = await Event.find({ artist: id });
    console.log(events);
    res.json({ events });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    res.json({ artist });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
