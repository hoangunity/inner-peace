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

  // const getAllSoundtracks = async () => {
  //   const soundtracksListRef = ref(storage, `soundtracks/`);
  //   listAll(soundtracksListRef).then((res) => {
  //     // console.log(res);
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         // setSoundtrackList((prev) => [...prev, url]);
  //         // console.log(url);
  //       });
  //     });
  //   });
  // };

  // const [soundtrackList, setSoundtrackList] = useState([]);

  let content;
  content = (
    <div className="grid grid-flow-col auto-cols-max h-screen w-auto p-3 bg-gray-200 gap-x-4">
      {role === "admin" && (
        <>
          <div
            className="bg-rose-200 w-max h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/tracks/add")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              ADD TRACK
            </div>
          </div>
          <div
            className="bg-rose-200 w-max h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/users/remove")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              REMOVE USER
            </div>
          </div>
          <div
            className="bg-rose-200 w-max h-max cursor-pointer hover:bg-rose-800 "
            onClick={() => navigate("/users/add")}
          >
            <div className="p-3 font-semibold hover:text-white hover:font-bold">
              ADD NEW USER
            </div>
          </div>
        </>
      )}
      <div
        className="bg-rose-200 w-max h-max cursor-pointer hover:bg-rose-800 "
        onClick={() => navigate("/sessions/create")}
      >
        <div className="p-3 font-semibold hover:text-white hover:font-bold">
          CREATE SESSION
        </div>
      </div>
      <div
        className="bg-rose-200 w-max h-max cursor-pointer hover:bg-rose-800 "
        onClick={() => navigate("/sessions")}
      >
        <div className="p-3 font-semibold hover:text-white hover:font-bold">
          ALL SESSIONS
        </div>
      </div>
    </div>
  );

  return content;
}

export default DashboardPage;
