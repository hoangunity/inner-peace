import { useGetAllUsersQuery, useRemoveUserMutation } from "../store";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";

const RemoveUser = () => {
  const [removeUser, { error: errorRemoveUser, isLoading: isRemovingUser }] =
    useRemoveUserMutation();

  const { data, isLoading, error } = useGetAllUsersQuery();
  const users = data && data.data;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleRemoveUser = (formData) => {
    removeUser(formData.user_id);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-2">Delete a user</h1>
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
                      {user.username}
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
        <FormError>{errorRemoveUser && errorRemoveUser.error}</FormError>
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
