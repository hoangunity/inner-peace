import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function DashboardPage() {
  const [authToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);
  return <div>DashboardPage</div>;
}

export default DashboardPage;
