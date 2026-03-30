const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Feedback = require('../models/Feedback');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await connectDB();

    // 1. Clear existing registry
    console.log('--- PURGING REGISTRY ---');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Feedback.deleteMany({});

    // 2. Artisanal Identity Seeding
    console.log('--- SEEDING IDENTITIES ---');
    
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const commonPassword = await bcrypt.hash('password123', salt);
    const adminPassword = await bcrypt.hash('adminpassword123', salt);

    const users = await User.insertMany([
      {
        name: 'Paperboat Overseer',
        email: 'admin@paperboatgifts.com',
        phone: '9999999999',
        password: adminPassword,
        role: 'admin',
      },
      {
        name: 'John Artisan',
        email: 'john@example.com',
        phone: '8888888888',
        password: commonPassword,
        role: 'user',
      },
      {
        name: 'Elena Curate',
        email: 'elena@example.com',
        phone: '7777777777',
        password: commonPassword,
        role: 'user',
      },
    ]);

    const admin = users[0];
    const customer1 = users[1];
    const customer2 = users[2];

    // 3. Boutique Product Seeding
    console.log('--- SEEDING BOUTIQUE ASSETS ---');

    const productsData = [
      // Frames
      {
        name: 'Aetheria Glass Frame',
        category: 'frames',
        description: 'A minimalist floating glass frame designed to highlight the ethereal beauty of your memories.',
        startingPrice: 1299,
        sizes: [
          { label: 'Standard (4x6)', price: 1299, dimensions: '4x6' },
          { label: 'Gallery (8x10)', price: 1899, dimensions: '8x10' },
          { label: 'Exhibition (12x15)', price: 2499, dimensions: '12x15' },
        ],
        supportsCustomText: true,
        images: [{ url: 'https://placehold.co/800x1000/0B0B0B/white?text=Aetheria+Frame', public_id: 'seed/frame1' }],
        countInStock: 25,
      },
      {
        name: 'Nocturne Ebony Wood',
        category: 'frames',
        description: 'Handcrafted from deep ebony wood, this frame provides a sophisticated anchor for your most cherished portraits.',
        startingPrice: 1599,
        sizes: [
          { label: 'Square (6x6)', price: 1599, dimensions: '6x6' },
          { label: 'Portrait (8x12)', price: 2199, dimensions: '8x12' },
        ],
        supportsCustomText: true,
        images: [{ url: 'https://placehold.co/800x1000/0B0B0B/white?text=Nocturne+Wood', public_id: 'seed/frame2' }],
        countInStock: 15,
      },
      // Albums
      {
        name: 'Linen Memories Vol. I',
        category: 'albums',
        description: 'A premium linen-bound album with archival-grade pages, perfect for documenting cinematic life journeys.',
        startingPrice: 2499,
        sizes: [
          { label: 'Boutique (20 Pages)', price: 2499 },
          { label: 'Collector (50 Pages)', price: 4499 },
        ],
        supportsCustomText: false,
        images: [{ url: 'https://placehold.co/800x1000/0B0B0B/white?text=Linen+Album', public_id: 'seed/album1' }],
        countInStock: 10,
      },
      // Mugs
      {
        name: 'Celestial Ceramic Vessel',
        category: 'mugs',
        description: 'Individualized ceramic mugs with a matte celestial finish. A daily ritual transformed into an art form.',
        startingPrice: 799,
        sizes: [
          { label: 'Standard (330ml)', price: 799 },
          { label: 'Grand (450ml)', price: 1099 },
        ],
        supportsCustomText: true,
        images: [{ url: 'https://placehold.co/800x1000/0B0B0B/white?text=Celestial+Mug', public_id: 'seed/mug1' }],
        countInStock: 50,
      },
      // Polaroids
      {
        name: 'Vintage Grain 10pk',
        category: 'polaroids',
        description: 'A collection of instant memories captured with a warm, vintage grain logic.',
        startingPrice: 999,
        sizes: [
          { label: 'Classic Mini (10 Prints)', price: 999 },
          { label: 'Wide Landscape (10 Prints)', price: 1499 },
        ],
        supportsCustomText: true,
        images: [{ url: 'https://placehold.co/800x1000/0B0B0B/white?text=Vintage+Polaroids', public_id: 'seed/polaroid1' }],
        countInStock: 100,
      },
      // Posters
      {
        name: 'Abstract Fluidity Poster',
        category: 'posters',
        description: 'Museum-grade Giclée print on heavy archival paper, featuring fluid abstract motion.',
        startingPrice: 1899,
        sizes: [
          { label: 'A3 Compact', price: 1899 },
          { label: 'A2 Statement', price: 2899 },
          { label: 'A1 Exhibition', price: 4299 },
        ],
        supportsCustomText: false,
        images: [{ url: 'https://placehold.co/800x1000/0B0B0B/white?text=Fluidity+Poster', public_id: 'seed/poster1' }],
        countInStock: 20,
      },
    ];

    const products = await Product.insertMany(productsData);

    // 4. Sample Order Seeding
    console.log('--- SEEDING ORDER MANIFESTS ---');

    const ordersData = [
      {
        user: customer1._id,
        orderItems: [
          {
            name: products[0].name,
            qty: 1,
            image: products[0].images[0].url,
            price: products[0].sizes[1].price,
            product: products[0]._id,
            size: products[0].sizes[1].label,
            customText: 'Our First Anniversary',
          },
        ],
        shippingAddress: {
          address: '42 Artisans Row',
          city: 'Mumbai',
          postalCode: '400001',
          country: 'India',
          phone: '9876543210',
        },
        paymentMethod: 'Razorpay',
        itemsPrice: 1899,
        shippingPrice: 100,
        totalPrice: 1999,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: true,
        deliveredAt: new Date(),
        status: 'Delivered',
      },
      {
        user: customer2._id,
        orderItems: [
          {
            name: products[3].name,
            qty: 2,
            image: products[3].images[0].url,
            price: products[3].sizes[0].price,
            product: products[3]._id,
            size: products[3].sizes[0].label,
            customText: 'E & J',
          },
        ],
        shippingAddress: {
          address: 'Modernist Villa 7',
          city: 'Bangalore',
          postalCode: '560001',
          country: 'India',
          phone: '9123456789',
        },
        paymentMethod: 'Razorpay',
        itemsPrice: 1598,
        shippingPrice: 50,
        totalPrice: 1648,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
        status: 'Processing',
      },
    ];

    const orders = await Order.insertMany(ordersData);

    // 5. Social Resonance Seeding
    console.log('--- SEEDING ARTISANAL NARRATIVES ---');

    const feedbackData = [
      {
        user: customer1._id,
        name: customer1.name,
        rating: 5,
        message: 'The quality of the Aetheria frame is unparalleled. It truly transforms the photograph into a piece of art.',
        product: products[0]._id,
        order: orders[0]._id,
      },
      {
        user: customer2._id,
        name: customer2.name,
        rating: 4,
        message: 'Beautiful ceramic work on the Celestial mug. The weight and texture feel incredibly premium.',
        product: products[3]._id,
        order: orders[1]._id,
      },
    ];

    await Feedback.insertMany(feedbackData);

    console.log('--- BOUTIQUE REGISTRY SYNCHRONIZATION COMPLETE ---');
    console.log('--------------------------------------------------');
    console.log('Admin Access: admin@paperboatgifts.com / adminpassword123');
    console.log('Client Access: john@example.com / password123');
    console.log('--------------------------------------------------');
    
    process.exit();
  } catch (error) {
    console.error(`--- REGISTRY SYNCHRONIZATION FAILURE: ${error.message} ---`);
    process.exit(1);
  }
};

seedData();
