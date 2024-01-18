<!-- src/App.vue -->
<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-row >
              <v-alert
            v-if="endDate && startDate && endDate < startDate"
            type="error"
            dismissible
          >
            End date must be after the start date.
          </v-alert>
              <v-date-picker
                v-model="startDate"
                :max="endDate"
                label="Start Date"
                class="mx-3"
              ></v-date-picker>
            
            
              <v-date-picker
                v-model="endDate"
                :min="startDate"
                label="End Date"
              ></v-date-picker>
              <v-btn @click="updateItinerary" class="mx-3" color="primary">Next</v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="day in itineraryDays" :key="day" cols="12" md="6">
          
          <v-card>
            <v-card-title>{{ day }}  <v-spacer></v-spacer>
              <v-btn @click="addCard(day)" color="primary" style="border-radius: 20px;">+</v-btn>
              
            
          </v-card-title>
           
          <v-card-text>
            <v-row v-for="(card, index) in dayCards[day]" :key="index">
              <v-col>
                  <v-text-field v-model="card.time" label="Time" type="time"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="card.activity" label="Activity"></v-text-field>
              </v-col>
              <v-col>
    <v-btn @click="removeCard(day, index)" color="error" style="border-radius: 20px;">-</v-btn>
    <v-btn @click="submitForm" class="mx-3" color="primary">Submit</v-btn>
  </v-col>
            </v-row>

          </v-card-text>

          
          </v-card>
          
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      itineraryDays: [],
      dayCards: {},
      day: " ",
     time: " ",
     activity: " ",
    };
  },
  methods: {
    updateItinerary() {

      if (this.startDate && this.endDate && this.startDate > this.endDate) {
    // Show a warning to the user
    this.$vuetify.snackbar.error('End Date cannot be earlier than Start Date');
    // Optionally, reset the end date to the start date
    this.endDate = this.startDate;
    return;
  }
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const days = this.getDaysArray(start, end);

      this.itineraryDays = days.map((day) => day.toDateString());
    },

    async submitForm() {
    if (this.validateForm()) {
      try {
        const response = await axios.post('/api/itinerary', this.post);
        // Assuming you have a method to handle the navigation or display the message
        this.handleApiResponse(response);
      } catch (error) {
        // Handle error
        console.error('Sini Error submitting form:', error);
      }
    }
  },
  handleApiResponse(response) {
    // Check if the current route is different from the intended route
    const currentRoute = this.router.currentRoute.name; // Access the router instance
    const intendedRoute = "home";

    if (currentRoute !== intendedRoute) {
      // Navigate to the intended route
      this.pushRoute(intendedRoute, { message: response.message });
    } else {
      // Handle the response differently if you are already on the intended route
      // For example, update the component state or display a message
      console.log("Already on the 'placeUI' route. Handle the response here:", response);
    }
  },
    
    addCard(day) {
    // Ensure the day has an array to store cards
    if (!this.dayCards[day]) {
      this.dayCards[day]=[];
    }

    // Add a new card to the array for the given day
    this.dayCards[day].push({ time: '', activity: '' });
  },
  removeCard(day,index) {

  if (this.dayCards[day] && this.dayCards[day].length > index) {
    // Remove the last card from the array for the given day
    this.dayCards[day].splice(index, 1);
  }
},
    getDaysArray(start, end) {
      const daysArray = [];
      let currentDate = start;

      while (currentDate <= end) {
        daysArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return daysArray;
    },

    
  },
};
</script>
