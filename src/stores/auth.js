import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = 'AIzaSyC30VmVWhoEqVrKDdPNe9woq9mJ8QiP7sc';

export const useAuthStore = defineStore('auth', () => {
 
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  });

  const error = ref('');

  const loader = ref(false);

  const signup = async (payload) =>{
    error.value = ''; //очищаем ошибку
    loader.value = true; // запускаем лоадер
    try{
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      // console.log('response.data', response.data) 

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }

      loader.value = false; // останавливаем лоадер

    }catch(err){
      switch(err.response.data.error.message){
        case 'EMAIL_EXISTS': 
          error.value = 'Почта уже существует'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Операция запрещена'  
          break;
        default:
          error.value = 'Ошибка'  
          break;
      }
      loader.value = false; // останавливаем лоадер
    }
  }

  return { signup, userInfo, error, loader }
})
