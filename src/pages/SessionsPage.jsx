import useLocalStorage from "use-local-storage";
import { useGetAllSessionsQuery } from "../store";
import SessionsList from "../components/SessionsList";

function SessionsPage() {
  const [authToken] = useLocalStorage("authToken", "");
  const { data, isSuccess: successGetAllSessions } =
    useGetAllSessionsQuery(authToken);

  const sessions = data?.sessions;

  return (
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
  );
}

export default SessionsPage;
