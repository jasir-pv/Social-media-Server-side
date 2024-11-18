import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";


const router = express.Router()

export const getPost = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// serarch

export const getPostBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

  
    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostMessage.find({
          $or: [{ title }, { tags: { $in: tags.split(",") } }],
        });
        res.json({ data: posts });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
    };
  

export const createPost = async (req,res) =>{

    const post = req.body
    

    const newPost = new PostMessage({
        ...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save()

        // https://www.restapitutorial.com/httpstatuscodes.html

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// Update


export const updatePost = async (req,res) =>{
    const {id: _id} = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid (_id)) return res.status(500).send("No Post with that id")
 
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},  {new:true})

        res.json(updatedPost)

}

//  Delete

export const deletePost = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid (id)) return res.status(404).send("No Post with that id")
    await PostMessage.findByIdAndDelete(id);
    res.json({message: "Post Deleted Successfully"})
}

// Like

export const likePost = async (req,res) =>{
    const {id} = req                                                                                                                                                                                               .params

    req.userId

    if(!req.userId) return res.json({ message: "Unauthorized"})

    if(!mongoose.Types.ObjectId.isValid (id)) return res.status(404).send("No Post with that id")

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if(index === -1) {
        post.likes.push(String(req.userId))
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true})
    res.json(updatedPost)
}
