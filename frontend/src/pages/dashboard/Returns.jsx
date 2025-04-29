// src/pages/dashboard/Returns.jsx
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

const Returns = () => {
  const [returnsList, setReturnsList] = useState([]);

  useEffect(() => {
    // TODO: fetch from /api/returns
    axios.get('/api/returns')
      .then(res => setReturnsList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Returned Books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Issued On</TableCell>
              <TableCell>Returned On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {returnsList.map(r => (
              <TableRow key={r._id}>
                <TableCell>{r.book.title}</TableCell>
                <TableCell>{r.user.name}</TableCell>
                <TableCell>{new Date(r.issuedAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(r.returnedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Returns;
