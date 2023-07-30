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
  if (role === "admin") {
    content = (
      <div className="grid grid-flow-col auto-cols-max h-screen w-auto p-3 bg-gray-200 gap-x-4">
        <div
          className="bg-rose-200 w-max h-max cursor-pointer hover:bg-rose-800 "
          onClick={() => navigate("/tracks/add")}
        >
          <div className="p-3 font-semibold hover:text-white hover:font-bold">
            ADD TRACK
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default DashboardPage;
