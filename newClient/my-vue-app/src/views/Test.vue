<template>
  <div class="day-planner">
    <h1>MEVN Stack - Day Planner</h1>
    <div class="date-picker">
      <label for="startDate">Start Date:</label>
      <input id="startDate" type="date" v-model="startDate" />
      <label for="endDate">End Date:</label>
      <input id="endDate" type="date" v-model="endDate" />
    </div>

    <!-- Generate cards for each day -->
    <div v-for="(day, dayIndex) in dateRange" :key="dayIndex" class="day-card">
      <h2>{{ formatReadableDate(day.date) }}</h2>
      <div v-for="(activity, activityIndex) in day.activities" :key="activityIndex" class="activity-inputs">
        <label for="time">Time:</label>
        <input id="time" type="time" v-model="activity.time" />
        <label for="activity">Activity:</label>
        <input id="activity" type="text" v-model="activity.activity" />
      </div>
      <v-btn @click="addActivity(day)" class="btn add-activity mx-2">Add Activity</v-btn>
    </div>
    
    <v-btn @click="saveAllDays()" class="btn save-day">Save All Days</v-btn>

  </div>
</template>

<script>
import axios from "axios";
const url = "/api/test";

async function validateDayData(dayData) {
  const { date, startDate, endDate, activities } = dayData;

  if (!date || !startDate || !endDate || !activities) {
    throw new Error("Incomplete day data. Ensure all required properties are provided.");
  }

  // Add any additional validation logic here

  // Example: Ensure activities is an array
  if (!Array.isArray(activities)) {
    throw new Error("Activities must be an array.");
  }
}

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      newDay: {
        date: "",
        activities: [{ time: "", activity: "" }],
        dateRange: [], 
      },
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
          activities: [{ time: "", activity: "" }],
        });
      }

      return days;
    },
  },
  methods: {
    addActivity(day) {
      day.activities.push({ time: "", activity: "" });
    },
    async saveAllDays() {
  try {
    // Save all days with the selected date range
    const daysData = this.dateRange.map((day) => ({
      date: day.date,
      startDate: this.startDate,
      endDate: this.endDate,
      activities: day.activities,
      newDay: this.newDay
    }));

    
    console.log("mana"+newDay);
    // Validate and save each day
    for (const dayData of daysData) {
      try {
        // Validate the data before saving
        await validateDayData(dayData);

        // Save the day
        const response = await axios.post(url, dayData);
        console.log("Day saved:", response.data);
      } catch (validationError) {
        console.error("Error saving day:", validationError);
      }
    }

    // Optionally, you can reset the form or handle success in another way.
  } catch (error) {
    console.error("Error saving days:", error);
  }
},

    async saveDay(day) {
      try {
        // Save the day with the selected date
        
       
        this.newDay.startDate = this.startDate;
        this.newDay.endDate = this.endDate; // Set the startDate here
        this.newDay.date = day.date;
        this.newDay.activities = day.activities;

        console.log(this.newDay);
        const response = await axios.post(url, this.newDay);
        console.log("Day saved:", response.data);
        // Optionally, you can reset the form or handle success in another way.
      } catch (error) {
        console.error("Error saving day:", error);
      }
    },
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
