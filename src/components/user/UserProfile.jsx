import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/features/auth/authSlice";
import axios from "axios";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdateProfile = async () => {
    try {
      const values = { name, email };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const editData = await axios.put("http://localhost:5000/api/user/updateProfile", values, config);
  
      if (editData.status === 200) {
        dispatch(updateUser({ name, email }));
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", editData.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("http://localhost:5000/api/user/uploadProfileImage", formData, config);

      if (response.status === 200) {
        console.log('Image uploaded successfully:', response.data);
        dispatch(updateUser({ ...user, profileImage: response.data.profileImage }));
      } else {
        console.error("Error uploading image:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("delt img 1");
      
      const response = await axios.delete("http://localhost:5000/api/user/deleteProfileImage", config);
      console.log("delt img 2");

      if (response.status === 200) {
        console.log('Image deleted successfully:', response.data);
        dispatch(updateUser({ ...user, profileImage: null }));
      } else {
        console.error("Error deleting image:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting imagee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white shadow-2xl overflow-hidden rounded-2xl">
        <div className="md:flex">
          <div className="md:w-2/4 bg-gradient-to-b from-emerald-400 to-teal-600 p-4 flex flex-col items-center justify-center relative">
          <div className="w-72 h-72 rounded-full bg-white border-4 border-emerald-200 shadow-lg flex items-center justify-center mb-6 overflow-hidden ">
  <div className="absolute bottom-5 right-5 flex space-x-3">
    <label
      htmlFor="fileInput"
      className="bg-emerald-500 text-white p-3 rounded-full transform hover:scale-110 transition duration-300 cursor-pointer"
    >
      <FaEdit />
    </label>
    <button
      type="button"
      onClick={handleDeleteImage}
      className="bg-red-500 text-white p-3 rounded-full transform hover:scale-110 transition duration-300 cursor-pointer"
    >
      <FaTrash />
    </button>
  </div>
  <img
    className="h-auto max-w-full"
    src={`http://localhost:5000${user.profileImage || "/profile-images/def-pic.jpeg"}`}
    alt="Profile"
  />
  <input
    id="fileInput"
    type="file"
    className="hidden"
    onChange={handleFileChange}
  />
</div>

            
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              {user.name}
            </h1>
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full mt-4"
              onClick={toggleEditing}
            >
              Edit Details
            </button>
          </div>

          <div className="md:w-2/4 p-8">
            {isEditing ? (
              <div>
                <h2 className="text-3xl font-semibold text-emerald-600 mb-6">
                  Edit Details
                </h2>
                <form className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="text-gray-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full mr-4"
                      onClick={handleUpdateProfile}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-full"
                      onClick={toggleEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-semibold text-emerald-600 mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-1">Name</p>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Cell Phone</p>
                    <p className="font-medium text-gray-800">
                      +91 9876543210
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-1">Address</p>
                    <p className="font-medium text-gray-800">
                      123 Main St, Anytown, ST 12345
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-emerald-600 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      HTML
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      CSS
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      JavaScript
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      React
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      Node.js
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
