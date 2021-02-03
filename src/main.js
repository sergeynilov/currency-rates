import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import store from './store'

import App from './App.vue'
import router from './router/router.js'

import DKToast from 'vue-dk-toast'
import mitt from 'mitt'

import 'bootstrap'
import 'font-awesome/css/font-awesome.css'

axios.defaults.crossDomain = true
// Vue.config.productionTip = false

const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.$emitter = emitter

app.use(store)
app.config.globalProperties.$store = store

app.use(router)
app.config.globalProperties.$router = router

const token = localStorage.getItem('token')

// if (token) {
//     router.defaults.headers.common['Authorization'] = token
// }

// app.use(axios)
// app.config.globalProperties.$axios = axios

app.use(DKToast, {
    duration: 5000,
    positionY: 'top', // 'top' or 'bottom'
    positionX: 'right' // 'right' or 'left'
    // styles: {
    //   color: '#1762b1',
    //   backgroundColor: '#d5ff9e'
    //   // Vendor prefixes also supported
    // }
})

export default app.config.globalProperties
app.config.globalProperties.toast = DKToast

// app.component('modal', {
//     template: '#modal-template',
// })

app.mount('#app')

// export { app }
