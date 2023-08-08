import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useAddTrackMutation } from "../store";
import { useForm } from "react-hook-form";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

function AddTrackPage() {
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || !role || role !== "admin") {
      navigate("/");
    }
  }, [authToken, navigate, role]);

  const [addTrack, { isSuccess, error: errorAddTrack }] = useAddTrackMutation();
  const [uploadImageProgress, setUploadImageProgress] = useState(0);
  const [uploadFileProgress, setUploadFileProgress] = useState(0);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  let notification;
  if (isSuccess) {
    notification = (
      <div className="text-lg text-green-500 font-semibold">
        Successfully Added Track
      </div>
    );
  } else if (errorAddTrack) {
    notification = (
      <FormError>{errorAddTrack && errorAddTrack?.data?.error}</FormError>
    );
  }

  const onSubmit = async (formData) => {
    const fileForUpload = formData.file[0];
    const imageForUpload = formData.image[0];
    const fileName = fileForUpload.name + v4();
    const imageName = imageForUpload.name + v4();
    const fileRef = ref(storage, `soundtracks/${fileName}`);
    const imageRef = ref(storage, `images/${imageName}`);

    // Upload file with progress tracking
    const fileUploadTask = uploadBytesResumable(fileRef, fileForUpload);
    fileUploadTask.on("state_changed", (snapshot) => {
      // Track the upload progress here
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadFileProgress(Math.round(progress));
      console.log(`File Upload Progress: ${progress}%`);
    });

    // Upload image with progress tracking
    const imageUploadTask = uploadBytesResumable(imageRef, imageForUpload);
    imageUploadTask.on("state_changed", (snapshot) => {
      // Track the upload progress here
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadImageProgress(Math.round(progress));
      console.log(`Image Upload Progress: ${progress}%`);
    });

    // Wait for both uploads to complete
    await Promise.all([fileUploadTask, imageUploadTask]);

    const fileUrl = await getDownloadURL(fileRef);
    const imageUrl = await getDownloadURL(imageRef);

    console.log(fileUrl);
    console.log(imageUrl);

    addTrack({
      fileUrl,
      imageUrl,
      trackTitle: formData.track_title,
      trackName: fileName,
      imageName: imageName,
    });
    reset();
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label
            htmlFor="track_title"
            className="block text-gray-700 font-bold"
          >
            Track Title
          </label>
          <input
            autoComplete="on"
            id="track_title"
            type="text"
            {...register("track_title", {
              required: {
                value: true,
                message: "Title is REQUIRED",
              },
            })}
            className="block mt-1 p-2 rounded-md border w-full focus:ring focus:ring-indigo-200 focus:outline-none sm:text-sm"
          />
          {errors?.track_title && (
            <p className="text-red-500 mt-2">{errors?.track_title?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">
            Select an MP3 file: {uploadFileProgress}
          </label>
          <input
            {...register("file", {
              required: {
                value: true,
                message: "File is required",
              },
              validate: {
                onlyMP3: (value) => {
                  if (value.length > 0) {
                    return value[0].type === "audio/mpeg"
                      ? true
                      : "Only MP3 files are allowed.";
                  }
                  return "Please select an MP3 file.";
                },
              },
            })}
            type="file"
            accept=".mp3"
            className="block mt-1 p-2 rounded-md border focus:ring focus:ring-indigo-200 focus:outline-none sm:text-sm"
          />
          {errors.file && (
            <p className="text-red-500 mt-2">{errors.file.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">
            Select an image for the track: {uploadImageProgress}
          </label>
          <input
            {...register("image", {
              required: {
                value: true,
                message: "Image is REQUIRED!!",
              },
              validate: {
                validateImageFile: (value) => {
                  if (value.length > 0) {
                    return value[0].type.startsWith("image/")
                      ? true
                      : "Only image file are allowed.";
                  }
                  return "Please select an image file.";
                },
              },
            })}
            type="file"
            accept=".image/*"
            className="block mt-1 p-2 rounded-md border focus:ring focus:ring-indigo-200 focus:outline-none sm:text-sm"
          />
          {errors?.image && (
            <p className="text-red-500 mt-2">{errors?.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md"
        >
          Submit
        </button>
      </form>
      {notification}
    </div>
  );
}

function FormError({ children }) {
  return (
    <div className="mt-2">
      <span className="text-sm text-red-400 font-semibold">{children}</span>
    </div>
  );
}

export default AddTrackPage;
