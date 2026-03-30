const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@paperboatgifts.com';
    const adminPassword = 'adminpassword123';

    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('Administrative entity already exists in the registry.');
      process.exit();
    }

    const admin = await User.create({
      name: 'Paperboat Overseer',
      email: adminEmail,
      phone: '0000000000',
      password: adminPassword,
      role: 'admin',
    });

    if (admin) {
      console.log('Administrative entity successfully registered.');
      console.log('------------------------------------------');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
      console.log('------------------------------------------');
    }

    process.exit();
  } catch (error) {
    console.error(`Administrative registration failure: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
