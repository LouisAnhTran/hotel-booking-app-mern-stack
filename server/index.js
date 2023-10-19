// external
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';


// internal
import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotels.js';
import roomRoute from './routes/rooms.js';
import userRoute from './routes/users.js';
import { Nana } from "./controllers/hotel.js";


dotenv.config();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes


//Connec to Mongo DB Atlas
const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.vltdtth.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    );
    console.log('Connected to Mongo DB');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected',()=>{
    console.log("mongo db disconnected");
})

mongoose.connection.on('connected',()=>{
    console.log("mongo db connected");
})


// middleware
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/hotels',hotelRoute);
app.use('/api/rooms',roomRoute);


app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({'message': err.message || "Something went wrong"});
})

app.listen(process.env.PORT, () => {
    connect();
    console.log("Already connected to backend !!!");    
});
