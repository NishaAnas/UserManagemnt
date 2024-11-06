import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setimage] = useState(null);
  const [imagepercent, setImagepercent] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpadteSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/updateProfile/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        // If the response status is not ok
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpadteSuccess(true)
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteUser = async() =>{
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/server/user/deleteUser/${currentUser._id}`, {
          method: "DELETE",
        });
  
        const data = await res.json();
        if (!res.ok) {
          // If the response status is not ok
          dispatch(deleteUserFailure(data.message));
        } else {
          dispatch(deleteUserSuccess(data));
        }
      } catch (error) {
        dispatch(deleteUserFailure(error));
      }
  }

  const handleSignOut = async()=>{
    try {
        await fetch('/server/auth/signOut');
        dispatch(signOut())
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setimage(e.target.files[0])}
          hidden
        />
        <img
          src={currentUser.profilePicture}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
        />
        <input
          defaultValue={currentUser.userName}
          type="text"
          id="userName"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.password}
          type="text"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-color-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update Details"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign-Out</span>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error || "Something went Wrong" : " "}
      </p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User Updated Successfully"}
      </p>
    </div>
  );
}

export default Profile;
