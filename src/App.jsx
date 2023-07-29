import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import RemoveUser from "./pages/RemoveUser";
import DashboardPage from "./pages/DashboardPage";

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
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
