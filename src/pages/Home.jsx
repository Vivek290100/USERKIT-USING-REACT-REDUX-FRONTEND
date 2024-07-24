import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null && user.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div 
        className="flex-grow bg-cover bg-center bg-no-repeat items-center justify-center p-24"
        style={{ backgroundImage: `url(/depositphotos_232751862-stock-photo-dark-blue-shabby-wooden-background.jpg)` }}
      >
        <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold text-white mb-9">
            Welcome to User Management System
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Manage your users efficiently with our powerful user management tools.
          </p>
          <div className="flex space-x-4">
            {user ? (
              <Link to="/profile" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
