<script setup >
import { SignIn } from 'vue-clerk'
</script>

<template>
  
  
  <div class="center-container">
    
    <SignIn  signUpUrl="/signup" redirectUrl="/"/>
    
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>