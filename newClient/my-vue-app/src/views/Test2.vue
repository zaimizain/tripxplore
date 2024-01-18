
<template>
  <div class="post-container">
    <v-col v-for="post in posts" :key="post._id" class="post">
      <!-- Header section -->
      <div class="my-2">
        
        <p class="location">Location: {{ post.location }}</p>
        <h1>Itinerary Name: {{ post.itineraryName }}</h1>
      </div>

      <!-- Date section -->
      <div class="date-section">
        <h3>Date: {{ formatDate(post.startDate) }} - {{ formatDate(post.endDate) }}</h3>
      </div>


      <div class="post-content">
        <div v-for="newDay in post.newDay" :key="newDay._id" class="activity">
          <div class="day-header">
            <p class="date">{{ formatDate(newDay.date) }}</p>
            <p class="time">{{ newDay.activities[0].time }}</p> <!-- Display the time -->
            <p class="activities">{{ newDay.activities[0].activity }}</p>
            
          </div>
        </div>
      </div>
    </v-col>
  </div>
</template>


<script>
import iAPI from "../components/ItineraryComponent/itineraryAPI";
import { useAuth } from "vue-clerk"

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const { getToken } = useAuth();
    const token = await getToken.value()
    this.fetchPosts(token);
  },
  methods: {
     async fetchPosts(token){

        this.posts = await iAPI.getAllItinerary(token);
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

<style scoped>
.post-container {
  display: flex;
  flex-wrap: wrap;
}

.post {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header-section {
  text-align: center;
  margin-bottom: 10px;
}

.location {
  color: #555;
}

.date-section,
.new-day-section {
  margin-bottom: 15px;
}

.post-content {
  display: flex;
  flex-wrap: wrap;
}

.activity {
  flex: 1 1 300px;
  margin: 10px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.day-header {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-weight: bold;
}

.activity-item {
  margin-top: 8px;
}
</style>