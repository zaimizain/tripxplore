<template>
    <h1>Test</h1>
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