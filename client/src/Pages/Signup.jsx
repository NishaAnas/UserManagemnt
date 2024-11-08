import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

function Signup() {
  //state Variable
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //use this form data and send to the backend and save to db
  //for removing corcs error just give a proxy server in vite.config file

  //Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    //we have to make a call to the url "https://localhost:3000/server/auth/signup" along withthe form data
    try {
      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        // If the response status is not ok
        setError(true);
      } else {
        Navigate('/signin')
        //console.log(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl text-center font-bold text-gray-800 my-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          id="userName"
          className="bg-gray-50 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center gap-1 mt-6 text-gray-600">
        <p>Already have an account?</p>
        <Link to="/signin">
          <span className="text-blue-600 hover:underline">Sign In</span>
        </Link>
      </div>
      <p className="text-center text-red-600 mt-4">{error && "Something went wrong"}</p>
    </div>
);

}

export default Signup;