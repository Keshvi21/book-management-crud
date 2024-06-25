import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold">Book Manager</Link>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>Welcome, {user.email}</li>
              <li>
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;