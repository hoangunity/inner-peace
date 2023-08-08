import useLocalStorage from "use-local-storage";
import { useGetAllSessionsQuery } from "../store";
import SessionsList from "../components/SessionsList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SessionsPage() {
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");
  const {
    data,
    isSuccess: successGetAllSessions,
  } = useGetAllSessionsQuery(authToken);

  const sessions = data?.sessions;

  useEffect(() => {
    if (!authToken || !role) {
      navigate("/");
    }
  }, [authToken, role, navigate]);

  const valid = authToken && role;
  let content;
  if (valid) {
    content = (
      <>
        <div className="w-full grid grid-rows-[max-content_1fr] bg-stone-100">
          <div className="flex items-center justify-center pt-2">
            <h2 className="text-2xl font-semibold">ALL SESSIONS</h2>
          </div>

          {/* SESSIONS AREA */}
          <div>
            {successGetAllSessions && sessions && (
              <div className="bg-green-50 w-full h-full">
                <SessionsList sessions={sessions} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return content;
}

export default SessionsPage;
