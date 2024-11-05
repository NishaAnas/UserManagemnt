import bcryptjs from 'bcryptjs';
import User from '../Models/UserModel.js';

export const signup = async(req,res) =>{
    const{ userName, email, password} = req.body;
    //hashing the password
    const hashedPassword = bcryptjs.hashSync(password,10);

    //Create a new User
    const newUser = new User({userName,email,password:hashedPassword})
    try {
        await newUser.save();
        res.status(200).json({message:'User Registered Successfully'})
    } catch (error) {
        res.status(500).json(error.message)
    }
}