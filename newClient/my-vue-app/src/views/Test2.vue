

<template>
  <div class="post-container">
    <div class="flex-container">
      <router-link to="/firstpage">
        <v-btn large outlined class="mx-3" color="primary">
          <v-icon icon="mdi-plus"></v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-col v-for="post in posts" :key="post._id" class="post">
      <div class="my-2">
        <h1 class="mb-2">{{ post.itineraryName }}</h1>
        <p class="location">Location: {{ post.location }}</p>
      </div>

      <div class="date-section">
        <h3 class="mb-2">
          Date: {{ formatDate(post.startDate) }} - {{ formatDate(post.endDate) }}
        </h3>
      </div>

      <div class="post-content">
        <div v-for="newDay in post.newDay" :key="newDay._id" class="activity">
          <div class="day-header">
            <p class="date">{{ formatDate(newDay.date) }}</p>
            <v-divider vertical class="mx-4"></v-divider>
          </div>

          <div v-for="(activity, index) in newDay.activities" :key="index" class="activity-details">
            <p class="time">Activity {{ index + 1 }}: {{ activity.activity }}</p>
            <p class="time">Time: {{ activity.time }} </p>
            <v-divider :thickness="1"></v-divider>
            <p class="time">Activity's Detail</p>
            <p class="time">Location Details: {{ activity.locationDetails }}</p>
            <p class="time">Expectation: {{ activity.expect }}</p>
            <p class="time">Age Restriction: {{ activity.age }}</p>
            <p class="time">Notes: {{ activity.note }}</p>
            <p class="time">Budget: RM{{ activity.budget }}</p>
            <v-divider :thickness="1"></v-divider>
          </div>
        </div>
      </div>

      <v-btn class="mx-3 my-2" color="primary" outlined :to="{ name: 'updateitinerary', params: { id: post._id } }">
        Edit
      </v-btn>
      <v-btn class="mx-3 my-2" color="error" @click="removeItinerary(post._id)">
        Delete
      </v-btn>
    </v-col>
  </div>
</template>

<style scoped>
.post-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.post {
  max-width: 600px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.location {
  color: #555;
}

.date-section {
  margin-top: 10px;
}

.activity {
  margin-bottom: 20px;
}

.day-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.date {
  font-weight: bold;
  margin-right: 10px;
}

.activity-details {
  margin-bottom: 10px;
}

.time {
  margin-bottom: 5px;
}

v-divider {
  background-color: #ccc;
}
</style>



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

