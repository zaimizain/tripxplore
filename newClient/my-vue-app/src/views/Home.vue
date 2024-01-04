  
<template>
  <v-container class="mx-auto justify-center">

    <v-btn type="submit" href="/userUI">Submit</v-btn>

    <v-row>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>BEST DESTINATIONS AROUND THE WORLD</h3>
          <h1>Travel, enjoy
            and live a new
            and full life</h1>
          <h5>Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening.
            Park gate sell they west hard for the.</h5>

          <v-btn> Explore now</v-btn>

        </v-sheet>

      </v-col>

        <v-sheet class="pa-2 ma-2" justify-end>
          <v-img height="600" width="800" src="/wall1.jpg" class="mx-4 my-4"></v-img>
        </v-sheet>


    </v-row>

    <v-row class="pa-2 ma-2 my-4">
      <v-row>
        <v-col>
        <v-sheet>
          <h1 class="my-3">MY PLACE</h1> <v-spacer></v-spacer> 
          
          <h3 class="my-3">Create and customize your perfect travel schedule with just a few clicks.</h3>
         
          <v-sheet class="justify-end">
            <v-btn href="/listplaceUI" >+</v-btn>
          </v-sheet>
         
          
          <v-col sm="2" class="pa-2" v-for="post in posts" :key="post._id">
            <v-card class="pa-2"  :to="{ name: 'post', params: { id: post._id } }">
              <v-img height="250" width="1900" :src="`/${post.image}`"></v-img>
              <v-card-title class="headline">
                {{ post.location }}
              </v-card-title>
              <v-card-text class="py-0">
                <p>{{ post.notes.substring(0, 15) + "...See More" }}</p>
              </v-card-text>

            </v-card>
          </v-col>
        </v-sheet>
      </v-col>
      
      </v-row>
     
    </v-row>


    <v-row class="pa-2 ma-2 my-4">
      <v-row>
      <v-sheet>
        <h1>MY ITINERARY</h1>
        <h3>Create and customize your perfect travel schedule with just a few clicks.</h3>

      </v-sheet>
    </v-row>
   <v-row> <v-btn href="/listitinerary">+</v-btn></v-row>
    </v-row>
  </v-container>
</template>
  
<script>
import placeClass from "../components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";
import locationClass from "../components/LocationComponent/locationClass";
import wall1 from "../assets/wall1.jpg"


export default {

    data() {
        const router = this.$router; // Store the router instance in a variable
        const validateForm = () => this.$refs.form.validate();
        const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });
        
     
        return {
            placeClass: new placeClass({ router }),
            locationClass: new locationClass({ validateForm, pushRoute, router }),
            posts: [],
        };
    },

    async created() {
        this.fetchPosts(); // Fetch posts when the component is created
    },
    methods: {
        async fetchPosts() {
            this.posts = await pAPI.getAllPlace();
        },
    },
};
</script>
 