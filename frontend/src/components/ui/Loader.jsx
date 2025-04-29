import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function Loader({ fullScreen = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: fullScreen ? '100vh' : 'auto',
        p: fullScreen ? 0 : 2
      }}
    >
      <CircularProgress />
    </Box>
  );
}
