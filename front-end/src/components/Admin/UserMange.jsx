import React, { useState } from 'react'

const UserMange = () => {
  const users = [
    {
      _id: 123,
      name: "Haroon",
      email: "haroonhk059@gmail.com",
      role: "Customer"
    }
  ];

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRole, setUserRole] = useState("Customer")

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserRole("Customer");
    console.log({ "Name": { userName }, "Email": { userEmail }, "Password": { userPassword }, "Role": { userRole } })
  }

  const hadleDelete = (id) => {
    console.log("user id:", id)
  }

  return (
    <div className='w-full px-5 sm:px-10 lg:px-20 py-10'>
      <h1 className='font-bold text-2xl'>User Management</h1>
      {/* Add User */}
      <h2 className='font-bold text-xl my-2'>Add user</h2>

      {/* User Form */}
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label><br />
          <input type="text" placeholder='User Name'
            value={userName}
            required
            name='name'
            onChange={(e) => setUserName(e.target.value)}
            className='border w-full p-2 mb-4 rounded' />


          <label htmlFor="email">Email</label><br />
          <input type="email" placeholder='User Email'
            value={userEmail}
            required
            name='email'
            onChange={(e) => setUserEmail(e.target.value)}
            className='border w-full p-2 mb-4 rounded' />


          <label htmlFor="password">Password</label><br />
          <input type="password" placeholder='User Password'
            value={userPassword}
            required
            name='password'
            onChange={(e) => setUserPassword(e.target.value)}
            className='border w-full p-2 mb-4 rounded' />


          <label htmlFor="role">Role</label><br />
          <select name="role" className='border w-full p-2 mb-4 rounded'
            value={userRole}
            required
            onChange={(e) => setUserRole(e.target.value)}>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>

          <button className='bg-green-500 text-white px-2 py-1 rounded-lg mb-4'>
            Add User
          </button>
        </form>
      </div>

      {/* User Table */}
      <div className='min-w-full mx-auto p-2 mt-6 sm:mt-2 sm:p-6 overflow-x-auto'>
        <table className='min-w-full text-left whitespace-nowrap'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className='border-b px-4 py-2'>{user.name}</td>
                  <td className='border-b px-4 py-2'>{user.email}</td>
                  <td className='border-b px-4 py-2'>{user.role}</td>
                  <td className='border-b px-4 py-2'>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg'
                      onClick={(id) => hadleDelete(user._id)}>Delete</button></td>
                </tr>
              ))

            ) :
              (
                <tr>
                  <td colSpan={4} className='text-center text-gray-500 p-4'>No User Found.</td>
                </tr>
              )}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserMange