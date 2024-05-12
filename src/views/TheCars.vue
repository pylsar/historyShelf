<template>
    <div>
        <h2>cars</h2>
        <Loader v-if="showLoader"/>
        <div v-else class="flex flex-column gap-3">
            <Card v-for="(car, i) in cars" :key="i">
                <template #title>{{ car.name }}</template>
                <template #subtitle>{{ car.type }}</template>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import axiosApiInstance from '../api'

    import Card from 'primevue/card';
    import Loader from '../components/Loader.vue';

    const authStore = useAuthStore();
    const cars = ref();
    const showLoader = ref(false);

    const getAllCars = async ()=>{
       showLoader.value = true;
       try{
        // ?auth=${authStore.userInfo.token} - это токен зарегестрированого юзера
        // const response = await axios.get(`https://historyshelf-52d58-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${authStore.userInfo.token}`);
        // так как использию interceptors, то этот параметр не нужен (api.js)
        const response = await axiosApiInstance.get(`https://historyshelf-52d58-default-rtdb.europe-west1.firebasedatabase.app/cars.json`);
        console.log(response.data)
        cars.value = response.data;
       }catch(err){
        console.log(err.response)
       }finally{
        showLoader.value = false;
       }
    }


    onMounted( async() => {
        await getAllCars();
    })
</script>
