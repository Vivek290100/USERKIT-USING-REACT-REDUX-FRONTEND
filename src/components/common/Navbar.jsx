import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../../redux/features/auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    // Clear user authentication state in Redux
    dispatch(clearAuth());
    // Additional logic for clearing local storage or session storage
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl px-9 font-bold">
          <Link to="/">USERKIT</Link>
        </div>
        <div className="hidden md:flex space-x-12 items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/" className="text-gray-300 hover:text-white">Services</Link>
          <Link to="/" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/" className="text-gray-300 hover:text-white">Contact</Link>
          {user ? (
            // Show logout button when user is logged in
            <button onClick={handleLogout} className="text-gray-300 hover:text-white focus:outline-none">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/signup" className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">Sign Up</Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link to="/" className="block text-gray-300 hover:text-white">Home</Link>
          <Link to="/about" className="block text-gray-300 hover:text-white">About</Link>
          <Link to="/services" className="block text-gray-300 hover:text-white">Services</Link>
          <Link to="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
          {user ? (
            // Show logout button in mobile menu when user is logged in
            <button onClick={handleLogout} className="block text-gray-300 hover:text-white">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block text-gray-300 hover:text-white">Login</Link>
              <Link to="/signup" className="block bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
