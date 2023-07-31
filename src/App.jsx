import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import RemoveUser from "./pages/RemoveUser";
import DashboardPage from "./pages/DashboardPage";
import AddTrackPage from "./pages/AddTrackPage";
import SessionsPage from "./pages/SessionsPage";
import CreateSessionPage from "./pages/CreateSessionPage";

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
        <div className="h-screen w-full grid grid-rows-[max-content_1fr] auto-rows-max">
          <Navbar links={links} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="users/remove" element={<RemoveUser />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="tracks/add" element={<AddTrackPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="sessions/create" element={<CreateSessionPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
