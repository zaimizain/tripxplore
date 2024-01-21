import axios from "axios";
const url = "/api/itinerary";

export default class iAPI { 
    // to get all the posts from the servers
    static async getAllItinerary(){
        const res = await axios.get(url);
        console.log("sini",res.data);
        return res.data;
    }
    // to get single post by id
    static async getItineraryByID(id){
      console.log("sini",id);
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
     // to insert post into database
     static async addItinerary(posts) {
        try {
          if (!Array.isArray(posts)) {
            throw new Error('Invalid input. Expected an array of itinerary posts.');
          }
      
          const res = await axios.post(url, posts);
          return res.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server.');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error in setting up the request:', error.message);
              }
          throw error; // Re-throw the error for further handling in the calling code
        }
      }
      
      static async updateItinerary(id,post) {
        try {
          if (!Array.isArray(post)) {
            throw new Error('Invalid input. Expected an array of itinerary posts.');
          }
      
          const res = await axios.patch(`${url}/${id}`,post);
        return res.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server.');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error in setting up the request:', error.message);
              }
          throw error; // Re-throw the error for further handling in the calling code
        }
      }
     // to update post into database
    //  static async updateItinerary(id,post){
    //     const res = await axios.patch(`${url}/${id}`,post);
    //     return res.data;
    // }
     // to delete a post by id
     static async deleteItinerary(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
