import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';

const UserManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (user && user.role !== 'admin') {
      dispatch(fetchUsers());
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure to delete the user?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="w-full px-5 sm:px-10 lg:px-20 py-10">
      <h1 className="font-bold text-2xl">User Management</h1>

      {loading && <p>Loading ...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Add User Form */}
      <h2 className="font-bold text-xl my-2">Add User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="User Name"
          value={name}
          name="name"
          required
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          name="email"
          required
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="User Password"
          value={password}
          name="password"
          required
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
        />

        <label htmlFor="role">Role</label>
        <select
          name="role"
          value={role}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Add User</button>
      </form>

      {/* User Table */}
      <div className="min-w-full mx-auto p-2 mt-6 sm:p-6 overflow-x-auto">
        <table className="min-w-full text-left whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="border-b px-4 py-2">{user.name}</td>
                  <td className="border-b px-4 py-2">{user.email}</td>
                  <td className="border-b px-4 py-2">{user.role}</td>
                  <td className="border-b px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 p-4">
                  No User Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
