const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const sendResponse = require('../utils/sendResponse');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new order and Razorpay order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Purely Server-Side Price Calculation (Never trust frontend price)
  let calculatedItemsPrice = 0;
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.name}`);
    }
    
    // Find the specific size price
    const sizeData = product.sizes.find(s => s.label === item.size);
    const pricePerUnit = sizeData ? sizeData.price : product.startingPrice;
    
    calculatedItemsPrice += pricePerUnit * item.qty;
  }

  const calculatedTotalPrice = calculatedItemsPrice + (Number(shippingPrice) || 0);

  // Initialize Razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Math.round(calculatedTotalPrice * 100), 
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);

    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map(item => ({
        ...item,
        price: 0 // Will be populated from DB in a real scenario if needed, but we used calc price
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice: calculatedItemsPrice,
      shippingPrice: Number(shippingPrice) || 0,
      totalPrice: calculatedTotalPrice,
      razorpayOrderId: razorpayOrder.id,
    });

    const createdOrder = await order.save();

    sendResponse(res, 201, true, 'Order protocol initiated', {
      order: createdOrder,
      razorpayOrderId: razorpayOrder.id,
      amount: options.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500);
    throw new Error('Financial transaction initialization failed');
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    // Cryptographic Signature Verification
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;
      order.paymentResult = {
        id: razorpay_payment_id,
        status: 'completed',
        update_time: Date.now().toString(),
      };

      const updatedOrder = await order.save();

      // Send Confirmation Email
      await sendEmail({
        email: req.user.email,
        subject: `Order Confirmed: ${order._id}`,
        html: `<h1>Order Confirmed</h1><p>Thank you for choosing Paperboat Gifts, ${req.user.name}. Your order ${order._id} is being processed.</p>`,
      });

      sendResponse(res, 200, true, 'Payment verified and secured', updatedOrder);
    } else {
      res.status(400);
      throw new Error('Invalid payment signature protocol');
    }
  } else {
    res.status(404);
    throw new Error('Order registry not found');
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  sendResponse(res, 200, true, 'User acquisition history retrieved', orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    sendResponse(res, 200, true, 'Order registry found', order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
  sendResponse(res, 200, true, 'Global acquisition registry retrieved', orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    order.status = status;
    order.lastStatusUpdate = Date.now();

    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    // Trigger Notifications
    try {
      await sendEmail({
        email: order.user.email,
        subject: `Paperboat Order Status: ${status}`,
        html: `<h2>Order Update</h2><p>Hello ${order.user.name}, your order ${order._id} status has been updated to: <b>${status}</b>.</p>`,
      });
      console.log(`--- NOTIFICATION DISPATCHED: ${status} ---`);
    } catch (err) {
      console.error('--- NOTIFICATION FAILURE ---', err);
    }

    sendResponse(res, 200, true, 'Order protocol updated', updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderStatus,
};
