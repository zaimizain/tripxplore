<script setup>
import {ref, computed} from "vue"
import { useAuth } from 'vue-clerk'
import { SignOutButton } from 'vue-clerk'

const {userId} = useAuth()

console.log("userID:",userId.value)

const isLoggedIn = computed(() => {
  
if(!userId.value ){
 return false;
}
else{
  return true;
}
})
</script>

<template>
  <v-app>

    <v-container class="mx-auto d-flex align-center justify-center " >
  <router-link style="color: white; text-decoration: none" to="/" replace>
    <v-row>
      <v-img height="70" width="305" src="assets/logo1.png"></v-img>
    </v-row>
  </router-link>

  <v-spacer></v-spacer>

  <v-btn
    href="/place"
    large
    plain
    class="mx-0"
    style="background-color: white; color: black; border-radius: 999px; box-shadow: none; text-transform: none;font-size: 20px;"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-icon class="mx-1">mdi-map-marker-radius</v-icon>
   Place
  </v-btn>

  <v-btn
    href="/itinerary"
    large
    plain
    class="mx-0"
    style="background-color: white; color: black; border-radius: 999px; box-shadow: none; text-transform: none;font-size: 20px;"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-icon class="mx-1">mdi-map-marker-distance</v-icon>
    Itinerary
  </v-btn>

  <v-spacer></v-spacer>

  <v-btn v-if="!isLoggedIn"   href="/login" class="mx-1" icon="mdi-login" size="small" color="indigo"></v-btn>
<v-btn v-else  href="/login" ><SignOutButton  /></v-btn>

</v-container>

    <div><router-view :key="$route.path"></router-view></div>
   
<v-row> </v-row>

    <!-- <v-card color="yellow">
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
  </v-card> -->
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

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
</script>
