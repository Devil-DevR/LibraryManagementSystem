// src/routes/dashboard.routes.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { AuthContext } from '../../context/AuthContext';
// lazy‑load your other pages
const BooksList  = lazy(() => import('./BooksList'));
const BookForm   = lazy(() => import('./BookForm'));
const UsersList  = lazy(() => import('./UsersList'));
const UserForm   = lazy(() => import('./UserForm'));
const Issues     = lazy(() => import('./Issues'));
const Returns    = lazy(() => import('./Returns'));
const Reports    = lazy(() => import('./Reports'));



export default function DashboardRoutes({ isAuthenticated }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* wrap all dashboard routes in auth check */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>

          <Route path="/dashboard" element={<DashboardLayout />}>


            {/* Book management */}
            <Route path="books">
              <Route index element={<BooksList />} />               {/* /dashboard/books */}
              <Route path="add" element={<BookForm />} />          {/* /dashboard/books/add */}
              <Route path=":bookId/edit" element={<BookForm />} />  {/* /dashboard/books/123/edit */}
            </Route>

            {/* User management */}
            <Route path="users">
              <Route index element={<UsersList />} />               {/* /dashboard/users */}
              <Route path="add" element={<UserForm />} />          {/* /dashboard/users/add */}
              <Route path=":userId/edit" element={<UserForm />} />  {/* /dashboard/users/456/edit */}
            </Route>

            {/* Issue & return */}
            <Route path="issues" element={<Issues />} />           {/* /dashboard/issues */}
            <Route path="returns" element={<Returns />} />         {/* /dashboard/returns */}

            {/* Reports */}
            <Route path="reports" element={<Reports />} />         {/* /dashboard/reports */}

          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
