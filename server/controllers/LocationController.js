

const Location = require("../models/LocationModel"); // Assuming you have a Location model


module.exports = class lAPI {
  // fetch all posts
  static async fetchAllLocation(req,res){
      try{
          const posts = await Location.find();
          res.status(200).json(posts);
      } catch(err){
          res.status(404).json({ message: err.message});
      }
  }

  // fetch post by ID
  static async fetchLocationByID(req,res){
      const id = req.params.id;
      try {
          const post = await Location.findById(id);
          res.status(200).json(post);
      } catch (err){
          res.status(404).json({message: err.message});
      }
  }
  // create a post
  static async createLocation(req,res){
      const post = req.body;
      try {
          await Location.create(post);
          console.log(post);
          res.status(201).json({message: 'Post created successfully'})
      } catch(err){
          
          res.status(400).json({message: err.message})
      }
  }
  // updatePost
  static async updateLocation(req,res){
    const id = req.params.id;
      try {
          await Location.findByIdAndUpdate(id);
          res.status(200).json({message: 'Post updated successfully'});
      } catch (err){
          res.status(404).json({message: err.message});
      }
  }
  // deletePost 
  static async deleteLocation(req,res){
     const id = req.params.id;
     try {
     await Location.findByIdAndDelete(id);
      res.status(200).json({message: 'Post deleted successfully'});
     } catch (err){
      res.status(404).json({message: err.message});
     }
  }
}
