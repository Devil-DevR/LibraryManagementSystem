// backend/scripts/makeAdmin.js

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Import your existing connectDB function

// Check if MongoDB URI is defined in .env
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1); // Stop if URI is not defined
}

// Import your User model
const User = require('../models/User');

// Check if mongoose is already connected
if (mongoose.connection.readyState === 0) {
  console.log('🟢 MongoDB not connected, connecting now...');
  connectDB(); // Only connect if not already connected
} else {
  console.log('✅ MongoDB is already connected');
}

// --- Make email dynamic from terminal input ---
const email = process.argv[2]; // Get email from command line

if (!email) {
  console.error('Please provide an email. Example: node scripts/makeAdmin.js testuser@example.com');
  process.exit(1);
}

// Function to update user role to admin
async function makeAdmin(email) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found.');
      process.exit(1);
    }

    user.role = 'admin'; // Set role to 'admin'
    await user.save();

    console.log(`✅ User with email ${email} is now an admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeAdmin(email);
