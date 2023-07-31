import { useRegisterUserMutation } from "../store";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const AddNewUserPage = () => {
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", "");
  const [role] = useLocalStorage("role", "");
  const [
    registerUser,
    { error: errorRegisterUser, isLoading: isRegisteringUser, isSuccess },
  ] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const handleRegister = (formData) => {
    registerUser(formData);
  };

  useEffect(() => {
    if (!authToken || !role || role !== "admin") {
      navigate("/");
    } else if (isSuccess) {
      reset();
    }
  }, [authToken, navigate, role, isSuccess, reset]);
  console.log(errorRegisterUser);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-3">Add A New User</h1>
        <form onSubmit={handleSubmit(handleRegister)} noValidate>
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
              {...register("username")}
            />
            <FormError>
              {formErrors?.username?.message && formErrors.username.message}
            </FormError>
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="on"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("email", {
                required: "Email is REQUIRED",
                pattern: "",
              })}
            />
            <FormError>
              {formErrors?.email?.message && formErrors.email.message}
            </FormError>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="on"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("password", {
                required: "Password is REQUIRED",
              })}
            />
            <FormError>
              {formErrors?.password?.message && formErrors.password.message}
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
          <div className="mb-2">
            <label
              htmlFor="role_select"
              className="block text-gray-700 font-semibold"
            >
              Choose a role
            </label>
            <select
              id="role_select"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("role", {
                required: "Role is REQUIRED",
              })}
            >
              <option value="">Select...</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <FormError>
              {formErrors?.role_select?.message &&
                formErrors.role_select.message}
            </FormError>
          </div>
          <Button
            loading={isRegisteringUser}
            primary
            rounded
            type="submit"
            className="mt-4"
          >
            Register
          </Button>
        </form>
        {isSuccess && (
          <span className="text-green-500 mt-2 text-sm font-semibold">
            Registered successfully!
          </span>
        )}
        <FormError>
          {errorRegisterUser && errorRegisterUser?.data?.error}
        </FormError>
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

export default AddNewUserPage;
