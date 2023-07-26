import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePassword } from "../store";
import Button from "../components/Buttons";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);

  const handleEmailChange = (event) => {
    dispatch(changeEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(changePassword(event.target.value));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here, e.g., authenticate the user
    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <Button primary type="submit" className="rounded">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
