// EditUserModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast, Toaster} from "react-hot-toast"
import { validateEditUser } from '../../validation/modalValidation';



const EditUserModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateEditUser(name, email);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    console.log('Submitting profile update:', { name, email }); 
    try {
      const values = { name, email };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("values",values);
      console.log("config",config);
      await axios.put(
        `http://localhost:5000/api/admin/updateUser/${user._id}`,values, config );

      onUpdate();
      onClose();
      toast.success('User Updated Successfully !')


        console.error("Error updating profile:", editData.data.message);

    } catch (err) {
      console.error('Update failed:', err); 
    } finally {
      setLoading(false);
    }
  };
  
  

  

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl text-white font-bold mb-4">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
               {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
               {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
          <Toaster />
        </div>
      </div>
    ) : null
    
  );
};

export default EditUserModal;
