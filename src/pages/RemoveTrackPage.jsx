import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllTracksQuery, useRemoveTrackMutation } from "../store";

const RemoveTrackPage = () => {
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || !role || role !== "admin") {
      return navigate("/");
    }
  }, [navigate, authToken, role]);

  const [
    removeTrack,
    {
      error: errorRemoveTrack,
      isSuccess: removeTrackSuccess,
      isLoading: isRemovingTrack,
    },
  ] = useRemoveTrackMutation();

  const { data: tracks, isLoading: isFetchingTracks } = useGetAllTracksQuery();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleRemoveTrack = (formData) => {
    removeTrack({
      trackId: formData.track_id,
      authToken: authToken,
    });
  };

  let notification;
  if (removeTrackSuccess) {
    notification = (
      <div className="text-sm text-green-500 font-semibold">
        Successfully Remove Track
      </div>
    );
  } else if (errorRemoveTrack) {
    notification = (
      <FormError>{errorRemoveTrack && errorRemoveTrack?.data?.error}</FormError>
    );
  }

  if (isFetchingTracks) return <Spinner />;

  let content;
  if (!tracks) {
    content = (
      <div className="text-2xl text-red-500 font-semibold">No data...</div>
    );
  } else {
    content = (
      <>
        <form onSubmit={handleSubmit(handleRemoveTrack)}>
          <div className="mb-2">
            <label
              htmlFor="track_id"
              className="block text-gray-700 font-semibold mb-2"
            >
              Track To Delete
            </label>
            {content}
            <select
              id="track_id"
              autoComplete="on"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("track_id", {
                required: "Please choose a track to delete",
              })}
            >
              <option value="">--Please choose an option--</option>
              {tracks &&
                tracks.map((track) => {
                  return (
                    <option key={track.id} value={track.id}>
                      {track.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Button
              loading={isRemovingTrack}
              rounded
              danger
              type="submit"
              className="mt-4"
            >
              Remove
            </Button>
            <FormError>
              {formErrors?.user_id?.message && formErrors.user_id.message}
            </FormError>
          </div>
        </form>
        {notification}
      </>
    );
  }

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-2">Delete a user</h1>
        {content}
      </div>
    </div>
  );
};

function FormError({ children }) {
  return (
    <div className="mt-2">
      <span className="text-sm text-red-400 font-semibold">{children}</span>
    </div>
  );
}

export default RemoveTrackPage;
