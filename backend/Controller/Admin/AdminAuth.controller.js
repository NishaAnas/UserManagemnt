import bcryptjs from "bcryptjs";
import Admin from '../../Models/AdminModel.js';
import jwt from "jsonwebtoken";
import { errorHandler } from "../../utils/error.js";


export const Adminsignup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newAdmin = new Admin({ userName, email, password: hashedPassword });

    try {
        await newAdmin.save();
        res.status(200).json({ message: "Admin Registered Successfully" });
      } catch (error) {
        next(error);
      }
}

export const Adminsignin = async (req,res,next) =>{
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) {
      return next(errorHandler(404, "Admin Not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const { password: hashedPassword, ...rest } = validAdmin._doc;
    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    res
        .cookie("AdminaccessToken", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
  } catch (error) {
    next(error);
  }
}

//Signout functionality
export const Adminsignout = async(req,res) => {
  res.clearCookie('AdminaccessToken').status(200).json('signOut success');
}