import { useRegisterUserMutation } from "../store";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [authToken] = useLocalStorage("authToken", "");
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
    if (authToken) {
      navigate("/");
    } else if (isSuccess) {
      reset();
    }
  }, [authToken, isSuccess, navigate, reset]);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-3">Register User</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
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
              {...register("username", {})}
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
              {...register("phone_number")}
            />
            <FormError>
              {formErrors?.phone_number?.message &&
                formErrors.phone_number.message}
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
        <FormError>{errorRegisterUser && errorRegisterUser.error}</FormError>
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

export default RegisterPage;
