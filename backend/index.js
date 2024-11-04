import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const PORT = 3000;
import UserRoutes from './Routes/user.routes.js'


//Connect MongoDb
mongoose.connect(process.env.MONGODB_CONNECT_URL).then(()=>{
    console.log('MongoDB Connected successfully')
}).catch((err)=>{
    console.log(`Error in MongoDB Connection: ${err}`);
})

//Configuring express
const app = express();



//Configuring Routes
app.use('/server/user',UserRoutes);


//Listening to port
app.listen(PORT, ()=>{
    console.log(`Server Listening to port ${PORT}`);
})