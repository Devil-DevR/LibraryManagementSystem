const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// @desc    Borrow a book
// @route   POST /api/transactions/borrow/:bookId
// @access  Private (student)
const borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.bookId);

  if (!book || book.availableCopies <= 0) {
    return res.status(400).json({ message: 'Book not available' });
  }

  const existingTransaction = await Transaction.findOne({
    user: req.user._id,
    book: book._id,
    status: 'borrowed',
  });

  if (existingTransaction) {
    return res.status(400).json({ message: 'You already borrowed this book' });
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    book: book._id,
    borrowDate: new Date(),
    status: 'borrowed',
  });

  book.availableCopies -= 1;
  await book.save();

  res.status(201).json(transaction);
};

// @desc    Return a borrowed book
// @route   PUT /api/transactions/return/:bookId
// @access  Private (student)
const returnBook = async (req, res) => {
  const transaction = await Transaction.findOne({
    user: req.user._id,
    book: req.params.bookId,
    status: 'borrowed',
  });

  if (!transaction) {
    return res.status(404).json({ message: 'No active borrow for this book' });
  }

  transaction.status = 'returned';
  transaction.returnDate = new Date();
  await transaction.save();

  const book = await Book.findById(req.params.bookId);
  book.availableCopies += 1;
  await book.save();

  res.json(transaction);
};

// @desc    Get transactions (own for student, all for admin)
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user._id };

  const transactions = await Transaction.find(filter)
    .populate('book', 'title author')
    .populate('user', 'name email');

  res.json(transactions);
};

module.exports = {
  borrowBook,
  returnBook,
  getTransactions,
};
