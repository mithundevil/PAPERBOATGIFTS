const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

let storage;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'paperboat_gifts',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });
  console.log('--- CLOUDINARY RESILIENCE: ACTIVE ---');
} else {
  // Local disk storage fallback for development
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(`--- UPLOAD PROTOCOL: DESTINATION REQUESTED for ${file.originalname} ---`);
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `${uniqueSuffix}-${file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      console.log(`--- UPLOAD PROTOCOL: FILENAME GENERATED - ${filename} ---`);
      cb(null, filename);
    },
  });
  console.log('--- LOCAL ASSET PROTOCOL: ACTIVE (CLOUDINARY NOT CONFIGURED) ---');
}

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = { cloudinary, upload, isCloudinaryConfigured };
