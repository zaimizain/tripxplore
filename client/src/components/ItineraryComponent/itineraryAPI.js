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
     static async addItinerary(posts) {
        try {
          // Check if 'posts' is an array
          if (Array.isArray(posts)) {
            // If 'posts' is an array, assume multiple itinerary posts
            const res = await axios.post(url, posts);
            return res.data;
          } else {
            // If 'posts' is not an array, assume a single itinerary post
            const res = await axios.post(url, [posts]);
            return res.data;
          }
        } catch (error) {
          console.error(error);
          throw error; // Re-throw the error for further handling in the calling code
        }
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