import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '../api'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
 
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: ''
  });

  const error = ref('');

  const loader = ref(false);

  const auth = async (payload, type) =>{
    //проверка на регистрацию или вход
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
    error.value = ''; //очищаем ошибку
    loader.value = true; // запускаем лоадер
    try{
      let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      console.log('response.data', response.data);

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken
      };

      //добавляем токен в localstorage
      localStorage.setItem('userTokens', JSON.stringify({
        token: userInfo.value.token,
        refreshToken: userInfo.value.refreshToken
      }));


    }catch(err){
      switch(err.response.data.error.message){
        case 'EMAIL_EXISTS': 
          error.value = 'Почта уже существует'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Операция запрещена'  
          break;
        case 'EMAIL_NOT_FOUND':
          error.value = 'Почта не существует'  
          break;
        case 'INVALID_PASSWORD':
          error.value = 'Не верный пароль'  
          break;
        default:
          error.value = 'Ошибка'  
          break;
      }
      throw error.value // показываем почему не заработало  

    }finally{
      loader.value = false; // останавливаем лоадер
    }

  }

  const logout = () =>{
    userInfo.value ={
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    };
  }

  return { auth, userInfo, error, loader, logout }
})
