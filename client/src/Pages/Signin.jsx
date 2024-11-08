import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";

function Signin() {
  //state Variable
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //use this form data and send to the backend and save to db
  //for removing corcs error just give a proxy server in vite.config file

  //Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //we have to make a call to the url "https://localhost:3000/server/auth/signup" along withthe form data
    try {
      dispatch(signinStart());
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        // If the response status is not ok
        dispatch(signinFailure(data.message || "Sign-in failed"));
      } else {
        dispatch(signinSuccess(data));
        Navigate("/");
        //console.log(data.message);
      }
    } catch (error) {
      dispatch(signinFailure(error));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl text-center font-bold text-gray-800 my-6">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-gray-50 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-gray-50 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-75"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center gap-1 mt-6 text-gray-600">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span className="text-blue-600 hover:underline">Sign Up</span>
        </Link>
      </div>
      <p className="text-center text-red-600 mt-4">
        {error ? error || "Something went wrong" : " "}
      </p>
    </div>
  );
}

export default Signin;
