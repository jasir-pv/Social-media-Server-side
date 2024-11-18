import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const PORT = process.env.PORT || 3000



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());




app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// MongoDB connection

const CONNECTION_URL = process.env.CONNECTION_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL)
        
        console.log("DB connection successful");
    } catch (err) {
        console.log("DB connection error", err);
    }
};

connectDB();

app.listen ( PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
    
} )
