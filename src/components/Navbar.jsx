import { NavLink } from "react-router-dom";

const Navbar = ({ links }) => {
  const renderedLinks = links.map((link, index) => {
    return (
      <li key={index}>
        <NavLink to={link.to} className="text-white hover:text-gray-200">
          {link.text}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl font-bold">
          Inner-Peace
        </NavLink>
        <ul className="flex space-x-4">{renderedLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
