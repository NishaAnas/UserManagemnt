import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const PORT = 3000;
import UserRoutes from './Routes/user.routes.js'
import AuthRoutes from './Routes/auth.routes.js'
import  cookieParser  from 'cookie-parser';

//Connect MongoDb
mongoose.connect(process.env.MONGODB_CONNECT_URL).then(()=>{
    console.log('MongoDB Connected successfully')
}).catch((err)=>{
    console.log(`Error in MongoDB Connection: ${err}`);
})

//Configuring express
const app = express();

//For getting JSON input as input request
app.use(express.json());

//for parsing cookies
app.use(cookieParser());


//Configuring Routes

//User Routes
app.use('/server/user',UserRoutes);

//Authentication Routes
app.use('/server/auth',AuthRoutes);

//Middleware for handling Error
app.use((err,req,res,next) =>{
const statusCode = err.statusCode || 500;
const message = err.message || "Internal Server Error";
return res.status(statusCode).json({
    status:false,
    message,
    statusCode
})
})

//Listening to port
app.listen(PORT, ()=>{
    console.log(`Server Listening to port ${PORT}`);
})