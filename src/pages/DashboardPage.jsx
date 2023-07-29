import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function DashboardPage() {
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || !role) {
      navigate("/");
    }
  }, [authToken, navigate, role]);

  return (
    <div className={`grid h-screen grid-rows-[auto]`}>
      <div className="flex flex-col border-b border-t border-stone-200 py-1 ">
        <main className="flex grow flex-col">CONTENT</main>
      </div>
    </div>
  );
}

export default DashboardPage;
