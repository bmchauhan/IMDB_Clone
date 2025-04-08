import React from "react";
import Logo from "../logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img className="w-[50px] h-auto filter invert" src={Logo} alt="Logo" />
        <Link
          to="/"
          className="text-3xl font-bold text-purple-300 hover:text-blue-300 transition duration-300"
        >
          Movies
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="text-lg font-semibold hover:text-purple-300 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/watchlist"
          className="text-lg font-semibold hover:text-purple-300 transition duration-300"
        >
          Watchlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
