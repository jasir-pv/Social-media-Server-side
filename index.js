import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";


const app = express();

app.use("/posts", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
dotenv.config(); // Adjust path as needed


// MongoDB connection

const CONNECTION_URL = process.env.CONNECTION_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        
        console.log("DB connection successful");
    } catch (err) {
        console.log("DB connection error", err);
    }
};

connectDB();

app.listen (process.env.PORT || 5000, ()=>{
    console.log("Server Running");
    
} )
