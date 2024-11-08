import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  admindeleteUser,
  adminUpdateUser,
} from "../../redux/user/userSlice";

function UserList() {
  const dispatch = useDispatch();

  // Retrieve the list of users from the Redux store
  const users = useSelector((state) => state.user.users);

  // State for holding user data while editing
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users from the backend API on component load
  const fetchUsers = async () => {
    try {
      const response = await fetch('/server/admin/user/list');
      const data = await response.json();
      dispatch(setUsers(data));
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  // Handle deleting a user by sending a DELETE request to the backend
  const handleDelete = async (id) => {
    try {
      await fetch(`/server/admin/user/delete/${id}`, { method: "DELETE" });
      // Update Redux store to remove deleted user from state
      dispatch(admindeleteUser(id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }

  // Set the selected user to editing mode
  const handleEditClick = (user) => {
    setEditingUser(user);
  }

  // Update local state with changes made in the edit input fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  }

  // Submit the edited user details to the backend and update Redux state
  const handleEditSubmit = async () => {
    setError('');
    try {
      const response = await fetch(
        `/server/admin/user/update/${editingUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: editingUser.userName,
            email: editingUser.email,
          }),
        }
      )
      if (!response.ok) {
        const data = await response.json();
        setError(data.message); // Set error from backend
        return;
      }
      const updatedUser = await response.json();
      // Update Redux store with the edited user details
      dispatch(adminUpdateUser(updatedUser));
      // Exit edit mode
      setEditingUser(null);

    // Refetch users to update UI without full page reload
    fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const matchedUsers = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(matchedUsers);
  }

  return (
    <div className="p-5 max-w-4xl mx-auto my-4">
      <h1 className="text-2xl font-semibold text-center">User List</h1>

      {/* Searching for user */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="border p-2 rounded w-auto"
        />
        {/* Create New User button */}
        <Link
          to="/admin/createUser"
          className="bg-blue-500 text-white p-2 rounded ml-auto"
        >
          Create New User
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Show message if no users found in search results */}
      {filteredUsers.length === 0 && searchQuery && (
        <p className="text-red-500 text-center">No users found</p>
      )}

      {/* Table displaying user data */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="border p-3">Profile Picture</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over users and render each user row */}
          {filteredUsers?.map((user) => (
            <tr key={user._id}>
              <td className="border p-3">
                <img
                  src={user.profilePicture}
                  alt={`${user.userName}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border p-3">
                {editingUser && editingUser._id === user._id ? (
                  // Input field for editing userName
                  <input
                    type="text"
                    name="userName"
                    value={editingUser.userName}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  user.userName
                )}
              </td>
              <td className="border p-3">
                {editingUser && editingUser._id === user._id ? (
                  // Input field for editing email
                  <input
                    type="text"
                    name="email"
                    value={editingUser.email}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border p-3 flex justify-around">
                {editingUser && editingUser._id === user._id ? (
                  // Save and Cancel buttons in edit mode
                  <>
                    <button
                      onClick={handleEditSubmit}
                      className="text-green-500 mr-3"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="text-red-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  // Edit and Delete buttons in normal mode
                  <>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-500 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
