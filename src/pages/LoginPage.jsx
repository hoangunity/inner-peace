import { useFirebaseLoginMutation, useLoginUserMutation } from "../store";
import Button from "../components/Buttons";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Spinner from "../components/Spinner";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [
    signInWithGoogle,
    {
      data: firebaseResponse,
      isRegisteringFirebase,
      isSuccess: firebaseLoginSuccess,
    },
  ] = useFirebaseLoginMutation();

  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const [role, setRole] = useLocalStorage("role", "");
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
  const userRole = user && user.role;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const handleLogin = (formData) => {
    loginUser(formData);
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    signInWithGoogle({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      uid: user.uid,
      emailVerified: user.emailVerified,
    });
  };

  useEffect(() => {
    if (authToken && role) {
      navigate("/dashboard");
    } else if (loginSuccess) {
      setAuthToken(userToken);
      setRole(userRole);
      reset();
    } else if (firebaseLoginSuccess) {
      setAuthToken(firebaseResponse.token);
      setRole(firebaseResponse.user.role);
    }
  }, [
    role,
    loginSuccess,
    reset,
    navigate,
    setAuthToken,
    userToken,
    authToken,
    setRole,
    userRole,
    firebaseLoginSuccess,
    firebaseResponse,
  ]);

  if (isLogin || isRegisteringFirebase) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center mt-10 h-max">
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
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              {...register("email", {
                required: "Email is REQUIRED!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
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
              placeholder="Enter password"
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
        <FormError>{errorLogin && errorLogin}</FormError>
        <p>
          No account yet?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
        <div className="mt-4 flex justify-center">
          <GoogleLoginButton onClick={handleGoogleLogin} />
        </div>
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
