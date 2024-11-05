import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
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
      const res = await fetch("/server/auth/signin", {
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
        Navigate('/')
        //console.log(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
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
      <p className="text-red-700 mt-5">{error && "Something went Wrong"}</p>
    </div>
  );
}

export default Signin;
