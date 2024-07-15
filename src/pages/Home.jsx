import React from 'react'
import Navbar from '../components/common/Navbar'
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex flex-col">
     

      <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to User Management System</h1>
        <p className="text-lg text-gray-600 mb-8">Manage your users efficiently with our powerful user management tools.</p>
        <div className="flex space-x-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
          <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Sign Up</Link>
        </div>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        <p>&copy; 2024 User Management. All rights reserved.</p>
      </footer>
    </div>


    </div>
  )
}

export default Home