import axios from "axios";
const url = "/api/place";

import { reactive } from 'vue'

export const store = reactive({
 
    async getPlaceByID(id,token){
    const res = await axios.get(`${url}/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
},
 async getAllPlace(token){
    console.log("Token:",token)
    const res = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;

}
})