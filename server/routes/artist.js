'use strict';

const express = require('express');
const router = express.Router();
const Artist = require('./../models/user');
const upload = require('../middleware/file-upload');
const routeGuardMiddleware = require('./../middleware/route-guard');

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

router.post(
  '/upload-background',
  upload.single('avatar'),
  async (req, res, next) => {
    const url = req.file.path;
    console.log(req.user);
    try {
      // console.log('Session ID', req.session, req.user);
      const backgroundUpdate = await Artist.findByIdAndUpdate(req.user._id, {
        backgroundimg: url
      });
      res.json({ backgroundUpdate });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
