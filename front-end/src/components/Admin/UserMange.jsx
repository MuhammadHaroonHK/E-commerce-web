import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUsers,
} from "../../redux/slices/adminSlice";
import { FiSearch, FiPlus, FiTrash2, FiUser, FiMail, FiLock, FiUserCheck, FiMoreVertical } from "react-icons/fi";

const UserManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [user, dispatch]);

  const { name, email, password, role } = formData;

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(addUser(formData));
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(userId));
    }
  };

  // Calculate statistics
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const customerCount = users.filter((u) => u.role === "customer").length;

  return (
    <div className="w-full max-w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all users in your system</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{totalUsers}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Admins</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{adminCount}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 col-span-1 sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Customers</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{customerCount}</p>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm sm:text-base">
            Error: {error}
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add New User
            </button>
          </div>
        </div>

        {/* User Table - Desktop View */}
        <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!loading && filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-700 font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-800 transition duration-150 font-medium text-sm flex items-center gap-1"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        {searchTerm ? "No users found matching your search." : "No users available."}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {!loading && filteredUsers.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          )}
        </div>

        {/* User Cards - Mobile View */}
        <div className="sm:hidden space-y-3">
          {!loading && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="flex-shrink-0 h-12 w-12">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-700 font-medium text-base">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      <div className="mt-1">
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="ml-2 text-red-600 hover:text-red-800 transition duration-150 p-1 flex-shrink-0"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                {searchTerm ? "No users found matching your search." : "No users available."}
              </div>
            )
          )}
          
          {/* Mobile Footer */}
          {!loading && filteredUsers.length > 0 && (
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add New User</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition p-1"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                        placeholder="••••••••"
                        minLength="6"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <div className="relative">
                      <FiUserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="role"
                        value={role}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition appearance-none bg-white"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:flex-1 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 transition duration-200 text-sm sm:text-base"
                    >
                      {submitting ? "Adding user..." : "Add User"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManage;