import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Set Axios default base URL
axios.defaults.baseURL = 'http://localhost:5000';

const BookForm = () => {
  const { bookId } = useParams();  // Get bookId from URL params
  const isEdit = Boolean(bookId);  // Check if we are editing an existing book
  const navigate = useNavigate();

  // State for form data
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    availableCopies: '' // Added availableCopies
  });

  // State for error handling and snackbar
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // For success message

  // Fetch book data if editing
  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/books/${bookId}`)
        .then(res => setForm(res.data))
        .catch(err => {
          console.error(err);
          setError('Failed to fetch book details');
          setOpenSnackbar(true);
        });
    }
  }, [bookId, isEdit]);

  // Handle form input change
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate ISBN format (basic validation for this example)
  const isValidISBN = (isbn) => {
    // const regex = /^(97(8|9))?\d{9}(\d|X)$/; // Simple ISBN regex (10 or 13 digits)
    const regex = /^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1,7}$/; // Simple ISBN regex (10 or 13 digits)
    return regex.test(isbn);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.title || !form.author || !form.isbn || !form.availableCopies) {
      setError('All fields are required');
      setOpenSnackbar(true);
      return;
    }

    // Validate ISBN format
    if (!isValidISBN(form.isbn)) {
      setError('Please enter a valid ISBN');
      setOpenSnackbar(true);
      return;
    }

    try {
      const token = localStorage.getItem('authToken'); // Get token from localStorage

      // Determine the request (PUT if editing, POST if adding new)
      const req = isEdit
        ? axios.put(`/api/books/${bookId}`, form, {
            headers: { Authorization: `Bearer ${token}` }
          })
        : axios.post('/api/books', form, {
            headers: { Authorization: `Bearer ${token}` }
          });

      await req;

      // Success message and redirect
      setSuccessMessage(isEdit ? 'Book updated successfully' : 'Book added successfully');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/dashboard/books'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Author"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <TextField
          label="ISBN"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          required
        />
        <TextField
          label="Available Copies"
          name="availableCopies"
          value={form.availableCopies}
          onChange={handleChange}
          required
          type="number"
        />
        <Box display="flex" gap={2}>
          <Button type="submit" variant="contained">
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </Box>

      {/* Snackbar for error or success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
          setError(null);
          setSuccessMessage('');
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={error ? 'error' : 'success'}>
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default BookForm;
