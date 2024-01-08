import axios from "axios";
const url = "/api/place";


export default class pAPI { 

    constructor (auth) {
        this.auth = auth
    }
    // to get all the posts from the servers
    static async getAllPlace(token){
        const res = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return res.data;

    }
    // to get single post by id
    static async getPlaceByID(id){
        const res = await axios.get(`${url}/${id}`,{
            headers: {
                Authorization: `Bearer ${ss}`
            }
        });
        return res.data;
    }

    
     // to insert post into database
     static async addPlace(post){
        const res = await axios.post(url,post);
        return res.data;
    }
     // to update post into database
     static async updatePlace(id,post){
        const res = await axios.patch(`${url}/${id}`,post);
        return res.data;
    }
     // to delete a post by id
     static async deletePlace(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}