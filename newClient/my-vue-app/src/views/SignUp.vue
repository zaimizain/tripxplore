<script setup>
import { SignUp } from 'vue-clerk'
</script>

<template>
    <div class="center-container">
  <SignUp signInUrl="/login"/>
</div>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>