// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import BooksList from "./pages/dashboard/BooksList";
import BookForm from "./pages/dashboard/BookForm";
import UsersList from "./pages/dashboard/UsersList";
import UserForm from "./pages/dashboard/UserForm";
import Issues from "./pages/dashboard/Issues";
import Returns from "./pages/dashboard/Returns";
import Reports from "./pages/dashboard/Reports";


import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Routes>

          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* all /dashboard/* routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* landing (/dashboard) */}
            <Route index element={<Dashboard />} />

            {/* book management */}
            <Route path="books">
              <Route index element={<BooksList />} />
              <Route path="add" element={<BookForm />} />
              <Route path=":bookId/edit" element={<BookForm />} />
            </Route>

            {/* user management */}
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path="add" element={<UserForm />} />
              <Route path=":userId/edit" element={<UserForm />} />
            </Route>

            {/* issue & return */}
            <Route path="issues" element={<Issues />} />
            <Route path="returns" element={<Returns />} />

            {/* reports */}
            <Route path="reports" element={<Reports />} />

            {/* catch‑all: redirect unknown dashboard paths back */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
