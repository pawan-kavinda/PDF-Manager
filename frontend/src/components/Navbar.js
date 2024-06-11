import React from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="flex space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">{user.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
