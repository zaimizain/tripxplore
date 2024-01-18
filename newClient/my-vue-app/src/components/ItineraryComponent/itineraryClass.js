import axios from "axios";
const url = "/api/itinerary";

export default class iAPI { 

    // to get all the posts from the servers
    static async getAllItinerary(token){
        console.log("Token:",token)
        const res = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(res.data);
        return res.data;

    }
}