import { NavLink } from "react-router-dom";
import Button from "./Buttons";
import useLocalStorage from "use-local-storage";

const Navbar = ({ links }) => {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");
  // const navigate = useNavigate();

  const logoutUser = () => {
    setAuthToken(null);
    setRole(null);
  };

  const renderedLinks = links.map((link, index) => {
    return (
      <li key={index}>
        <NavLink to={link.to} className="text-white hover:text-gray-200">
          {link.text}
        </NavLink>
      </li>
    );
  });

  if (authToken && role) {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-white text-xl font-bold">
            Inner Peace
          </NavLink>
          <ul className="flex space-x-4 items-center">
            <li>
              <NavLink to="/" className="text-white hover:text-gray-200">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="text-white hover:text-gray-200"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <Button
                onClick={logoutUser}
                className="text-white hover:text-gray-200"
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl font-bold">
          Inner Peace
        </NavLink>
        <ul className="flex space-x-4">{renderedLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
