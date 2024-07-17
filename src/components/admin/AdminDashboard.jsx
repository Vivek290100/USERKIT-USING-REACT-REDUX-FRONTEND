import React from 'react';
import { FaUsers, FaChartBar, FaCog, FaEnvelope } from 'react-icons/fa';
import AdminNavbar from '../common/AdminNavbar';

const AdminDashboard = () => {
  return (
    <>
    <AdminNavbar/>
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard icon={<FaUsers />} title="Total Users" value="1,234" />
          <DashboardCard icon={<FaChartBar />} title="Revenue" value="$45,678" />
          <DashboardCard icon={<FaEnvelope />} title="New Messages" value="18" />
          <DashboardCard icon={<FaCog />} title="System Health" value="98%" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User List</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Role</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                <UserRow name="John Doe" email="john@example.com" role="Admin" />
                <UserRow name="Jane Smith" email="jane@example.com" role="User" />
                <UserRow name="Bob Johnson" email="bob@example.com" role="Editor" />
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="text-3xl text-blue-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-600">{value}</p>
    </div>
  </div>
);

const UserRow = ({ name, email, role }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="py-3 px-6 text-left whitespace-nowrap">
      <div className="flex items-center">
        <span className="font-medium">{name}</span>
      </div>
    </td>
    <td className="py-3 px-6 text-left">
      <div className="flex items-center">
        <span>{email}</span>
      </div>
    </td>
    <td className="py-3 px-6 text-center">
      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
        {role}
      </span>
    </td>
    <td className="py-3 px-6 text-center">
      <div className="flex item-center justify-center">
        <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
  

);

export default AdminDashboard;