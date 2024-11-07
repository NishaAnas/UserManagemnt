import bcryptjs from "bcryptjs";
import User from "../Models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//SignUp function for user registration
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
      // Pass errors to the error handler middleware
      next(error);
    }
  };

// Google Authentication function
export const googleAuth = async (req, res, next) => {
  try {
    //Check if the user exists based on email from the Google sign-in
    const user = await User.findOne({ email: req.body.email });
    let token;
    let userData;

    if (user) {
      // For existing users, remove the hashed password from the response data
      const { password: hashedPassword, ...rest } = user._doc;
      // Set response data for existing user
      userData = rest;  
      // JWT token generation for existing user
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });  

    } else {
      //Create a unique username for the new user(2 user's can have same dispaly name)
      const generatedUsername = req.body.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000).toString();
      
      //Generate a random password, hash it, and create the new user record
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);  
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        userName: generatedUsername,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo 
      });
      
      await newUser.save();
      
      // Remove the hashed password from the response data for security
      const { password: hashedPasswordNew, ...rest } = newUser._doc;
      userData = rest;
      token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    //Set the JWT as a cookie with a 1-hour expiration and send the user data as JSON response
    res.cookie("accessToken", token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })  // 1 hour expiration
      .status(200)
      .json(userData);

  } catch (error) {
    // Pass errors to the error-handling middleware
    next(error);
  }
};


//Signout functionality
export const signout = async(req,res) => {
  res.clearCookie('accessToken').status(200).json('signOut success');
}