import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";


const router = express.Router()

export const getPost = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        console.log(postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const createPost = async (req,res) =>{

    const post = req.body
    

    const newPost = new PostMessage(post)
    try {
        await newPost.save()

        // https://www.restapitutorial.com/httpstatuscodes.html

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}