const express = require('express');
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route – anyone can see books
router.get('/', getBooks);

// Protected routes – only admin can add, update, delete
router.post('/', protect, authorize('admin'), addBook);
router.put('/:id', protect, authorize('admin'), updateBook);
router.delete('/:id', protect, authorize('admin'), deleteBook);

module.exports = router;
