import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { createStore } from 'vuex'
import store from './store'
import moment from 'moment'


const app = createApp(App)

app.config.globalProperties.$moment = moment

app.use(router)
app.use(store)
app.mount('#app')