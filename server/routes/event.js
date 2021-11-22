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

router.get('/search', async (req, res, next) => {
  const query = req.query.q;
  const limit = req.query.limit;
  const mode = req.query.mode;
  console.log(req.query);
  // const genres = req.query.genres;
  try {
    // use text mongooose to search for text
    // console.log(genres);
    if (mode === 'query') {
      const events = await Event.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [req.query.userLat, req.query.userLng]
            }
          }
        }
      })
        .limit(limit)
        .populate('artist');
      console.log(events);
      res.json({ events });
    } else if (mode === 'count') {
      const eventsCount = await Event.countDocuments({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [req.query.userLat, req.query.userLng]
            }
          }
        }
      });
      res.json({ count: eventsCount });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/create', routeGuard, async (req, res, next) => {
  try {
    const { title, date, time, duration, description, genre, location } =
      req.body;
    const formatedDate = new Date(date + 'T' + time);
    const formatedLocation = {
      type: 'Point',
      coordinates: [location.lat, location.lng]
    };
    console.log(genre);
    const event = await Event.create({
      title,
      date: formatedDate,
      duration,
      description,
      genre,
      location: formatedLocation,
      artist: req.user._id
    });
    res.json({ event });
  } catch (error) {
    next(error);
  }
});

router.get('/list/now', async (req, res, next) => {
  try {
    const events = await Event.find({ date: { $lte: new Date() } });
    const runningEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return eventDate.getTime() + event.duration * 60000 >= now.getTime();
    });
    res.json({ events: runningEvents });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
