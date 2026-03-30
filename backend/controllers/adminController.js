const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const sendResponse = require('../utils/sendResponse');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });

    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    sendResponse(res, 200, true, 'Administrative stats retrieved', {
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
      recentOrders,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Analytics retrieval failure: ${error.message}`);
  }
};

module.exports = { getStats };
