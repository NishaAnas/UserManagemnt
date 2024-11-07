import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSigninStart, adminSigninSuccess, adminSigninFailure } from "../../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
function Signin() {

    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(adminSigninStart());

        try {
            const res = await fetch("/server/admin/auth/adminSignin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            if (!res.ok) {
                dispatch(adminSigninFailure(data.message || "Admin sign-in failed"));
              } else {
                dispatch(adminSigninSuccess(data));
                navigate("/admin/dashboard");
              }
        } catch (error) {
            dispatch(adminSigninFailure(error));
        }
      }

    return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Sign In </h1>
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
    )
}

export default Signin
