

<template>
  <div>
    <v-container class="mx-auto justify-center">

      <v-row>
        <v-col>
          <v-sheet>
            <v-card-text class="text-h3 text-lg-h3" style="color: #1f1f1f"><b>Best Destinations Around The
                World!</b></v-card-text>
            <v-card-text class="text-h5" style="color: #1f1f1f">Travel, enjoy, live a new and full life</v-card-text>


            <v-btn href="/" large plain class="mx-3"
              style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;">
              <p class="font-weight-bold">Explore Now</p>
            </v-btn>
          </v-sheet>

        </v-col>

        <v-sheet justify-end>
          <v-img height="500" width="700" src="assets/wall1.jpg" class="mx-13 "></v-img>
        </v-sheet>


      </v-row>

      <v-row class="pa-1 ma-1">
        <v-col>
          <v-sheet>
            <v-card-text class="text-h4" style="color: #262121"><b>My Places</b></v-card-text>
            <v-card-text class="text-h5" style="color: #1f1f1f">Create and customize your perfect travel places with just
              a few clicks.</v-card-text>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="ma-5">
            <router-link to="/listplaceUI">
              <v-btn large plain class="mx-3" icon="mdi-plus" size="small"
                style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;">

              </v-btn>
            </router-link>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="pa-1 ma-1">
        <v-col v-for="postx in postss" :key="postx._id" cols="12" sm="6" md="4" lg="3" class="mx-9">
          <v-card class="pa-1" height="320" width="300">
            <router-link :to="{ name: 'placedetails', params: { id: postx._id } }">
              <img class="custom-image" :src="`/images/${postx.image}`" />
            </router-link>
            <v-card-title class="headline">
              {{ postx.activities }}
            </v-card-title>
            <v-card-text class="py-0">
              <p><v-icon class="mx-2" size="small">mdi-map-marker</v-icon>{{ postx.location }}</p>
              <p><v-icon class="mx-2" size="small">mdi-human-female-boy</v-icon>{{ postx.age }}</p>
              <p><v-icon class="mx-2" size="small">mdi-cash</v-icon>{{ postx.budget }}</p>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>


      <v-row class="pa-1 ma-1 ">
        <v-col>
          <v-sheet>
            <v-card-text class="text-h4" style="color: #262121"><b>My Itinerary</b></v-card-text>
            <v-card-text class="text-h5" style="color: #1f1f1f">Create and customize your perfect travel itinerary with
              just a few clicks.</v-card-text>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="ma-5">
            <router-link to="/test2"> <v-btn large plain class="mx-3" icon="mdi-plus" size="small"
                style="background-color: #a88a5e; color: #1d1d1d; transition: box-shadow 0.3s;border-radius: 999px;">

              </v-btn>
            </router-link>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row class="pa-1 ma-1">
        <v-col v-for="itineraryx in itinerary" :key="itineraryx._id" cols="12" sm="6" md="4" lg="3" class="mx-9">
          <router-link :to="{ name: 'test2', params: { id: itineraryx._id } }">
          <v-card class="pa-1" height="120" width="300">
            <v-card-title class="headline">
              {{ itineraryx.itineraryName }}
            </v-card-title>
            <v-card-text class="py-0">
              <p><v-icon class="mx-2" size="small">mdi-map-marker</v-icon>{{ itineraryx.location }}</p>
              <p><v-icon class="mx-2" size="small">mdi-calendar-multiselect</v-icon>{{ formatDate(itineraryx.startDate) }} -
                {{ formatDate(itineraryx.endDate) }}</p>

            </v-card-text>
          </v-card>
        </router-link>
        </v-col>
      </v-row>





    </v-container>
  </div>
</template>
  
<script>
import placeClass from "../components/PlaceComponent/placeClass";
import pAPI from "../components/PlaceComponent/placeAPI";
import iAPI from "../components/ItineraryComponent/itineraryAPI";
import locationClass from "../components/LocationComponent/locationClass";
import { useAuth } from "vue-clerk"



export default {

  data() {
    // const router = this.$router; // Store the router instance in a variable
    // const validateForm = () => this.$refs.form.validate();
    // const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });

    return {
      // placeClass: new placeClass({ router }),
      // locationClass: new locationClass({ validateForm, pushRoute, router }),
      postss: [],
      itinerary: [],
    };
  },

  async created() {
    const { getToken } = useAuth();
    const token = await getToken.value()
    this.fetchPosts(); // Fetch posts when the component is created
    this.fetchItinerary();
  },
  methods: {
    async fetchPosts() {
      this.postss = await pAPI.getAllPlace();
    },

    async fetchItinerary() {
      this.itinerary = await iAPI.getAllItinerary();
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      const day = ('0' + formattedDate.getDate()).slice(-2);
      const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
      const year = formattedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style >
.custom-image {
  height: 200px;
  /* Set your desired height */
  width: 100%;
  /* Ensures the width adjusts according to the height */
  object-fit: cover;
  /* Maintains aspect ratio and covers the entire container */
}
</style>
