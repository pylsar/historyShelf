<template>
  <header>
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/signup">Зарегестрироватся</RouterLink>
      <RouterLink to="/signin">Войти</RouterLink>
      <RouterLink v-if="token" to="/cars">Авто</RouterLink>
    </nav>
  </header>
  <main>
    <div class="container">
        <RouterView />
    </div>
  </main>

</template>
<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { useAuthStore } from './stores/auth';
  import { computed } from 'vue';

  const authStore = useAuthStore();

  //подгружаем токен из localStorage
  const checkUser = ()=>{
    const tokens = JSON.parse(localStorage.getItem('userTokens'));

    if(tokens){
      authStore.userInfo.token = tokens.token;
      authStore.userInfo.refreshToken = tokens.refreshToken;
      authStore.userInfo.expiresIn = tokens.expiresIn;
    }

    console.log('authStore.userInfo', authStore.userInfo)
  }

  checkUser();


  const token = computed(() => authStore.userInfo.token);
</script>





<style scoped>
 
</style>
