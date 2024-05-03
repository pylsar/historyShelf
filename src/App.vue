<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/signup">Зарегестрироватся</RouterLink>
      <RouterLink to="/signin">Войти</RouterLink>
    </nav>
  </header>
  <div class="container">
    <RouterView />
  </div>

</template>

<style scoped>
 
</style>
