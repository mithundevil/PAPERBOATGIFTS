const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const adminUser = {
      name: 'Admin User',
      email: 'admin@paperboat.com',
      phone: '0000000000',
      password: 'admin123',
      role: 'admin',
    };

    await User.create(adminUser);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  const destroyData = async () => {
    try {
      await User.deleteMany();
      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  };
  destroyData();
} else {
  importData();
}
