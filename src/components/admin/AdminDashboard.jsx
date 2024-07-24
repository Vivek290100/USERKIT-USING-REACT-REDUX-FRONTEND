// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUsers, FaSearch, FaPlus } from "react-icons/fa";
import AdminNavbar from "../common/AdminNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
import UserRow from "./UserRow";
import EditUserModal from "./EditUserModal";
import { toast, Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(null);
  const usersPerPage = 6;
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      await axios.delete(
        `http://localhost:5000/api/admin/deleteUser/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(users.filter((user) => user.email !== email));
      toast.success("User Deleted Successfully !");
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
    fetchUsers();
    setEditUser(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <AdminNavbar />
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="lg:col-span-2 bg-gradient-to-r from-gray-900 to-gray-700 p-6">
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
                <div className="bg-gray-500 text-white px-4 py-3 rounded-r">
                  <FaSearch />
                </div>
              </div>
              <div className="ml-auto ">
                <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-28 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  <FaPlus className="mr-2" /> Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className=" text-white bg-gray-900 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-2 text-center">Edit</th>
                    <th className="py-3 px-2 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="text-white text-sm font-light">
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
              <span className="text-white mx-4">
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
      <Toaster />
    </>
  );
};

const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-gray-900 p-6 flex items-center">
    <div className="text-3xl text-blue-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
