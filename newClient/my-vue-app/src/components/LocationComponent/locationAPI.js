import axios from "axios";
const url = "/api/location";

export default class lAPI { 
    // to get all the posts from the servers
    static async getAllLocation(){
        const res = await axios.get(url);
        return res.data;
    }
    // to get single post by id
    static async getLocationByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
     // to insert post into database
     static async addLocation(post){
        const res = await axios.post(url,post);
        return res.data;
    }
     // to update post into database
     static async updateLocation(id,post){
        const res = await axios.patch(`${url}/${id}`,post);
        return res.data;
    }
     // to delete a post by id
     static async deleteLocation(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}