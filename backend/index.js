import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const PORT = 3000;
import UserRoutes from './Routes/user.routes.js'
import AuthRoutes from './Routes/auth.routes.js'

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


//Configuring Routes

//User Routes
app.use('/server/user',UserRoutes);

//Authentication Routes
app.use('/server/auth',AuthRoutes);

//Listening to port
app.listen(PORT, ()=>{
    console.log(`Server Listening to port ${PORT}`);
})