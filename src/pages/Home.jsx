import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  useEffect(() =>{
     if(user != null && user.role=='admin'){
       navigate('/admin/dashboard')
     }
  },[])

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to User Management System
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your users efficiently with our powerful user management
            tools.
          </p>
          <div className="flex space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" > Profile </Link>
              </>

              ) : (
              <>
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" > Login </Link>
                <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" > Sign Up </Link>
              </>
            )}
          </div>
        </main>

        <footer className="bg-gray-800 p-4 text-center text-gray-400">
          <p>&copy; 2024 User Management. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
