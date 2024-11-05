import bcryptjs from "bcryptjs";
import User from "../Models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  //hashing the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //Create a new User
  const newUser = new User({ userName, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    next(error);
    //next(errorHandler(300,"OOPS Something went Wrong"))
  }
};

// Signin function for user login
export const signin = async (req, res, next) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;
  
    try {
      // Finding a user with the provided email in the database
      const validUser = await User.findOne({ email });
  
      // If no user is found, send a custom error message
      if (!validUser) {
        return next(errorHandler(404, "User Not Found"));
      }
  
      // Comparing the password with the stored hashed password
      const validPassword = bcryptjs.compareSync(password, validUser.password);
  
      // If the password does not match, return an error
      if (!validPassword) {
        return next(errorHandler(401, "Wrong credentials"));
      }
  
      // Removing the password from the user document for security
      // validUser._doc contains the user data excluding Mongoose internals
      const { password: hashedPassword, ...rest } = validUser._doc;
  
      // Generating a JWT token with the user's unique _id
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  
      // Setting the JWT token expiry time (1 hour here)
      const expiryDate = new Date(Date.now() + 3600000);
  
      // Sending the token as a cookie and the user data (excluding password)
      res
        .cookie("accessToken", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      // Pass any errors to the error handler middleware
      next(error);
    }
  };
