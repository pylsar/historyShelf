import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { initializeApp } from "firebase/app"

import App from './App.vue'
import router from './router'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC30VmVWhoEqVrKDdPNe9woq9mJ8QiP7sc",
    authDomain: "historyshelf-52d58.firebaseapp.com",
    projectId: "historyshelf-52d58",
    storageBucket: "historyshelf-52d58.appspot.com",
    messagingSenderId: "1097427849715",
    appId: "1:1097427849715:web:96c20e0c564e118db2c286"
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')


