<template>
  <v-app>

    <v-container class="mx-auto d-flex align-center justify-center">


      <router-link style="color: white; text-decoration: none" to="/" replace><v-row>
          <v-img height="70" width="305" src="assets/logo1.png"></v-img> 
          <div class="myFont" align="center">BookTrack</div>
        </v-row></router-link>

      <v-spacer></v-spacer>


      <v-text-field model-value="Place" label="Itinerary" variant="outlined" large plain class="mx-7"></v-text-field>

      <v-btn  large plain class="mx-7">Trips</v-btn>
      <v-btn large plain class="mx-7">Wishlist</v-btn>
      <v-btn background-color:blue class="mx-4">Log In</v-btn>
    </v-container>

    <v-container class="mx-auto d-flex align-center justify">
      <a class="font-weight-black text-decoration-none mx-7" href="/search-place">
        DISCOVER PLACE
      </a>

      <a class="font-weight-black text-decoration-none mx-7" href="/search-itinerary">
        XPLORE ITINERARY
      </a>

    </v-container>
        
    <div><router-view :key="$route.path"></router-view></div>
    <v-col>
      
    </v-col>

    <v-card>
    <div class="d-flex align-center justify-center flex-column my-7">
      
        <v-row no-gutters>
        <v-col class="mx-15">
          <v-sheet class="pa-2 ma-2">
          <v-img  width="162" src="assets/logo1.png" class="mx-4 my-4" ></v-img>
          <p class="justify-center my-1"> Your Journey, Our Itinerary:</p>
          <p class="justify-center my-1"> Explore, Experience, Enjoy!</p>
        </v-sheet>
        </v-col>
        <v-col class="mx-15">
          <v-sheet class="pa-2 ma-2">
            <h3 class="my-4">Contact</h3>
          <p class="justify-center my-1"> Help/FAQ</p>
          <p class="justify-center my-1"> Press</p>
          <p class="justify-center my-1"> Affilates</p>
        </v-sheet>
        </v-col>
        <v-col class="mx-15">
          <v-sheet class="pa-2 ma-2">
          <h3 class="my-4">Company</h3>
          <p class="justify-center my-1"> About</p>
          <p class="justify-center my-1"> Careers</p>
          <p class="justify-center my-1"> Website</p>
        </v-sheet>
        </v-col>
        <v-col class="mx-15">
          <v-sheet class="pa-2 ma-2">
            <h3 class="my-4">More</h3>
          <p class="justify-center my-1"> Explore</p>
          <p class="justify-center my-1"> Itinerary</p>
          <p class="justify-center my-1"> Travel</p>
        </v-sheet>
        </v-col>
        <v-col class="mx-15">
          <v-sheet class="pa-2 ma-2">
          <v-img  width="162" src="assets/logo1.png" class="mx-4 my-4" ></v-img>
          <p class="justify-center my-1"> Your Journey, Our Itinerary:</p>
          <p class="justify-center my-1"> Explore, Experience, Enjoy!</p>
        </v-sheet>
        </v-col>
      </v-row>

    </div>
  </v-card>
  </v-app>
</template>

<!-- <template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Application bar"></v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template> -->

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
  }),

}
</script>

