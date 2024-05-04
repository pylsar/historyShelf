import axios from 'axios';
import { useAuthStore } from './stores/auth';

axios.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    let params = new URLSearchParams();
    params.append('auth', authStore.userInfo.token);
    config.params = params;
    return config;
})

// axios.interceptors для удобной работы с token, чтобы добавить 1 раз а не каждый раз