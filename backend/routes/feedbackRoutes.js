const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks, deleteFeedback } = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getFeedbacks).post(protect, createFeedback);
router.route('/:id').delete(protect, admin, deleteFeedback);

module.exports = router;
