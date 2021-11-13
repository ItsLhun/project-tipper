'use strict';

const { Router } = require('express');
const { cloudinary } = require('../middleware/file-upload');
const User = require('./../models/user');
const routeGuardMiddleware = require('./../middleware/route-guard');

const router = new Router();

router.post('/upload-avatar', async (req, res, next) => {
  try {
    console.log('Session ID', req.session, req.user);
    const fileStr = req.body.avatar;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'avatar'
    });
    console.log(uploadResponse);
    const avatarUpdate = await User.findByIdAndUpdate(req.user._id, {
      avatar: uploadResponse.url
    });
    const user = req.user;
    res.json({ avatarUpdate });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
