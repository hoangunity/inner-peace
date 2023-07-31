import { useEffect } from "react";
import Button from "../components/Buttons";
import { useAddSessionMutation, useGetAllTracksQuery } from "../store";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

function CreateSessionPage() {
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", "");

  const {
    data: tracks,
    isLoading: isLoadingGetAllTracks,
    // error: errorGetAllTracks,
  } = useGetAllTracksQuery();

  const [addSession, { error: errorCreateSession, isSuccess }] =
    useAddSessionMutation();

  useEffect(() => {
    if (isSuccess) {
      return navigate("/sessions");
    }
  }, [isSuccess, navigate]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleSessionAdd = (formData) => {
    addSession({
      authToken: authToken,
      track_id: parseInt(formData.track_id),
      title: formData.session_title,
    });
    reset();
  };

  let content;
  if (isLoadingGetAllTracks) {
    content = (
      <>
        <Spinner />
      </>
    );
  } else {
    content = (
      <>
        <div className="flex items-center justify-center mt-10">
          <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-3">Create Your Session</h1>
            <form onSubmit={handleSubmit(handleSessionAdd)}>
              <div className="mb-2">
                <label
                  htmlFor="session_title"
                  className="block text-gray-700 font-semibold"
                >
                  Session Title
                </label>
                <input
                  type="text"
                  id="session_title"
                  name="session_title"
                  autoComplete="on"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...register("session_title", {
                    required: "Session Title is REQUIRED!",
                  })}
                />
                <FormError>
                  {formErrors?.session_title?.message &&
                    formErrors.session_title.message}
                </FormError>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="track_id"
                  className="block text-gray-700 font-semibold"
                >
                  Choose a track
                </label>
                <select
                  type="text"
                  id="track_id"
                  name="track_id"
                  autoComplete="on"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...register("track_id", {
                    required: "A Track is REQUIRED!",
                  })}
                >
                  <option value="">Choose a track...</option>
                  {tracks &&
                    tracks.map((track) => {
                      return (
                        <option key={track.id} value={track.id}>
                          {track.title} - {track.id}
                        </option>
                      );
                    })}
                </select>
                <FormError>
                  {formErrors?.track_id?.message && formErrors.track_id.message}
                </FormError>
              </div>
              <Button primary rounded type="submit" className="mt-4">
                Create A Session
              </Button>
            </form>
            <FormError>
              {errorCreateSession && errorCreateSession.message}
            </FormError>
          </div>
        </div>
      </>
    );
  }

  return content;
}

function FormError({ children }) {
  return (
    <div className="mt-2">
      <span className="text-sm text-red-400 font-semibold">{children}</span>
    </div>
  );
}

export default CreateSessionPage;
