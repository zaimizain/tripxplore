<template>
    <div class="itinerary-form">
      <label for="location">Location</label>
      <input id="location" v-model="location" placeholder="Enter location">
  
      <label for="itineraryName">Itinerary Name</label>
      <input id="itineraryName" v-model="itineraryName" placeholder="Enter itinerary name">
  
      <label for="startDate">Start Date</label>
      <input id="startDate" type="date" v-model="startDate">
  
      <label for="endDate">End Date</label>
      <input id="endDate" type="date" v-model="endDate">
  
      <button @click="createItinerary">Create</button>
    </div>
  </template>
  
  <style scoped>
    .itinerary-form {
      max-width: 400px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    label {
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
      color: #333;
    }
  
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>
  

<script>
export default {
  methods: {
    createItinerary() {
      console.log(this.location, this.itineraryName, this.startDate, this.endDate);

      this.$router.push({
        name: 'itineraryinput',
        query: {
          location: this.location,
          itineraryName: this.itineraryName,
          startDate: this.startDate,
          endDate: this.endDate,
        },
      });
    },
  },
};
</script>
