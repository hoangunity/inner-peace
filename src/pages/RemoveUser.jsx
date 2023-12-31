import { useGetAllUsersQuery, useRemoveUserMutation } from "../store";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RemoveUser = () => {
  const [authToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      return navigate("/");
    }
  }, [navigate, authToken]);

  const [
    removeUser,
    {
      error: errorRemoveUser,
      isLoading: isRemovingUser,
      isSuccess: removeUserSuccess,
    },
  ] = useRemoveUserMutation();

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorFetchingUser,
  } = useGetAllUsersQuery();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleRemoveUser = (formData) => {
    removeUser(formData.user_id);
  };

  let notification;
  if (removeUserSuccess) {
    notification = (
      <div className="text-sm text-green-500 font-semibold">
        Successfully removed user
      </div>
    );
  } else if (errorRemoveUser) {
    notification = (
      <FormError>{errorRemoveUser && errorRemoveUser?.data?.error}</FormError>
    );
  }

  if (isLoadingUsers) return <Spinner />;

  let content;
  if (!users) {
    content = (
      <div className="text-2xl text-red-500 font-semibold">No data...</div>
    );
  } else {
    content = (
      <>
        <form onSubmit={handleSubmit(handleRemoveUser)}>
          <div className="mb-2">
            <label
              htmlFor="user_id"
              className="block text-gray-700 font-semibold mb-2"
            >
              User To Delete
            </label>
            <select
              id="user_id"
              autoComplete="on"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("user_id", {
                required: "Please choose a user to delete",
              })}
            >
              <option value="">--Please choose an option--</option>
              {users &&
                users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.username} -{" "}
                      {user.role == "admin" ? "Admin" : "User"}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Button
              loading={isRemovingUser}
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
        <FormError>
          {errorFetchingUser && errorFetchingUser?.data?.error}
        </FormError>
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

export default RemoveUser;
