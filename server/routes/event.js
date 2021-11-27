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
    .populate('artist')
    .catch((error) => {
      next(error);
    });
});

router.get('/search', async (req, res, next) => {
  const query = req.query.q;
  const limit = req.query.limit;
  const mode = req.query.mode;
  console.log(req.query);
  // const maxDays = req.query.maxDays;
  const genres = req.query.genres;
  console.log(genres);
  try {
    if (mode === 'query') {
      let events;
      if (genres) {
        events = await Event.find({
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
          },
          genre: { $in: [genres] }
        })
          .limit(limit)
          .populate('artist');
      } else {
        events = await Event.find({
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
      }
      // filtering out all expired events
      const filteredEvents = events.filter((event) => {
        const dateWithDuration =
          new Date(event.date).getTime() + event.duration * 60000;
        const now = new Date();
        return new Date(dateWithDuration) >= now;
      });
      res.json({ events: filteredEvents });
      // Mongo does not allow the usage of countDocuments with the location
      // indexed query, so the search list will have to query events and artists at the same time
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
    const events = await Event.find({ date: { $lte: new Date() } }).populate(
      'artist'
    );
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

router.get('/list/today', async (req, res, next) => {
  let start = new Date();
  let end = new Date();
  // set end to midnight + 6 hours
  end.setHours(23, 59, 59, 999);
  end.setHours(end.getHours() + 6);
  console.log(start);
  console.log(end);
  try {
    const events = await Event.find({ date: { $lte: end } })
      .sort({ date: 1 })
      .populate('artist');
    const runningEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return eventDate.getTime() + event.duration * 60000 >= now.getTime();
    });
    console.log(events);
    res.json({ events: runningEvents });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('artist');
    res.json({ event });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
