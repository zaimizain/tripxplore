import axios from "axios";
const url = "/api/test";

export default class tAPI { 

    // to get all the posts from the servers
    static async getAllTest(token){
        console.log("Token:",token)
        const res = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return res.data;

    }
}