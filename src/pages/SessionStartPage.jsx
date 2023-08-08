import { useNavigate, useParams } from "react-router-dom";
import AudioWithBackgroundVideo from "../components/AudioWithBackgroundVideo";
import useLocalStorage from "use-local-storage";
import { useGetSessionByIdQuery } from "../store";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import Button from "../components/Buttons";

function SessionStartPage() {
  // =============================
  // AUTHENTICATED
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", ""); // Hold the userId Information

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  });

  // =============================
  // UI

  let content;
  const { sessionId } = useParams(); // 34
  const audioRef = useRef();

  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useGetSessionByIdQuery({
    sessionId,
    authToken,
  });

  if (isLoading) {
    content = <Spinner />;
  }

  if (isError) {
    content = <h1>SOME THING WENT WRONG</h1>;
  }

  if (isSuccess) {
    content = (
      <>
        {session && (
          <>
            <Button
              className="text-center"
              primary
              onClick={() => audioRef.current.play()}
            >
              Play AUDIO
            </Button>
            <Button
              className="text-center"
              secondary
              onClick={() => audioRef.current.pause()}
            >
              Pause AUDIO
            </Button>
            <AudioWithBackgroundVideo
              ref={audioRef}
              audioUrl={session?.file_url}
            />
          </>
        )}
      </>
    );
  }

  return content;
}

export default SessionStartPage;
