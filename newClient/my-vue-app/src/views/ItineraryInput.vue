<template>
  <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
  <div class="p-4">
    <div class="mx-15 mb-8">
      <h2 class="text-2xl font-bold">Location: {{ $route.query.location }}</h2>
      <h2 class="text-2xl font-bold">Itinerary Name: {{ $route.query.itineraryName }}</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="day in numberOfDays" :key="day">
        <!-- Display card for each day -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold mb-4">{{ `Day ${day}` }}: {{ getDateForDay(day) }}</h3>
            <div class="mb-4">
              <label class="block text-sm font-semibold mb-1" for="time">Time:</label>
              <input type="text" v-model="timeSlots[day - 1].time" id="time" class="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1" for="activity">Activity:</label>
              <input type="text" v-model="timeSlots[day - 1].activity" id="activity"
                class="w-full p-2 border rounded-md" />
            </div>
          </div>
          <v-file-input class="w-full p-2 border rounded-md" @change="selectFile" :rules="itineraryClass.rules" show-size counter multiple
                label="Select Image"></v-file-input>
        </div>
      </div>
      <v-btn type="submit" class="mt-4" color="primary" block>Submit</v-btn>
    </div>
  </v-form>
</template>



<script>
import itineraryClass from '../components/ItineraryComponent/itineraryClass';
import iAPI from '../components/ItineraryComponent/itineraryAPI';
import axios from 'axios';  // Import axios

export default {
  data() {
    const router = this.$router; // Store the router instance in a variable
        const validateForm = () => this.$refs.form.validate();
        const pushRoute = (routeName, params) => this.$router.push({ name: routeName, params });
    return {
      itineraryClass: new itineraryClass({ validateForm, pushRoute, router }),
      itineraryAPI: new iAPI(), // Initialize the itineraryAPI object
      timeSlots: [], // Initialize as an empty array
      image: [],
      posts: [],
    };
  },

  mounted() {
    this.startDate = this.$route.query.startDate;
    this.endDate = this.$route.query.endDate;
    this.location = this.$route.query.location;
   this.itineraryName = this.$route.query.itineraryName;
    console.log('Number of days:', this.numberOfDays);

    this.posts = Array.from({ length: this.numberOfDays }, () => ({
    
      activity: '',
      time: '',
      image: this.image,
    }));
  },

  methods: {
    
    async fetchPosts() {
            this.posts = await iAPI.addItinerary();
        },
        selectFile(event) {
            console.log("Selected file:", event.target.files[0]);
            this.itineraryClass.selectFile(event.target.files[0]);
        },
    getDateForDay(day) {
      const start = new Date(this.$route.query.startDate);
      const dateForDay = new Date(start);
      dateForDay.setDate(start.getDate() + day - 1);

      // Format the date (you can adjust the format as needed)
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return dateForDay.toLocaleDateString(undefined, options);
    },
    
  
    async submitForm() {
      
      console.log("button ditekan")
      try {
        // Validate the form
        const isValid = await this.$refs.form.validate();
        

        if (isValid) {
          // If the form is valid, submit the form
          console.log("wrf")
          console.log("Form data:", this.posts);
          console.log("ada" , this.posts)
          
          await this.itineraryAPI.addItinerary();
          console.log("wtf")

          // After submitting the form, reset form data if the ref is defined
          if (this.$refs.form) {
            this.$refs.form.reset();
          }

        

          // Optionally, display a success message or update component state
          console.log("Form submitted successfully!");
        } else {
          console.log("Form validation failed");
        }
      } catch (error) {
        // Log more details about the error
        console.error("Error in submitForm:", error);
      }
    }, 
  },
  computed: {
    numberOfDays() {
      const start = new Date(this.$route.query.startDate);
      const end = new Date(this.$route.query.endDate);
      const numberOfDays = Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;

      // Initialize the timeSlots array with empty objects for each day
      this.timeSlots = Array.from({ length: numberOfDays }, () => ({ time: '', activity: '' }));

      return numberOfDays;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
