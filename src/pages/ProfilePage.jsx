import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { useGetUserInfoQuery, useUpdateUserMutation } from "../store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");

  // ==================== UI ========================
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useGetUserInfoQuery(authToken);

  const [
    updateUser,
    {
      data: updateUserInfo,
      isLoading: isUpdating,
      error: updateUserInfoError,
      isSuccess: updateUserInfoSuccess,
    },
  ] = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const handleUpdateUser = (formData) => {
    const updateInfo = {
      ...formData,
      authToken: authToken,
    };
    console.log(formData);
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

  if (isUpdating) {
    return <Spinner />;
  }

  let content;
  if (!isEditing) {
    content = (
      <div className="flex flex-col gap-3 mx-auto items-center relative min-h-screen min-w-full pt-5">
        <div className="w-20 h-20 rounded-full overflow-hidden z-10">
          <img
            className="w-20 h-20 object-cover"
            src={userInfo?.photo_url}
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
          onClick={() => setIsEditing(true)}
          className="border border-blue-400 px-4 py-3 rounded-xl bg-blue-300 text-white hover:text-blue-300 hover:bg-blue-900 active:bg-blue-700 active:text-white"
        >
          Update Info
        </button>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex flex-col gap-3 mx-auto items-center relative min-h-screen min-w-full pt-5">
          <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
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

  /* return (
    <div className="flex flex-col gap-3 mx-auto items-center relative min-h-screen min-w-full pt-5">
      <div className="w-20 h-20 rounded-full overflow-hidden z-10">
        <img
          className="w-20 h-20 object-cover"
          src={userInfo?.photo_url}
          alt="User Profile Image"
        />
      </div>

      <div className="z-10 text-white flex flex-col gap-4 text-base">
        <div>
          Username:{" "}
          {isEditing ? (
            <input
              type="text"
              value={userInfo?.username}
              onChange={(e) => {
                // Implement logic to update local state
              }}
            />
          ) : (
            <span className="font-semibold">{userInfo?.username}</span>
          )}
        </div>
        <div>
          Email:{" "}
          {isEditing ? (
            <input
              type="email"
              value={userInfo?.email}
              onChange={(e) => {
                // Implement logic to update local state
              }}
            />
          ) : (
            <span className="font-semibold">{userInfo?.email}</span>
          )}
        </div>
        <div>
          Phone Number:{" "}
          {isEditing ? (
            <input
              type="tel"
              value={userInfo?.phone_number || ""}
              onChange={(e) => {
                // Implement logic to update local state
              }}
            />
          ) : (
            <span className="font-semibold">
              {userInfo?.phone_number || ""}
            </span>
          )}
        </div>
        <div>
          Role: <span className="font-semibold">User</span>
        </div>
      </div>

      {isEditing ? (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSaveClick}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleEditClick}
        >
          Edit Info
        </button>
      )}

      <img
        className="absolute top-0 left-0 right-0 bottom-0 object-cover -z-50"
        src={profileBanner}
        alt="Profile Banner"
      />
    </div>
  ); */
}

function FormError({ children }) {
  return (
    <div className="mt-2">
      <span className="text-sm text-red-400 font-semibold">{children}</span>
    </div>
  );
}
