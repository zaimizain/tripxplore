<template>
  <v-app>

    <v-container class="mx-auto d-flex align-center justify-center">


      <router-link style="color: white; text-decoration: none" to="/home" replace><v-row>
          <v-img height="70" width="305" src="assets/logo1.png" ></v-img> 
        </v-row></router-link>

      <v-spacer></v-spacer>


      <v-text-field model-value="Where to go?" label="Location" variant="outlined" large plain class="mx-7" ></v-text-field>

      <v-btn
      href="/search-place"
  large
  plain
  class="mx-7"
  style="background-color: white; color: black; transition: box-shadow 0.3s;border-radius: 999px;"
  @mouseover="hover = true"
  @mouseleave="hover = false"
  :style="{ 'box-shadow': hover ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none' }"
>
<p class="font-weight-bold">
    Place
    </p>
</v-btn>
      
<v-btn
      href="/search-place"
  large
  plain
  class="mx-7"
  style="background-color: white; color: black; transition: box-shadow 0.3s;border-radius: 999px;"
  @mouseover="hover = true"
  @mouseleave="hover = false"
  :style="{ 'box-shadow': hover ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none' }"
>
<p class="font-weight-bold">
    Itinerary
    </p>
</v-btn>
    </v-container>
    <div><router-view :key="$route.path"></router-view></div>
   
<v-row> </v-row>

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

