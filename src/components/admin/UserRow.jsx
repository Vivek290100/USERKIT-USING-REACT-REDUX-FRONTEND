// UserRow.jsx
import React from 'react';

const UserRow = ({ user, handleDelete, handleEditClick }) => {
  const { name, email } = user;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-800">
      <td className="py-4 px-6 text-left whitespace-nowrap text-lg">
        <div className="flex items-center">
          <span className="font-medium">{name}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-left text-lg">
        <div className="flex items-center">
          <span>{email}</span>
        </div>
      </td>
      <td className="py-4 px-2 text-center">
        <button
          className="w-6 transform hover:text-blue-500 hover:scale-110"
          onClick={() => handleEditClick(user)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </td>
      <td className="py-4 px-2 text-center">
        <button
          className="w-6 transform hover:text-red-500 hover:scale-110"
          onClick={() => handleDelete(email)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
