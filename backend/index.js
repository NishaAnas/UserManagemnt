import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_CONNECT_URL).then(()=>{
    console.log('Database Connected successfully')
}).catch((err)=>{
    console.log(`Error in Datavase Connection: ${err}`);
})
const app = express();

app.listen(PORT, ()=>{
    console.log(`Server Listening to port ${PORT}`);
})