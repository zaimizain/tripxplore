

<template>
  <div>
  <v-container class="mx-auto justify-center">
    
    <v-row>
      <v-col>
        <v-sheet >
          <v-card-text class="text-h3 text-lg-h3"  style="color: #1f1f1f"><b>Best Destinations Around The World!</b></v-card-text> 
          <v-card-text class="text-h5"  style="color: #1f1f1f">Travel, enjoy, live a new and full life</v-card-text> 


          <v-btn href="/" large plain class="mx-3" style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;"> <p class="font-weight-bold">Explore Now</p></v-btn>
        </v-sheet>

      </v-col>

        <v-sheet  justify-end>
          <v-img height="500" width="700" src="assets/wall1.jpg" class="mx-13 "></v-img>
        </v-sheet>


    </v-row>

    <v-row  class="pa-1 ma-1 ">
      <v-row>
        <v-col>
        <v-sheet>
          <v-card-text class="text-h4"  style="color: #262121"><b>My Place</b></v-card-text>  
          <v-card-text class="text-h5"  style="color: #1f1f1f">Create and customize your perfect travel place with just a few clicks.</v-card-text> 
          
        </v-sheet>

      </v-col>
      <v-col >
          <v-sheet class="ma-5">
            <router-link to="/listplaceUI"  > <v-btn large plain class="mx-3" style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;"> <p class="font-weight-bold">+</p></v-btn></router-link>
          </v-sheet>
        </v-col>
          <v-col>
          <v-col sm="2" class="pa-2" v-for="post in posts" :key="post._id">
            <!-- <v-card class="pa-2"  :to="{ name: 'post', params: { id: post._id } }"> -->
              <v-card class="pa-2" >
              <v-img height="250" width="1900" :src="`/images/${post.image}`"></v-img>
              <v-card-title class="headline">
                {{ post.location }}
              </v-card-title>
              <v-card-text class="py-0">
                <p>{{ post.notes.substring(0, 15) + "...See More" }}</p>
              </v-card-text>

            </v-card>
          </v-col>
        </v-col>
      </v-row>
     
    </v-row>


    <v-row class="pa-1 ma-1 ">
      <v-row>
        
        <v-col>
          <v-sheet>
            <v-card-text class="text-h4"  style="color: #262121"><b>My Itinerary</b></v-card-text>  
            <v-card-text class="text-h5"  style="color: #1f1f1f">Create and customize your perfect travel itinerary with just a few clicks.</v-card-text> 

          </v-sheet>
        </v-col>
       <v-col><v-sheet class="ma-5">
            <router-link to="/firstpage"  > <v-btn large plain class="mx-3" style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;"> <p class="font-weight-bold">+</p></v-btn></router-link>
          </v-sheet>
        </v-col>
     </v-row>
   <v-row> 
   </v-row>
  </v-row>
  </v-container>
</div>
</template>
  
<script>
import placeClass from "../components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";
import locationClass from "../components/LocationComponent/locationClass";
import {useAuth} from "vue-clerk"

export default {

    data() {
        // const router = this.$router; // Store the router instance in a variable
        // const validateForm = () => this.$refs.form.validate();
        // const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });
        
     
        return {
            // placeClass: new placeClass({ router }),
            // locationClass: new locationClass({ validateForm, pushRoute, router }),
            posts: [],
        };
    },

    async created() {
      const {getToken} = useAuth();
      console.log(getToken.value)
      console.log(await pAPI.getAllPlace());
        this.fetchPosts(); // Fetch posts when the component is created
    },
    methods: {
        async fetchPosts() {
            this.posts = await pAPI.getAllPlace();
        },
    },
};
</script>