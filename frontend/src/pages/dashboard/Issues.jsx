// src/pages/dashboard/Issues.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from '@mui/material';
import axios from 'axios';

const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // TODO: fetch from /api/issues
    axios.get('/api/issues')
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Issued Books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Issued On</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map(i => (
              <TableRow key={i._id}>
                <TableCell>{i.book.title}</TableCell>
                <TableCell>{i.user.name}</TableCell>
                <TableCell>{new Date(i.issuedAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(i.dueDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Issues;
