
<template>
 
  

  <div class="post-container">
   
   
      
      <v-card-text class="text-h4 text-lg-h4"  style="color: #1f1f1f"><b>List Of Famous Itinerary</b></v-card-text> 
    
   
  

    <v-row>
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
            <p class="date">{{ formatDate(newDay.date) }} </p>
            <div class="my-4" v-for="(activity, index) in newDay.activities" :key="index">
          <p class="time">Activity {{ index + 1 }}: {{ activity.activity }}</p>
          <p class="time">Time: {{ activity.time }} </p>
          
          <p class="time" style="margin-top: 15px; text-decoration: underline;">Activity's Detail</p>
          <p class="time">Location Details: {{ activity.locationDetails }}</p>
          <p class="time">Expectation: {{ activity.expect }}</p>
          <p class="time">Age Restriction: {{ activity.age }}</p>
          <p class="time">Notes: {{ activity.note }}</p>
          <p class="time">Budget: RM{{ activity.budget }}</p>
          <v-divider :thickness="4" :color="black"></v-divider>
        </div>

          </div>
          
          

        </div>
      </div>
    </v-col>
  </v-row>
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
    async removeItinerary(id) {
            const response = await iAPI.deleteItinerary(id);
            // Assuming you have a method to handle the navigation or display the message
        
            // After deleting, fetch posts again to update the list
            this.fetchPosts();
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
.flex-container {
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  margin-top: 10px; /* Adjust margin as needed */
}
</style>


