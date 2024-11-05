import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  //state Variable
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
        console.log(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign Up </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="userName"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account ?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign-In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went Wrong"}</p>
    </div>
  );
}

export default Signup;
