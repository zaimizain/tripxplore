// controllers/dayController.js
const Itinerary = require('../models/ItineraryModel');
// const fs = require("fs");

module.exports = class iAPI {
    static async createItinerary(req, res) {
        const { newDay, location, itineraryName, startDate ,endDate } = req.body;
        // const imagename = req.file.filename;
        // newDay.image = imagename;
        const itinerary = new Itinerary({newDay,location, itineraryName,startDate,endDate });
        
        try {
            await Itinerary.create(itinerary);
            res.status(201).json({ message: 'Itinerary created successfully',itinerary });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async fetchAllItinerary(req,res){
        try{
            const posts = await Itinerary.find();
            res.status(200).json(posts);
        } catch(err){
            res.status(404).json({ message: err.message});
        }
    }
    static async deleteItinerary(req,res){
        const id = req.params.id;
        try {
        const result = await Itinerary.findByIdAndDelete(id);
        // if(result.image != ''){
        //     try{
        //         fs.unlinkSync('./uploads/'+result.image);
        //     } catch (err){
        //         console.log(err);
        //     }
        // }
         res.status(200).json({message: 'Itinerary deleted successfully'});
        } catch (err){
         res.status(404).json({message: err.message});
        }
     }
     static async updateItinerary(req,res){
        const id = req.params.id;
          try {
              await Itinerary.findByIdAndUpdate(id);
              res.status(200).json({message: 'Itinerary updated successfully'});
          } catch (err){
              res.status(404).json({message: err.message});
          }
      }
      
}
;
