import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    // Sign out logic here
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <>
      <div className="absolute w-1/2 px-4 py-2 z-40">
        <img
          className="w-44 cursor-pointer"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
      </div>
      {user && (
        <div>
          <button
            onClick={handleSignOut}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer font-bold"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
