import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const {currentUser} = useSelector((state)=>state.user)
    const fileRef = useRef(null);
    const[image,setimage] = useState(null);
    const[imagepercent,setImagepercent] = useState(0);
    const[formData,setFormData]=useState({});
    console.log(formData);
    console.log(imagepercent);
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type='file' ref={fileRef} accept='image/*' onChange={(e) =>setimage(e.target.files[0])} hidden />
                <img src={currentUser.profilePicture} alt='profile' onClick={()=>fileRef.current.click()} className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' />
                <input defaultValue={currentUser.userName}  type='text' id='userName' placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
                <input defaultValue={currentUser.email}  type='email' id='email' placeholder='email' className='bg-slate-100 rounded-lg p-3' />
                <input defaultValue={currentUser.password}  type='text' id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' /> 
                <button className='bg-slate-700 text-color-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update Details</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign-Out</span>
            </div>
        </div>
    )
}

export default Profile
