'use strict';

const { Router } = require('express');
const { cloudinary } = require('../middleware/file-upload');
const User = require('./../models/user');
const routeGuardMiddleware = require('./../middleware/route-guard');

const router = new Router();

router.post('/upload-avatar', routeGuardMiddleware, async (req, res, next) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_setups'
    });
    console.log(uploadResponse);
    const avatarUpdate = await User.findByIdAndUpdate(req.session.user._id, {
      avatar: uploadResponse
    });
    res.json({ avatarUpdate });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
