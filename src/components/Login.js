import { React, useState, useRef } from "react";
import Header from "./Header";
import { validateForm } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorName, setErrorName] = useState(null);

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
      // Perform sign in or sign up action here
      console.log("Form is valid. Proceeding with sign in/sign up.");
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
