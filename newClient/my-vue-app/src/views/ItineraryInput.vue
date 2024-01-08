<template>
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
            <input
              type="text"
              v-model="timeSlots[day - 1].time"
              id="time"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" for="activity">Activity:</label>
            <input
              type="text"
              v-model="timeSlots[day - 1].activity"
              id="activity"
              class="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      timeSlots: [], // Initialize as an empty array
    };
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
  methods: {
    getDateForDay(day) {
      const start = new Date(this.$route.query.startDate);
      const dateForDay = new Date(start);
      dateForDay.setDate(start.getDate() + day - 1);

      // Format the date (you can adjust the format as needed)
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return dateForDay.toLocaleDateString(undefined, options);
    },
  },
  created() {
    console.log('Number of days:', this.numberOfDays);
  },

  async createItinerary() {
    const itineraryData = {
      location: this.location,
      itineraryName: this.itineraryName,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    try {
      const response = await this.$axios.post('/api/itinerary', itineraryData);
      const itineraryId = response.data._id; // Assuming MongoDB assigns an _id to each document
      
      // Redirect to the itinerary input page with the itinerary ID
      this.$router.push({
        name: 'itineraryinput',
        params: { id: itineraryId },
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
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
