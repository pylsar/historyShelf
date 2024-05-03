<template>
    <section class="signup-form">
        <h2>Войти</h2>  
        <form class="flex flex-column gap-3 ">
            <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message> 
            <div class="p-inputgroup flex-1">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>   
                </span>
                <InputText type="email" placeholder="Почта" v-model="email"/>
            </div>
            <div class="p-inputgroup flex-1">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-at"></i> 
                </span>  
                <InputText type="password" placeholder="Пароль" v-model="password"/>
            </div> 
            <Loader v-if="authStore.loader"/>
            <div v-else class="flex flex-column gap-3">
                <Button label="Singin" @click="signin"/>
                <span>Еще не зарегестрирован?<router-link to="/signup">Зарегестрируйся</router-link></span>
            </div> 
        </form>
    </section>
</template>

<script setup>
    import {ref} from 'vue';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Message from 'primevue/message';
    import {useRouter} from 'vue-router';

    import {useAuthStore} from '../stores/auth';
    import Loader from '../components/Loader.vue';

    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref();
    const password = ref();


    const signin = async ()=>{
        await authStore.auth({email: email.value, password: password.value}, 'signin');
        router.push('/cars');
    }
</script>

<style scoped>
    .signup-form{
        max-width: 800px;
        margin: 0 auto;
    }
</style>