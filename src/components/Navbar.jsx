// src/components/Navbar.js

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl font-bold">
          Inner-Peace
        </NavLink>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              exact
              className="text-white hover:text-gray-200"
              activeClassName="underline"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="text-white hover:text-gray-200"
              activeClassName="underline"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
