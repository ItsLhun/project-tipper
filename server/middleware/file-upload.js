// const multer = require('multer');
// const cloudinary = require('cloudinary');
// const multerStorageCloudinary = require('multer-storage-cloudinary');

// const storage = new multerStorageCloudinary.CloudinaryStorage({
//   cloudinary: cloudinary.v2
// });

// const upload = multer({ storage });

// module.exports = upload;

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = { cloudinary };
