import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const toastId = useRef(null);

  const handleLogout = () => {
    if (!toast.isActive(toastId.current)) {
      // Check if a notification is already active
      toastId.current = toast.info(
        <div className="justify-between p-4">
          <p>Are you sure you want to logout?</p>
          <button
            onClick={() => {
              logout();
              toast.dismiss(toastId.current); // Dismiss the notification after logout
            }}
            className="text-white bg-red-600 py-2 px-4 rounded-md mr-2"
          >
            Logout
          </button>
          <button
            onClick={() => toast.dismiss(toastId.current)}
            className="text-white bg-gray-600 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          draggable: true,
          progress: undefined,
          closeButton: false,
          onClose: () => toast.dismiss(toastId.current), // Dismiss the notification when closed
        }
      );
    }
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 w-full fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"}>
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
          </Link>

          <div className="flex space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 lg:text-xl text-md">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
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
      <ToastContainer />
    </>
  );
};

export default Navbar;
