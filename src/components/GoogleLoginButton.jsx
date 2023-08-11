// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import useLocalStorage from "use-local-storage";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const GoogleLoginButton = ({ className }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (authToken && user) {
  //     navigate("/dashboard");
  //   }
  // }, [authToken, user, navigate]);

  const handleGoogleLogin = () => {
    // signInWithPopup(auth, googleProvider)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     setAuthToken(token);
    //     setUser(user);
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     console.error(error);
    //   });
    console.log("Google Login");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${className}`}
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
