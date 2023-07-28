import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import RemoveUser from "./pages/RemoveUser";

function App() {
  const links = [
    {
      text: "Home",
      to: "/",
    },
    {
      text: "Login",
      to: "login",
    },
    {
      text: "Register",
      to: "register",
    },
    {
      text: "Remove User",
      to: "remove-user",
    },
  ];

  return (
    <>
      <Router>
        <Navbar links={links} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="remove-user" element={<RemoveUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
