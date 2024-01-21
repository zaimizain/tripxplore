<template>
  <v-container class="mx-auto justify-center">
    <v-card-text class="text-h4 pa-0 my-4"  style="color: #1f1f1f"><b>List Of Interesting Place</b></v-card-text> 
    
   

    <v-text-field density="compact" variant="solo" label="Where to go?" append-inner-icon="mdi-magnify" class="my-2"
      single-line hide-details v-model="searchText" @input="filterPosts" @click:append-inner="onClick" style="max-width: 300px;"
      ></v-text-field>

    <v-row>
        <v-col v-for="postx in postss" :key="postx._id" cols="12" sm="6" md="4" lg="3">
          <v-card class="pa-2 my-5">
           <p>Location: {{ postx.location }}</p> 
            Activity: {{ postx.activities }}

            <router-link :to="{ name: 'placedetails', params: { id: postx._id } }">
                            <img class="custom-image" :src="`/images/${postx.image}`" />
                        </router-link>
            
            <v-card-text class="my-1">
              <p>{{ postx.notes.substring(0, 15) + "...See More" }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
   
   </v-container>
</template>
<style >
.custom-image {
  height: 200px; /* Set your desired height */
  width: 500px; /* Ensures the width adjusts according to the height */
  object-fit: cover; /* Maintains aspect ratio and covers the entire container */
}
</style>
<script>

import pAPI from "../components/PlaceComponent/placeAPI";
import iAPI from "../components/ItineraryComponent/itineraryAPI";
import { useAuth } from "vue-clerk"



export default {

  data() {
    // const router = this.$router; // Store the router instance in a variable
    // const validateForm = () => this.$refs.form.validate();
    // const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });

    return {
      // placeClass: new placeClass({ router }),
      // locationClass: new locationClass({ validateForm, pushRoute, router }),
      originalPosts: [],
      postss: [],
      searchText: "", // Add this line
    };
  },

  async created() {
    const { getToken } = useAuth();
    const token = await getToken.value()
    this.fetchPosts(); // Fetch posts when the component is created
  
  },
  methods: {
    async fetchPosts() {
      this.postss = await pAPI.getAllPlace();
      this.originalPosts = [...this.postss]; // Copy the original list
 
    },
    filterPosts() {
      const searchText = this.searchText.toLowerCase();

      this.postss = this.originalPosts.filter((post) => {
        const location = post.location.toLowerCase();
        const activities = post.activities.toLowerCase();

        return (
          location.includes(searchText) || activities.includes(searchText)
        );
      });
    },


  },
};
</script>