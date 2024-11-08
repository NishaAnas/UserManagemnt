import User from "../Models/UserModel.js";
import { errorHandler } from "../utils/error.js"
import  bcryptjs  from 'bcryptjs';

export const test = (req,res) =>{
    res.json({
        message:'API is working fine'
    })
}

//for upadting user Profile details
export const updateUser = async(req,res,next) =>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'You have no access to this account'));
    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture,
            }
        },
    {new:true})

    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest);
    } catch (error) {
        if (error.code === 11000) {
            return next(errorHandler(400, 'You have no access to this email.'));
        }
        next(error)
    }
}

//Delete User
export const deleteUser = async(req,res,next) =>{
    if(req.user.id!==req.params.id){
        return next(errorHandler(401,'You have no access to this aacount'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error)
    }
}