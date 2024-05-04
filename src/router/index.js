import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import TheCars from '../views/TheCars.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta:{
        auth: false // не зарегестрированные могут попасть
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta:{
        auth: false // не зарегестрированные могут попасть
      }
    },
    {
      path: '/cars',
      name: 'thecars',
      component: TheCars,
      meta:{
        auth: true // только зарегестрированные могут попасть
      }
    }

  ]
})

//защита роутов
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  //если на странице нужна авторизация и у пользователя нет токена
  if(to.meta.auth && !authStore.userInfo.token){
    next('/signin');
  // }else if(!to.meta.auth && authStore.userInfo.token){
  //   next('/cars');
  }else{
    next();
  }
})

export default router
