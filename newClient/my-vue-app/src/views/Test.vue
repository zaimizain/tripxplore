<script setup>
import { store } from '../components/PlaceComponent/test'
</script>


<template>
    <v-container>
        <h1>test</h1>
        <v-btn @click="store.getAllPlace()">
      From B: {{ store.id }}
        </v-btn>
    </v-container>

</template>

<script>
// const CF = require('@cagataycali/collaborative-filtering');
// const pAPI = require('../components/PlaceComponent/placeAPI');
import pAPI from "../components/PlaceComponent/placeAPI"

let movie = []
// let location = document.getElementById("")

const fetchPosts = async () => {
    movie = await pAPI.getAllPlace();
    const filteredPlace = movie.filter(
        (item) => item.age >= 10 
        // && item.location == location
    )

    console.log(filteredPlace);
}
fetchPosts()

</script>