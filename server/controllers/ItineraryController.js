

const Itinerary = require("../models/ItineraryModel"); // Assuming you have a Location model


module.exports = class iAPI {
  // fetch all posts
  static async fetchAllItinerary(req,res){
      try{
          const posts = await Itinerary.find();
          res.status(200).json(posts);
      } catch(err){
          res.status(404).json({ message: err.message});
      }
  }

  // fetch post by ID
  static async fetchItineraryByID(req,res){
      const id = req.params.id;
      try {
          const post = await Itinerary.findById(id);
          res.status(200).json(post);
      } catch (err){
          res.status(404).json({message: err.message});
      }
  }
  // create a post
  static async createItinerary(req,res){
      const post = req.body;
      try {
          await Itinerary.create(post);
          res.status(201).json({message: 'Itinerary created successfully'})
      } catch(err){
          
          res.status(400).json({message: err.message})
      }
  }
  // updatePost
  static async updateItinerary(req,res){
    const id = req.params.id;
      try {
          await Itinerary.findByIdAndUpdate(id);
          res.status(200).json({message: 'Itinerary updated successfully'});
      } catch (err){
          res.status(404).json({message: err.message});
      }
  }
  // deletePost 
  static async deleteItinerary(req,res){
     const id = req.params.id;
     try {
     await Itinerary.findByIdAndDelete(id);
      res.status(200).json({message: 'Itinerary deleted successfully'});
     } catch (err){
      res.status(404).json({message: err.message});
     }
  }
}
