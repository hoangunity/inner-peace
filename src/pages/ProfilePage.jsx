import avatarProfile from "../assets/images/avatarProfile.png";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { useGetUserInfoQuery, useUpdateUserMutation } from "../store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");

  // ==================== UI ========================
  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    isError,
    error,
    refetch: refetchUserInfo,
  } = useGetUserInfoQuery(authToken);

  const [
    updateUser,
    { isLoading: isUpdating, isSuccess: updateUserInfoSuccess },
  ] = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      username: userInfo?.username || "",
      phone_number: userInfo?.phone_number || "",
    },
  });

  const handleUpdateUser = async (formData) => {
    console.log(formData);
    let fileName, imageRef, fileUploadTask, imageURL;
    const profileImage = formData.file[0];
    if (profileImage) {
      fileName = profileImage.name + v4();
      imageRef = ref(storage, `usersProfile/${fileName}`);
      fileUploadTask = await uploadBytesResumable(imageRef, profileImage);
      imageURL = await getDownloadURL(imageRef);
      console.log(fileUploadTask);
      console.log(imageURL);
    }

    const updateInfo = {
      username: formData.username,
      phone_number: formData.phone_number,
      photo_url: imageURL || "",
      authToken: authToken,
    };
    updateUser(updateInfo);
    reset();
  };

  useEffect(() => {
    if (!authToken || !role) {
      return navigate("/");
    }

    if (updateUserInfoSuccess) {
      setIsEditing(false);
    }
  }, [authToken, role, navigate, updateUserInfoSuccess]);

  if (isUpdating || isLoadingUserInfo) {
    return <Spinner />;
  }

  let content;
  if (!isEditing) {
    content = (
      <div className="flex flex-col gap-3 mx-auto items-center relative min-h-screen min-w-full pt-5">
        <div className="w-20 h-20 rounded-full overflow-hidden z-10">
          <img
            className="w-20 h-20 object-cover"
            src={userInfo?.photo_url || avatarProfile}
            alt="User Profile Image"
          />
        </div>
        {/* INFO START HERE */}
        <div className="z-10 flex flex-col gap-4 text-base">
          <div>
            <strong>Username:</strong>{" "}
            <span className="font-semibold">{userInfo?.username}</span>
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <span className="font-semibold">{userInfo?.email}</span>
          </div>
          <div>
            <strong>Phone Number:</strong>{" "}
            <span className="font-semibold">
              {userInfo?.phone_number || "No info"}
            </span>
          </div>
          <div>
            <strong>Role:</strong>{" "}
            <span className="font-semibold">{userInfo?.role}</span>
          </div>
        </div>
        {/* INFO ENDS HERE */}

        <button
          onClick={() => {
            setIsEditing(true);
          }}
          className="border border-blue-400 px-4 py-3 rounded-xl bg-blue-300 text-white hover:text-blue-300 hover:bg-blue-900 active:bg-blue-700 active:text-white"
        >
          Update Info
        </button>
      </div>
    );
    // =================================
    // UPDATE USER INFO FORM
  } else {
    content = (
      <>
        <div className="flex flex-col gap-3 mx-auto items-center relative min-h-screen min-w-full pt-5">
          <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
            <div className="mb-2">
              <label
                htmlFor="file"
                className="block text-gray-700 font-semibold"
              >
                Upload your profile image (Optional)
              </label>
              <input
                type="file"
                id="file"
                className="mt-2"
                {...register("file", {
                  required: {
                    value: false,
                  },
                  validate: {
                    validateImageFile: (value) => {
                      if (value.length > 0) {
                        return value[0].type.startsWith("image/")
                          ? true
                          : "Only image file are allowed.";
                      }
                      return true;
                    },
                  },
                })}
              />
              <FormError>
                {formErrors?.file?.message && formErrors.file.message}
              </FormError>
            </div>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                autoComplete="on"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is REQUIRED",
                })}
              />
              <FormError>
                {formErrors?.username?.message && formErrors.username.message}
              </FormError>
            </div>
            <div className="mb-2">
              <label
                htmlFor="phone_number"
                className="block text-gray-700 font-semibold"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                autoComplete="on"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter phone number"
                {...register("phone_number", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                  pattern: {
                    value: /^\+?[0-9\s-()]{8,20}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              <FormError>
                {formErrors?.phone_number?.message &&
                  formErrors.phone_number.message}
              </FormError>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-300 text-white rounded-xl hover:bg-green-600 hover:text-green-200 active:bg-green-500 active:text-white"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                type="submit"
                className="px-4 py-2 border text-black hover:bg-slate-300 hover:text-white rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
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
