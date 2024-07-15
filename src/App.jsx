// src/App.jsx
import React from 'react';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute component={UserProfilePage} roles={['user', 'admin']} />} />
        <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboardPage} roles={['admin']} />} />
      </Routes>
  );
};

export default App;
