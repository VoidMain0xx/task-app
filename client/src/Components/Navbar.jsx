import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">TaskApp</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/dashboard" className="hover:text-gray-200">Dashboard</a></li>
          <li><a href="/logout" className="hover:text-gray-200">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
