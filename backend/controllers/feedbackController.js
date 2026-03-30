const Feedback = require('../models/Feedback');
const Order = require('../models/Order');
const sendResponse = require('../utils/sendResponse');

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Private
const createFeedback = async (req, res) => {
  const { rating, message, product, order: orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order registry not found');
  }

  if (!order.isDelivered) {
    res.status(400);
    throw new Error('Feedback protocol requires fulfilled delivery');
  }

  const feedback = new Feedback({
    user: req.user._id,
    name: req.user.name,
    rating,
    message,
    product,
    order: orderId,
  });

  const createdFeedback = await feedback.save();
  sendResponse(res, 201, true, 'Feedback acquisition successful', createdFeedback);
};

// @desc    Get all feedbacks (Testimonials)
// @route   GET /api/feedback
// @access  Public
const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).limit(10);
  sendResponse(res, 200, true, 'Global feedback registry retrieved', feedbacks);
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private/Admin
const deleteFeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (feedback) {
    await feedback.deleteOne();
    sendResponse(res, 200, true, 'Feedback protocol terminated');
  } else {
    res.status(404);
    throw new Error('Feedback not found');
  }
};

module.exports = { createFeedback, getFeedbacks, deleteFeedback };
