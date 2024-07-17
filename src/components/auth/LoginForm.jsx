// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../redux/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(null); 



  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
    const response = await axios.post('/api/auth/login', { email, password });
    const { user, token } = response.data;

    dispatch(setUser(user));
    dispatch(setToken(token));

    console.log("user",user);
    console.log("token",token);
    navigate("/")

    }catch (error) {
      console.error('Login failde', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="text-white text-2xl font-bold">
          <a href="/">USERKIT</a>
        </div>
      </div>
    </header>
  
    <main className="flex-grow flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">LogIn</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
              autoComplete='email'
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
              autoComplete='current-password'
            />
          </div>
          {error && <p className="text-red-500">{error}</p>} 

          <div className="flex items-center justify-end">

            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            LogIn
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
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
