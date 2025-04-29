// src/pages/dashboard/UserForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const roles = ['admin', 'member'];

const UserForm = () => {
  const { userId } = useParams();
  const isEdit = Boolean(userId);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'member'
  });

  useEffect(() => {
    if (isEdit) {
      // TODO: fetch single user
      axios.get(`/api/users/${userId}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [userId, isEdit]);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const req = isEdit
      ? axios.put(`/api/users/${userId}`, form)
      : axios.post('/api/users', form);

    req.then(() => navigate('/dashboard/users'))
       .catch(err => console.error(err));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEdit ? 'Edit User' : 'Add New User'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          {roles.map(r => (
            <MenuItem key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" gap={2}>
          <Button type="submit" variant="contained">
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserForm;
