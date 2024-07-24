import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../redux/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateLogin } from '../../validation/loginValidation';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        const { user, token } = response.data;

        dispatch(setUser(user));
        dispatch(setToken(token));

        navigate("/");
      } catch (error) {
        console.error('Login failed', error);
        if (error.response && error.response.status === 401) {
          setServerError('Invalid email or password. Please try again.');
        } else {
          setServerError('Login failed. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <header className="bg-gradient-to-r from-gray-900 to-gray-700 p-4">
        <div className="container mx-auto">
          <div className="text-white text-2xl font-bold">
            <a href="/">USERKIT</a>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
  <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-3xl font-extrabold mb-6 text-white text-center">Log In</h2>
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label className="block text-white mb-2 text-sm font-medium" htmlFor="email">Email Address</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" 
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-white mb-2 text-sm font-medium" htmlFor="password">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
        />
        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
      </div>
      {serverError && <p className="text-red-600 text-xs text-center">{serverError}</p>}

      <div className="flex items-center justify-end">
        <a href="#" className="text-green-500 hover:underline text-sm">Forgot password?</a>
      </div>
      <button 
        type="submit" 
        className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        Log In
      </button>
    </form>
    <p className="mt-6 text-center text-white text-sm">
      Don't have an account? <Link to="/signup" className="text-green-600 hover:underline">Sign Up</Link>
    </p>
  </div>
</main>


      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        <p>&copy; 2024 User Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginForm;