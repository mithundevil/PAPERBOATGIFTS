const express = require('express');
const router = express.Router();
const { upload, isCloudinaryConfigured } = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, (req, res, next) => {
  console.log('--- ADMIN UPLOAD SEQUENCE START ---');
  handleUpload(req, res, next);
});

// Route for customer customization uploads (Protected but non-admin)
router.post('/customer', protect, (req, res, next) => {
  console.log('--- CUSTOMER ASSET ACQUISITION START ---');
  handleUpload(req, res, next);
});

function handleUpload(req, res, next) {
  upload.array('images', 5)(req, res, (err) => {
    if (err) {
      console.error('--- UPLOAD PROTOCOL FAILURE ---', err);
      res.status(500);
      return next(err);
    }
    
    if (req.files && req.files.length > 0) {
      console.log(`--- UPLOAD SUCCESS: ${req.files.length} ASSETS ACQUIRED ---`);
      const images = req.files.map((file) => ({
        url: isCloudinaryConfigured ? file.path : `${process.env.BACKEND_URL || 'http://localhost:5001'}/uploads/${file.filename}`,
        public_id: file.filename,
      }));
      res.json(images);
    } else {
      console.warn('--- UPLOAD WARNING: NO ASSETS RECEIVED ---');
      res.status(400);
      next(new Error('No images uploaded'));
    }
  });
}

module.exports = router;
