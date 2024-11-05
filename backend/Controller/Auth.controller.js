import bcryptjs from 'bcryptjs';
import User from '../Models/UserModel.js';
import { errorHandler } from '../utils/error.js';

export const signup = async(req, res, next) =>{
    const{ userName, email, password} = req.body;
    //hashing the password
    const hashedPassword = bcryptjs.hashSync(password,10);

    //Create a new User
    const newUser = new User({userName,email,password:hashedPassword})
    try {
        await newUser.save();
        res.status(200).json({message:'User Registered Successfully'})
    } catch (error) {
        next(error)
        //next(errorHandler(300,"OOPS Something went Wrong"))
    }
}