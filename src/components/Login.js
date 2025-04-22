import { React, useState, useRef } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  // const confirmPassword = useRef(null);

  const handleButtonClick = () => {
    const nameValue = isSignInForm ? "" : name.current.value;
    // const confirmPasswordValue = isSignInForm? "": confirmPassword.current.value;
    const message = validateForm(
      email.current.value,
      password.current.value,
      nameValue,
      // confirmPasswordValue,
      isSignInForm
    );
    console.log(message);

    if (message) {
      if (message.includes("email")) {
        setErrorEmail(message);
      } else if (message.includes("password")) {
        setErrorPassword(message);
      } else if (message.includes("name")) {
        setErrorName(message);
      }
    } else {
      setErrorEmail(null);
      setErrorPassword(null);
      setErrorName(null);
      console.log("Form is valid. Proceeding with sign in/sign up.");

      // Perform sign in or sign up action here
      if (message) return;
      if (!isSignInForm) {
        console.log("Signing up with email:", email.current.value);
        // Add your sign-up logic here

        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: nameValue,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
                navigate("/browse");
                // Profile updated!
              })
              .catch((error) => {
                alert(error.message);
              });
            console.log("User signed up:", user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage + " " + errorCode);
          });
      } else {
        console.log("Signing in with email:", email.current.value);
        // Add your sign-in logic here

        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User signed in:", user);
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage + " " + errorCode);
          });
      }
    }
  };
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg"
          alt="background"
        />
      </div>
      <form
        className="absolute p-10 m-auto left-0 right-0 my-40 bg-black text-white flex flex-col w-3/12 opacity-90 rounded-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <>
            <input
              ref={name}
              className="p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
              type="name"
              placeholder="Name"
            />
            <p className="text-red-500 text-sm font-bold">{errorName}</p>
          </>
        )}

        <input
          ref={email}
          className=" p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
          type="text"
          placeholder="Email"
        />
        <p className="text-red-500 text-sm font-bold">{errorEmail}</p>

        <input
          ref={password}
          className="p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
          type="password"
          placeholder="Password"
        />

        <p className="text-red-500 text-sm font-bold">{errorPassword}</p>

        {/* {!isSignInForm && (
          <>
            <input
              ref={confirmPassword}
              className="p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
              type="password"
              placeholder="Confirm Password"
            />
            {errorPassword === "Passwords do not match" && (
              <p className="text-red-500 text-sm font-bold">{errorPassword}</p>
            )}
          </>
        )} */}
        <button
          className="p-2 my-5 rounded-sm bg-red-700"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex">
          <p className="text-gray-400">
            {isSignInForm ? "New to Netflix?" : "Already have an account?"}
            <label
              className="text-white font-bold hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? " Sign Up Now" : " Sign In"}
            </label>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
