import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className="bg-gray-800 p-4 w-full fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <div className="flex flex-col">
            <span className="self-center lg:text-2xl text-md font-semibold whitespace-nowrap dark:text-white">
              PDF MANAGER
            </span>
          </div>
        </div>

        <div className="flex space-x-4">
          {user ? (
            <>
              <span className="text-gray-300 lg:text-xl text-md">{user.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white lg:py-1 lg:px-3 px-2 rounded-md hover:bg-red-700 text-center"
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
