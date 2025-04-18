import { React, useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(false);
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
      <form className="absolute p-10 m-auto left-0 right-0 my-40 bg-black text-white flex flex-col w-3/12 opacity-90 rounded-sm">
        <h1 className="text-xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input
          className="p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
          type="name"
          placeholder="Name"
        />}
        <input
          className=" p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
          type="text"
          placeholder="Email or mobile number"
        />
        
        <input
          className="p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
          type="password"
          placeholder="Password"
        />
        {!isSignInForm && <input
          className="p-2 my-4 outline-none bg-gray-800 rounded-sm text-sm"
          type="password"
          placeholder="Confirm Password"
        />}
        <button className="p-2 my-5 rounded-sm bg-red-700">
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
