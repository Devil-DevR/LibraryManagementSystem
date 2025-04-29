import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Book Management System
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Login
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ marginTop: 2 }}
        component={Link}
        to="/register"
      >
        Register
      </Button>
    </Box>
  );
};

export default Home;
