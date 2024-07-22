// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUsers, FaSearch } from "react-icons/fa";
import AdminNavbar from "../common/AdminNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
import UserRow from "./UserRow";
import EditUserModal from "./EditUserModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(null);
  const usersPerPage = 10;
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/getUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch users. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteUser/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.email !== email));
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to delete user. Please try again."
      );
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = () => {
    fetchUsers(); // Refresh the user list
    setEditUser(null);
  };


  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <AdminNavbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:col-span-2 bg-white p-6">
            <div className="flex">
              <div className="">
                <DashboardCard
                  icon={<FaUsers />}
                  title="Total Users"
                  value={users.length}
                />
              </div>
              <div className="mb-2 w-80 flex items-center">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="bg-blue-500 text-white px-4 py-3 rounded-r">
                  <FaSearch />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-2 text-center">Edit</th>
                    <th className="py-3 px-2 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-3 px-6 text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <UserRow
                        key={user._id}
                        user={user}
                        handleDelete={handleDelete}
                        handleEditClick={handleEditClick}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-700 mx-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          {editUser && (
            <EditUserModal
              isOpen={Boolean(editUser)}
              onClose={() => setEditUser(null)}
              user={editUser}
              onUpdate={handleUpdateUser}
            />
          )}
        </div>
      </div>
    </>
  );
};

const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 flex items-center">
    <div className="text-3xl text-blue-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-600">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
