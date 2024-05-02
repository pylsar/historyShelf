<template>
    <section class="signup-form">
        <h2>Регистрация</h2>  
        <form class="flex flex-column gap-3 ">
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
            <div class="flex flex-column gap-3">
                <Button label="Singup" @click="signup"/>
                <span>Уже зарегестрирован?<router-link to="/signin">Войти</router-link></span>
            </div> 
        </form>
    </section>
</template>

<script setup>
    import {ref} from 'vue';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';

    import {useAuthStore} from '../stores/auth';

    const authStore = useAuthStore();
    const email = ref();
    const password = ref();


    const signup = async ()=>{
        await authStore.signup({email: email.value, password: password.value})
    }
</script>

<style scoped>
    .signup-form{
        max-width: 800px;
        margin: 0 auto;
    }
</style>