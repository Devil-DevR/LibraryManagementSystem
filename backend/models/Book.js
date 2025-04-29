// lms-backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a book title']
  },
  author: {
    type: String,
    required: [true, 'Please add an author']
  },
  isbn: {
    type: String,
    required: [true, 'Please add an ISBN'],
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  totalCopies: {
    type: Number,
    required: true,
    min: [0, 'Total copies cannot be negative']
  },
  availableCopies: {
    type: Number,
    required: true,
    min: [0, 'Available copies cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
