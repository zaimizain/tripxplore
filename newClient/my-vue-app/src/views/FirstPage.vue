<template>
  <div class="day-planner">
    <h1>Create a New Itinerary</h1>

    <div class="date-picker">
      Location:
      <v-text-field class="my-3"  for="location" label="Insert location" id="location" type="text" density="compact" variant="solo" 
        single-line v-model="location" ></v-text-field>
        
        Itinerary Name:
        <v-text-field class="my-2"  for="itineraryName" label="Insert Itinerary Name" id="itineraryName" type="text" density="compact" variant="solo" 
        single-line v-model="itineraryName" ></v-text-field>
       
    </div>

    <div class="date-picker">

      Start Date:
        <v-text-field class="my-2"  for="startDate" id="startDate" type="date" density="compact" variant="solo" 
        single-line v-model="startDate" ></v-text-field>

      End Date:
        <v-text-field class="my-2"  for="endDate" id="endDate" type="date" density="compact" variant="solo" 
        single-line v-model="endDate" ></v-text-field>
    </div>

    <!-- Generate cards for each day -->
    <div v-for="(day, dayIndex) in dateRange" :key="dayIndex" class="day-card">
  <h2>{{ formatReadableDate(day.date) }}</h2>
  <div class="activity-inputs">
    <label for="time">Time:</label>
    <input id="time" type="time" v-model="day.currentActivity.time" />
    <label for="activity">Activity:</label>
    <input id="activity" type="text" v-model="day.currentActivity.activity" />
    <label for="locationDetails">Location Details:</label>
    <input id="locationDetails" type="text" v-model="day.currentActivity.locationDetails" />
    <label for="expect">What to Expect?</label>
    <input id="expect" type="text" v-model="day.currentActivity.expect" />
    <label for="age">Age Restriction:</label>
    <input id="age" type="text" v-model="day.currentActivity.age" />
    <label for="note">Notes:</label>
    <input id="note" type="text" v-model="day.currentActivity.note" />
    <label for="budget">Budget: RM</label>
    <input id="budget" type="text" v-model="day.currentActivity.budget" />
    <v-btn @click="addActivity(day)" class="btn add-activity mx-2 " >Add Activity</v-btn>
  </div>

  <div v-if="activities.length > 0" class="new-activities">
  <div v-for="(activity, activityIndex) in day.activities" :key="activityIndex" class="activity-inputs">
   
    <v-card  >
    <p class="mx-3 my-2">  Activity: {{activityIndex + 1}} </p>
    <label class="mx-3 my-2" for="time">Time:</label>
    <input class="mx-3 my-2" id="time" type="time" v-model="activity.time" />
    <label class="mx-3 my-2" for="activity">Activity:</label>
    <input class="mx-3 my-2" id="activity" type="text" v-model="activity.activity" />
    <label class="mx-3 my-2" for="locationDetails">Location Details:</label>
    <input class="mx-3 my-2" id="locationDetails" type="text" v-model="activity.locationDetails" />
    <label class="mx-3 my-2" for="expect">What to Expect?</label>
    <input class="mx-3 my-2" id="expect" type="text" v-model="activity.expect" />
    <label class="mx-3 my-2" for="age">Age Restriction:</label>
    <input class="mx-3 my-2" id="age" type="text" v-model="activity.age" />
    <label class="mx-3 my-2" for="note">Notes:</label>
    <input class="mx-3 my-2" id="note" type="text" v-model="activity.note" />
    <label class="mx-3 my-2" for="budget">Budget: RM</label>
    <input class="mx-3 my-2" id="budget" type="text" v-model="activity.budget" />
  </v-card>
  </div>
</div>

</div>
    
    <v-btn @click="saveAllDays()" href="/test2" class="btn save-day">Save All Days</v-btn>

  </div>
</template>

<script>
import axios from "axios";
const url = "/api/itinerary";

async function validateDayData(dayData) {
  const { location, itineraryName, newDay } = dayData;

  if (!location || !itineraryName || !newDay) {
    throw new Error("Incomplete day data. Ensure all required properties are provided.");
  }

  // Add any additional validation logic here

  // Example: Ensure activities is an array
  if (!Array.isArray(newDay) || newDay.length === 0 || !newDay[0].date || !newDay[0].activities) {
    throw new Error("Invalid structure for newDay. Ensure it has date and activities.");
  }
}

export default {
  data() {
    return {
      location:"",
      itineraryName: " ",
      startDate: "",
      endDate: "",
      newDay: [],
      activities: [],
    };
  },
  
  computed: {
    // Generate an array of dates between start and end dates
    dateRange() {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const days = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    days.push({
      date: new Date(date),
      currentActivity: { time: "", activity: "", expect: "" , age: "",locationDetails: "" ,note: "" ,budget: "" }, // New property for the current activity
      activities: [],
    });
  }

  return days;
},
  },
  methods: {
    addActivity(day) {
      const newActivity = {
      time: day.currentActivity.time,
      activity: day.currentActivity.activity,
      expect: day.currentActivity.expect,
      age: day.currentActivity.age,
      locationDetails: day.currentActivity.locationDetails,
      note: day.currentActivity.note,
      budget: day.currentActivity.budget,

    };
    day.activities.push(newActivity);
  // Reset the current activity
  day.currentActivity = { time: "", activity: "" , expect: "", age: "",locationDetails: "" ,note: "" ,budget: ""};
  this.activities.push(newActivity);
  console.log("After adding activity:", day);
},

    
    async saveAllDays() {
  try {
    const daysData = {
      location: this.location,
      itineraryName: this.itineraryName,
      startDate: this.startDate,
      endDate: this.endDate,
      
      newDay: this.dateRange.map((day) => ({
        date: formatDate(day.date),
        activities: day.activities.map((activity) => ({
          _id: activity.id,
          time: activity.time,
          activity: activity.activity,
          expect: activity.expect,
          age: activity.age,
          locationDetails: activity.locationDetails,
          note: activity.note,
          budget: activity.budget,
        })),

      })),
    };

    // Validate and save the entire itinerary
    await validateDayData(daysData);
    console.log(daysData);

    // Save the entire itinerary
    const response = await axios.post(url, daysData);
    console.log("Itinerary saved:", response.data);

    // Optionally, you can reset the form or handle success in another way.
  } catch (error) {
    console.error("Error saving itinerary:", error);
  }
}
,

    
    formatReadableDate(date) {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return formatDate(date, options);
    },
  },
};

function formatDate(date, options) {
  const pad = (num) => (num < 10 ? "0" + num : num);
  return pad(date.getDate()) + "/" + pad(date.getMonth() + 1) + "/" + date.getFullYear();
}
</script>



<style scoped>
.day-planner {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.date-picker {
  margin-bottom: 20px;
}

.day-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 15px;
}

.day-card h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.activity-inputs {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

input {
  width: calc(100% - 16px);
  padding: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #fff;
}

.add-activity {
  background-color: #4caf50;
}

.save-day {
  background-color: #3498db;
}
</style>