import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinStart, signinSuccess, signinFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  //state Variable
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch()

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
        dispatch(signinSuccess(data))
        Navigate('/')
        //console.log(data.message);
      }
    } catch (error) {
      dispatch(signinFailure(error))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign In </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an Account ?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign-Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? error || "Something went Wrong" : " "}</p>
    </div>
  );
}

export default Signin;
