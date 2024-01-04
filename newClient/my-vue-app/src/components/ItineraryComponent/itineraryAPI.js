import axios from "axios";
const url = "/api/itinerary";

export default class lAPI { 
    // to get all the posts from the servers
    static async getAllItinerary(){
        const res = await axios.get(url);
        return res.data;
    }
    // to get single post by id
    static async getItineraryByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
     // to insert post into database
     static async addItinerary(post){
        const res = await axios.post(url,post);
        return res.data;
    }
     // to update post into database
     static async updateItinerary(id,post){
        const res = await axios.patch(`${url}/${id}`,post);
        return res.data;
    }
     // to delete a post by id
     static async deleteItinerary(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}