import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.user)
  console.log("userData",userData);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={!userData ? <SignupPage /> : userData.role=="admin" ? <Navigate to="/admin/dashboard"/> : <Navigate to="/" />} />
      <Route path="/login" element={!userData ? <LoginPage /> : userData.role=="admin" ? <Navigate to="/admin/dashboard"/> : <Navigate to="/" />} />
      <Route path='/profile' element={ userData?.role == "user" ? <UserProfilePage/> : <Navigate to="/" /> } />
      <Route path="/admin/dashboard" element={userData ?.role == "admin" ? <AdminDashboardPage /> : <Navigate to='/login'/> } />
    </Routes>
  );
};

export default App;



 