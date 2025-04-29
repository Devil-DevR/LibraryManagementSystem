const express = require('express');
const {
  borrowBook,
  returnBook,
  getTransactions,
} = require('../controllers/transactionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Borrow a book
router.post('/borrow/:bookId', authorize('student'), borrowBook);

// Return a book
router.put('/return/:bookId', authorize('student'), returnBook);

// Get all transactions (admin) or own transactions (student)
router.get('/', getTransactions);

module.exports = router;
