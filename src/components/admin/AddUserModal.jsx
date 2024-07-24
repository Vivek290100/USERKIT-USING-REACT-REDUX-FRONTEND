import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addUserValidation } from '../../validation/AddUserValidation';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = addUserValidation(name, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/addUser',
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAddUser(response.data.user);
      toast.success('User added successfully!');
      handleClose();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add user';
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-gray-700 focus:outline-none focus:border-blue-500`}
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.name}</p>}
          </div>
          <div className="mb-5">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-gray-700 focus:outline-none focus:border-blue-500`}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-gray-700 focus:outline-none focus:border-blue-500`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-gray-700 focus:outline-none focus:border-blue-500`}
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
              type="submit"
            >
              Add User
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
