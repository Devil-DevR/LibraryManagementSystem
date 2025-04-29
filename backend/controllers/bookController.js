const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books); // Return status 200 and books
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: Unable to retrieve books' });
  }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Private (admin only)
const addBook = async (req, res) => {
  const { title, author, availableCopies } = req.body;

  // Validation
  if (!title || !author || availableCopies == null) {
    return res.status(400).json({ message: 'All fields (title, author, availableCopies) are required' });
  }

  try {
    // Create and save the new book
    const newBook = await Book.create({
      title,
      author,
      availableCopies,
      createdBy: req.user.id, // Optional: If you want to track who created the book (admin)
    });

    res.status(201).json(newBook); // Return status 201 and the newly created book
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: Unable to add the book' });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (admin only)
const updateBook = async (req, res) => {
  const { title, author, availableCopies } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Update the book properties
    book.title = title || book.title;
    book.author = author || book.author;
    book.availableCopies = availableCopies ?? book.availableCopies;

    await book.save(); // Save the updated book
    res.status(200).json(book); // Return the updated book
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: Unable to update the book' });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.remove(); // Remove the book from the database
    res.status(200).json({ message: 'Book removed' }); // Return a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: Unable to delete the book' });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
