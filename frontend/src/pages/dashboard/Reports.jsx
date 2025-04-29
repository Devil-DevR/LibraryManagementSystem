// src/pages/dashboard/Reports.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import axios from 'axios';

const Reports = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    booksIssued: 0,
    booksReturned: 0
  });

  useEffect(() => {
    // TODO: fetch your dashboard stats
    axios.get('/api/reports/summary')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const cards = [
    { label: 'Total Books', value: stats.totalBooks },
    { label: 'Total Users', value: stats.totalUsers },
    { label: 'Books Issued', value: stats.booksIssued },
    { label: 'Books Returned', value: stats.booksReturned },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>Reports &amp; Analytics</Typography>
      <Grid container spacing={2}>
        {cards.map(({ label, value }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card component={Paper}>
              <CardContent>
                <Typography variant="subtitle2">{label}</Typography>
                <Typography variant="h4">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports;
