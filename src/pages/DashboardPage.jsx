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

  let content;
  content = (
    <div className="flex flew-row flex-wrap justify-evenly content-start gap-x-2 gap-y-3 mt-4">
      {role === "admin" && (
        <>
          <div
            className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/tracks/add")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              ADD TRACK
            </div>
          </div>
          <div
            className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/tracks/remove")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              DELETE A TRACK
            </div>
          </div>
          <div
            className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/users/remove")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              REMOVE USER
            </div>
          </div>
          <div
            className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/users/add")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              ADD NEW USER
            </div>
          </div>
        </>
      )}
      <div
        className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
        onClick={() => navigate("/sessions/create")}
      >
        <div className="p-3 font-semibold hover:text-white hover:font-bold">
          CREATE SESSION
        </div>
      </div>
      <div
        className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
        onClick={() => navigate("/sessions")}
      >
        <div className="p-3 font-semibold hover:text-white hover:font-bold">
          ALL SESSIONS
        </div>
      </div>
      <div
        className="bg-rose-200 min-w-[200px] h-max cursor-pointer hover:bg-rose-800 "
        onClick={() => navigate("/profile")}
      >
        <div className="p-3 font-semibold hover:text-white hover:font-bold">
          MANAGE PROFILE
        </div>
      </div>
    </div>
  );

  return content;
}

export default DashboardPage;
