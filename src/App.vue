<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
  <div class="container">
    <RouterView />
  </div>

</template>

<style scoped>
 
</style>
