<!-- SubmitButton.vue -->
<template>
    <button @click="submitItinerary">Submit</button>
  </template>
  
  <script>
  export default {
    methods: {
      submitItinerary() {
        this.$emit('submit');  // Emit an event to notify the parent component
      }
    }
  };
  </script>
  