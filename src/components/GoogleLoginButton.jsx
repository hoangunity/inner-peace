import googleLogo from "../assets/images/googleLogo.png";

const GoogleLoginButton = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center px-4 py-2 rounded-md border-2 border-stone-300 gap-2">
      <img className="w-6 h-6" src={googleLogo} alt="google logo" />
      <button
        onClick={onClick}
        className={`w-full text-center font-semibold text-red-500`}
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
