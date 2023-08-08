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
import AddNewUserPage from "./pages/AddNewUser";
import RemoveTrackPage from "./pages/RemoveTrackPage";
import SessionStartPage from "./pages/SessionStartPage";

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
            <Route path="dashboard" element={<DashboardPage />} />

            <Route path="users/remove" element={<RemoveUser />} />
            <Route path="users/add" element={<AddNewUserPage />} />
            <Route path="tracks/add" element={<AddTrackPage />} />
            <Route path="tracks/remove" element={<RemoveTrackPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="sessions/create" element={<CreateSessionPage />} />
            <Route path="sessions/:sessionId" element={<SessionStartPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
