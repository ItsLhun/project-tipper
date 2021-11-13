'use strict';

const { Router } = require('express');
const { cloudinary } = require('../middleware/file-upload');
const User = require('./../models/user');
const routeGuardMiddleware = require('./../middleware/route-guard');
const bcryptjs = require('bcryptjs');

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

router.post('/edit', routeGuardMiddleware, async (req, res, next) => {
  console.log('Profile edit');
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.session.user._id, {
      email,
      password: bcryptjs.hashSync(password, 10)
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.post('/sign-up', (req, res, next) => {});

module.exports = router;
