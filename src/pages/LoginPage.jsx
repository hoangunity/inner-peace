import { useLoginUserMutation } from "../store";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const [
    loginUser,
    {
      isSuccess: loginSuccess,
      data: user,
      isLoading: isLogin,
      error: errorLogin,
    },
  ] = useLoginUserMutation();
  const userToken = user && user.token;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const handleLogin = (formData) => {
    loginUser(formData);
  };

  useEffect(() => {
    if (authToken) {
      navigate("/");
    } else if (loginSuccess) {
      setAuthToken(userToken);
      reset();
    }
  }, [loginSuccess, reset, navigate, setAuthToken, userToken, authToken]);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-3">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
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
                required: "Email is REQUIRED!",
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
          <Button
            loading={isLogin}
            primary
            rounded
            type="submit"
            className="mt-4"
          >
            Login
          </Button>
        </form>
        <FormError>{errorLogin && errorLogin.data?.message}</FormError>
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

export default LoginPage;
