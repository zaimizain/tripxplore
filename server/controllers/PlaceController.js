// controllers/UserController.js

const Place = require("../models/PlaceModel"); // Assuming you have a User model
const fs = require("fs");

module.exports = class pAPI {
  // fetch all posts
  static async fetchAllPlace(req,res){
      try{
          const posts = await Place.find();
          res.status(200).json(posts);
      } catch(err){
          res.status(404).json({ message: err.message});
      }
  }

  // fetch post by ID
  static async fetchPlaceByID(req,res){
      const id = req.params.id;
      try {
          const post = await Place.findById(id);
          res.status(200).json(post);
      } catch (err){
          res.status(404).json({message: err.message});
      }
  }
  // create a post
  static async createPlace(req,res){
      const post = req.body;
      console.log(req.file)
      const imagename = req.file.filename;
      post.image = imagename;
      try {
          await Place.create(post);
          res.status(201).json({message: 'Post created successfully'})
      } catch(err){
          
          res.status(400).json({message: err.message})
      }
  }
  // updatePost
  static async updatePlace(req,res){
    const id = req.params.id;
    let new_image = " ";
    if (req.file){
      new_image = req.file.filename;
      try {
          fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch(err){
          console.log(err); 
    }
          
      } else {
          new_image = req.body.old_image;
      }
      const newPost = req.body;
      newPost.image = new_image;

      try {
          await Place.findByIdAndUpdate(id, newPost);
          res.status(200).json({message: 'Post updated successfully'});
      } catch (err){
          res.status(404).json({message: err.message});
      }
  }
  // deletePost 
  static async deletePlace(req,res){
     const id = req.params.id;
     try {
      const result = await Place.findByIdAndDelete(id);
      if(result.image != ''){
          try{
              fs.unlinkSync('./uploads/'+result.image);
          } catch (err){
              console.log(err);
          }
      }
      res.status(200).json({message: 'Post deleted successfully'});
     } catch (err){
      res.status(404).json({message: err.message});
     }
  }
}
