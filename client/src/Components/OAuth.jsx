import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signinFailure, signinSuccess, } from "../redux/user/userSlice";
import { app } from "../firebase"; 
import { useNavigate } from "react-router-dom";


const OAuth = () => {

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleAuth = async() =>{
        try {
            const Provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,Provider);
            const res = await fetch("/server/auth/google", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                }),
              });
        
              const data = await res.json();
              dispatch(signinSuccess(data))
              Navigate('/')
        } catch (error) {
            console.log(`Could not sigin with google ${error}`);
            dispatch(signinFailure(error.message));
        }
    }
    return (
        <button type="button" onClick={handleGoogleAuth} className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
            Continue with google
        </button>
    )
}

export default OAuth
