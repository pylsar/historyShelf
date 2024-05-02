import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = 'AIzaSyC30VmVWhoEqVrKDdPNe9woq9mJ8QiP7sc';

export const useAuthStore = defineStore('auth', () => {
 
  const signup = async (payload) =>{
    try{
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      console.log('response.data', response.data) 
    }catch(err){
      console.log('err.response', err.response);
    }
  }

  return { signup }
})
